import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BarChartWidget({ data }) {
  return (
    <div className="bg-white rounded-md p-3" style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
          <YAxis tick={{ fontSize: 11 }} />
          <Bar dataKey="value" fill="#2196F3" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}