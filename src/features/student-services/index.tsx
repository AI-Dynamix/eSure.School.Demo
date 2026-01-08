import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  CreditCard, 
  Smartphone, 
  Stethoscope,
  Info,
  ExternalLink,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ServiceCard } from '@/components/dashboard/service-card'

/**
 * NOTE: Schools only introduce/connect students with services.
 * They do NOT handle money or commissions.
 */

const SERVICES = [
  {
    id: 'bhyt-topup',
    icon: <Heart className='h-6 w-6 text-white' />,
    title: 'BHYT Nâng cao',
    description: 'Bảo hiểm Y tế bổ sung - Chi trả các hạng mục BHYT bắt buộc không chi trả',
    details: [
      'Chi trả phần chênh lệch viện phí',
      'Phòng bệnh đơn, phòng VIP',
      'Thuốc ngoài danh mục BHYT',
      'Điều trị ngoại trú tại phòng khám tư'
    ],
    badge: 'Bổ sung BHYT',
    color: 'bg-rose-500'
  },
  {
    id: 'installment',
    icon: <CreditCard className='h-6 w-6 text-white' />,
    title: 'Trả góp Học phí',
    description: 'Hỗ trợ phụ huynh chia nhỏ học phí, giảm áp lực tài chính đầu năm học',
    details: [
      'Chia làm 3-6 kỳ thanh toán',
      'Lãi suất ưu đãi 0% (*)' ,
      'Thủ tục đơn giản, online 100%',
      'Duyệt nhanh trong 24h'
    ],
    badge: undefined,
    color: 'bg-blue-500'
  },
  {
    id: 'sim-data',
    icon: <Smartphone className='h-6 w-6 text-white' />,
    title: 'SIM & Data Học sinh',
    description: 'Gói cước viễn thông ưu đãi dành riêng cho học sinh sinh viên',
    details: [
      'Mở tài khoản ngân hàng miễn phí',
      'Đăng ký SIM chính chủ',
      'Gói data giá rẻ cho học tập',
      'Ưu đãi gọi nội mạng miễn phí'
    ],
    badge: undefined,
    color: 'bg-violet-500'
  },
  {
    id: 'care4u',
    icon: <Stethoscope className='h-6 w-6 text-white' />,
    title: 'Care4u - Đặt khám',
    description: 'Dịch vụ các gói khám phù hợp cho học sinh sinh viên và khám bệnh từ xa',
    details: [
      'Gói khám sức khỏe định kỳ',
      'Tư vấn bác sĩ online 24/7',
      'Đặt lịch khám tại phòng khám đối tác',
      'Hồ sơ sức khỏe điện tử'
    ],
    badge: 'Y tế',
    color: 'bg-emerald-500'
  }
]

// Mock data for interested students
const INTERESTED_STUDENTS = [
  { id: 1, name: 'Nguyễn Văn An', class: '10A1', service: 'BHYT Nâng cao', date: '08/01/2026', status: 'pending' },
  { id: 2, name: 'Trần Thị Bình', class: '6A2', service: 'Care4u', date: '07/01/2026', status: 'contacted' },
  { id: 3, name: 'Lê Hoàng Cường', class: '12A3', service: 'SIM Học sinh', date: '06/01/2026', status: 'completed' },
  { id: 4, name: 'Phạm Minh Đức', class: '9A1', service: 'Trả góp Học phí', date: '05/01/2026', status: 'pending' },
  { id: 5, name: 'Hoàng Thị Em', class: '11A2', service: 'BHYT Nâng cao', date: '04/01/2026', status: 'contacted' },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant='outline' className='bg-yellow-50 text-yellow-700 border-yellow-200'>Chờ liên hệ</Badge>
    case 'contacted':
      return <Badge variant='outline' className='bg-blue-50 text-blue-700 border-blue-200'>Đã liên hệ</Badge>
    case 'completed':
      return <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>Hoàn tất</Badge>
    default:
      return <Badge variant='outline'>Không xác định</Badge>
  }
}

export function StudentServices() {
  return (
    <>
      <Header 
        fixed 
        title='Tiện ích Học sinh' 
        description='Giới thiệu các dịch vụ hỗ trợ học sinh và phụ huynh'
      />
      
      <Main>
        <div className='space-y-6'>
          {/* Alert */}
          <Alert className='bg-blue-50/50 border-blue-100'>
            <Info className='h-4 w-4 text-blue-600' />
            <AlertDescription className='text-blue-800'>
              <strong>Lưu ý:</strong> Nhà trường chỉ đóng vai trò giới thiệu và kết nối, không thu phí dịch vụ. 
              Phụ huynh quan tâm sẽ được đối tác liên hệ trực tiếp.
            </AlertDescription>
          </Alert>

          {/* Stats */}
          <div className='grid gap-4 md:grid-cols-4'>
            <Card>
              <CardContent className='pt-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-primary/10'>
                    <Users className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <p className='text-2xl font-bold'>127</p>
                    <p className='text-xs text-muted-foreground'>Phụ huynh quan tâm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='pt-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-yellow-100'>
                    <Clock className='h-5 w-5 text-yellow-600' />
                  </div>
                  <div>
                    <p className='text-2xl font-bold'>23</p>
                    <p className='text-xs text-muted-foreground'>Chờ liên hệ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='pt-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-blue-100'>
                    <AlertCircle className='h-5 w-5 text-blue-600' />
                  </div>
                  <div>
                    <p className='text-2xl font-bold'>45</p>
                    <p className='text-xs text-muted-foreground'>Đang xử lý</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='pt-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-green-100'>
                    <CheckCircle2 className='h-5 w-5 text-green-600' />
                  </div>
                  <div>
                    <p className='text-2xl font-bold'>59</p>
                    <p className='text-xs text-muted-foreground'>Hoàn tất</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue='services' className='w-full'>
            <TabsList>
              <TabsTrigger value='services'>Danh sách Dịch vụ</TabsTrigger>
              <TabsTrigger value='interested'>Phụ huynh Quan tâm</TabsTrigger>
            </TabsList>

            <TabsContent value='services' className='mt-4'>
              <div className='grid gap-6 md:grid-cols-2'>
                {SERVICES.map((service) => (
                  <ServiceCard
                    key={service.id}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    details={service.details}
                    badge={service.badge}
                    color={service.color}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value='interested' className='mt-4'>
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle className='text-base'>Danh sách Phụ huynh Quan tâm</CardTitle>
                      <CardDescription>Phụ huynh đăng ký nhận thông tin về các dịch vụ</CardDescription>
                    </div>
                    <Button variant='outline' size='sm'>
                      <ExternalLink className='h-4 w-4 mr-2' />
                      Xuất Excel
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Học sinh</TableHead>
                        <TableHead>Lớp</TableHead>
                        <TableHead>Dịch vụ quan tâm</TableHead>
                        <TableHead>Ngày đăng ký</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {INTERESTED_STUDENTS.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className='font-medium'>{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.service}</TableCell>
                          <TableCell className='text-muted-foreground'>{student.date}</TableCell>
                          <TableCell>{getStatusBadge(student.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </>
  )
}
