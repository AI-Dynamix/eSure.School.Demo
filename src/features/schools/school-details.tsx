import { useNavigate, useParams } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { allSchools } from '@/data/vn-schools-loader'
import { SchoolDashboard } from '@/features/reports/dashboards/school-dashboard'
import { useMemo } from 'react'

/**
 * Note: School view is for management and mobilization. 
 * Schools do not handle revenue/money.
 */

export function SchoolDetails() {
  const { schoolId } = useParams({ from: '/_authenticated/schools/$schoolId' })
  const navigate = useNavigate()

  const school = useMemo(() => {
    return allSchools.find((s) => s.id === schoolId)
  }, [schoolId])

  if (!school) {
    return (
      <>
        <Header fixed title='Không tìm thấy trường' />
        <Main>
          <div className='flex flex-col items-center justify-center h-[50vh]'>
            <p className='text-muted-foreground'>Dữ liệu trường học không tồn tại hoặc đã bị gỡ bỏ.</p>
            <Button variant='link' onClick={() => navigate({ to: '/schools' })}>
              Quay lại danh sách
            </Button>
          </div>
        </Main>
      </>
    )
  }

  return (
    <>
      <Header 
        fixed 
        title={`${school.name}`}
        description={`Chi tiết đơn vị: ${school.district}, ${school.province}`}
        actions={
          <Button variant='outline' size='sm' onClick={() => navigate({ to: '/schools' })}>
            <ChevronLeft className='h-4 w-4 mr-2' />
            Quay lại
          </Button>
        }
      />

      <Main>
        <div className='space-y-6'>
          <SchoolDashboard school={school} hideStudentDetails={true} />
        </div>
      </Main>
    </>
  )
}
