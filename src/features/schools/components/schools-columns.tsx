import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { type School } from '@/types/school'

export const schoolsColumns: ColumnDef<School>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mã trường' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('code')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tên trường' />
    ),
    cell: ({ row }) => {
      return (
        <span className='max-w-[500px] truncate font-medium'>
          {row.getValue('name')}
        </span>
      )
    },
  },
  {
    accessorKey: 'level',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cấp học' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='outline'>{row.getValue('level')}</Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'province',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tỉnh/Thành' />
    ),
    cell: ({ row }) => {
      return (
        <span className='truncate'>
          {row.getValue('province')}
        </span>
      )
    },
  },
  {
    accessorKey: 'totalStudents',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Học sinh' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[100px] items-center'>
          <span>{row.getValue('totalStudents')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'insuredRate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tỷ lệ BH' />
    ),
    cell: ({ row }) => {
        const rate = parseFloat(row.getValue('insuredRate'));
        let colorClass = 'text-red-500';
        if (rate >= 80) colorClass = 'text-esure-600 font-bold';
        else if (rate >= 50) colorClass = 'text-yellow-600';

      return (
        <div className={`flex w-[100px] items-center ${colorClass}`}>
          <span>{rate}%</span>
        </div>
      )
    },
  },
  {
      id: 'actions',
      cell: ({ row: _row }) => {
          return <div>...</div> // Placeholder for actions
      }
  }
]
