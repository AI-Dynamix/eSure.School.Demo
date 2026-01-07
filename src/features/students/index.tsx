import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { StudentsTable } from './components/students-table'
import { mockStudents } from '@/data/students'

export function Students() {
  return (
    <>
      <Header 
        fixed 
        title='Quản lý Học sinh' 
        description='Danh sách học sinh và trạng thái bảo hiểm.' 
      />

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Quản lý Học sinh</h2>
            <p className='text-muted-foreground'>
              Danh sách học sinh và trạng thái bảo hiểm.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <StudentsTable data={mockStudents} />
        </div>
      </Main>
    </>
  )
}
