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
import { Progress } from '@/components/ui/progress'
import { KPICard } from '@/components/dashboard/kpi-card'
import {
  DollarSign,
  FileText,
  TrendingUp,
  Building,
  CreditCard,
  Target,
} from 'lucide-react'
import {
  getESureMetrics,
  getRevenueByChannel,
  getRevenueByProduct,
  getSchoolSegments,
  getPLStatement,
} from '@/data/mock-dashboard-data'
import { OrderTrendCharts } from '@/features/orders/components/order-trend-charts'

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} tỷ`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)} tr`
  }
  return new Intl.NumberFormat('vi-VN').format(value)
}

export function ESureDashboard() {
  const metrics = getESureMetrics()
  const revenueByChannel = getRevenueByChannel()
  const revenueByProduct = getRevenueByProduct()
  const schoolSegments = getSchoolSegments()
  const plStatement = getPLStatement()

  return (
    <div className='space-y-6'>
      {/* KPI Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        <KPICard
          title='Doanh thu Gross'
          value={formatCurrency(metrics.grossRevenue)}
          trend={metrics.vsLastYear}
          trendLabel='YoY'
          icon={<DollarSign className='h-4 w-4' />}
          valueClassName='text-green-600'
          variant='compact'
        />
        <KPICard
          title='Doanh thu Net'
          value={formatCurrency(metrics.netRevenue)}
          trend={22}
          trendLabel='YoY'
          icon={<TrendingUp className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Chi phí Hoa hồng'
          value={formatCurrency(metrics.commission)}
          trend={15}
          icon={<CreditCard className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Số đơn cấp'
          value={metrics.totalPolicies}
          trend={12}
          icon={<FileText className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Trường hoạt động'
          value={`${metrics.activeSchools}/245`}
          subtitle='80.8%'
          icon={<Building className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Phí TB/đơn'
          value={`${(metrics.avgPremium / 1000).toFixed(0)}k`}
          subtitle='VND'
          icon={<Target className='h-4 w-4' />}
          variant='compact'
        />
      </div>
      {/* Target Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Tiến độ Target năm</CardTitle>
          <CardDescription>
            Mục tiêu: 15 tỷ VND | Đã đạt: {formatCurrency(metrics.grossRevenue)} ({metrics.vsTarget}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={metrics.vsTarget} className='h-3' />
          <div className='flex justify-between text-sm text-muted-foreground mt-2'>
            <span>Còn lại: 2.5 tỷ</span>
            <span>Run rate cần: 833 tr/tháng</span>
          </div>
        </CardContent>
      </Card>

      {/* Order Trends */}
      <OrderTrendCharts />

      <div className='grid gap-4 lg:grid-cols-2'>
        {/* Revenue by Channel */}
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo Kênh</CardTitle>
            <CardDescription>Phân bổ doanh thu theo kênh thu hộ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kênh</TableHead>
                  <TableHead className='text-right'>Số đơn</TableHead>
                  <TableHead className='text-right'>Doanh thu</TableHead>
                  <TableHead className='text-right'>%</TableHead>
                  <TableHead className='text-right'>HH Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueByChannel.map((item) => (
                  <TableRow key={item.channel}>
                    <TableCell className='font-medium'>{item.channel}</TableCell>
                    <TableCell className='text-right'>
                      {item.policies.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell className='text-right'>
                      {formatCurrency(item.revenue)}
                    </TableCell>
                    <TableCell className='text-right'>{item.percentage}%</TableCell>
                    <TableCell className='text-right'>{item.commissionRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Revenue by Product */}
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo Gói sản phẩm</CardTitle>
            <CardDescription>Phân bổ theo gói bảo hiểm</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gói</TableHead>
                  <TableHead className='text-right'>Phí/đơn</TableHead>
                  <TableHead className='text-right'>Số đơn</TableHead>
                  <TableHead className='text-right'>%</TableHead>
                  <TableHead className='text-right'>Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueByProduct.map((item) => (
                  <TableRow key={item.package}>
                    <TableCell>
                      <Badge
                        variant={
                          item.package === 'gold'
                            ? 'default'
                            : item.package === 'silver'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {item.packageName}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      {(item.premium / 1000).toFixed(0)}k
                    </TableCell>
                    <TableCell className='text-right'>
                      {item.policies.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell className='text-right'>{item.percentage}%</TableCell>
                    <TableCell className='text-right text-green-600'>
                      {item.margin}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* School Segments */}
      <Card>
        <CardHeader>
          <CardTitle>Phân khúc Trường học</CardTitle>
          <CardDescription>Chiến lược phát triển theo segment</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segment</TableHead>
                <TableHead>Định nghĩa</TableHead>
                <TableHead className='text-right'>Số trường</TableHead>
                <TableHead className='text-right'>% Doanh thu</TableHead>
                <TableHead>Chiến lược</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schoolSegments.map((segment) => (
                <TableRow key={segment.segment}>
                  <TableCell>
                    <Badge
                      variant={
                        segment.segment === 'Gold'
                          ? 'default'
                          : segment.segment === 'Silver'
                          ? 'secondary'
                          : segment.segment === 'At-risk'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {segment.segment}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {segment.definition}
                  </TableCell>
                  <TableCell className='text-right'>{segment.schoolCount}</TableCell>
                  <TableCell className='text-right'>{segment.revenuePercentage}%</TableCell>
                  <TableCell>{segment.strategy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* P&L Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Báo cáo Lãi/Lỗ (Tháng này)</CardTitle>
          <CardDescription>So sánh với tháng trước</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khoản mục</TableHead>
                <TableHead className='text-right'>Tháng này</TableHead>
                <TableHead className='text-right'>% DT</TableHead>
                <TableHead className='text-right'>Tháng trước</TableHead>
                <TableHead className='text-right'>% Thay đổi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plStatement.map((item) => (
                <TableRow
                  key={item.item}
                  className={
                    item.item === 'Doanh thu Net' || item.item === 'Lợi nhuận ròng'
                      ? 'font-semibold bg-muted/50'
                      : ''
                  }
                >
                  <TableCell>{item.item}</TableCell>
                  <TableCell
                    className={`text-right ${
                      item.currentMonth >= 0 ? '' : 'text-red-500'
                    }`}
                  >
                    {formatCurrency(Math.abs(item.currentMonth))}
                    {item.currentMonth < 0 ? ' (-)' : ''}
                  </TableCell>
                  <TableCell className='text-right'>{item.percentRevenue}%</TableCell>
                  <TableCell className='text-right'>
                    {formatCurrency(Math.abs(item.lastMonth))}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      item.changePercent >= 0 ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {item.changePercent >= 0 ? '+' : ''}
                    {item.changePercent}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
