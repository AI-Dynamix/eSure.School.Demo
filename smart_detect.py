import os
import re
import json

def is_likely_english_ui_text(text):
    # Heuristics to determine if text is likely user-facing English
    
    # 1. Ignore short, lowercase strings (likely code identifiers like 'flex', 'button')
    if len(text) < 2: return False
    if text.islower() and " " not in text: return False
    
    # 2. Must contain at least one letter
    if not any(c.isalpha() for c in text): return False
    
    # 3. Ignore obvious file paths or urls (contain / or . without spaces)
    if "/" in text or ('.' in text and ' ' not in text): return False
    
    # 4. Ignore templating strings
    if text.startswith("{") or text.endswith("}"): return False
    
    # 5. Keywords to ignore
    ignore_list = {
        "classname", "variant", "size", "default", "icon", "lucide", "shadcn", 
        "admin", "esure", "vite", "react", "html", "css", "json", "true", "false", 
        "null", "undefined", "string", "number", "boolean", "console", "log",
        "post", "get", "put", "delete", "application/json", "system", "light", "dark"
    }
    if text.lower() in ignore_list: return False
    
    # 6. Specific patterns
    # Starts with Capital letter and has lowercase letters (Title Case or Sentence case)
    if text[0].isupper() and any(c.islower() for c in text): return True
    
    # Contains spaces (Phrase)
    if " " in text: return True
    
    return False

def scan_file(file_path):
    findings = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        lines = content.split('\n')
        
        # Regex patterns
        
        # 1. JSX Text Content: >Text<
        # We process line by line for line numbers, but regex is per line.
        # Captures text between tags, excluding { } expressions at the start
        jsx_text_pattern = re.compile(r'>\s*([^<>{@]+?)\s*<')
        
        # 2. String Literals in Props: title="Text" placeholder='Text'
        prop_pattern = re.compile(r'\b(title|label|placeholder|alt|description|heading|message|text|name)\s*=\s*["\']([^"\']+)["\']')
        
        # 3. Zod/Validation messages: .min(5, "Message")
        validation_pattern = re.compile(r'\.(?:min|max|regex|email|url)\([^,]+,\s*["\']([^"\']+)["\']\)')

        for i, line in enumerate(lines):
            stripped = line.strip()
            if not stripped or stripped.startswith("//") or stripped.startswith("/*"):
                continue
            
            # JSX Text
            for match in jsx_text_pattern.finditer(line):
                text = match.group(1).strip()
                if is_likely_english_ui_text(text):
                    findings.append({
                        "file": file_path,
                        "line": i + 1,
                        "text": text,
                        "type": "JSX Content",
                        "context": stripped
                    })

            # Props
            for match in prop_pattern.finditer(line):
                text = match.group(2).strip()
                if is_likely_english_ui_text(text):
                    findings.append({
                        "file": file_path,
                        "line": i + 1,
                        "text": text,
                        "type": f"Prop: {match.group(1)}",
                        "context": stripped
                    })
                    
            # Validation
            for match in validation_pattern.finditer(line):
                text = match.group(1).strip()
                if is_likely_english_ui_text(text):
                    findings.append({
                        "file": file_path,
                        "line": i + 1,
                        "text": text,
                        "type": "Validation Message",
                        "context": stripped
                    })

    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        
    return findings

def main():
    root_dir = os.path.join(os.getcwd(), 'src', 'features')
    print(f"Scanning directory: {root_dir}")
    
    scan_extensions = ('.tsx', '.ts')
    
    all_findings = []
    
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(scan_extensions) and not file.endswith('.d.ts'):
                file_path = os.path.join(subdir, file)
                results = scan_file(file_path)
                if results:
                    all_findings.extend(results)

    # Output likely candidates as JSON
    # Group by file for easier reading
    grouped = {}
    for f in all_findings:
        path = os.path.relpath(f['file'], os.getcwd())
        if path not in grouped: grouped[path] = []
        grouped[path].append(f)
        
    print(json.dumps(grouped, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
