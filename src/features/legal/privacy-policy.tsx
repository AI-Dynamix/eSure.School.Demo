import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Shield } from 'lucide-react'
import { LegalPageLayout } from './components/legal-page-layout'

export function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title='CHÍNH SÁCH BẢO MẬT VÀ BẢO VỆ DỮ LIỆU CÁ NHÂN'
      acceptMessage='Cảm ơn bạn đã chấp nhận Chính sách Bảo mật của chúng tôi.'
      declineMessage='Bạn cần đồng ý với Chính sách Bảo mật để tiếp tục sử dụng dịch vụ. Nếu có thắc mắc, vui lòng liên hệ hotline 1900 xxxx xx.'
    >
      <Alert className='bg-blue-50 border-blue-200'>
        <Shield className='h-4 w-4 text-blue-600' />
        <AlertDescription className='text-blue-800'>
          Chính sách này được xây dựng tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, 
          Luật An ninh mạng 2018 và các quy định pháp luật liên quan của Việt Nam.
        </AlertDescription>
      </Alert>

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 1. GIỚI THIỆU</h2>
        <p>
          Công ty TNHH eSure Việt Nam ("Công ty", "chúng tôi") cam kết bảo vệ quyền riêng tư và 
          dữ liệu cá nhân của người sử dụng ("Người dùng", "bạn") theo đúng quy định tại 
          Nghị định 13/2023/NĐ-CP ngày 17/4/2023 về bảo vệ dữ liệu cá nhân.
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 2. DỮ LIỆU THU THẬP</h2>
        <h3>2.1. Thông tin học sinh:</h3>
        <ul>
          <li>Họ và tên đầy đủ, ngày sinh, giới tính</li>
          <li>Số định danh cá nhân/CCCD (nếu có)</li>
          <li>Thông tin lớp học, trường học</li>
        </ul>
        <h3>2.2. Thông tin phụ huynh/người giám hộ:</h3>
        <ul>
          <li>Họ và tên, số điện thoại, email</li>
          <li>Địa chỉ cư trú</li>
        </ul>
        <h3>2.3. Dữ liệu nhạy cảm:</h3>
        <ul>
          <li>Số thẻ Bảo hiểm Y tế và thời hạn hiệu lực</li>
          <li>Thông tin đơn bảo hiểm tự nguyện</li>
        </ul>
        <p className='text-orange-600 font-medium'>
          Lưu ý: Việc thu thập dữ liệu nhạy cảm CHỈ được thực hiện khi có sự đồng ý rõ ràng 
          của chủ thể dữ liệu hoặc cha mẹ/người giám hộ (đối với trẻ em).
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 3. MỤC ĐÍCH XỬ LÝ DỮ LIỆU</h2>
        <ul>
          <li>Tạo và quản lý tài khoản Người dùng</li>
          <li>Quản lý danh sách học sinh theo lớp, trường</li>
          <li>Theo dõi tình hình tham gia Bảo hiểm Y tế theo quy định Luật BHYT</li>
          <li>Xử lý đăng ký bảo hiểm tự nguyện và các dịch vụ hỗ trợ</li>
          <li>Báo cáo thống kê cho Sở Giáo dục và Đào tạo theo quy định</li>
        </ul>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 4. CHIA SẺ DỮ LIỆU</h2>
        <p>Chúng tôi có thể chia sẻ dữ liệu với:</p>
        <ul>
          <li><strong>Nhà trường:</strong> Để quản lý học sinh thuộc trường</li>
          <li><strong>Sở Giáo dục và Đào tạo:</strong> Dữ liệu thống kê, báo cáo tổng hợp</li>
          <li><strong>Công ty Bảo hiểm:</strong> Khi phụ huynh đăng ký mua bảo hiểm</li>
          <li><strong>Cơ quan nhà nước:</strong> Theo yêu cầu bằng văn bản của cơ quan có thẩm quyền</li>
        </ul>
        <p className='font-medium text-green-700'>
          Chúng tôi CAM KẾT KHÔNG bán, cho thuê hoặc trao đổi dữ liệu cá nhân 
          cho bên thứ ba vì mục đích thương mại.
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 5. BẢO MẬT DỮ LIỆU</h2>
        <p>Chúng tôi áp dụng các biện pháp bảo mật:</p>
        <ul>
          <li>Mã hóa dữ liệu truyền tải bằng giao thức TLS 1.3</li>
          <li>Mã hóa dữ liệu nhạy cảm khi lưu trữ (AES-256)</li>
          <li>Kiểm soát truy cập theo vai trò (RBAC)</li>
          <li>Giám sát an ninh 24/7</li>
          <li>Sao lưu dữ liệu định kỳ</li>
        </ul>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 6. QUYỀN CỦA CHỦ THỂ DỮ LIỆU</h2>
        <p>Theo Nghị định 13/2023/NĐ-CP, bạn có quyền:</p>
        <ul>
          <li>Được biết về hoạt động xử lý dữ liệu cá nhân của mình</li>
          <li>Đồng ý hoặc rút lại đồng ý cho phép xử lý dữ liệu</li>
          <li>Yêu cầu cung cấp bản sao dữ liệu cá nhân</li>
          <li>Yêu cầu chỉnh sửa hoặc xóa dữ liệu cá nhân</li>
          <li>Khiếu nại, tố cáo hoặc khởi kiện theo quy định pháp luật</li>
        </ul>
        <p>
          Để thực hiện các quyền trên, vui lòng liên hệ: <strong>privacy@esure.school</strong>
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 7. LƯU TRỮ DỮ LIỆU</h2>
        <ul>
          <li><strong>Dữ liệu học sinh:</strong> Trong thời gian học sinh học tại trường và 5 năm sau khi tốt nghiệp.</li>
          <li><strong>Dữ liệu bảo hiểm:</strong> Theo quy định của Luật Kinh doanh Bảo hiểm (tối thiểu 10 năm).</li>
        </ul>
        <p>Dữ liệu được lưu trữ tại các máy chủ đặt tại Việt Nam.</p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 8. LIÊN HỆ</h2>
        <div className='bg-muted p-4 rounded-lg'>
          <p className='font-semibold'>BỘ PHẬN BẢO VỆ DỮ LIỆU CÁ NHÂN</p>
          <p><strong>Công ty TNHH eSure Việt Nam</strong></p>
          <p>Email: privacy@esure.school</p>
          <p>Hotline: 1900 xxxx xx (Nhánh 2)</p>
          <p>Giờ làm việc: 8:00 - 17:30 (Thứ Hai - Thứ Sáu)</p>
        </div>
      </section>

      <section className='text-center text-sm text-muted-foreground pt-4'>
        <p>
          Chính sách này có hiệu lực kể từ ngày 08/01/2026. Phiên bản: 1.0
        </p>
      </section>
    </LegalPageLayout>
  )
}
