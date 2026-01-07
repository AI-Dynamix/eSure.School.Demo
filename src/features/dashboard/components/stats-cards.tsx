import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { dashboardStats } from '@/data/dashboard-stats'
import { Users, ShieldCheck, Clock, AlertCircle } from 'lucide-react'

export function StatsCards() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Tổng Học sinh
          </CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{dashboardStats.totalStudents.toLocaleString()}</div>
          <p className='text-xs text-muted-foreground'>
            Học sinh toàn hệ thống
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Đã tham gia BH
          </CardTitle>
          <ShieldCheck className='h-4 w-4 text-esure-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{dashboardStats.insuredStudents.toLocaleString()}</div>
          <p className='text-xs text-muted-foreground'>
            Tỷ lệ: {((dashboardStats.insuredStudents / dashboardStats.totalStudents) * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Chờ thanh toán</CardTitle>
          <Clock className='h-4 w-4 text-yellow-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{dashboardStats.pendingPayment.toLocaleString()}</div>
          <p className='text-xs text-muted-foreground'>
            Đơn hàng chưa thanh toán
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Chờ bổ sung TT
          </CardTitle>
          <AlertCircle className='h-4 w-4 text-red-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{dashboardStats.pendingInfo.toLocaleString()}</div>
          <p className='text-xs text-muted-foreground'>
            Hồ sơ thiếu thông tin
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
