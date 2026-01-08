# eSure School - Hệ thống Quản lý và Phân phối Bảo hiểm Học đường

eSure School là một nền tảng Dashboard quản lý toàn diện dành cho việc phân phối, theo dõi và quản lý bảo hiểm học sinh (BHYT và Bảo hiểm tự nguyện) tại các trường học. Hệ thống được thiết kế để phục vụ đa dạng các cấp quản lý từ Nhà trường, Sở Giáo dục & Đào tạo (Sở GD), đến các đơn vị Bảo hiểm (SSC) và Quản trị viên hệ thống (eSure Admin).

![Dashboard Screenshot](public/images/dashboard-preview.png)

## 🚀 Tính năng chính

Hệ thống cung cấp các giao diện và chức năng chuyên biệt cho từng nhóm người dùng:

### 1. 🏫 School Admin (Quản lý Trường học)
- **Tổng quan trường học**: Xem thống kê sĩ số, tỷ lệ tham gia BHYT và BH tự nguyện.
- **Quản lý lớp học**: Theo dõi chi tiết từng khối/lớp, danh sách học sinh chưa tham gia bảo hiểm.
- **Báo cáo**: Xuất báo cáo tình hình tham gia bảo hiểm của học sinh.

### 2. 🏢 Agency Admin (Sở/Phòng GD&ĐT)
- **Tổng quan toàn tỉnh/thành**: Cái nhìn bao quát về tình hình tham gia bảo hiểm của tất cả các trường trong khu vực quản lý.
- **Bảng xếp hạng**: Theo dõi các trường dẫn đầu và các trường cần vận động thêm.
- **Quản lý địa bàn**: Dữ liệu chi tiết theo từng Quận/Huyện.

### 3. 🛡️ SSC Admin (Đơn vị Bảo hiểm)
- **Doanh thu & Hiệu quả**: Theo dõi doanh thu Gross/Net, hoa hồng, và số lượng đơn hàng.
- **Phân khúc khách hàng**: Phân tích trường học theo các phân khúc (Gold, Silver, At-risk) để có chiến lược tiếp cận phù hợp.
- **Sản phẩm**: Quản lý hiệu quả của từng gói sản phẩm bảo hiểm.

### 4. ⚡ eSure Admin (Quản trị hệ thống)
- **Quản trị đối tác**: Quản lý danh sách Payment Gateway, Công ty bảo hiểm gốc (PVI, Bảo Việt, etc.).
- **Cấu hình sản phẩm**: Thiết lập các gói bảo hiểm, mức phí và hoa hồng.
- **Báo cáo tài chính**: P&L Statement, dòng tiền và đối soát.

## 🛠️ Công nghệ sử dụng

Dự án được xây dựng dựa trên các công nghệ hiện đại, tối ưu cho hiệu năng và trải nghiệm người dùng:

- **Frontend Core**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Routing**: [TanStack Router](https://tanstack.com/router/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Cài đặt và Chạy dự án

Yêu cầu: Node.js (version 18+ recommended)

1. **Clone dự án:**
   ```bash
   git clone <repository-url>
   cd esure-school
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   # hoặc
   pnpm install
   ```

3. **Chạy môi trường phát triển (Development):**
   ```bash
   npm run dev
   ```
   Truy cập `http://localhost:5173` để xem ứng dụng.

4. **Build cho Production:**
   ```bash
   npm run build
   ```

## 📂 Cấu trúc dự án

- `src/features`: Chứa các module chức năng chính (Dashboard, Schools, Reports, Orders, etc.).
- `src/components`: Các UI component tái sử dụng (Button, Card, Table, etc.).
- `src/data`: Mock data và các loader dữ liệu (dữ liệu trường học, địa chính).
- `src/types`: Định nghĩa các kiểu dữ liệu TypeScript.
- `src/routes`: Cấu hình routing của ứng dụng.

## 📝 License

Dự án này là tài sản nội bộ của eSure.
