import { useState } from 'react'
import { CalendarIcon, Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

// Dữ liệu mẫu
const SCHOOL_YEARS = ['2024-2025', '2023-2024', '2022-2023']
const SEMESTERS = [
  { value: 'all', label: 'Cả năm' },
  { value: 'semester1', label: 'Học kỳ 1' },
  { value: 'semester2', label: 'Học kỳ 2' },
]
const DISTRICTS = [
  'Tất cả', 'Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 10',
  'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Thủ Đức', 'Nhà Bè', 'Cần Giờ'
]
const LEVELS = [
  { value: 'all', label: 'Tất cả cấp' },
  { value: 'mamnon', label: 'Mầm non' },
  { value: 'tieuhoc', label: 'Tiểu học' },
  { value: 'thcs', label: 'THCS' },
  { value: 'thpt', label: 'THPT' },
]

export interface FilterValues {
  schoolYear: string
  semester: string
  district: string
  level: string
  dateFrom?: Date
  dateTo?: Date
}

interface ReportFiltersProps {
  onFilterChange?: (filters: FilterValues) => void
  onExport?: (format: 'excel' | 'pdf' | 'csv') => void
  showExport?: boolean
  className?: string
}

export function ReportFilters({
  onFilterChange,
  onExport,
  showExport = true,
  className,
}: ReportFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    schoolYear: '2024-2025',
    semester: 'all',
    district: 'Tất cả',
    level: 'all',
  })
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const handleChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) => {
      if (key === 'schoolYear') return false // Luôn có
      if (key === 'semester' && value === 'all') return false
      if (key === 'district' && value === 'Tất cả') return false
      if (key === 'level' && value === 'all') return false
      return true
    }
  ).length + (dateFrom ? 1 : 0) + (dateTo ? 1 : 0)

  const handleExport = (format: 'excel' | 'pdf' | 'csv') => {
    // Mock export - hiển thị thông báo
    console.log(`Xuất báo cáo định dạng: ${format}`)
    onExport?.(format)
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {/* Năm học */}
      <Select value={filters.schoolYear} onValueChange={(v) => handleChange('schoolYear', v)}>
        <SelectTrigger className='w-[130px]'>
          <SelectValue placeholder='Năm học' />
        </SelectTrigger>
        <SelectContent>
          {SCHOOL_YEARS.map((year) => (
            <SelectItem key={year} value={year}>{year}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Học kỳ */}
      <Select value={filters.semester} onValueChange={(v) => handleChange('semester', v)}>
        <SelectTrigger className='w-[120px]'>
          <SelectValue placeholder='Học kỳ' />
        </SelectTrigger>
        <SelectContent>
          {SEMESTERS.map((s) => (
            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Quận/Huyện */}
      <Select value={filters.district} onValueChange={(v) => handleChange('district', v)}>
        <SelectTrigger className='w-[130px]'>
          <SelectValue placeholder='Quận/Huyện' />
        </SelectTrigger>
        <SelectContent>
          {DISTRICTS.map((d) => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Cấp học */}
      <Select value={filters.level} onValueChange={(v) => handleChange('level', v)}>
        <SelectTrigger className='w-[130px]'>
          <SelectValue placeholder='Cấp học' />
        </SelectTrigger>
        <SelectContent>
          {LEVELS.map((l) => (
            <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Khoảng thời gian */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-[130px]'>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateFrom ? format(dateFrom, 'dd/MM', { locale: vi }) : 'Từ ngày'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={dateFrom}
            onSelect={setDateFrom}
            locale={vi}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-[130px]'>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateTo ? format(dateTo, 'dd/MM', { locale: vi }) : 'Đến ngày'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={dateTo}
            onSelect={setDateTo}
            locale={vi}
          />
        </PopoverContent>
      </Popover>

      {/* Badge số filter đang active */}
      {activeFiltersCount > 0 && (
        <Badge variant='secondary'>
          <Filter className='h-3 w-3 mr-1' />
          {activeFiltersCount} bộ lọc
        </Badge>
      )}

      {/* Export buttons */}
      {showExport && (
        <div className='flex gap-1 ml-auto'>
          <Button variant='outline' size='sm' onClick={() => handleExport('excel')}>
            <Download className='h-4 w-4 mr-1' />
            Excel
          </Button>
          <Button variant='outline' size='sm' onClick={() => handleExport('pdf')}>
            <Download className='h-4 w-4 mr-1' />
            PDF
          </Button>
          <Button variant='ghost' size='sm' onClick={() => handleExport('csv')}>
            CSV
          </Button>
        </div>
      )}
    </div>
  )
}
