import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { SCHOOL_LEVELS, SchoolLevel } from '@/data/classes'

// ...

import { generateClasses } from '@/data/mock-dashboard-data'
import { useMemo } from 'react'

import { type SchoolBase } from '@/data/vn-schools-loader'

interface SchoolDashboardProps {
  school: SchoolBase
}

export function SchoolDashboard({ school }: SchoolDashboardProps) {
  // Generate mock class data based on the specific school's level
  const classes = useMemo(() => {
    // Determine levels to generate based on school level
    const levelsToGenerate: ('Tiểu học' | 'THCS' | 'THPT')[] = []
    
    if (school.level === 'Tiểu học') levelsToGenerate.push('Tiểu học')
    else if (school.level === 'THCS') levelsToGenerate.push('THCS')
    else if (school.level === 'THPT') levelsToGenerate.push('THPT')
    else {
         // Fallback or multi-level logic if needed
         levelsToGenerate.push('Tiểu học', 'THCS', 'THPT') 
    }

    return levelsToGenerate.flatMap(level => 
      generateClasses(school.id, level)
    )
  }, [school])
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

  return (
    <div className='space-y-6'>
      {/* ... Alert and KPI Cards ... */}

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết theo Khối (Sĩ số khai báo)</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={school.level === 'Tiểu học' ? 'tieu_hoc' : school.level === 'THCS' ? 'thcs' : 'thpt'} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="tieu_hoc" disabled={school.level !== 'Tiểu học'}>Tiểu học</TabsTrigger>
              <TabsTrigger value="thcs" disabled={school.level !== 'THCS'}>THCS</TabsTrigger>
              <TabsTrigger value="thpt" disabled={school.level !== 'THPT'}>THPT</TabsTrigger>
            </TabsList>
            
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
