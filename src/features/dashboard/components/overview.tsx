import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { dashboardStats } from '@/data/dashboard-stats'

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350} minHeight={0}>
      <BarChart data={dashboardStats.participationRate}>
        <XAxis
          dataKey='month'
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
             cursor={{fill: 'transparent'}}
             contentStyle={{ borderRadius: '8px' }}
        />
        <Bar
          dataKey='rate'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
