import { KPICard } from '@/components/dashboard/kpi-card'
import { FileText, ShieldAlert, Zap, Repeat } from 'lucide-react'

export function OrderQuickStats() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full'>
      <KPICard 
        variant='compact' 
        color='primary'
        title='Đơn hàng hôm nay' 
        value={1240} 
        subtitle='+12% so với hôm qua'
        icon={<FileText className='h-4 w-4' />} 
      />
      <KPICard 
        variant='compact' 
        color='success'
        title='Hợp đồng hiệu lực' 
        value='842.5k' 
        subtitle='Khối lượng tích lũy'
        icon={<Zap className='h-4 w-4' />} 
      />
      <KPICard 
        variant='compact' 
        color='warning'
        title='Đang bồi thường' 
        value={156} 
        subtitle='24 ca mới trong ngày'
        icon={<ShieldAlert className='h-4 w-4' />} 
      />
      <KPICard 
        variant='compact' 
        color='info'
        title='Chờ tái tục' 
        value='4.2k' 
        subtitle='Hết hạn trong 30 ngày'
        icon={<Repeat className='h-4 w-4' />} 
      />
    </div>
  )
}
