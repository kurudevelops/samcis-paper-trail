import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

export default function PieChartWidget({ data }) {
  return (
    <div className="bg-white rounded-md p-3" style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconSize={10}
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}