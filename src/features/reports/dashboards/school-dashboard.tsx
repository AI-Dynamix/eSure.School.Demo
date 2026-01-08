import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SCHOOL_LEVELS, SchoolLevel } from '@/data/classes'

// ...

export function SchoolDashboard() {
  // ... existing code ...

  // Group by Grade Helper
  const getGradeBreakdown = (levelId: SchoolLevel) => {
    const levelInfo = SCHOOL_LEVELS.find(l => l.id === levelId)
    if (!levelInfo) return []
    
    return levelInfo.grades.map(g => {
      const gradeClasses = classes.filter(c => c.grade === g && c.level === levelId)
      // Only include grades that have classes
      if (gradeClasses.length === 0) return null

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
          <Tabs defaultValue="tieu_hoc" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="tieu_hoc">Tiểu học</TabsTrigger>
              <TabsTrigger value="thcs">THCS</TabsTrigger>
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
