import os
import re

# Dictionary of English terms to Vietnamese translations
# specific to the eSure School project
TRANSLATIONS = {
    # Sidebar / Navigation
    "Dashboard": "Tổng quan",
    "Schools": "Quản lý Trường",
    "School Management": "Quản lý Trường",
    "Students": "Học sinh",
    "Student Management": "Quản lý Học sinh",
    "Orders": "Đơn hàng",
    "Order Management": "Quản lý Đơn hàng",
    "Products": "Sản phẩm",
    "Product Management": "Quản lý Sản phẩm",
    "Import": "Import dữ liệu",
    "Reports": "Báo cáo",
    "Settings": "Cài đặt",
    
    # User Menu
    "Account": "Tài khoản",
    "Billing": "Thanh toán",
    "Notifications": "Thông báo",
    "Log out": "Đăng xuất",
    "Logout": "Đăng xuất",
    "Sign out": "Đăng xuất",
    "Upgrade to Pro": "Nâng cấp Pro",
    "Profile": "Hồ sơ",

    # Team Switcher
    "Teams": "Đội ngũ",
    "Add team": "Thêm nhóm",
    "Team": "Nhóm",
    
    # Common UI
    "Search": "Tìm kiếm",
    "Theme": "Giao diện",
    "Light": "Sáng",
    "Dark": "Tối",
    "System": "Hệ thống",
    "Cancel": "Hủy",
    "Save": "Lưu",
    "Edit": "Sửa",
    "Delete": "Xóa",
    "View": "Xem",
    "Create": "Tạo mới",
    "Update": "Cập nhật",
    "Detail": "Chi tiết",
    "Actions": "Thao tác",
    "Status": "Trạng thái",
    "Active": "Hoạt động",
    "Inactive": "Ngưng hoạt động",
    "Pending": "Chờ xử lý",
    "Paid": "Đã thanh toán",
    "Failed": "Thất bại",
    "Name": "Tên",
    "Email": "Email",
    "Role": "Vai trò",
    "Phone": "Điện thoại",
    "Address": "Địa chỉ",
    "Date of Birth": "Ngày sinh",
    "Grade": "Khối lớp",
    "Class": "Lớp",

    # Data Table
    "Page": "Trang",
    "of": "của",
    "Rows per page": "Số hàng mỗi trang",
    "Go to first page": "Về trang đầu",
    "Go to previous page": "Về trang trước",
    "Go to next page": "Sang trang tiếp",
    "Go to last page": "Đến trang cuối",
    "View": "Hiển thị",
    "Toggle columns": "Bật/tắt cột",
    "Asc": "Tăng dần",
    "Desc": "Giảm dần",
    "Hide": "Ẩn",

    # Auth & Forms
    "Please enter your email": "Vui lòng nhập email",
    "Please enter your password": "Vui lòng nhập mật khẩu",
    "Password must be at least 7 characters long": "Mật khẩu phải có ít nhất 7 ký tự",
    "Signing in...": "Đang đăng nhập...",
    "Welcome back": "Chào mừng trở lại",
    "Forgot password?": "Quên mật khẩu?",
    "Or continue with": "Hoặc tiếp tục với",
    "Sign in to your account": "Đăng nhập vào tài khoản",
    "Enter your email below to login to your account": "Nhập email bên dưới để đăng nhập",
    "Create an account": "Tạo tài khoản",
    "Enter your email below to create your account": "Nhập email bên dưới để tạo tài khoản",
    "Already have an account?": "Đã có tài khoản?",
    "Sign Up": "Đăng ký",
    "Sign In": "Đăng nhập",
    "Unauthorized": "Không có quyền truy cập",
    "You must first sign in using Clerk to access this route.": "Bạn phải đăng nhập trước khi truy cập trang này.",
    "Update status": "Cập nhật trạng thái",

    # Feature Specific
    "Recent Sales": "Giao dịch gần đây",
    "+$1,999.00": "+1,999.00 đ", 
    "You made 265 sales this month.": "Bạn đã thực hiện 265 giao dịch trong tháng này.",
    "Total Revenue": "Tổng doanh thu",
    "Subscriptions": "Đăng ký bảo hiểm",
    "Sales": "Doanh số",
    "Active Now": "Đang hoạt động",
    
    # Tables & Dialogs
    "No results.": "Không có dữ liệu.",
    "No results found": "Không tìm thấy kết quả",
    "Filter": "Lọc",
    "Filter...": "Lọc...",
    "Filter by": "Lọc theo",
    "Pick a date": "Chọn ngày",
    "Selected": "Đã chọn",
    "Delete": "Xóa",
    "Edit": "Sửa",
    "Copy": "Sao chép",
    "Invite": "Mời",
    "Confirm": "Xác nhận",
    "Continue": "Tiếp tục",
    "Cancel": "Hủy",
    "Previous": "Trước",
    "Next": "Sau",
    "Close": "Đóng",
    "Search...": "Tìm kiếm...",
    "Search": "Tìm kiếm",

    # Actions & Buttons
    "Add User": "Thêm người dùng",
    "Add Student": "Thêm học sinh",
    "Add School": "Thêm trường",
    "Add Order": "Thêm đơn hàng",
    "Add Product": "Thêm sản phẩm",
    "Import": "Import",
    "Export": "Export",
    "Download": "Tải xuống",
    "Upload": "Tải lên",
    "Refresh": "Làm mới",
    "Reset": "Đặt lại",
    "Apply": "Áp dụng",
    "Clear": "Xóa",
    
    # Validation Messages
    "Please confirm your password": "Vui lòng xác nhận mật khẩu",
    "Passwords don't match.": "Mật khẩu không khớp.",
    "Sending email...": "Đang gửi email...",
    "Email sent to": "Đã gửi email tới",
    
    # Dashboard / Analytics
    "How users access your app": "Cách người dùng truy cập ứng dụng",
    "Analytics": "Phân tích",
    "Overview": "Tổng quan",
    "Recent Activity": "Hoạt động gần đây",

    # Error Pages
    "Oops! Something went wrong": "Rất tiếc! Đã có lỗi xảy ra",
    "We apologize for the inconvenience.": "Chúng tôi xin lỗi vì sự bất tiện này.",
    "Please try again later.": "Vui lòng thử lại sau.",
    "Go Back": "Quay lại",
    "Back to Home": "Về trang chủ",
    "Oops! Page Not Found!": "Rất tiếc! Không tìm thấy trang!",
    "It seems like the page you're looking for": "Có vẻ như trang bạn đang tìm kiếm",
    "does not exist or might have been removed.": "không tồn tại hoặc đã bị xóa.",
    "Website is under maintenance!": "Website đang bảo trì!",
    "The site is not available at the moment.": "Trang web hiện không khả dụng.",
    "We'll be back online shortly.": "Chúng tôi sẽ quay lại sớm thôi.",
    "Unauthorized Access": "Truy cập trái phép",
    "Please log in with the appropriate credentials": "Vui lòng đăng nhập với thông tin xác thực phù hợp",
    "to access this resource.": "để truy cập tài nguyên này.",
    "Forbidden": "Bị cấm",
    "You do not have permission to access together": "Bạn không có quyền truy cập vào tài nguyên này", # Adjusted based on forbidden.tsx likely content
    "You do not have permission to access": "Bạn không có quyền truy cập",
    "this resource.": "vào tài nguyên này.",
    "Learn more": "Tìm hiểu thêm",
    
    # Settings - Appearance
    "Customize the appearance of the app. Automatically switch between day and night themes.": "Tùy chỉnh giao diện ứng dụng. Tự động chuyển đổi giữa giao diện sáng và tối.",
    "Appearance": "Giao diện",
    "Theme": "Chủ đề",
    "Light": "Sáng",
    "Dark": "Tối",
    
    # Settings - Others
    "Manage your account settings and set e-mail preferences.": "Quản lý cài đặt tài khoản và tùy chọn email.",
    "Display": "Hiển thị",
    "Font": "Phông chữ",
    "Set the font you want to use in the dashboard.": "Chọn phông chữ bạn muốn sử dụng trong bảng điều khiển.",
    "Select the theme for the dashboard.": "Chọn chủ đề cho bảng điều khiển.",
    "Update preferences": "Cập nhật tùy chọn",
    
    # Settings - Sidebar
    "Recents": "Gần đây",
    "Home": "Trang chủ",
    "Applications": "Ứng dụng",
    "Desktop": "Desktop",
    "Downloads": "Tải xuống",
    "Documents": "Tài liệu",
    "Sidebar": "Thanh bên",
    "Select the items you want to display in the sidebar.": "Chọn các mục bạn muốn hiển thị trên thanh bên.",
    "Update display": "Cập nhật hiển thị",
    "You have to select at least one item.": "Bạn phải chọn ít nhất một mục.",
    
    # Settings - Account
    "Please enter your name.": "Vui lòng nhập tên của bạn.",
    "Name must be at least 2 characters.": "Tên phải có ít nhất 2 ký tự.",
    "Name must not be longer than 30 characters.": "Tên không được quá 30 ký tự.",
    "Please select your date of birth.": "Vui lòng chọn ngày sinh.",
    "Please select a language.": "Vui lòng chọn ngôn ngữ.",
    "Your name": "Tên của bạn",
    "This is the name that will be displayed on your profile and in emails.": "Đây là tên sẽ hiển thị trên hồ sơ và trong email của bạn.",
    "Date of birth": "Ngày sinh",
    "Your date of birth is used to calculate your age.": "Ngày sinh được dùng để tính tuổi của bạn.",
    "Language": "Ngôn ngữ",
    "Select language": "Chọn ngôn ngữ",
    "Search language...": "Tìm kiếm ngôn ngữ...",
    "No language found.": "Không tìm thấy ngôn ngữ.",
    "This is the language that will be used in the dashboard.": "Đây là ngôn ngữ sẽ được sử dụng trong bảng điều khiển.",
    "Update account": "Cập nhật tài khoản",
    "French": "Tiếng Pháp",
    "German": "Tiếng Đức",
    "Spanish": "Tiếng Tây Ban Nha",
    "Portuguese": "Tiếng Bồ Đào Nha",
    "Russian": "Tiếng Nga",
    "Japanese": "Tiếng Nhật",
    "Korean": "Tiếng Hàn",
    "Chinese": "Tiếng Trung",
    
    # Settings - Notifications
    "Please select a notification type.": "Vui lòng chọn loại thông báo.",
    "Notify me about...": "Thông báo cho tôi về...",
    "All new messages": "Tất cả tin nhắn mới",
    "Direct messages and mentions": "Tin nhắn trực tiếp và nhắc tên",
    "Nothing": "Không gì cả",
    "Email Notifications": "Thông báo qua Email",
    "Communication emails": "Email liên lạc",
    "Receive emails about your account activity.": "Nhận email về hoạt động tài khoản của bạn.",
    "Marketing emails": "Email tiếp thị",
    "Receive emails about new products, features, and more.": "Nhận email về sản phẩm mới, tính năng và nhiều hơn nữa.",
    "Social emails": "Email mạng xã hội",
    "Receive emails for friend requests, follows, and more.": "Nhận email về lời mời kết bạn, theo dõi và nhiều hơn nữa.",
    "Security emails": "Email bảo mật",
    "Receive emails about your account activity and security.": "Nhận email về hoạt động tài khoản và bảo mật.",
    "Use different settings for my mobile devices": "Sử dụng cài đặt khác cho thiết bị di động",
    "You can manage your mobile notifications in the": "Bạn có thể quản lý thông báo di động trong trang",
    "mobile settings": "cài đặt di động",
    "page.": ".",
    "Update notifications": "Cập nhật thông báo",
    
    # Settings - Profile
    "Please enter your username.": "Vui lòng nhập tên đăng nhập.",
    "Username must be at least 2 characters.": "Tên đăng nhập phải có ít nhất 2 ký tự.",
    "Username must not be longer than 30 characters.": "Tên đăng nhập không được quá 30 ký tự.",
    "Please select an email to display.": "Vui lòng chọn email để hiển thị.",
    "Please enter a valid URL.": "Vui lòng nhập URL hợp lệ.",
    "Username": "Tên đăng nhập",
    "This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.": "Đây là tên hiển thị công khai. Có thể là tên thật hoặc biệt danh. Bạn chỉ có thể đổi 30 ngày một lần.",
    "Select a verified email to display": "Chọn email đã xác thực để hiển thị",
    "You can manage verified email addresses in your": "Bạn có thể quản lý các email đã xác thực trong",
    "email settings": "cài đặt email",
    "Bio": "Giới thiệu",
    "Tell us a little bit about yourself": "Hãy giới thiệu một chút về bản thân bạn",
    "You can": "Bạn có thể",
    "@mention": "@nhắc_tên",
    "other users and organizations to link to them.": "người dùng và tổ chức khác để liên kết với họ.",
    "URLs": "Các liên kết URL",
    "Add links to your website, blog, or social media profiles.": "Thêm liên kết đến website, blog hoặc mạng xã hội của bạn.",
    "Add URL": "Thêm URL",
    "Update profile": "Cập nhật hồ sơ",

    # Settings - Page Descriptions
    "Update your account settings. Set your preferred language and": "Cập nhật cài đặt tài khoản. Chọn ngôn ngữ và múi giờ",
    "timezone.": "ưa thích của bạn.",
    "Turn items on or off to control what's displayed in the app.": "Bật hoặc tắt các mục để kiểm soát những gì hiển thị trong ứng dụng.",
    "Configure how you receive notifications.": "Cấu hình cách bạn nhận thông báo.",
    "This is how others will see you on the site.": "Đây là cách người khác sẽ nhìn thấy bạn trên trang web.",
    
    # Components - Command Menu
    "Type a command or search...": "Nhập lệnh hoặc tìm kiếm...",
    "No results found.": "Không tìm thấy kết quả.",
    "Suggestions": "Gợi ý",

    # Layout & Navigation
    "Navigation": "Điều hướng",
    "Menu": "Danh mục",
    "Customers": "Khách hàng",

    # Auth Forms
    "Sign in": "Đăng nhập",
    "Create Account": "Tạo tài khoản",
    "Continue": "Tiếp tục",
    "Verify": "Xác minh",
    "Password": "Mật khẩu",
    "Confirm Password": "Xác nhận mật khẩu",
    "One-Time Password": "Mật khẩu dùng một lần (OTP)",
    "Please enter the 6-digit code.": "Vui lòng nhập mã 6 số.",
    "Welcome back,": "Chào mừng trở lại,",
    "Email sent to": "Email đã được gửi đến",
    
    # Errors
    "Oops! Something went wrong": "Rất tiếc! Đã xảy ra lỗi",
    "Access Forbidden": "Truy cập bị từ chối",
    "You don't have necessary permission": "Bạn không có quyền cần thiết",
    "to view this resource.": "để xem tài nguyên này.",
    "to access this resource.": "để truy cập tài nguyên này.",

    # Pagination & Common
    "Page ": "Trang ",
    " of ": " trên ", 
    "Go to page ": "Đi đến trang ",
}

def translate_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        count = 0
        for eng, vie in TRANSLATIONS.items():
            # Specific replacement for common patterns in this project
            # Using raw strings for patterns to avoid escaping issues
            
            patterns = [
                # Matches: title: 'English'
                (r"(title|label|placeholder|text):\s*['\"]" + re.escape(eng) + r"['\"]",  lambda m: m.group(0).replace(eng, vie)),
                
                # Matches: <Tag>English</Tag> or <Tag>  English  </Tag>
                # Capture group 1: > 
                # Capture group 2: whitespace
                # Capture group 3: English term
                # Capture group 4: whitespace
                # Capture group 5: <
                (r"(>)(\s*)(" + re.escape(eng) + r")(\s*)(<)", lambda m: f"{m.group(1)}{m.group(2)}{vie}{m.group(4)}{m.group(5)}"),
                
                # Matches: "English" (strict exact match in string literals)
                (r'"' + re.escape(eng) + r'"', f'"{vie}"'),
                
                # Matches: 'English'
                (r"'" + re.escape(eng) + r"'", f"'{vie}'"),
            ]
            
            for pat, repl in patterns:
                if callable(repl):
                    # For regex with groups requiring processing
                     new_content, n = re.subn(pat, repl, content)
                     if n > 0:
                         content = new_content
                         count += n
                else:
                    # Simple string replacement based on regex match
                    new_content, n = re.subn(pat, repl, content)
                    if n > 0:
                        content = new_content
                        count += n

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_path}: {count} translations applied.")
            return True
        return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    root_dir = os.path.join(os.getcwd(), 'src')
    print(f"Scanning directory: {root_dir}")
    
    files_modified = 0
    
    for subdir, dirs, files in os.walk(root_dir):
        # print(f"Checking: {subdir}") # Uncomment for verbose output
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                file_path = os.path.join(subdir, file)
                if translate_file(file_path):
                    files_modified += 1
                    
    print(f"\nTranslation complete. {files_modified} files modified.")

if __name__ == "__main__":
    main()
