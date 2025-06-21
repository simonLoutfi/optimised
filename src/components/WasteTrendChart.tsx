
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", waste: 12 },
  { day: "Tue", waste: 19 },
  { day: "Wed", waste: 15 },
  { day: "Thu", waste: 25 },
  { day: "Fri", waste: 22 },
  { day: "Sat", waste: 18 },
  { day: "Sun", waste: 15 },
];

export const WasteTrendChart = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Waste Trends (7 Days)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="day" stroke="#ffffff70" />
            <YAxis stroke="#ffffff70" />
            <Line 
              type="monotone" 
              dataKey="waste" 
              stroke="#3CE8B3" 
              strokeWidth={3}
              dot={{ fill: "#3CE8B3", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3CE8B3" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
