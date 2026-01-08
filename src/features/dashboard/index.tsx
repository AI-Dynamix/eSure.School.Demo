import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { useLayout } from '@/context/layout-provider'
import { ESureDashboard } from '@/features/reports/dashboards/esure-dashboard'
import { SchoolDashboard } from '@/features/reports/dashboards/school-dashboard'
import { SoGDDashboard } from '@/features/reports/dashboards/so-gd-dashboard'
import { SSCDashboard } from '@/features/reports/dashboards/ssc-dashboard'

// ...

export function Dashboard() {
  const { role } = useLayout()

  const getDashboardContent = () => {
    switch (role) {
      case 'school_admin':
        // Demo school: Trường Marie Curie - Liên cấp có đầy đủ 3 khối (Tiểu học, THCS, THPT)
        return <SchoolDashboard school={{
            id: 'SCH-MARIECURIE-HCM',
            name: 'Trường Phổ thông Liên cấp Marie Curie',
            level: 'Liên cấp',
            province: 'Thành phố Hồ Chí Minh',
            district: 'Quận 3',
            isNational: false,
            totalStudents: 4850,
            participationRate: 97.2,
            principalName: 'Trần Văn Minh',
            principalPhone: '0281234567'
        }} />
      case 'agency_admin':
        return <SoGDDashboard />
      case 'ssc_admin':
        return <SSCDashboard />
      case 'esure_admin':
      default:
        return <ESureDashboard />
    }
  }

  const getTitle = () => {
    switch (role) {
      case 'school_admin': return 'Tổng quan Trường học'
      case 'agency_admin': return 'Tổng quan Sở GD&ĐT'
      case 'ssc_admin': return 'Tổng quan SSC'
      case 'esure_admin': return 'Tổng quan eSure'
      default: return 'Tổng quan'
    }
  }

  const getDescription = () => {
    switch (role) {
      case 'school_admin': return 'Thống kê sĩ số, BHYT và BH tự nguyện của trường'
      case 'agency_admin': return 'Dữ liệu các trường thuộc TP. Hồ Chí Minh'
      case 'ssc_admin': return 'Báo cáo tổng hợp và theo dõi trường học'
      case 'esure_admin': return 'Tổng quan doanh thu, đơn hàng và hiệu suất nền tảng'
      default: return ''
    }
  }


  return (
    <>
      <Header fixed title={getTitle()} description={getDescription()} />

      <Main>
        {getDashboardContent()}
      </Main>
    </>
  )
}
