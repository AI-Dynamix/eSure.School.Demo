import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Users, ShieldCheck, AlertTriangle, FileText } from 'lucide-react'
import { classes } from '@/data/classes'

export function SchoolDashboard() {
  // Aggregate data from Classes (Hierarchy-centric)
  const totalDeclaredSize = classes.reduce((sum, c) => sum + c.declaredSize, 0)
  const totalBHYT = classes.reduce((sum, c) => sum + c.bhytCount, 0)
  const totalVoluntary = classes.reduce((sum, c) => sum + c.orderCount, 0)
  
  const bhytRate = totalDeclaredSize ? ((totalBHYT / totalDeclaredSize) * 100).toFixed(1) : '0.0'
  const voluntaryRate = totalDeclaredSize ? ((totalVoluntary / totalDeclaredSize) * 100).toFixed(1) : '0.0'
  

  // Group by Grade
  const grades = ['6', '7', '8', '9']
  const gradeBreakdown = grades.map(g => {
    const gradeClasses = classes.filter(c => c.grade === g)
    const size = gradeClasses.reduce((sum, c) => sum + c.declaredSize, 0)
    const bhyt = gradeClasses.reduce((sum, c) => sum + c.bhytCount, 0)
    const voluntary = gradeClasses.reduce((sum, c) => sum + c.orderCount, 0)
    const vRate = size ? ((voluntary / size) * 100).toFixed(1) : '0.0'
    return {
      grade: `Khối ${g}`,
      totalStudents: size,
      bhytCount: bhyt,
      voluntaryCount: voluntary,
      voluntaryRate: vRate
    }
  })

  return (
    <div className='space-y-6'>
      <Alert>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Lưu ý quan trọng</AlertTitle>
        <AlertDescription>
          <strong>Sĩ số được tính theo KHAI BÁO của Nhà trường.</strong> BH Tai nạn/Thân thể là TỰ NGUYỆN.
        </AlertDescription>
      </Alert>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <KPICard 
            variant="compact"
            color="primary"
            title='Tổng sĩ số khai báo' 
            value={totalDeclaredSize.toLocaleString('vi-VN')} 
            icon={<Users className='h-4 w-4' />} 
        />
        <KPICard 
            variant="compact"
            color="success"
            title='Đã có thẻ BHYT' 
            value={totalBHYT.toLocaleString('vi-VN')} 
            subtitle={`${bhytRate}%`} 
            icon={<ShieldCheck className='h-4 w-4' />} 
        />
        <KPICard 
            variant="compact"
            color="info"
            title='BH Tự nguyện' 
            value={totalVoluntary.toLocaleString('vi-VN')} 
            subtitle={`${voluntaryRate}%`} 
            icon={<FileText className='h-4 w-4' />}    
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết theo Khối (Sĩ số khai báo)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khối</TableHead>
                <TableHead className='text-right'>Sĩ số khai báo</TableHead>
                <TableHead className='text-right'>BHYT</TableHead>
                <TableHead className='text-right'>Đơn BH TN</TableHead>
                <TableHead className='text-right'>Tỷ lệ TN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeBreakdown.map((g) => (
                <TableRow key={g.grade}>
                  <TableCell className='font-medium'>{g.grade}</TableCell>
                  <TableCell className='text-right'>{g.totalStudents.toLocaleString('vi-VN')}</TableCell>
                  <TableCell className='text-right'>{g.bhytCount.toLocaleString('vi-VN')}</TableCell>
                  <TableCell className='text-right'>{g.voluntaryCount.toLocaleString('vi-VN')}</TableCell>
                  <TableCell className='text-right'><Badge variant='secondary'>{g.voluntaryRate}%</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Học sinh chưa tham gia BHYT</CardTitle>
          <CardDescription>Danh sách học sinh chưa có thẻ BHYT (Lưu ý: BH Thân thể/Tai nạn là Tự nguyện - Không bắt buộc)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Học sinh</TableHead>
                <TableHead>Lớp</TableHead>
                <TableHead>Ngày sinh</TableHead>
                <TableHead>Trạng thái BHYT</TableHead>
                <TableHead>Ghi chú</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Nguyễn Văn An</TableCell>
                <TableCell>6A1</TableCell>
                <TableCell>12/05/2012</TableCell>
                <TableCell><Badge variant='destructive'>Chưa có</Badge></TableCell>
                <TableCell className='text-muted-foreground text-sm'>Phụ huynh chưa đăng ký</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Trần Thị Bình</TableCell>
                <TableCell>6A2</TableCell>
                <TableCell>08/09/2012</TableCell>
                <TableCell><Badge variant='destructive'>Chưa có</Badge></TableCell>
                <TableCell className='text-muted-foreground text-sm'>Đang rà soát</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lê Hoàng Cường</TableCell>
                <TableCell>7A1</TableCell>
                <TableCell>22/01/2011</TableCell>
                <TableCell><Badge variant='destructive'>Hết hạn</Badge></TableCell>
                <TableCell className='text-muted-foreground text-sm'>Thẻ hết hạn 30/09</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </div>
  )
}
