import { useState, useMemo } from 'react'
import { AgencyReports } from './agency-reports'
import { SchoolReports } from './school-reports'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Filter, Building } from 'lucide-react'
import { allSchools } from '@/data/vn-schools-loader'
import { provinces as provinceData } from '@/data/provinces'

export function SSCSoGDReports() {
    // Filter provinces managed by SSC
    const sscProvinces = useMemo(() => {
        return provinceData.filter(p => p.sscPartnerId === 'SSC').map(p => p.name)
    }, [])

    const [selectedProvince, setSelectedProvince] = useState<string>('Thành phố Hồ Chí Minh')

    return (
        <>
            <div className='flex items-center gap-4 bg-primary/5 p-5 rounded-2xl border border-primary/10 shadow-sm backdrop-blur-sm'>
                <div className='p-2 bg-primary/10 rounded-xl'>
                    <Filter className='h-5 w-5 text-primary' />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Chọn khu vực (SSC quản lý)</span>
                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                        <SelectTrigger className='w-[280px] bg-background border-primary/20 hover:border-primary focus:ring-primary/20 rounded-lg h-11'>
                            <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                        </SelectTrigger>
                        <SelectContent className='max-h-[300px]'>
                            {sscProvinces.map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            {selectedProvince ? (
                <AgencyReports provinceName={selectedProvince} />
            ) : (
                <Card className='border-dashed'>
                    <CardContent className='pt-12 pb-12 text-center text-muted-foreground'>
                        Vui lòng chọn Tỉnh/Thành phố thuộc quyền quản lý để xem báo cáo
                    </CardContent>
                </Card>
            )}
        </>
    )
}

export function SSCSchoolReports() {
     // Filter provinces managed by SSC
     const sscProvinces = useMemo(() => {
        return provinceData.filter(p => p.sscPartnerId === 'SSC').map(p => p.name)
    }, [])

    const [selectedSchoolProvince, setSelectedSchoolProvince] = useState<string>('Thành phố Hồ Chí Minh')
    
    const [selectedSchoolId, setSelectedSchoolId] = useState<string>(() => {
        const schools = allSchools.filter(s => s.province === 'Thành phố Hồ Chí Minh')
        return schools.length > 0 ? schools[0].id : ''
    })

    const schoolsInProvince = useMemo(() => {
        if (!selectedSchoolProvince) return []
        return allSchools.filter(s => s.province === selectedSchoolProvince)
    }, [selectedSchoolProvince])

    return (
        <>
            <div className='flex flex-wrap items-center gap-6 bg-primary/5 p-5 rounded-2xl border border-primary/10 shadow-sm backdrop-blur-sm'>
                <div className='flex items-center gap-4'>
                    <div className='p-2 bg-primary/10 rounded-xl'>
                        <Filter className='h-5 w-5 text-primary' />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Tỉnh/Thành phố</span>
                        <Select value={selectedSchoolProvince} onValueChange={(v) => { setSelectedSchoolProvince(v); setSelectedSchoolId(''); }}>
                            <SelectTrigger className='w-[220px] bg-background border-primary/20 hover:border-primary focus:ring-primary/20 rounded-lg h-11'>
                                <SelectValue placeholder="Chọn địa bàn" />
                            </SelectTrigger>
                            <SelectContent className='max-h-[300px]'>
                                {sscProvinces.map(p => (
                                    <SelectItem key={p} value={p}>{p}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='h-10 w-px bg-primary/10 hidden md:block' />

                <div className='flex items-center gap-4'>
                    <div className='p-2 bg-primary/10 rounded-xl'>
                        <Building className='h-5 w-5 text-primary' />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Đơn vị trường học</span>
                        <Select 
                          value={selectedSchoolId} 
                          onValueChange={setSelectedSchoolId}
                          disabled={!selectedSchoolProvince}
                        >
                            <SelectTrigger className='w-[320px] bg-background border-primary/20 hover:border-primary focus:ring-primary/20 rounded-lg h-11 disabled:opacity-50'>
                                <SelectValue placeholder={selectedSchoolProvince ? "Tìm kiếm & chọn trường" : "Chọn tỉnh trước"} />
                            </SelectTrigger>
                            <SelectContent className='max-h-[300px]'>
                                {schoolsInProvince.slice(0, 200).map(s => (
                                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.id})</SelectItem>
                                ))}
                                {schoolsInProvince.length > 200 && (
                                    <div className='p-2 text-xs text-center text-muted-foreground'>...và {schoolsInProvince.length - 200} trường khác</div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {selectedSchoolId ? (
                <SchoolReports schoolId={selectedSchoolId} />
            ) : (
                <Card className='border-dashed'>
                    <CardContent className='pt-12 pb-12 text-center text-muted-foreground'>
                        Vui lòng chọn Tỉnh và Trường học cụ thể để xem báo cáo chi tiết
                    </CardContent>
                </Card>
            )}
        </>
    )
}
