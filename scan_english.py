import os
import re
import json

def scan_file(file_path):
    findings = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        # Regex patterns to catch likely UI strings
        # 1. Text between > and < in JSX (simple check)
        # 2. String literals in specific props (title, label, placeholder, alt)
        
        # This is a basic heuristic scanner
        patterns = [
            (r'>\s*([A-Za-z][A-Za-z0-9\s\-\.\,]+)\s*<', "JSX Content"),
            (r'(title|label|placeholder|alt|text)=["\']([A-Za-z][A-Za-z0-9\s\-\.\,]+)["\']', "Prop/Attribute"),
            (r'(title|label|placeholder|alt|text):\s*["\']([A-Za-z][A-Za-z0-9\s\-\.\,]+)["\']', "Object Property"),
             (r'(name):\s*["\']([A-Za-z][A-Za-z0-9\s\-\.\,]+)["\']', "Object Name Property"),
        ]
        
        # Excluded words (common code terms or brand names that might look like English text)
        excludes = {"className", "id", "type", "variant", "size", "default", "icon", "lucide", "shadcn", "admin", "esure", "vite", "react", "html", "css", "json", "true", "false", "null", "undefined"}

        for i, line in enumerate(lines):
            line = line.strip()
            if not line or line.startswith("//") or line.startswith("/*"):
                continue
                
            for pat, type_desc in patterns:
                matches = re.finditer(pat, line)
                for m in matches:
                    # Depending on the group captured
                    text = m.groups()[-1] # Valid for both patterns above where text is last group
                    
                    # Filtering
                    if len(text) < 2: continue
                    if text in excludes: continue
                    if text.lower() in excludes: continue
                    # Skip if it looks like a file path or url
                    if "/" in text or "." in text and not " " in text: continue 
                    # Skip if mainly digits
                    if text.replace(" ", "").isdigit(): continue
                    
                    findings.append({
                        "line": i + 1,
                        "type": type_desc,
                        "text": text,
                        "context": line
                    })

    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        
    return findings

def main():
    root_dir = os.path.join(os.getcwd(), 'src')
    all_findings = {}
    
    scan_extensions = ('.tsx', '.ts')
    
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(scan_extensions) and not file.endswith('.d.ts'):
                file_path = os.path.join(subdir, file)
                # Skip some implementation details or generated files if needed
                if "routeTree.gen" in file: continue
                
                results = scan_file(file_path)
                if results:
                    # Use relative path for readability
                    rel_path = os.path.relpath(file_path, os.getcwd())
                    all_findings[rel_path] = results

    # Output likely candidates
    print(json.dumps(all_findings, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
