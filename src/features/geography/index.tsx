import { KPICard } from '@/components/dashboard/kpi-card'
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
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { allProvinces } from '@/data/vn-admin-loader'
import { Building, GraduationCap, MapPin, Search as SearchIcon, Users, ChevronRight, X } from 'lucide-react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

export function Geography() {
  const [search, setSearch] = useState('')
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null)
  
  const filteredProvinces = useMemo(() => {
    return allProvinces.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.codeBNV.includes(search) ||
      p.codeTMS.includes(search)
    )
  }, [search])

  const selectedProvince = useMemo(() => {
    return allProvinces.find(p => p.codeBNV === selectedProvinceCode) || null
  }, [selectedProvinceCode])

  const totalSchools = useMemo(() => allProvinces.reduce((sum, p) => sum + p.totalSchools, 0), [])
  const totalStudents = useMemo(() => allProvinces.reduce((sum, p) => sum + p.totalStudents, 0), [])
  const avgRate = useMemo(() => {
     const sum = allProvinces.reduce((s, p) => s + p.avgParticipationRate, 0)
     return (sum / allProvinces.length).toFixed(1)
  }, [])

  const formatNumber = (n: number) => new Intl.NumberFormat('vi-VN').format(n)

  return (
    <>
      <Header fixed title='Quản lý Địa bàn' description='Dữ liệu đơn vị hành chính và thống kê giáo dục toàn quốc (Dữ liệu thật)' />

      <Main>
        {/* KPI Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6'>
          <KPICard
            variant="compact"
            color="primary"
            title='Tổng Tỉnh/Thành phố'
            value={allProvinces.length}
            icon={<MapPin className='h-4 w-4' />}
          />
          <KPICard
            variant="compact"
            color="info"
            title='Tổng trường học'
            value={formatNumber(totalSchools)}
            icon={<GraduationCap className='h-4 w-4' />}
          />
          <KPICard
            variant="compact"
            color="warning"
            title='Tổng học sinh'
            value={formatNumber(totalStudents)}
            icon={<Users className='h-4 w-4' />}
          />
          <KPICard
            variant="compact"
            color="success"
            title='Tỷ lệ tham gia BHYT'
            value={`${avgRate}%`}
            subtitle="Trung bình toàn quốc"
            icon={<Building className='h-4 w-4' />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Master Table: Provinces */}
            <div className={cn("transition-all duration-300", selectedProvinceCode ? "lg:col-span-5" : "lg:col-span-12")}>
                <Card className="h-full border-none shadow-sm overflow-hidden">
                    <CardHeader className="bg-card pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-lg">Danh sách Tỉnh/Thành phố</CardTitle>
                                <CardDescription className="text-xs">Chọn tỉnh để xem chi tiết xã phường</CardDescription>
                            </div>
                            <div className='relative w-full sm:max-w-[250px]'>
                                <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    placeholder='Tìm kiếm Tỉnh, Mã BNV...'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='pl-9 h-9'
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="max-h-[600px] overflow-auto">
                            <Table>
                                <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                                    <TableRow>
                                        <TableHead className="w-[80px]">Mã BNV</TableHead>
                                        <TableHead>Tên Tỉnh/TP</TableHead>
                                        {!selectedProvinceCode && (
                                            <>
                                                <TableHead className='text-right'>Số trường</TableHead>
                                                <TableHead className='text-right'>Học sinh</TableHead>
                                                <TableHead className='text-right'>Tỷ lệ BHYT</TableHead>
                                            </>
                                        )}
                                        <TableHead className="w-[40px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProvinces.map((p) => (
                                        <TableRow 
                                            key={p.codeBNV} 
                                            className={cn(
                                                "cursor-pointer hover:bg-muted/50 transition-all",
                                                selectedProvinceCode === p.codeBNV && "bg-primary/5 font-semibold text-primary"
                                            )}
                                            onClick={() => setSelectedProvinceCode(p.codeBNV)}
                                        >
                                            <TableCell className='font-mono text-xs'>{p.codeBNV}</TableCell>
                                            <TableCell>{p.name}</TableCell>
                                            {!selectedProvinceCode && (
                                                <>
                                                    <TableCell className='text-right'>{formatNumber(p.totalSchools)}</TableCell>
                                                    <TableCell className='text-right'>{formatNumber(p.totalStudents)}</TableCell>
                                                    <TableCell className='text-right'>
                                                        <Badge variant='outline' className={cn(
                                                            "font-bold",
                                                            p.avgParticipationRate >= 95 ? "bg-green-50 text-green-700 border-green-200" :
                                                            p.avgParticipationRate >= 90 ? "bg-blue-50 text-blue-700 border-blue-200" : 
                                                            "bg-orange-50 text-orange-700 border-orange-200"
                                                        )}>
                                                            {p.avgParticipationRate}%
                                                        </Badge>
                                                    </TableCell>
                                                </>
                                            )}
                                            <TableCell>
                                                <ChevronRight className={cn("h-4 w-4 transition-transform", selectedProvinceCode === p.codeBNV ? "rotate-180" : "text-muted-foreground")} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detail Table: Wards */}
            {selectedProvince && (
                <div className="lg:col-span-7 transition-all duration-300 animate-in fade-in slide-in-from-right-4 text-xs sm:text-sm">
                    <Card className="h-full border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg text-primary flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        {selectedProvince.name}
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Chi tiết {selectedProvince.wards.length} Phường/Xã/Thị trấn
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedProvinceCode(null)} className="h-8 w-8 rounded-full">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[600px] overflow-auto">
                                <Table>
                                    <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                                        <TableRow>
                                            <TableHead className="w-[100px]">Mã PX</TableHead>
                                            <TableHead>Tên Phường/Xã</TableHead>
                                            <TableHead className='text-right'>Trường</TableHead>
                                            <TableHead className='text-right'>Học sinh</TableHead>
                                            <TableHead className='text-right'>Tỷ lệ BHYT</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedProvince.wards.map((w) => (
                                            <TableRow key={w.code}>
                                                <TableCell className='font-mono text-[10px]'>{w.code}</TableCell>
                                                <TableCell className='font-medium'>{w.name}</TableCell>
                                                <TableCell className='text-right'>{w.schoolCount}</TableCell>
                                                <TableCell className='text-right'>{formatNumber(w.studentCount)}</TableCell>
                                                <TableCell className='text-right'>
                                                    <span className={cn(
                                                        "font-bold",
                                                        w.participationRate >= 95 ? "text-green-600" :
                                                        w.participationRate >= 90 ? "text-blue-600" : 
                                                        "text-orange-600"
                                                    )}>
                                                        {w.participationRate}%
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
      </Main>
    </>
  )
}
