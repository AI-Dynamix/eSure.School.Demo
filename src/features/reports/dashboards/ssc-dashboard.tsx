import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { KPICard } from '@/components/dashboard/kpi-card'
import { mockWards } from '@/data/mock-sogd'
import { School, Users, ShieldCheck, TrendingUp, TrendingDown, Map } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SSCDashboard() {
  // Aggregate data
  const totalWards = mockWards.length
  const totalSchools = useMemo(() => mockWards.reduce((acc, w) => acc + w.totalSchools, 0), [])
  const totalStudents = useMemo(() => mockWards.reduce((acc, w) => acc + w.totalStudents, 0), [])
  const totalBHYT = useMemo(() => mockWards.reduce((acc, w) => acc + w.schools.reduce((s, sch) => s + sch.bhytCount, 0), 0), [])
  const avgRate = totalStudents ? ((totalBHYT / totalStudents) * 100).toFixed(1) : '0.0'

  // Flatten schools for ranking
  const allSchools = useMemo(() => {
    return mockWards.flatMap(w => w.schools.map(s => ({ ...s, wardName: w.name })))
  }, [])

  const topSchools = useMemo(() => [...allSchools].sort((a, b) => b.bhytRate - a.bhytRate).slice(0, 5), [allSchools])
  const bottomSchools = useMemo(() => [...allSchools].sort((a, b) => a.bhytRate - b.bhytRate).slice(0, 5), [allSchools])

  return (
    <div className='space-y-6'>
      {/* Quick Dashboard - Stats */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
         <KPICard 
             variant="compact"
             color="primary"
             title="Tổng số Phường/Xã"
             value={totalWards}
             icon={<Map className="h-4 w-4" />}
         />
         <KPICard 
             variant="compact"
             color="primary"
             title="Tổng số Trường"
             value={totalSchools}
             icon={<School className="h-4 w-4" />}
         />
         <KPICard 
             variant="compact"
             color="info"
             title="Tổng số Học sinh"
             value={totalStudents.toLocaleString('vi-VN')}
             icon={<Users className="h-4 w-4" />}
         />
         <KPICard 
             variant="compact"
             color="success"
             title="Tỷ lệ BHYT Trung bình"
             value={`${avgRate}%`}
             subtitle="SSC Dashboard"
             icon={<ShieldCheck className="h-4 w-4" />}
         />
      </div>

      {/* Rankings Tabs */}
      <Card>
        <CardHeader>
            <CardTitle>Bảng xếp hạng tham gia Bảo hiểm (SSC)</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue='top' className='space-y-4'>
                <TabsList>
                    <TabsTrigger value='top' className='flex items-center gap-2'>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Top 5 Trường dẫn đầu
                    </TabsTrigger>
                    <TabsTrigger value='bottom' className='flex items-center gap-2'>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        Top 5 Trường cần vận động
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='top'>
                    <RankingTable schools={topSchools} type='top' />
                </TabsContent>

                <TabsContent value='bottom'>
                    <RankingTable schools={bottomSchools} type='bottom' />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function RankingTable({ schools, type }: { schools: any[], type: 'top' | 'bottom' }) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[60px]'>Hạng</TableHead>
                        <TableHead>Trường học</TableHead>
                        <TableHead>Phường/Xã</TableHead>
                        <TableHead className='text-right'>Sĩ số</TableHead>
                        <TableHead className='text-center'>Tỷ lệ BHYT</TableHead>
                        <TableHead className='text-center'>Xu hướng</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schools.map((school, index) => (
                        <TableRow key={school.id}>
                            <TableCell className='font-bold text-center'>
                                <Badge variant={index === 0 ? 'default' : 'outline'} className={cn(
                                    index === 0 && type === 'top' && "bg-yellow-500 hover:bg-yellow-600",
                                    index === 0 && type === 'bottom' && "bg-red-500 hover:bg-red-600"
                                )}>
                                    #{index + 1}
                                </Badge>
                            </TableCell>
                            <TableCell className='font-medium'>{school.name}</TableCell>
                            <TableCell>{school.wardName}</TableCell>
                            <TableCell className='text-right'>{school.totalStudents.toLocaleString('vi-VN')}</TableCell>
                            <TableCell className='text-center'>
                                <span className={cn(
                                    "font-bold",
                                    school.bhytRate >= 95 ? "text-green-600" : "text-orange-600"
                                )}>
                                    {school.bhytRate}%
                                </span>
                            </TableCell>
                            <TableCell className='text-center'>
                                {type === 'top' ? (
                                    <TrendingUp className='h-4 w-4 text-green-500 mx-auto' />
                                ) : (
                                    <TrendingDown className='h-4 w-4 text-red-500 mx-auto' />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
