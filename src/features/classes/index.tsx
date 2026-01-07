import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { getClassById, getClassTree, classes } from '@/data/classes'
import { generateStudentsForClass } from '@/data/mock-students'
import { ChevronDown, ChevronRight, GraduationCap, School, Users, ShieldCheck, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { KPICard } from '@/components/dashboard/kpi-card'

export function Classes() {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  const [expandedLevels, setExpandedLevels] = useState<string[]>(['thcs'])
  const [expandedGrades, setExpandedGrades] = useState<string[]>(['6'])
  
  const classTree = getClassTree()
  const selectedClass = selectedClassId ? getClassById(selectedClassId) : null
  
  // Calculate School Overview Stats
  const overviewStats = useMemo(() => {
    const totalClasses = classes.length
    const totalStudents = classes.reduce((acc, c) => acc + c.declaredSize, 0)
    const totalBHYT = classes.reduce((acc, c) => acc + c.bhytCount, 0)
    return { totalClasses, totalStudents, totalBHYT }
  }, [])

  // Generate students for selected class (memoized)
  const students = useMemo(() => {
    if (!selectedClass) return []
    return generateStudentsForClass(
      selectedClass.id,
      selectedClass.name,
      parseInt(selectedClass.grade),
      selectedClass.declaredSize
    )
  }, [selectedClass])

  const toggleLevel = (levelId: string) => {
    setExpandedLevels(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    )
  }

  const toggleGrade = (grade: string) => {
    setExpandedGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    )
  }

  return (
    <>
      <Header 
        fixed 
        title='Quản lý Lớp học & Học sinh'
        description='Chọn lớp từ cây bên trái để xem danh sách học sinh'
      />

      <Main>

        <div className='grid grid-cols-4 gap-4 items-start'>
          {/* Left Panel: Class Tree (1/4) */}
          <Card className='col-span-1 sticky top-20'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base flex items-center gap-2'>
                <School className='h-4 w-4' />
                Cây Lớp học
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0 max-h-[calc(100vh-12rem)] overflow-y-auto'>
              <div className='space-y-1'>
                <Button
                   variant={!selectedClassId ? 'secondary' : 'ghost'}
                   className='w-full justify-start font-bold mb-2'
                   onClick={() => setSelectedClassId(null)}
                >
                    <School className='h-4 w-4 mr-2' />
                    Tổng quan Trường
                </Button>

                {classTree.map((level) => (
                  <Collapsible 
                    key={level.id} 
                    open={expandedLevels.includes(level.id)}
                    onOpenChange={() => toggleLevel(level.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant='ghost' 
                        className='w-full justify-start font-semibold'
                        size='sm'
                      >
                        {expandedLevels.includes(level.id) 
                          ? <ChevronDown className='h-4 w-4 mr-1' />
                          : <ChevronRight className='h-4 w-4 mr-1' />
                        }
                        <GraduationCap className='h-4 w-4 mr-2' />
                        {level.name}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='ml-4'>
                      {level.grades.map((gradeInfo) => (
                        <Collapsible
                          key={gradeInfo.grade}
                          open={expandedGrades.includes(gradeInfo.grade)}
                          onOpenChange={() => toggleGrade(gradeInfo.grade)}
                        >
                          <CollapsibleTrigger asChild>
                            <Button 
                              variant='ghost' 
                              className='w-full justify-start text-sm'
                              size='sm'
                            >
                              {expandedGrades.includes(gradeInfo.grade) 
                                ? <ChevronDown className='h-3 w-3 mr-1' />
                                : <ChevronRight className='h-3 w-3 mr-1' />
                              }
                              {gradeInfo.gradeName}
                              <Badge variant='secondary' className='ml-auto text-xs'>
                                {gradeInfo.classes.length}
                              </Badge>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className='ml-4'>
                            {gradeInfo.classes.map((cls) => (
                              <Button
                                key={cls.id}
                                variant={selectedClassId === cls.id ? 'secondary' : 'ghost'}
                                className='w-full justify-start text-sm h-8'
                                size='sm'
                                onClick={() => setSelectedClassId(cls.id)}
                              >
                                <Users className='h-3 w-3 mr-2' />
                                Lớp {cls.name}
                                <span className='ml-auto text-xs text-muted-foreground'>
                                  {cls.declaredSize}
                                </span>
                              </Button>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Panel: Content (3/4) */}
          <div className='col-span-3 space-y-4'>
            {selectedClass ? (
              <>
                {/* 1. Class Quick Stats */}
                <div className='grid grid-cols-3 gap-4'>
                    <KPICard 
                        variant="compact"
                        color="primary"
                        title="Tổng sĩ số" 
                        value={selectedClass.declaredSize}
                        subtitle="học sinh"
                        icon={<Users className="h-4 w-4" />}
                    />

                    <KPICard 
                        variant="compact"
                        color="success"
                        title="Đã có BHYT" 
                        value={selectedClass.bhytCount}
                        subtitle={`(${((selectedClass.bhytCount / selectedClass.declaredSize) * 100).toFixed(1)}%)`}
                        icon={<ShieldCheck className="h-4 w-4" />}
                    />

                    <KPICard 
                        variant="compact"
                        color="info"
                        title="BH Tự nguyện" 
                        value={selectedClass.orderCount}
                        subtitle={`(${((selectedClass.orderCount / selectedClass.declaredSize) * 100).toFixed(1)}%)`}
                        icon={<FileText className="h-4 w-4" />}
                    />
                </div>

                {/* 2. Student List */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div>
                        <CardTitle>Danh sách Học sinh Lớp {selectedClass.name}</CardTitle>
                        <CardDescription>
                          GVCN: <span className='font-medium text-foreground'>{selectedClass.homeroomTeacher}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='w-12'>STT</TableHead>
                          <TableHead>Họ và tên</TableHead>
                          <TableHead className='w-16'>GT</TableHead>
                          <TableHead className='w-24'>Ngày sinh</TableHead>
                          <TableHead className='w-20'>BHYT</TableHead>
                          <TableHead>BH Tự nguyện</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student, index) => (
                          <TableRow key={student.id}>
                            <TableCell className='text-center font-medium'>
                              {index + 1}
                            </TableCell>
                            <TableCell className='font-medium'>
                              {student.fullName}
                            </TableCell>
                            <TableCell>
                              <Badge variant={student.gender === 'Nam' ? 'outline' : 'secondary'}>
                                {student.gender}
                              </Badge>
                            </TableCell>
                            <TableCell className='text-muted-foreground'>
                              {student.dob}
                            </TableCell>
                            <TableCell>
                           <Badge variant={student.bhytStatus === 'Có' ? 'default' : 'destructive'}>
                                {student.bhytStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  student.insuranceStatus === 'Đã tham gia' 
                                    ? 'default' 
                                    : student.insuranceStatus === 'Chờ thanh toán'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {student.insuranceStatus}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            ) : (
                /* No Class Selected -> School Overview Dashboard */
                <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <KPICard 
                            variant="compact"
                            color="primary"
                            title="Tổng số Lớp học" 
                            value={overviewStats.totalClasses} 
                            icon={<School className='h-5 w-5' />}
                            className='bg-primary/5 border-primary/20'
                        />
                        <KPICard 
                            variant="compact"
                            color="info"
                            title="Tổng số Học sinh" 
                            value={overviewStats.totalStudents.toLocaleString('vi-VN')} 
                            icon={<Users className='h-5 w-5' />}
                        />
                         <KPICard 
                            variant="compact"
                            color="success"
                            title="Tổng BHYT Trường" 
                            value={overviewStats.totalBHYT.toLocaleString('vi-VN')} 
                            subtitle={`${((overviewStats.totalBHYT / overviewStats.totalStudents) * 100).toFixed(1)}%`}
                            icon={<ShieldCheck className='h-5 w-5' />}
                        />
                    </div>
                    
                    <Card className='min-h-[300px] flex items-center justify-center border-dashed'>
                        <div className='text-center space-y-2'>
                            <School className='h-12 w-12 mx-auto text-muted-foreground/50' />
                            <h3 className='text-lg font-medium'>Chọn lớp học</h3>
                            <p className='text-muted-foreground'>Vui lòng chọn một lớp từ danh sách bên trái để xem chi tiết học sinh.</p>
                        </div>
                    </Card>
                </div>
            )}
          </div>
        </div>
      </Main>
    </>
  )
}
