import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { KPICard } from '@/components/dashboard/kpi-card'
import { 
    Search, 
    Phone, 
    MapPin, 
    Users, 
    Building, 
    Filter,
    ChevronLeft,
    ChevronRight,
    School
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { allSchools, getProvinceList, getDistrictList } from '@/data/vn-schools-loader'

import { useLayout } from '@/context/layout-provider'

export function Schools() {
  const { role } = useLayout()
  const isAgency = role === 'agency_admin'
  const defaultProvince = isAgency ? 'Thành phố Hồ Chí Minh' : 'Thành phố Hồ Chí Minh'

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvince, setSelectedProvince] = useState<string>(defaultProvince)
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All')

  const provinces = useMemo(() => getProvinceList(), [])
  const districts = useMemo(() => {
    const province = isAgency ? 'Thành phố Hồ Chí Minh' : selectedProvince
    if (!province) return []
    return getDistrictList(province)
  }, [selectedProvince, isAgency])

  const filteredSchools = useMemo(() => {
    let list = allSchools
    
    // Role-based scoping: Agency only sees their province
    if (isAgency) {
      list = list.filter(s => s.province === 'Thành phố Hồ Chí Minh')
    }

    // Filter by search term
    if (searchTerm) {
        list = list.filter(s => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.district.toLowerCase().includes(searchTerm.toLowerCase())
        )
    } else {
        // Only apply location filters if not searching globally or if search is local
        const province = isAgency ? 'Thành phố Hồ Chí Minh' : selectedProvince
        if (province && province !== 'All') {
            list = list.filter(s => s.province === province)
            if (selectedDistrict && selectedDistrict !== 'All') {
                list = list.filter(s => s.district === selectedDistrict)
            }
        }
    }
    
    return list.slice(0, 500) // Limit to 500 for performance
  }, [selectedProvince, selectedDistrict, searchTerm, isAgency])

  const formatNumber = (n: number) => new Intl.NumberFormat('vi-VN').format(n)

  const stats = useMemo(() => {
      const schools = filteredSchools
      const totalStudents = schools.reduce((sum, s) => sum + s.totalStudents, 0)
      const avgRate = schools.length > 0 
        ? (schools.reduce((sum, s) => sum + s.participationRate, 0) / schools.length).toFixed(1)
        : 0
      return { totalSchools: schools.length, totalStudents, avgRate }
  }, [filteredSchools])

  return (
    <>
      <Header fixed title='Danh sách Trường học' description='Bản đồ mạng lưới giáo dục toàn quốc (Dữ liệu thật)' />
      
      <Main>
        <div className='flex flex-col space-y-6'>
          {/* Controls Panel */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm'>
            <div className='flex flex-wrap items-center gap-3 w-full lg:w-auto'>
                <div className='relative flex-1 min-w-[300px]'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input 
                        placeholder="Tìm tên trường, mã đơn vị..." 
                        className='pl-9'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className='flex items-center gap-2'>
                    <Filter className='h-4 w-4 text-muted-foreground hidden sm:block' />
                    <Select value={isAgency ? 'Thành phố Hồ Chí Minh' : selectedProvince} onValueChange={(v) => { setSelectedProvince(v); setSelectedDistrict('All'); }} disabled={isAgency}>
                        <SelectTrigger className='w-[200px]'>
                            <SelectValue placeholder="Chọn Tỉnh/TP" />
                        </SelectTrigger>
                        <SelectContent className='max-h-[300px]'>
                            <SelectItem value="All">Toàn quốc</SelectItem>
                            {provinces.map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={selectedProvince === 'All'}>
                        <SelectTrigger className='w-[200px]'>
                            <SelectValue placeholder="Quận/Huyện" />
                        </SelectTrigger>
                        <SelectContent className='max-h-[300px]'>
                            <SelectItem value="All">Tất cả Quận/Huyện</SelectItem>
                            {districts.map(d => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button className='shrink-0 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20' variant='outline'>
                <Building className='h-4 w-4 mr-2' />
                Thêm trường mới
            </Button>
          </div>

          {/* KPI Cards */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <KPICard
              variant="compact"
              color="primary"
              title='Tổng số đơn vị'
              value={stats.totalSchools}
              icon={<School className='h-4 w-4' />}
            />
            <KPICard
              variant="compact"
              color="info"
              title='Tổng học sinh'
              value={formatNumber(stats.totalStudents)}
              icon={<Users className='h-4 w-4' />}
            />
            <KPICard
              variant="compact"
              color="success"
              title='Tỷ lệ BHYT TB'
              value={`${stats.avgRate}%`}
              icon={<Building className='h-4 w-4' />}
            />
          </div>

          {/* School List Table */}
          <Card className='border-none shadow-sm'>
            <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='text-lg flex items-center gap-2'>
                            {selectedProvince === 'All' ? 'Danh sách Toàn quốc' : selectedProvince}
                            {selectedDistrict !== 'All' && <span className='text-muted-foreground font-normal'> - {selectedDistrict}</span>}
                        </CardTitle>
                        <CardDescription>Hiển thị tối đa {filteredSchools.length} đơn vị phù hợp</CardDescription>
                    </div>
                    <div className='flex gap-2'>
                         <Button variant='outline' size='icon' className='h-8 w-8'><ChevronLeft className='h-4 w-4' /></Button>
                         <Button variant='outline' size='icon' className='h-8 w-8'><ChevronRight className='h-4 w-4' /></Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='p-0'>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className='bg-muted/50'>
                            <TableRow>
                                <TableHead className='w-[80px]'>Mã đơn vị</TableHead>
                                <TableHead className='min-w-[250px]'>Tên trường học</TableHead>
                                <TableHead>Hiệu trưởng</TableHead>
                                <TableHead className='text-right'>Học sinh</TableHead>
                                <TableHead className='text-center'>Tham gia BHYT</TableHead>
                                <TableHead className='text-right'>Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSchools.length > 0 ? (
                                filteredSchools.map((school) => (
                                    <TableRow key={school.id} className='group hover:bg-muted/30 transition-colors'>
                                        <TableCell className='font-mono text-xs text-muted-foreground'>{school.id}</TableCell>
                                        <TableCell>
                                            <div className='flex flex-col'>
                                                <span className='font-semibold group-hover:text-primary transition-colors'>{school.name}</span>
                                                <div className='flex items-center gap-2 mt-0.5'>
                                                    {school.isNational && <Badge className='h-4 text-[9px] px-1 py-0 uppercase' variant='secondary'>Sở quản lý</Badge>}
                                                    <span className='text-[10px] text-muted-foreground flex items-center'>
                                                        <MapPin className='h-2.5 w-2.5 mr-0.5' />
                                                        {school.district}, {school.province}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex flex-col'>
                                                <span className='text-sm'>{school.principalName}</span>
                                                <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                                                    <Phone className='h-3 w-3' />
                                                    <span className='font-mono'>{school.principalPhone}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <div className='flex flex-col items-end'>
                                                <span className='font-bold'>{formatNumber(school.totalStudents)}</span>
                                                <span className='text-[10px] text-muted-foreground'>Học sinh</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <div className='flex flex-col items-center gap-1'>
                                                <Badge 
                                                    className={cn(
                                                        'font-bold',
                                                        school.participationRate >= 95 ? 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200' :
                                                        school.participationRate >= 90 ? 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200' :
                                                        'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200'
                                                    )} 
                                                    variant='outline'
                                                >
                                                    {school.participationRate}%
                                                </Badge>
                                                <div className='w-16 h-1 bg-muted rounded-full overflow-hidden'>
                                                    <div 
                                                        className={cn(
                                                            'h-full transition-all',
                                                            school.participationRate >= 95 ? 'bg-green-500' :
                                                            school.participationRate >= 90 ? 'bg-blue-500' : 'bg-orange-500'
                                                        )}
                                                        style={{ width: `${school.participationRate}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <Button variant='ghost' size='sm' className='h-8 px-2 hover:bg-primary/10 hover:text-primary'>
                                                Chi tiết
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className='h-64 text-center'>
                                        <div className='flex flex-col items-center justify-center text-muted-foreground'>
                                            <Search className='h-8 w-8 mb-2 opacity-20' />
                                            <p>Không tìm thấy trường học nào phù hợp</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}

