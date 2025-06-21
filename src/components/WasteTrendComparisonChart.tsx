
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FileText, List } from "lucide-react";

const yearData2023 = [
  { month: "Jan", wasted: 10 },
  { month: "Feb", wasted: 12 },
  { month: "Mar", wasted: 14 },
  { month: "Apr", wasted: 18 },
  { month: "May", wasted: 15 },
  { month: "Jun", wasted: 17 },
  { month: "Jul", wasted: 16 },
  { month: "Aug", wasted: 15 },
  { month: "Sep", wasted: 14 },
  { month: "Oct", wasted: 14 },
  { month: "Nov", wasted: 13 },
  { month: "Dec", wasted: 12 },
];

const yearData2024 = [
  { month: "Jan", wasted: 13 },
  { month: "Feb", wasted: 14 },
  { month: "Mar", wasted: 15 },
  { month: "Apr", wasted: 20 },
  { month: "May", wasted: 15.2 },
  { month: "Jun", wasted: 16.1 },
  { month: "Jul", wasted: 13 },
  { month: "Aug", wasted: 10 },
  { month: "Sep", wasted: 12 },
  { month: "Oct", wasted: 10 },
  { month: "Nov", wasted: 9 },
  { month: "Dec", wasted: 8 },
];

const dropdownOptions = [
  { value: "thisYear", label: "This Year (2024)" },
  { value: "lastYear", label: "Last Year (2023)" },
  { value: "custom", label: "Custom Range" }
];

export function WasteTrendComparisonChart() {
  const [selected, setSelected] = useState("thisYear");
  const [loading, setLoading] = useState("");
  // Demo: combine years for "This Year" view
  const data = yearData2023.map((d, i) => ({
    ...d,
    yr2024: yearData2024[i]?.wasted,
    yr2023: d.wasted,
  }));
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Waste Trends Comparison
        </h3>
        <div className="flex items-center gap-2">
          <select
            className="bg-dark border border-white/10 text-white/80 px-2 py-1 rounded text-xs focus:outline-none"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            {dropdownOptions.map(opt => (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ background: "#181f2d", border: "1px solid #3CE8B3", borderRadius: 8, color: "#fff" }}
              formatter={value => `${value} kg`}
              labelClassName="text-white"
            />
            <Legend />
            <Line type="monotone" dataKey="yr2024" stroke="#3CE8B3" strokeWidth={3} name="2024" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="yr2023" stroke="#88b4e8" strokeWidth={2} name="2023" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Export buttons */}
      <div className="flex gap-2 mt-5 justify-end">
        <button
          className={`flex items-center gap-2 px-3 py-1.5 rounded bg-accent text-primary text-xs font-semibold shadow transition ${
            loading === 'csv' ? 'opacity-80 animate-pulse cursor-wait' : 'hover:bg-accent/80'
          }`}
          onClick={() => {
            setLoading('csv');
            setTimeout(() => setLoading(""), 1000);
          }}
          disabled={!!loading}
        >
          <List size={16} /> {loading === "csv" ? "Preparing..." : "Download CSV"}
        </button>
        <button
          className={`flex items-center gap-2 px-3 py-1.5 rounded bg-white/20 text-white text-xs font-semibold border border-accent shadow transition ${
            loading === 'pdf' ? 'opacity-80 animate-pulse cursor-wait' : 'hover:bg-white/30'
          }`}
          onClick={() => {
            setLoading('pdf');
            setTimeout(() => setLoading(""), 1000);
          }}
          disabled={!!loading}
        >
          <FileText size={16} /> {loading === "pdf" ? "Preparing..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
}
