import { KPICard } from '@/components/dashboard/kpi-card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    accountsPayableCommission, accountsPayableInsurer, accountsReceivable, getAccountsSummary,
    getAgingReport,
    type AccountRecord
} from '@/data/accounts'
import { ArrowDownLeft, ArrowUpRight, TrendingUp, Wallet } from 'lucide-react'

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} tỷ`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)} tr`
  return new Intl.NumberFormat('vi-VN').format(value)
}

const getStatusBadge = (status: AccountRecord['status']) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    paid: 'default',
    pending: 'secondary',
    partial: 'outline',
    overdue: 'destructive',
  }
  const labels: Record<string, string> = {
    paid: 'Đã thanh toán',
    pending: 'Chờ TT',
    partial: 'Thanh toán 1 phần',
    overdue: 'Quá hạn',
  }
  return <Badge variant={variants[status]}>{labels[status]}</Badge>
}

export function Accounts() {
  const summary = getAccountsSummary()
  const aging = getAgingReport()

  // Net cashflow = AR pending - AP pending
  const netCashflow = summary.ar.pending - summary.apInsurer.pending - summary.apCommission.pending

  return (
    <>
      <Header fixed title='Quản lý Công nợ' description='Phải thu (AR) và Phải trả (AP) theo từng kỳ' />

      <Main>

        {/* KPI Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6'>
          <KPICard variant="compact"
            title='Phải thu (AR)'
            value={formatCurrency(summary.ar.pending)}
            subtitle={`SSC + VNPT VneDu`}
            icon={<ArrowDownLeft className='h-4 w-4 text-green-500' />}
          />
          <KPICard variant="compact"
            title='Phải trả BH gốc'
            value={formatCurrency(summary.apInsurer.pending)}
            subtitle='PVI, Bảo Việt, PTI...'
            icon={<ArrowUpRight className='h-4 w-4 text-red-500' />}
          />
          <KPICard variant="compact"
            title='Phải trả Hoa hồng'
            value={formatCurrency(summary.apCommission.pending)}
            subtitle='SSC, VNPT'
            icon={<Wallet className='h-4 w-4' />}
          />
          <KPICard variant="compact"
            title='Dòng tiền ròng'
            value={formatCurrency(netCashflow)}
            subtitle='AR - AP'
            icon={<TrendingUp className='h-4 w-4' />}
            valueClassName={netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}
          />
        </div>

        {/* Aging Report */}
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>Báo cáo Tuổi nợ (Aging)</CardTitle>
            <CardDescription>Phân loại công nợ theo thời gian quá hạn</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bucket</TableHead>
                  <TableHead className='text-right'>AR (Phải thu)</TableHead>
                  <TableHead className='text-right'>AP Insurer</TableHead>
                  <TableHead className='text-right'>AP Hoa hồng</TableHead>
                  <TableHead className='text-right'>Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aging.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className='font-medium'>{row.label}</TableCell>
                    <TableCell className='text-right text-green-600'>{formatCurrency(row.ar)}</TableCell>
                    <TableCell className='text-right text-red-600'>{formatCurrency(row.apInsurer)}</TableCell>
                    <TableCell className='text-right text-orange-600'>{formatCurrency(row.apCommission)}</TableCell>
                    <TableCell className='text-right font-medium'>
                      {formatCurrency(row.ar - row.apInsurer - row.apCommission)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Tabs defaultValue='ar' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='ar'>Phải thu (AR)</TabsTrigger>
            <TabsTrigger value='ap-insurer'>Phải trả BH</TabsTrigger>
            <TabsTrigger value='ap-commission'>Phải trả Hoa hồng</TabsTrigger>
          </TabsList>

          {/* AR Tab */}
          <TabsContent value='ar'>
            <Card>
              <CardHeader>
                <CardTitle>Phải thu từ Gateway</CardTitle>
                <CardDescription>
                  Tiền thu hộ từ SSC và VNPT VneDu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>Đối tác</TableHead>
                      <TableHead>Kỳ</TableHead>
                      <TableHead className='text-right'>Số GD</TableHead>
                      <TableHead className='text-right'>Gross</TableHead>
                      <TableHead className='text-right'>Net (99%)</TableHead>
                      <TableHead className='text-right'>Đã thu</TableHead>
                      <TableHead className='text-right'>Còn lại</TableHead>
                      <TableHead>Hạn</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountsReceivable.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className='font-mono text-xs'>{r.id}</TableCell>
                        <TableCell className='font-medium'>{r.partnerName}</TableCell>
                        <TableCell>{r.period}</TableCell>
                        <TableCell className='text-right'>{r.transactionCount.toLocaleString()}</TableCell>
                        <TableCell className='text-right'>{formatCurrency(r.grossAmount)}</TableCell>
                        <TableCell className='text-right'>{formatCurrency(r.netAmount)}</TableCell>
                        <TableCell className='text-right text-green-600'>{formatCurrency(r.paidAmount)}</TableCell>
                        <TableCell className='text-right text-red-600'>{formatCurrency(r.remainingAmount)}</TableCell>
                        <TableCell>{new Date(r.dueDate).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>{getStatusBadge(r.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AP Insurer Tab */}
          <TabsContent value='ap-insurer'>
            <Card>
              <CardHeader>
                <CardTitle>Phải trả Công ty Bảo hiểm</CardTitle>
                <CardDescription>
                  Phí BH gốc (77.6% gross) cho các CTBH
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>CTBH</TableHead>
                      <TableHead>Kỳ</TableHead>
                      <TableHead className='text-right'>Số đơn</TableHead>
                      <TableHead className='text-right'>Phí gốc</TableHead>
                      <TableHead className='text-right'>Đã trả</TableHead>
                      <TableHead className='text-right'>Còn lại</TableHead>
                      <TableHead>Hạn</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountsPayableInsurer.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className='font-mono text-xs'>{r.id}</TableCell>
                        <TableCell className='font-medium'>{r.partnerName}</TableCell>
                        <TableCell>{r.period}</TableCell>
                        <TableCell className='text-right'>{r.transactionCount.toLocaleString()}</TableCell>
                        <TableCell className='text-right'>{formatCurrency(r.netAmount)}</TableCell>
                        <TableCell className='text-right text-green-600'>{formatCurrency(r.paidAmount)}</TableCell>
                        <TableCell className='text-right text-red-600'>{formatCurrency(r.remainingAmount)}</TableCell>
                        <TableCell>{new Date(r.dueDate).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>{getStatusBadge(r.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AP Commission Tab */}
          <TabsContent value='ap-commission'>
            <Card>
              <CardHeader>
                <CardTitle>Phải trả Hoa hồng</CardTitle>
                <CardDescription>
                  Commission cho đối tác phát triển (5-6% gross)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>Đối tác</TableHead>
                      <TableHead>Kỳ</TableHead>
                      <TableHead className='text-right'>Số GD</TableHead>
                      <TableHead className='text-right'>Gross</TableHead>
                      <TableHead className='text-right'>Hoa hồng</TableHead>
                      <TableHead className='text-right'>Đã trả</TableHead>
                      <TableHead className='text-right'>Còn lại</TableHead>
                      <TableHead>Hạn</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountsPayableCommission.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className='font-mono text-xs'>{r.id}</TableCell>
                        <TableCell className='font-medium'>{r.partnerName}</TableCell>
                        <TableCell>{r.period}</TableCell>
                        <TableCell className='text-right'>{r.transactionCount.toLocaleString()}</TableCell>
                        <TableCell className='text-right'>{formatCurrency(r.grossAmount)}</TableCell>
                        <TableCell className='text-right'>{formatCurrency(r.netAmount)}</TableCell>
                        <TableCell className='text-right text-green-600'>{formatCurrency(r.paidAmount)}</TableCell>
                        <TableCell className='text-right text-red-600'>{formatCurrency(r.remainingAmount)}</TableCell>
                        <TableCell>{new Date(r.dueDate).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>{getStatusBadge(r.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
