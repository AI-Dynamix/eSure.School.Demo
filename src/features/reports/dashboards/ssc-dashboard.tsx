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
  getSSCMetrics,
  getRevenueByProduct,
  getSSCSchoolSegments,
  getSSCPLStatement,
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

export function SSCDashboard() {
  const metrics = getSSCMetrics()
  const revenueByProduct = getRevenueByProduct()
  const schoolSegments = getSSCSchoolSegments()
  const plStatement = getSSCPLStatement()

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
          trend={12}
          trendLabel='YoY'
          icon={<TrendingUp className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Hoa hồng nhận'
          value={formatCurrency(metrics.commission)}
          trend={5}
          icon={<CreditCard className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Số đơn cấp'
          value={metrics.totalPolicies.toLocaleString('vi-VN')}
          trend={metrics.vsLastMonth}
          icon={<FileText className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Trường quản lý'
          value={`${metrics.activeSchools}/168`}
          subtitle='74.4%'
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
          <CardTitle>Tiến độ Target năm (SSC)</CardTitle>
          <CardDescription>
            Mục tiêu: 8.5 tỷ VND | Đã đạt: {formatCurrency(metrics.grossRevenue)} ({metrics.vsTarget}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={metrics.vsTarget} className='h-3' />
          <div className='flex justify-between text-sm text-muted-foreground mt-2'>
            <span>Còn lại: ~1 tỷ</span>
            <span>Run rate cần: 500 tr/tháng</span>
          </div>
        </CardContent>
      </Card>

      {/* Order Trends */}
      <OrderTrendCharts />

      <div className='grid gap-4 lg:grid-cols-2'>
        {/* Revenue by Product */}
        <Card className="col-span-2 lg:col-span-1">
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
                      {(item.policies * 0.6).toLocaleString('vi-VN')}
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
      
        {/* P&L Statement (Simplified for SSC) */}
        <Card className="col-span-2 lg:col-span-1">
            <CardHeader>
            <CardTitle>Báo cáo Hiệu quả (Tháng này)</CardTitle>
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
                </TableRow>
                </TableHeader>
                <TableBody>
                {plStatement.map((item) => (
                    <TableRow
                    key={item.item}
                    className={
                        item.item === 'Lợi nhuận ròng'
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
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      </div>

      {/* School Segments (SSC specific) */}
      <Card>
        <CardHeader>
          <CardTitle>Phân khúc Trường học (SSC)</CardTitle>
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

    </div>
  )
}
