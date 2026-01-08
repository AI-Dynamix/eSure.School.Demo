import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  CreditCard, 
  Smartphone, 
  Stethoscope,
  Info,
  ExternalLink
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

/**
 * NOTE: This component displays support services for schools.
 * Schools only introduce/connect students with services - they do NOT handle money.
 * The UI is designed to feel like "helpful utilities" rather than sales.
 */

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  onClick?: () => void
}

function ServiceCard({ icon, title, description, badge, onClick }: ServiceCardProps) {
  return (
    <Card className='group hover:shadow-md transition-all cursor-pointer border-dashed hover:border-solid hover:border-primary/30' onClick={onClick}>
      <CardContent className='p-4'>
        <div className='flex items-start gap-3'>
          <div className='p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
            {icon}
          </div>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2'>
              <h4 className='font-medium text-sm'>{title}</h4>
              {badge && <Badge variant='secondary' className='text-[10px] px-1.5 py-0'>{badge}</Badge>}
            </div>
            <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>{description}</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='w-full mt-3 text-xs text-muted-foreground hover:text-primary'>
          Tìm hiểu thêm
          <ExternalLink className='h-3 w-3 ml-1' />
        </Button>
      </CardContent>
    </Card>
  )
}

const STUDENT_SERVICES = [
  {
    id: 'bhyt-topup',
    icon: <Heart className='h-4 w-4' />,
    title: 'BHYT Nâng cao',
    description: 'Bảo hiểm bổ sung chi trả các hạng mục mà BHYT bắt buộc không chi trả',
    badge: 'Mới'
  },
  {
    id: 'installment',
    icon: <CreditCard className='h-4 w-4' />,
    title: 'Trả góp Học phí',
    description: 'Hỗ trợ phụ huynh chia nhỏ học phí theo từng kỳ, giảm áp lực tài chính',
    badge: undefined
  },
  {
    id: 'sim-data',
    icon: <Smartphone className='h-4 w-4' />,
    title: 'SIM & Data Học sinh',
    description: 'Gói cước ưu đãi dành riêng cho học sinh, mở tài khoản & đăng ký SIM',
    badge: undefined
  },
  {
    id: 'care4u',
    icon: <Stethoscope className='h-4 w-4' />,
    title: 'Care4u - Đặt khám',
    description: 'Gói khám sức khỏe định kỳ phù hợp cho học sinh và dịch vụ khám từ xa',
    badge: 'Y tế'
  }
]

export function StudentServicesSection() {
  const handleServiceClick = (serviceId: string) => {
    // TODO: Navigate to service detail or open modal
    console.log('Service clicked:', serviceId)
  }

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-base flex items-center gap-2'>
              💡 Tiện ích Hỗ trợ Học sinh
            </CardTitle>
            <CardDescription>
              Các chương trình phối hợp hỗ trợ phụ huynh và học sinh
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {STUDENT_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              badge={service.badge}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
        </div>

        <Alert className='bg-blue-50/50 border-blue-100'>
          <Info className='h-4 w-4 text-blue-600' />
          <AlertDescription className='text-xs text-blue-800'>
            <strong>Care4u:</strong> Dịch vụ các gói khám phù hợp cho học sinh sinh viên và dịch vụ khám bệnh từ xa. 
            Nhà trường chỉ đóng vai trò giới thiệu, không thu phí.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
