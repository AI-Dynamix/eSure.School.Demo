import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { dashboardStats } from '@/data/dashboard-stats'

export function Overview() {
  return (
    <ResponsiveContainer width='99%' height={350} minWidth={0} minHeight={0}>
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
