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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { KPICard } from '@/components/dashboard/kpi-card'
import { ShieldCheck, AlertTriangle, TrendingDown, FileText } from 'lucide-react'
import {
  getInsurerMetrics,
  getClaimsByType,
  getClaimsByDemographic,
  getLargeClaims,
} from '@/data/mock-dashboard-data'

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} tỷ`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} tr`
  return new Intl.NumberFormat('vi-VN').format(value)
}

export function InsurerDashboard() {
  const metrics = getInsurerMetrics()
  const claimsByType = getClaimsByType()
  const claimsByDemographic = getClaimsByDemographic()
  const largeClaims = getLargeClaims()

  return (
    <div className='space-y-6'>
      {/* Tổng quan Portfolio */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        <KPICard
          title='Tổng đơn Active'
          value={metrics.totalActivePolicies}
          icon={<FileText className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Tổng phí thu'
          value={formatCurrency(metrics.totalPremium)}
          icon={<ShieldCheck className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Tổng bồi thường'
          value={formatCurrency(metrics.totalClaims)}
          icon={<TrendingDown className='h-4 w-4' />}
          variant='compact'
        />
        <KPICard
          title='Loss Ratio'
          value={`${metrics.lossRatio}%`}
          subtitle='Target < 40%'
          showGauge
          gaugeValue={Math.round(metrics.lossRatio)}
          gaugeColor={metrics.lossRatio < 20 ? 'green' : metrics.lossRatio < 40 ? 'yellow' : 'red'}
          variant='compact'
        />
        <KPICard
          title='Tần suất Claim'
          value={`${metrics.claimFrequency}%`}
          subtitle='Target < 5%'
          variant='compact'
        />
        <KPICard
          title='Claim TB'
          value={formatCurrency(metrics.avgClaimSize)}
          variant='compact'
        />
      </div>

      {/* Cảnh báo */}
      <Alert>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Insight</AlertTitle>
        <AlertDescription>
          Cấp Mầm non có tần suất claim cao nhất (5%). Cần review lại pricing cho segment này.
        </AlertDescription>
      </Alert>

      <div className='grid gap-4 lg:grid-cols-2'>
        {/* Phân tích theo Loại Claim */}
        <Card>
          <CardHeader>
            <CardTitle>Phân tích Claims theo Loại</CardTitle>
            <CardDescription>Số vụ và giá trị bồi thường theo nguyên nhân</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại tai nạn</TableHead>
                  <TableHead className='text-right'>Số vụ</TableHead>
                  <TableHead className='text-right'>Tổng BT</TableHead>
                  <TableHead className='text-right'>%</TableHead>
                  <TableHead className='text-right'>TB/vụ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claimsByType.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className='font-medium'>{item.type}</TableCell>
                    <TableCell className='text-right'>{item.count}</TableCell>
                    <TableCell className='text-right'>{formatCurrency(item.totalAmount)}</TableCell>
                    <TableCell className='text-right'>{item.percentage}%</TableCell>
                    <TableCell className='text-right'>{formatCurrency(item.avgSize)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Phân tích theo Cấp học */}
        <Card>
          <CardHeader>
            <CardTitle>Phân tích Claims theo Cấp học</CardTitle>
            <CardDescription>Tần suất và loss ratio theo segment</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cấp</TableHead>
                  <TableHead className='text-right'>Số đơn</TableHead>
                  <TableHead className='text-right'>Claims</TableHead>
                  <TableHead className='text-right'>Tần suất</TableHead>
                  <TableHead className='text-right'>Loss Ratio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claimsByDemographic.map((item) => (
                  <TableRow key={item.segment}>
                    <TableCell className='font-medium'>{item.segment}</TableCell>
                    <TableCell className='text-right'>{item.policies.toLocaleString('vi-VN')}</TableCell>
                    <TableCell className='text-right'>{item.claims}</TableCell>
                    <TableCell className='text-right'>
                      <Badge variant={item.frequency > 4 ? 'destructive' : 'secondary'}>
                        {item.frequency}%
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Badge variant={item.lossRatio > 15 ? 'destructive' : 'default'}>
                        {item.lossRatio}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Claims lớn */}
      <Card>
        <CardHeader>
          <CardTitle>Claims Lớn (&gt; 10 triệu)</CardTitle>
          <CardDescription>Các vụ bồi thường có giá trị cao</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Trường</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead className='text-right'>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {largeClaims.map((claim) => (
                <TableRow key={claim.policyId}>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell className='font-mono text-sm'>{claim.policyId}</TableCell>
                  <TableCell>{claim.school}</TableCell>
                  <TableCell>{claim.type}</TableCell>
                  <TableCell className='text-right font-medium text-red-600'>
                    {formatCurrency(claim.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        claim.status === 'paid' ? 'default' : 
                        claim.status === 'processing' ? 'secondary' : 'outline'
                      }
                    >
                      {claim.status === 'paid' ? 'Đã chi trả' : 
                       claim.status === 'processing' ? 'Đang xử lý' : 'Chờ duyệt'}
                    </Badge>
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
