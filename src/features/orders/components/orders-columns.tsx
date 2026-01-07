import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Order, type OrderStatus } from '@/types/order'
import { format } from 'date-fns'
import { ShieldAlert, Repeat, CheckCircle2, Clock, XCircle, AlertCircle, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusConfig: Record<OrderStatus, { label: string, icon: any, color: string }> = {
  'pending_payment': { label: 'Chờ thanh toán', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  'paid': { label: 'Đã thanh toán', icon: CheckCircle2, color: 'bg-blue-100 text-blue-800' },
  'issued': { label: 'Đã cấp thẻ', icon: CheckCircle2, color: 'bg-green-100 text-green-800' },
  'claiming': { label: 'Đang bồi thường', icon: ShieldAlert, color: 'bg-orange-100 text-orange-800' },
  'claimed': { label: 'Đã bồi thường', icon: ShieldAlert, color: 'bg-purple-100 text-purple-800' },
  'renewed': { label: 'Đã tái tục', icon: Repeat, color: 'bg-blue-600 text-white' },
  'expired': { label: 'Hết hạn', icon: AlertCircle, color: 'bg-gray-100 text-gray-800' },
  'cancelled': { label: 'Đã hủy', icon: XCircle, color: 'bg-red-100 text-red-800' },
}

export const ordersColumns: ColumnDef<Order>[] = [
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
    accessorKey: 'orderId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mã ĐH' />
    ),
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className='flex flex-col gap-0.5 justify-center'>
            <div className='font-mono text-xs font-bold'>{order.orderId}</div>
            <div className='flex gap-1'>
                {order.isRenewal && (
                    <Badge variant='outline' className='h-3.5 px-1 text-[9px] bg-blue-50 text-blue-600 border-blue-200'>
                        TÁI TỤC
                    </Badge>
                )}
                {order.hasClaim && (
                    <Badge variant='outline' className='h-3.5 px-1 text-[9px] bg-orange-50 text-orange-600 border-orange-200'>
                        BỒI THƯỜNG
                    </Badge>
                )}
            </div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'studentName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Học sinh' />
    ),
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{order.studentName}</span>
          <span className='text-[10px] text-muted-foreground font-mono'>{order.studentId}</span>
        </div>
      )
    },
  },
    {
    accessorKey: 'packageName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sản phẩm' />
    ),
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className='flex flex-col'>
          <span className='text-sm truncate'>{order.packageName}</span>
          {order.policyNumber && (
              <span className='text-[10px] text-muted-foreground flex items-center gap-1'>
                  <CalendarDays className='h-2.5 w-2.5' />
                  {order.policyNumber}
              </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày tạo' />
    ),
    cell: ({ row }) => {
        const dateStr = row.getValue('createdAt');
        if (!dateStr) return <span>-</span>;
        
        try {
            const date = new Date(dateStr as string);
            return (
                <span className='text-sm text-muted-foreground'>
                  {format(date, 'dd/MM/yyyy HH:mm')}
                </span>
            )
        } catch (e) {
            return <span className='text-xs text-destructive'>Invalid</span>
        }
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Số tiền' />
    ),
    cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'));
      return (
        <div className='flex flex-col items-end font-mono'>
          <span className='font-bold'>{amount.toLocaleString('vi-VN')}</span>
          <span className='text-[10px] text-muted-foreground'>VND</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái' />
    ),
    cell: ({ row }) => {
        const status = row.getValue('status') as OrderStatus;
        const config = statusConfig[status] || statusConfig['pending_payment'];
        const Icon = config.icon;

      return (
        <Badge 
            variant='outline' 
            className={cn('flex items-center gap-1 w-fit whitespace-nowrap px-1.5', config.color)}
        >
            <Icon className='h-3 w-3' />
            {config.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'paymentChannel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kênh TT' />
    ),
    cell: ({ row }) => {
      return (
        <span className='text-sm font-medium text-muted-foreground'>
          {row.getValue('paymentChannel')}
        </span>
      )
    },
     filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
      id: 'actions',
      cell: () => {
          return (
              <div className='flex justify-end'>
                  <Badge variant='outline' className='cursor-pointer hover:bg-muted font-normal text-[10px] py-0'>
                    CHI TIẾT
                  </Badge>
              </div>
          )
      }
  }
]
