import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = [
  { name: 'Tháng 1', total: Math.floor(Math.random() * 50000000) + 10000000 },
  { name: 'Tháng 2', total: Math.floor(Math.random() * 50000000) + 10000000 },
  { name: 'Tháng 3', total: Math.floor(Math.random() * 50000000) + 10000000 },
  { name: 'Tháng 4', total: Math.floor(Math.random() * 50000000) + 10000000 },
  { name: 'Tháng 5', total: Math.floor(Math.random() * 50000000) + 10000000 },
  { name: 'Tháng 6', total: Math.floor(Math.random() * 50000000) + 10000000 },
]

export function RevenueReport() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `${(value / 1000000).toFixed(0)}Tr`}
        />
        <Tooltip 
             cursor={{fill: 'transparent'}}
             formatter={(value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
             contentStyle={{ borderRadius: '8px' }}
        />
        <Bar
          dataKey='total'
          fill='#22c55e'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
