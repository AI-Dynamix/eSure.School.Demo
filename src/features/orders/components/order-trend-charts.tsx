import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const trendData = [
  { name: 'Thứ 2', orders: 4000, revenue: 2400 },
  { name: 'Thứ 3', orders: 3000, revenue: 1398 },
  { name: 'Thứ 4', orders: 2000, revenue: 9800 },
  { name: 'Thứ 5', orders: 2780, revenue: 3908 },
  { name: 'Thứ 6', orders: 1890, revenue: 4800 },
  { name: 'Thứ 7', orders: 2390, revenue: 3800 },
  { name: 'CN', orders: 3490, revenue: 4300 },
]

interface OrderTrendChartsProps {
  showRevenue?: boolean
}

export function OrderTrendCharts({ showRevenue = true }: OrderTrendChartsProps) {
  return (
    <div className={cn('grid gap-4 w-full', showRevenue ? 'md:grid-cols-2' : 'grid-cols-1')}>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>
            {showRevenue ? 'Sản lượng đơn hàng (7 ngày qua)' : 'Tiến độ tham gia bảo hiểm (7 ngày qua)'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[200px] w-full min-w-0' style={{ width: '99%' }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                   cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {showRevenue && (
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Doanh thu thực tế (7 ngày qua)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[200px] w-full min-w-0' style={{ width: '99%' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                     contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                      activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
