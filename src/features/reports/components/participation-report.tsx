import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Đã tham gia', value: 3500 },
  { name: 'Chưa tham gia', value: 1500 },
];

const COLORS = ['#22c55e', '#ef4444'];

export function ParticipationReport() {
  return (
    <ResponsiveContainer width="100%" height={350} minHeight={0}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => value.toLocaleString()} contentStyle={{ borderRadius: '8px' }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
