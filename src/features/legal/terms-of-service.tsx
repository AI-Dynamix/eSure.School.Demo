import { Separator } from '@/components/ui/separator'
import { LegalPageLayout } from './components/legal-page-layout'

export function TermsOfService() {
  return (
    <LegalPageLayout 
      title="ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ"
      acceptMessage="Cảm ơn bạn đã chấp nhận Điều khoản Sử dụng Dịch vụ của chúng tôi."
      declineMessage="Bạn cần đồng ý với Điều khoản Sử dụng để tiếp tục sử dụng dịch vụ. Nếu có thắc mắc, vui lòng liên hệ hotline 1900 xxxx xx."
    >
      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 1. PHẠM VI ÁP DỤNG VÀ ĐỊNH NGHĨA</h2>
        <p>
          Điều khoản Sử dụng Dịch vụ này ("Điều khoản") là thỏa thuận pháp lý ràng buộc giữa 
          Công ty TNHH eSure Việt Nam ("Công ty", "chúng tôi") và người sử dụng dịch vụ ("Người dùng", "bạn") 
          khi truy cập và sử dụng nền tảng eSure School ("Nền tảng").
        </p>
        <p>
          Điều khoản này được lập phù hợp với quy định của Bộ luật Dân sự 2015, 
          Luật Giao dịch điện tử 2023 (Luật số 20/2023/QH15), Luật Bảo vệ quyền lợi người tiêu dùng 2023 
          và các văn bản pháp luật liên quan của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 2. CHẤP NHẬN ĐIỀU KHOẢN</h2>
        <p>
          Bằng việc truy cập, đăng ký tài khoản hoặc sử dụng Nền tảng, Người dùng xác nhận đã đọc, 
          hiểu rõ và đồng ý bị ràng buộc bởi Điều khoản này và Chính sách Bảo mật của chúng tôi.
        </p>
        <p>
          Người dùng cam kết có đầy đủ năng lực hành vi dân sự theo quy định của Bộ luật Dân sự 2015. 
          Đối với học sinh dưới 18 tuổi, việc sử dụng Nền tảng phải được sự đồng ý và giám sát của 
          cha mẹ hoặc người giám hộ hợp pháp.
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 3. QUY TẮC SỬ DỤNG</h2>
        <p>Khi đăng ký tài khoản, Người dùng cam kết:</p>
        <ul>
          <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật.</li>
          <li>Bảo mật thông tin đăng nhập và chịu trách nhiệm hoàn toàn cho mọi hoạt động phát sinh từ Tài khoản.</li>
          <li>Không chuyển nhượng, cho mượn Tài khoản cho bất kỳ bên thứ ba nào.</li>
        </ul>
        <p>Người dùng cam kết KHÔNG thực hiện các hành vi sau:</p>
        <ul>
          <li>Sử dụng Nền tảng cho mục đích bất hợp pháp hoặc vi phạm pháp luật Việt Nam.</li>
          <li>Xâm phạm an ninh mạng theo quy định tại Luật An ninh mạng 2018.</li>
          <li>Thu thập, sử dụng trái phép dữ liệu cá nhân của người khác.</li>
        </ul>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 4. DỊCH VỤ VÀ NỘI DUNG</h2>
        <p>Nền tảng cung cấp các Dịch vụ chính sau:</p>
        <ul>
          <li>Quản lý danh sách học sinh và thông tin cơ bản.</li>
          <li>Theo dõi tình hình tham gia Bảo hiểm Y tế bắt buộc theo Luật Bảo hiểm Y tế.</li>
          <li>Kết nối với các sản phẩm bảo hiểm tự nguyện từ các công ty bảo hiểm được cấp phép.</li>
          <li>Giới thiệu các dịch vụ hỗ trợ học sinh.</li>
        </ul>
        <p>
          Nền tảng đóng vai trò trung gian kết nối. Chúng tôi KHÔNG phải là công ty bảo hiểm và 
          KHÔNG trực tiếp cấp đơn bảo hiểm.
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 5. GIỚI HẠN TRÁCH NHIỆM</h2>
        <p>Công ty KHÔNG chịu trách nhiệm về:</p>
        <ul>
          <li>Thiệt hại phát sinh từ việc Người dùng cung cấp thông tin sai lệch.</li>
          <li>Quyết định chi trả, từ chối bồi thường của các công ty bảo hiểm đối tác.</li>
          <li>Tranh chấp giữa Người dùng với Nhà trường hoặc bên thứ ba.</li>
          <li>Gián đoạn dịch vụ do sự kiện bất khả kháng.</li>
        </ul>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 6. CHẤM DỨT DỊCH VỤ</h2>
        <p>
          Người dùng có quyền ngừng sử dụng Dịch vụ bất kỳ lúc nào bằng cách gửi yêu cầu 
          hủy tài khoản qua email hoặc tính năng trên Nền tảng.
        </p>
        <p>Công ty có quyền tạm ngưng hoặc chấm dứt Tài khoản ngay lập tức nếu Người dùng vi phạm nghiêm trọng Điều khoản này.</p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 7. GIẢI QUYẾT TRANH CHẤP</h2>
        <p>
          Mọi tranh chấp phát sinh từ hoặc liên quan đến Điều khoản này trước hết được giải quyết 
          thông qua thương lượng, hòa giải giữa các bên.
        </p>
        <p>
          Trường hợp không thể thương lượng, tranh chấp sẽ được giải quyết tại Tòa án nhân dân 
          có thẩm quyền tại Thành phố Hồ Chí Minh theo quy định của pháp luật Việt Nam.
        </p>
      </section>

      <Separator />

      <section>
        <h2 className='text-lg font-semibold'>ĐIỀU 8. THÔNG TIN LIÊN HỆ</h2>
        <div className='bg-muted p-4 rounded-lg'>
          <p><strong>CÔNG TY TNHH eSURE VIỆT NAM</strong></p>
          <p>Email: legal@esure.school</p>
          <p>Hotline: 1900 xxxx xx</p>
          <p>Giờ làm việc: 8:00 - 17:30 (Thứ Hai - Thứ Sáu)</p>
        </div>
      </section>

      <section className='text-center text-sm text-muted-foreground pt-4'>
        <p>
          Điều khoản này có hiệu lực kể từ ngày 08/01/2026. Phiên bản: 1.0
        </p>
      </section>
    </LegalPageLayout>
  )
}
