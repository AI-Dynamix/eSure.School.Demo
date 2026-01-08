import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { SCHOOL_LEVELS, SchoolLevel } from '@/data/classes'

// ...

import { generateClasses } from '@/data/mock-dashboard-data'
import { useMemo } from 'react'

/**
 * NOTE: Schools only manage student lists and mobilization (vận động).
 * They DO NOT handle money, collections, or revenue calculation.
 */

import { type SchoolBase } from '@/data/vn-schools-loader'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { OrderTrendCharts } from '@/features/orders/components/order-trend-charts'
import { StudentServicesSection } from './components/student-services-section'
import { 
  Users, 
  ShieldCheck, 
  Heart, 
  AlertCircle,
  Clock,
  CheckCircle2
} from 'lucide-react'

// ...

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts'

interface SchoolDashboardProps {
  school: SchoolBase
  hideStudentDetails?: boolean
}

export function SchoolDashboard({ school, hideStudentDetails }: SchoolDashboardProps) {
  // Generate mock class data based on the specific school's level
  // generateClasses now handles 'Liên cấp' directly by generating all grades 1-12
  const classes = useMemo(() => {
    return generateClasses(school.id, school.level)
  }, [school])

  // Derive metrics from classes
  const metrics = useMemo(() => {
    const totalStudents = classes.reduce((sum, c) => sum + c.totalStudents, 0)
    const bhytCount = classes.reduce((sum, c) => sum + c.bhytCount, 0)
    const voluntaryCount = classes.reduce((sum, c) => sum + c.voluntaryInsCount, 0)
    const pendingPayment = classes.reduce((sum, c) => sum + c.pendingPayment, 0)
    const pendingInfo = classes.reduce((sum, c) => sum + c.pendingInfo, 0)

    const bhytRate = totalStudents ? (bhytCount / totalStudents) * 100 : 0
    const voluntaryRate = totalStudents ? (voluntaryCount / totalStudents) * 100 : 0

    return {
        totalStudents,
        bhytCount,
        bhytRate: parseFloat(bhytRate.toFixed(1)),
        voluntaryCount,
        voluntaryRate: parseFloat(voluntaryRate.toFixed(1)),
        pendingCount: pendingPayment + pendingInfo
    }
  }, [classes])

  // Chart data calculation
  const gradeChartsData = useMemo(() => {
      const grades = Array.from(new Set(classes.map(c => c.grade))).sort((a, b) => a - b)
      return grades.map(g => {
          const gradeClasses = classes.filter(c => c.grade === g)
          const total = gradeClasses.reduce((sum, c) => sum + c.totalStudents, 0)
          const bhyt = gradeClasses.reduce((sum, c) => sum + c.bhytCount, 0)
          const voluntary = gradeClasses.reduce((sum, c) => sum + c.voluntaryInsCount, 0)
          
          return {
              grade: `Khối ${g}`,
              students: total,
              bhytRate: total ? parseFloat(((bhyt / total) * 100).toFixed(1)) : 0,
              voluntaryRate: total ? parseFloat(((voluntary / total) * 100).toFixed(1)) : 0
          }
      })
  }, [classes])

  // Level metrics calculation
  const levelChartsData = useMemo(() => {
    const levels = {
      'Tiểu học': { grades: [1, 2, 3, 4, 5], label: 'Tiểu học', color: '#3b82f6' },
      'THCS': { grades: [6, 7, 8, 9], label: 'THCS', color: '#10b981' },
      'THPT': { grades: [10, 11, 12], label: 'THPT', color: '#f59e0b' }
    }

    return Object.entries(levels).map(([_, config]) => {
      const levelClasses = classes.filter(c => config.grades.includes(c.grade))
      
      const totalStudents = levelClasses.reduce((sum, c) => sum + c.totalStudents, 0)
      const bhytCount = levelClasses.reduce((sum, c) => sum + c.bhytCount, 0)
      const voluntaryCount = levelClasses.reduce((sum, c) => sum + c.voluntaryInsCount, 0)

      return {
        name: config.label,
        students: totalStudents,
        bhytRate: totalStudents ? parseFloat(((bhytCount / totalStudents) * 100).toFixed(1)) : 0,
        voluntaryRate: totalStudents ? parseFloat(((voluntaryCount / totalStudents) * 100).toFixed(1)) : 0,
        color: config.color
      }
    })
  }, [classes])


  const getGradeBreakdown = (levelId: SchoolLevel) => {
    const levelInfo = SCHOOL_LEVELS.find(l => l.id === levelId)
    if (!levelInfo) return []
    
    // Map levelId to data level string
    const dataLevel = levelId === 'tieu_hoc' ? 'Tiểu học' : levelId === 'thcs' ? 'THCS' : 'THPT'

    return levelInfo.grades.map(g => {
      // Cast grade string to number for comparison
      const gradeClasses = classes.filter(c => c.grade === Number(g) && c.level === dataLevel)
      // Only include grades that have classes
      if (gradeClasses.length === 0) return null

      const size = gradeClasses.reduce((sum, c) => sum + c.totalStudents, 0)
      const bhyt = gradeClasses.reduce((sum, c) => sum + c.bhytCount, 0)
      const voluntary = gradeClasses.reduce((sum, c) => sum + c.voluntaryInsCount, 0)
      const vRate = size ? ((voluntary / size) * 100).toFixed(1) : '0.0'
      return {
        grade: `Khối ${g}`,
        totalStudents: size,
        bhytCount: bhyt,
        voluntaryCount: voluntary,
        voluntaryRate: vRate
      }
    }).filter(Boolean) as {
        grade: string
        totalStudents: number
        bhytCount: number
        voluntaryCount: number
        voluntaryRate: string
    }[]
  }

  const CHART_COLORS = ['hsl(var(--primary))', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className='space-y-6 pb-20'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <KPICard
            title='Tổng số học sinh'
            value={metrics.totalStudents.toLocaleString('vi-VN')}
            icon={<Users className='h-4 w-4' />}
            variant='compact'
        />
        <KPICard
            title='Tham gia BHYT'
            value={metrics.bhytCount.toLocaleString('vi-VN')}
            subtitle={`${metrics.bhytRate}%`}
            icon={<ShieldCheck className='h-4 w-4' />}
            trend={0.5}
            valueClassName='text-blue-600'
            variant='compact'
        />
        <KPICard
            title='Bảo hiểm Tự nguyện'
            value={metrics.voluntaryCount.toLocaleString('vi-VN')}
            subtitle={`${metrics.voluntaryRate}%`}
            icon={<Heart className='h-4 w-4' />}
            trend={2.4}
            valueClassName='text-green-600'
            variant='compact'
        />
        <KPICard
            title='Hồ sơ cần rà soát'
            value={metrics.pendingCount}
            subtitle='Dữ liệu & Hồ sơ'
            icon={<Clock className='h-4 w-4' />}
            valueClassName='text-orange-600'
            variant='compact'
        />
      </div>

      {metrics.pendingCount > 0 && (
          <Alert variant='destructive' className='bg-orange-50 border-orange-200 text-orange-800'>
            <AlertCircle className='h-4 w-4 text-orange-600' />
            <AlertTitle>Cần rà soát dữ liệu</AlertTitle>
            <AlertDescription>
                Hiện có {metrics.pendingCount} hồ sơ đang ở trạng thái chờ (thiếu thông tin hoặc chưa đối soát thanh toán). 
                Vui lòng kiểm tra danh sách bên dưới.
            </AlertDescription>
          </Alert>
      )}

      {metrics.bhytRate >= 99 && (
          <Alert className='bg-green-50 border-green-200 text-green-800'>
            <CheckCircle2 className='h-4 w-4 text-green-600' />
            <AlertTitle>Hoàn thành chỉ tiêu BHYT</AlertTitle>
            <AlertDescription>
                Trường đã đạt tỷ lê tham gia BHYT {metrics.bhytRate}%, vượt mức yêu cầu của Sở GD&ĐT.
            </AlertDescription>
          </Alert>
      )}

      {/* Level Charts - Thống kê theo Cấp học */}
      <div className='mb-8'>
        <h3 className="text-lg font-semibold mb-4">Thống kê theo Cấp học</h3>
        <div className='grid gap-4 md:grid-cols-2'>
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className='text-base'>Phân bổ học sinh</CardTitle>
                    <CardDescription>Tỷ lệ học sinh giữa các cấp</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='h-[300px] w-full'>
                        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                            <BarChart data={levelChartsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px' }} />
                                <Bar dataKey="students" name="Số học sinh" radius={[4, 4, 0, 0]}>
                                    {levelChartsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className='text-base'>Tỷ lệ tham gia BHYT & BHTN</CardTitle>
                    <CardDescription>So sánh hiệu quả giữa các cấp</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='h-[300px] w-full'>
                        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                            <BarChart data={levelChartsData} layout='vertical'>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" fontSize={12} hide />
                                <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                                <Legend iconType='circle' wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                <Bar dataKey="bhytRate" name="BHYT (%)" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="voluntaryRate" name="Bảo hiểm TN (%)" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Grade Charts */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Thống kê theo Khối lớp</h3>
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
              <CardHeader className='pb-2'>
                  <CardTitle className='text-base'>Phân bổ học sinh theo Khối</CardTitle>
                  <CardDescription>Số lượng học sinh khai báo trên hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className='h-[300px] w-full'>
                      <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                          <BarChart data={gradeChartsData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="grade" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis fontSize={12} tickLine={false} axisLine={false} />
                              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                              <Bar dataKey="students" radius={[4, 4, 0, 0]}>
                                  {gradeChartsData.map((_entry, index) => (
                                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                  ))}
                              </Bar>
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </CardContent>
          </Card>

          <Card>
              <CardHeader className='pb-2'>
                  <CardTitle className='text-base'>Tỷ lệ tham gia theo Khối</CardTitle>
                  <CardDescription>So sánh BHYT và Bảo hiểm tự nguyện (%)</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className='h-[300px] w-full'>
                      <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                          <BarChart data={gradeChartsData} layout='vertical'>
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                              <XAxis type="number" fontSize={12} hide />
                              <YAxis dataKey="grade" type="category" fontSize={12} tickLine={false} axisLine={false} />
                              <Tooltip />
                              <Legend iconType='circle' wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                              <Bar dataKey="bhytRate" name="BHYT" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                              <Bar dataKey="voluntaryRate" name="Bảo hiểm TN" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </CardContent>
          </Card>
      </div>
      </div>

      {/* Charts Section */}
      <OrderTrendCharts showRevenue={false} />

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết theo Khối (Sĩ số khai báo)</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={school.level === 'Liên cấp' ? 'all' : (school.level === 'Tiểu học' ? 'tieu_hoc' : school.level === 'THCS' ? 'thcs' : 'thpt')} className="w-full">
            <TabsList className={school.level === 'Liên cấp' ? "grid w-full grid-cols-4 lg:w-[500px]" : "grid w-full grid-cols-3 lg:w-[400px]"}>
              {school.level === 'Liên cấp' && <TabsTrigger value="all">Tất cả</TabsTrigger>}
              <TabsTrigger value="tieu_hoc" disabled={school.level !== 'Liên cấp' && school.level !== 'Tiểu học'}>Tiểu học</TabsTrigger>
              <TabsTrigger value="thcs" disabled={school.level !== 'Liên cấp' && school.level !== 'THCS'}>THCS</TabsTrigger>
              <TabsTrigger value="thpt" disabled={school.level !== 'Liên cấp' && school.level !== 'THPT'}>THPT</TabsTrigger>
            </TabsList>
            
            {/* Tab Tất cả - chỉ hiển thị với trường Liên cấp */}
            {school.level === 'Liên cấp' && (
            <TabsContent value="all">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cấp học</TableHead>
                      <TableHead>Khối</TableHead>
                      <TableHead className='text-right'>Sĩ số</TableHead>
                      <TableHead className='text-right'>BHYT</TableHead>
                      <TableHead className='text-right'>BH TN</TableHead>
                      <TableHead className='text-right'>Tỷ lệ TN</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(['tieu_hoc', 'thcs', 'thpt'] as const).flatMap((levelId) => 
                      getGradeBreakdown(levelId).map((g) => (
                        <TableRow key={`${levelId}-${g.grade}`}>
                          <TableCell className='text-xs text-muted-foreground'>{levelId === 'tieu_hoc' ? 'Tiểu học' : levelId === 'thcs' ? 'THCS' : 'THPT'}</TableCell>
                          <TableCell className='font-medium'>{g.grade}</TableCell>
                          <TableCell className='text-right'>{g.totalStudents.toLocaleString('vi-VN')}</TableCell>
                          <TableCell className='text-right'>{g.bhytCount.toLocaleString('vi-VN')}</TableCell>
                          <TableCell className='text-right'>{g.voluntaryCount.toLocaleString('vi-VN')}</TableCell>
                          <TableCell className='text-right'><Badge variant='secondary'>{g.voluntaryRate}%</Badge></TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            )}
            
            <TabsContent value="tieu_hoc">
              <div className="overflow-x-auto">
                <Table>
                  {/* ... table content ... */}
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
                    {getGradeBreakdown('tieu_hoc').map((g) => (
                      <TableRow key={g.grade}>
                        <TableCell className='font-medium'>{g.grade}</TableCell>
                        <TableCell className='text-right'>{g.totalStudents.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'>{g.bhytCount.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'>{g.voluntaryCount.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'><Badge variant='secondary'>{g.voluntaryRate}%</Badge></TableCell>
                      </TableRow>
                    ))}
                    {getGradeBreakdown('tieu_hoc').length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                Không có dữ liệu khối Tiểu học
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="thcs">
              <div className="overflow-x-auto">
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
                    {getGradeBreakdown('thcs').map((g) => (
                      <TableRow key={g.grade}>
                        <TableCell className='font-medium'>{g.grade}</TableCell>
                        <TableCell className='text-right'>{g.totalStudents.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'>{g.bhytCount.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'>{g.voluntaryCount.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'><Badge variant='secondary'>{g.voluntaryRate}%</Badge></TableCell>
                      </TableRow>
                    ))}
                    {getGradeBreakdown('thcs').length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                Không có dữ liệu khối THCS
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="thpt">
              <div className="overflow-x-auto">
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
                    {getGradeBreakdown('thpt').map((g) => (
                      <TableRow key={g.grade}>
                        <TableCell className='font-medium'>{g.grade}</TableCell>
                        <TableCell className='text-right'>{g.totalStudents.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'>{g.bhytCount.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'>{g.voluntaryCount.toLocaleString('vi-VN')}</TableCell>
                        <TableCell className='text-right'><Badge variant='secondary'>{g.voluntaryRate}%</Badge></TableCell>
                      </TableRow>
                    ))}
                    {getGradeBreakdown('thpt').length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                Không có dữ liệu khối THPT
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* ... Rest of component ... */}

      {!hideStudentDetails && (
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
      )}

      {/* Student Support Services */}
      <StudentServicesSection />

    </div>
  )
}
