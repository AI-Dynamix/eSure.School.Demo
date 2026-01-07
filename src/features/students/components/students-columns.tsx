import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Student } from '@/types/student'
import { format } from 'date-fns'

export const studentsColumns: ColumnDef<Student>[] = [
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
    accessorKey: 'studentId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mã HS' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('studentId')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Họ và tên' />
    ),
    cell: ({ row }) => {
      return (
        <span className='max-w-[500px] truncate font-medium'>
          {row.getValue('fullName')}
        </span>
      )
    },
  },
  {
    accessorKey: 'dateOfBirth',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày sinh' />
    ),
    cell: ({ row }) => {
        const date = new Date(row.getValue('dateOfBirth'));
      return (
        <span className='truncate'>
          {format(date, 'dd/MM/yyyy')}
        </span>
      )
    },
  },
  {
    accessorKey: 'schoolName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trường học' />
    ),
    cell: ({ row }) => {
      return (
        <span className='truncate'>
          {row.getValue('schoolName')}
        </span>
      )
    },
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lớp/Khối' />
    ),
    cell: ({ row }) => {
      return (
        <span className='truncate'>
          {row.getValue('grade')} {row.original.className}
        </span>
      )
    },
     enableSorting: true,
  },
  {
    accessorKey: 'insuranceStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái BH' />
    ),
    cell: ({ row }) => {
        const status = row.getValue('insuranceStatus') as string;
        let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
        let className = "";

        if (status === 'active') {
            variant = "default";
            className = "bg-esure-500 hover:bg-esure-600";
        } else if (status === 'expired') {
            variant = "destructive";
        } else if (status === 'pending') {
            variant = "secondary";
            className = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
        }

      return (
        <Badge variant={variant} className={className}>
            {status === 'active' ? 'Đang hiệu lực' : 
             status === 'expired' ? 'Hết hạn' : 
             status === 'pending' ? 'Chờ xử lý' : 'Chưa tham gia'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
      id: 'actions',
      cell: ({ row: _row }) => {
          return <div>...</div> // Placeholder for actions
      }
  }
]
