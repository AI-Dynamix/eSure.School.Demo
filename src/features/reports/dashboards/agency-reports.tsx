import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAgencyReportData, SchoolType } from '@/data/mock-sogd'
import { Search, Download, Calendar, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgencyReportsProps {
  provinceName?: string
}

export function AgencyReports({ provinceName = 'Thành phố Hồ Chí Minh' }: AgencyReportsProps) {
  const [year, setYear] = useState('2023-2024')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<SchoolType | 'All'>('All')

  // Load schools for the selected province
  const allSchools = useMemo(() => {
    const data = getAgencyReportData(provinceName)
    return data.flatMap(w => w.schools.map(s => ({ 
      ...s, 
      wardName: w.name 
    })))
  }, [provinceName])

  const filteredSchools = useMemo(() => {
    return allSchools.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.wardName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchType = typeFilter === 'All' || s.type === typeFilter
      return matchSearch && matchType
    })
  }, [allSchools, searchTerm, typeFilter])

  const typeLabels: Record<SchoolType, string> = {
    'Public': 'Công lập',
    'Private': 'Dân lập',
    'International': 'Quốc tế'
  }

  return (
    <div className='flex flex-col space-y-6'>
      {/* Filters Header */}
      <div className='flex flex-col md:flex-row justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm'>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className='w-[140px] border-none bg-transparent h-7 focus:ring-0'>
                <SelectValue placeholder="Năm học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024 - 2025</SelectItem>
                <SelectItem value="2023-2024">2023 - 2024</SelectItem>
                <SelectItem value="2022-2023">2022 - 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg'>
            <Filter className='h-4 w-4 text-muted-foreground' />
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
              <SelectTrigger className='w-[140px] border-none bg-transparent h-7 focus:ring-0'>
                <SelectValue placeholder="Loại hình" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tất cả loại hình</SelectItem>
                <SelectItem value="Public">Công lập</SelectItem>
                <SelectItem value="Private">Dân lập</SelectItem>
                <SelectItem value="International">Quốc tế</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='relative w-full md:w-64'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input 
              placeholder="Tìm tên trường, phường..." 
              className='pl-9 h-9' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Button className='shrink-0 shadow-md'>
          <Download className='h-4 w-4 mr-2' />
          Xuất báo cáo (Excel)
        </Button>
      </div>

      {/* Main Report Table */}
      <Card className='shadow-sm border-none bg-transparent'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle className='text-xl'>Chi tiết tỷ lệ tham gia theo Khối</CardTitle>
          <CardDescription>Báo cáo tổng hợp số liệu tham gia BHYT của từng đơn vị trường học</CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='rounded-xl border bg-card overflow-hidden'>
            <Table>
              <TableHeader className='bg-muted/30'>
                <TableRow>
                  <TableHead className='w-[300px]'>Trường học</TableHead>
                  <TableHead className='text-center'>Loại hình</TableHead>
                  <TableHead className='text-center'>Khối 6</TableHead>
                  <TableHead className='text-center'>Khối 7</TableHead>
                  <TableHead className='text-center'>Khối 8</TableHead>
                  <TableHead className='text-center'>Khối 9</TableHead>
                  <TableHead className='text-right'>Tổng tỷ lệ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((s) => (
                    <TableRow key={s.id} className='hover:bg-muted/20'>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span className='font-semibold text-sm'>{s.name}</span>
                          <span className='text-xs text-muted-foreground'>{s.wardName}</span>
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <Badge variant='outline' className={cn(
                          'font-medium text-[10px] uppercase tracking-wider',
                          s.type === 'Public' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          s.type === 'Private' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          'bg-purple-50 text-purple-700 border-purple-200'
                        )}>
                          {typeLabels[s.type]}
                        </Badge>
                      </TableCell>
                      {s.gradeStats.map(gs => (
                        <TableCell key={gs.grade} className='text-center'>
                           <span className={cn(
                             'text-sm font-medium',
                             gs.participationRate >= 95 ? 'text-green-600' :
                             gs.participationRate >= 90 ? 'text-blue-600' : 'text-orange-600'
                           )}>
                             {gs.participationRate}%
                           </span>
                        </TableCell>
                      ))}
                      <TableCell className='text-right'>
                        <Badge className={cn(
                          'ml-auto',
                          s.bhytRate >= 95 ? 'bg-green-100 text-green-700 border-green-200' :
                          s.bhytRate >= 90 ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          'bg-orange-100 text-orange-700 border-orange-200'
                        )} variant='outline'>
                          {s.bhytRate}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className='h-32 text-center text-muted-foreground'>
                      Không tìm thấy dữ liệu báo cáo phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
