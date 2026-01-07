import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Wallet, ArrowRightLeft, CheckCircle, AlertCircle } from 'lucide-react'
import {
  getPartnerMetrics,
  getReconciliationItems,
  getCommissionPayments,
  getSLAMetrics,
} from '@/data/mock-dashboard-data'

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)} tỷ`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} tr`
  }
  return new Intl.NumberFormat('vi-VN').format(value)
}

export function PartnerDashboard() {
  const metrics = getPartnerMetrics()
  const reconciliationItems = getReconciliationItems()
  const commissionPayments = getCommissionPayments()
  const slaMetrics = getSLAMetrics()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'matched':
        return <Badge className='bg-green-500'>✅ Khớp</Badge>
      case 'mismatch_small':
        return <Badge variant='secondary'>⚠️ Chênh lệch nhỏ</Badge>
      case 'mismatch':
        return <Badge variant='destructive'>❌ Không khớp</Badge>
      case 'pending':
        return <Badge variant='outline'>🔍 Chờ xử lý</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getSLAStatusBadge = (status: string) => {
    switch (status) {
      case 'green':
        return <Badge className='bg-green-500'>🟢</Badge>
      case 'yellow':
        return <Badge className='bg-yellow-500'>🟡</Badge>
      case 'red':
        return <Badge variant='destructive'>🔴</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className='space-y-6'>
      {/* Volume Overview */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <KPICard
          title='Hôm nay'
          value={metrics.todayTransactions}
          subtitle={formatCurrency(metrics.todayValue)}
          icon={<ArrowRightLeft className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Tuần này'
          value={metrics.weekTransactions}
          subtitle={formatCurrency(metrics.weekValue)}
          variant='compact'
        />
        <KPICard
          title='Tháng này'
          value={metrics.monthTransactions}
          subtitle={formatCurrency(metrics.monthValue)}
          variant='compact'
        />
        <KPICard
          title='Năm nay (YTD)'
          value={metrics.ytdTransactions}
          subtitle={formatCurrency(metrics.ytdValue)}
          icon={<Wallet className='h-4 w-4' />}
          variant='compact'
        />
      </div>

      {/* Success Rate */}
      <div className='grid gap-4 md:grid-cols-2'>
        <KPICard
          title='Tỷ lệ thành công'
          value={`${metrics.successRate}%`}
          showGauge
          gaugeValue={Math.round(metrics.successRate)}
          gaugeColor='green'
          icon={<CheckCircle className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Tỷ lệ thất bại'
          value={`${metrics.failedRate}%`}
          showGauge
          gaugeValue={Math.round(metrics.failedRate)}
          gaugeColor='red'
          icon={<AlertCircle className='h-4 w-4' />}
          variant='compact'
        />
      </div>

      {/* Reconciliation Table */}
      <Card>
        <CardHeader>
          <CardTitle>Đối soát Chi tiết (Hôm nay)</CardTitle>
          <CardDescription>
            Khớp 3 nguồn: Payment Gateway ↔ eSure Orders ↔ Insurer Policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GD Partner</TableHead>
                <TableHead>Mã đơn eSure</TableHead>
                <TableHead className='text-right'>Số tiền Partner</TableHead>
                <TableHead className='text-right'>Số tiền eSure</TableHead>
                <TableHead className='text-right'>Chênh lệch</TableHead>
                <TableHead>Nguyên nhân</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reconciliationItems.map((item) => (
                <TableRow key={item.partnerTxnId}>
                  <TableCell className='font-mono text-sm'>
                    {item.partnerTxnId}
                  </TableCell>
                  <TableCell className='font-mono text-sm'>
                    {item.esureOrderId || '-'}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatCurrency(item.partnerAmount)}
                  </TableCell>
                  <TableCell className='text-right'>
                    {item.esureAmount ? formatCurrency(item.esureAmount) : '-'}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      item.difference > 0 ? 'text-red-500 font-medium' : ''
                    }`}
                  >
                    {item.difference > 0 ? formatCurrency(item.difference) : '0'}
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {item.reason || '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className='grid gap-4 lg:grid-cols-2'>
        {/* Commission Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Hoa hồng & Thanh toán</CardTitle>
            <CardDescription>Lịch sử thanh toán hoa hồng cho đối tác</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kỳ</TableHead>
                  <TableHead className='text-right'>Số GD</TableHead>
                  <TableHead className='text-right'>Hoa hồng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày TT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionPayments.map((item) => (
                  <TableRow key={item.period}>
                    <TableCell className='font-medium'>{item.period}</TableCell>
                    <TableCell className='text-right'>
                      {item.transactions.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell className='text-right text-green-600'>
                      {formatCurrency(item.commission)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === 'paid' ? 'default' : 'secondary'}
                      >
                        {item.status === 'paid' ? '✅ Đã thanh toán' : '🕐 Chờ TT'}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {item.paymentDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* SLA Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Monitoring</CardTitle>
            <CardDescription>Theo dõi chất lượng dịch vụ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Thực tế</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slaMetrics.map((item) => (
                  <TableRow key={item.metric}>
                    <TableCell className='font-medium'>{item.metric}</TableCell>
                    <TableCell className='text-muted-foreground'>
                      {item.target}
                    </TableCell>
                    <TableCell>{item.actual}</TableCell>
                    <TableCell>{getSLAStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
