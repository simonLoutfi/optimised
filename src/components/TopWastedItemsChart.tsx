
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { item: "Lettuce", amount: 8.5 },
  { item: "Tomatoes", amount: 6.2 },
  { item: "Chicken", amount: 4.8 },
  { item: "Bread", amount: 3.1 },
  { item: "Cheese", amount: 2.9 },
];

export const TopWastedItemsChart = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Top 5 Wasted Items (kg)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis type="number" stroke="#ffffff70" />
            <YAxis dataKey="item" type="category" width={80} stroke="#ffffff70" />
            <Bar dataKey="amount" fill="#3CE8B3" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
