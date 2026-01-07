import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Users, ShieldCheck, FileText, FileSpreadsheet, MessageCircle } from 'lucide-react'
import { classes } from '@/data/classes'
import { generateAllStudents, Student } from '@/data/mock-students'
import { allSchools } from '@/data/vn-schools-loader'

interface SchoolReportsProps {
  schoolId?: string
}

export function SchoolReports({ schoolId }: SchoolReportsProps) {
  const [year, setYear] = useState('2024-2025')
  const [semester, setSemester] = useState('all')

  const school = useMemo(() => {
    if (!schoolId) return { name: 'THCS Lê Văn Tám' }
    return allSchools.find(s => s.id === schoolId) || { name: 'Trường học' }
  }, [schoolId])

  // Mock calculation logic setup
  const isCurrentYear = year === '2024-2025'
  const modifier = isCurrentYear ? 1 : 0.9

  // Calculate KPIs
  const totalDeclaredSize = Math.floor(classes.reduce((sum, c) => sum + c.declaredSize, 0) * modifier)
  const totalBHYT = Math.floor(classes.reduce((sum, c) => sum + c.bhytCount, 0) * modifier)
  const totalVoluntary = Math.floor(classes.reduce((sum, c) => sum + c.orderCount, 0) * modifier)
  
  const bhytRate = totalDeclaredSize ? ((totalBHYT / totalDeclaredSize) * 100).toFixed(1) : '0.0'
  const voluntaryRate = totalDeclaredSize ? ((totalVoluntary / totalDeclaredSize) * 100).toFixed(1) : '0.0'

  // Generate students data
  const allStudents = useMemo(() => {
    const studentMap = generateAllStudents(classes)
    return Array.from(studentMap.values()).flat()
  }, [])

  // Filter students (limit for demo)
  const studentsNoBHYT = useMemo(() => 
    allStudents.filter(s => s.bhytStatus === 'Không').slice(0, 50), 
  [allStudents])
  
  const studentsNoVoluntary = useMemo(() => 
    allStudents.filter(s => s.insuranceStatus === 'Chưa tham gia').slice(0, 50),
  [allStudents])

  const openZalo = (phone: string) => {
    window.open(`https://zalo.me/${phone}`, '_blank')
  }

  return (
    <div className='space-y-6 h-[calc(100vh-100px)] flex flex-col'>
      {/* Title with School Name */}
      <div className='flex-shrink-0'>
        <h2 className='text-2xl font-bold tracking-tight'>Báo cáo chi tiết: {school.name}</h2>
        <p className='text-muted-foreground'>Dữ liệu chi tiết về tình hình tham gia bảo hiểm tại đơn vị</p>
      </div>

      {/* Filters & Actions */}
      <div className='flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-card p-4 rounded-lg border flex-shrink-0'>
        <div className='flex flex-wrap gap-4 items-center'>
            <span className='text-sm font-medium'>Bộ lọc:</span>
            <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Năm học" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2024-2025">Năm học 2024-2025</SelectItem>
                <SelectItem value="2023-2024">Năm học 2023-2024</SelectItem>
                <SelectItem value="2022-2023">Năm học 2022-2023</SelectItem>
            </SelectContent>
            </Select>

            <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Học kỳ" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Cả năm</SelectItem>
                <SelectItem value="hk1">Học kỳ 1</SelectItem>
                <SelectItem value="hk2">Học kỳ 2</SelectItem>
            </SelectContent>
            </Select>
        </div>
        
        <Button variant='outline' className='ml-auto'>
            <FileSpreadsheet className='h-4 w-4 mr-2' />
            Xuất báo cáo
        </Button>
      </div>

      {/* KPIs */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 flex-shrink-0'>
        <KPICard 
            variant="compact"
            color="primary"
            title={`Tổng sĩ số (${year})`} 
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

      {/* Split Layout: Class Details (Left) vs Need Action (Right) */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 flex-1 min-h-0'>
          
          {/* Left: Class Details Table */}
          <Card className='flex flex-col h-full overflow-hidden'>
            <CardHeader className='pb-2 flex-shrink-0'>
              <CardTitle>Thống kê theo Lớp</CardTitle>
            </CardHeader>
            <CardContent className='flex-1 overflow-auto p-0 border-t'>
                <Table>
                  <TableHeader className="sticky top-0 bg-secondary/90 z-10 shadow-sm">
                    <TableRow>
                      <TableHead className="w-[80px]">Lớp</TableHead>
                      {/* Hidden on small screens if needed, but keeping for now */}
                      <TableHead className="min-w-[120px]">GVCN</TableHead>
                      <TableHead className='text-right w-[80px]'>Sĩ số</TableHead>
                      <TableHead className='text-center w-[100px]'>BHYT</TableHead>
                      <TableHead className='text-center w-[100px]'>BH TN</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((cls) => {
                      const size = Math.floor(cls.declaredSize * modifier)
                      const bhyt = Math.floor(cls.bhytCount * modifier)
                      const voluntary = Math.floor(cls.orderCount * modifier)
                      const bhytRate = size ? ((bhyt / size) * 100).toFixed(1) : '0.0'
                      const volRate = size ? ((voluntary / size) * 100).toFixed(1) : '0.0'

                      return (
                        <TableRow key={cls.id}>
                          <TableCell className='font-medium'>{cls.name}</TableCell>
                          <TableCell className='text-xs text-muted-foreground truncate max-w-[120px]' title={cls.homeroomTeacher}>{cls.homeroomTeacher}</TableCell>
                          <TableCell className='text-right'>{size}</TableCell>
                          <TableCell className='text-center'>
                            <div className="flex flex-col items-center">
                              <span className="font-medium text-green-600">{bhyt}</span>
                              <span className="text-[10px] text-muted-foreground">{bhytRate}%</span>
                            </div>
                          </TableCell>
                          <TableCell className='text-center'>
                            <div className="flex flex-col items-center">
                              <span className="font-medium text-blue-600">{voluntary}</span>
                              <span className="text-[10px] text-muted-foreground">{volRate}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
            </CardContent>
          </Card>

          {/* Right: Students Need Action */}
          <Card className='flex flex-col h-full overflow-hidden'>
            <CardHeader className='pb-2 flex-shrink-0'>
              <CardTitle>Học sinh cần vận động</CardTitle>
            </CardHeader>
            <CardContent className='flex-1 overflow-hidden p-0 px-4 pb-4 flex flex-col'>
              <Tabs defaultValue="bhyt" className="flex-1 flex flex-col h-full">
                <TabsList className="w-full justify-start mb-2 flex-shrink-0">
                  <TabsTrigger value="bhyt" className="flex-1 sm:flex-none">
                    Chưa BHYT <Badge variant="secondary" className="ml-2">{studentsNoBHYT.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="voluntary" className="flex-1 sm:flex-none">
                    Chưa BH TN <Badge variant="secondary" className="ml-2">{studentsNoVoluntary.length}</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bhyt" className="flex-1 overflow-auto mt-0 border rounded-md">
                   <StudentTableSticky students={studentsNoBHYT} onZalo={openZalo} type="BHYT" />
                </TabsContent>
                
                <TabsContent value="voluntary" className="flex-1 overflow-auto mt-0 border rounded-md">
                   <StudentTableSticky students={studentsNoVoluntary} onZalo={openZalo} type="Voluntary" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}

function StudentTableSticky({ students, onZalo, type }: { students: Student[], onZalo: (phone: string) => void, type: string }) {
    return (
          <Table>
            <TableHeader className="sticky top-0 bg-secondary/90 z-10 shadow-sm">
              <TableRow>
                <TableHead className='w-10 text-center text-xs'>#</TableHead>
                <TableHead className="min-w-[120px]">Học sinh</TableHead>
                <TableHead className="w-[60px]">Lớp</TableHead>
                <TableHead className="min-w-[100px]">Phụ huynh</TableHead>
                <TableHead className="w-[120px]">Liên hệ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                   <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                       Không có dữ liệu
                   </TableCell>
                </TableRow>
              ) : (
                students.map((s, idx) => (
                    <TableRow key={s.id}>
                    <TableCell className='text-center text-xs text-muted-foreground'>{idx + 1}</TableCell>
                    <TableCell>
                        <div className="font-medium text-sm">{s.fullName}</div>
                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 mt-1 border-destructive text-destructive">
                            {type === 'BHYT' ? 'Chưa BHYT' : 'Chưa BH TN'}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{s.className}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.parentName}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono">{s.parentPhone}</span>
                            <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-6 w-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50" 
                                onClick={() => onZalo(s.parentPhone)}
                                title="Nhắn Zalo"
                            >
                                <MessageCircle className="h-3 w-3" />
                            </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))
              )}
            </TableBody>
          </Table>
    )
}
