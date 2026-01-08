import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLayout } from '@/context/layout-provider'

// Dashboard Tabs
import { ESureDashboard } from './dashboards/esure-dashboard'
import { InsurerDashboard } from './dashboards/insurer-dashboard'
import { PartnerDashboard } from './dashboards/partner-dashboard'
import { AgencyReports } from './dashboards/agency-reports'
import { SchoolReports } from './dashboards/school-reports'
import { SSCDashboard } from './dashboards/ssc-dashboard'
import { SSCSoGDReports, SSCSchoolReports } from './dashboards/ssc-reports-helpers'

import { useState, useMemo } from 'react'
import { allSchools, getProvinceList } from '@/data/vn-schools-loader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Filter, Building } from 'lucide-react'

export function Reports() {
  const { role } = useLayout()
  
  // States for hierarchical selection
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  
  const [selectedSchoolProvince, setSelectedSchoolProvince] = useState<string>('')
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('')

  const provinces = useMemo(() => getProvinceList(), [])
  
  const schoolsInProvince = useMemo(() => {
    if (!selectedSchoolProvince) return []
    return allSchools.filter(s => s.province === selectedSchoolProvince)
  }, [selectedSchoolProvince])

  const getRoleTitle = () => {
    switch (role) {
      case 'school_admin': return 'Báo cáo Nhà trường'
      case 'agency_admin': return 'Báo cáo Sở GD&ĐT TP.HCM'
      case 'ssc_admin': return 'Báo cáo SSC'
      case 'esure_admin': return 'Hệ thống báo cáo (eSure)'
      default: return 'Báo cáo'
    }
  }

  // Role-based content rendering
  const renderContent = () => {
    switch (role) {
      case 'school_admin':
        return <SchoolReports />

      case 'agency_admin':
        return <AgencyReports />

      case 'ssc_admin':
        // SSC Admin sees eSure-like dashboard (filtered), SoGD, and School tabs. No Partner/Insurer tabs.
        return (
          <Tabs defaultValue='ssc' className='space-y-4'>
            <div className='w-full overflow-x-auto pb-2'>
              <TabsList className="grid w-full grid-cols-3 lg:w-[480px]">
                <TabsTrigger value='ssc'>Tổng quan</TabsTrigger>
                <TabsTrigger value='so-gd'>Sở GD&ĐT</TabsTrigger>
                <TabsTrigger value='school'>Nhà trường</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='ssc'>
              {/* Reuse ESureDashboard but we might need to wrap it to mock data or pass props? 
                  For now, let's use SSCDashboard but formatted like ESureDashboard as requested. 
                  Actually, the user said "Report part of SSC is also like eSure". 
                  Let's use SSCDashboard as the 'General' tab and ensure it matches ESure style.
              */}
              <SSCDashboard /> 
            </TabsContent>

            <TabsContent value='so-gd' className='space-y-4 pt-2'>
               {/* Same filtering UI as eSure Admin, but maybe scope provinces? 
                   For now, let's verify if AgencyReports accepts province. Yes. 
                   We should filter the Province Select to only those managed by SSC.
               */}
               <SSCSoGDReports /> 
            </TabsContent>

            <TabsContent value='school' className='space-y-4 pt-2'>
               <SSCSchoolReports />
            </TabsContent>
          </Tabs>
        )

      case 'esure_admin':
      default:
        // eSure Admin sees all dashboards in tabs
        return (
          <Tabs defaultValue='esure' className='space-y-4'>
            <div className='w-full overflow-x-auto pb-2'>
              <TabsList className="grid w-full grid-cols-5 lg:w-[800px]">
                <TabsTrigger value='esure'>eSure</TabsTrigger>
                <TabsTrigger value='partner'>Đối tác</TabsTrigger>
                <TabsTrigger value='insurer'>Công ty BH</TabsTrigger>
                <TabsTrigger value='so-gd'>Sở GD&ĐT</TabsTrigger>
                <TabsTrigger value='school'>Nhà trường</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='esure'>
              <ESureDashboard />
            </TabsContent>

            <TabsContent value='partner'>
              <PartnerDashboard />
            </TabsContent>

            <TabsContent value='insurer'>
              <InsurerDashboard />
            </TabsContent>

            <TabsContent value='so-gd' className='space-y-4 pt-2'>
              <div className='flex items-center gap-4 bg-primary/5 p-5 rounded-2xl border border-primary/10 shadow-sm backdrop-blur-sm'>
                <div className='p-2 bg-primary/10 rounded-xl'>
                    <Filter className='h-5 w-5 text-primary' />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Chọn khu vực</span>
                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                        <SelectTrigger className='w-[280px] bg-background border-primary/20 hover:border-primary focus:ring-primary/20 rounded-lg h-11'>
                            <SelectValue placeholder="Toàn bộ Tỉnh/Thành phố" />
                        </SelectTrigger>
                        <SelectContent className='max-h-[300px]'>
                            {provinces.map(p => (
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
                    Vui lòng chọn Tỉnh/Thành phố để xem báo cáo của Sở
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value='school' className='space-y-4 pt-2'>
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
                                {provinces.map(p => (
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
                                    <div className='p-2 text-xs text-center text-muted-foreground'>...và {schoolsInProvince.length - 200} trường khác (vui lòng sử dụng tìm kiếm)</div>
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
            </TabsContent>
          </Tabs>
        )
    }
  }

  const getRoleDescription = () => {
    switch (role) {
      case 'school_admin': return 'Thống kê và báo cáo dữ liệu theo kỳ/năm'
      case 'agency_admin': return 'Dữ liệu các trường thuộc TP. Hồ Chí Minh'
      case 'ssc_admin': return 'Báo cáo hiệu quả hoạt động và mạng lưới trường học (SSC)'
      case 'esure_admin': return 'Hệ thống báo cáo đa tầng cho các bên liên quan'
      default: return ''
    }
  }

  return (
    <>
      <Header fixed title={getRoleTitle()} description={getRoleDescription()} />

      <Main>
        {renderContent()}
      </Main>
    </>
  )
}
