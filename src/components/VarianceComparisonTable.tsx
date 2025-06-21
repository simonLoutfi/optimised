
import React from "react";

interface TableRow {
  ingredient: string;
  waste2023: number;
  waste2024: number;
  pctChange: number;
  trend: "up" | "down" | "neutral";
  forecast: string;
  alert: { label: string; emoji: string };
  posDishes: string[];
  forecastMsg: string;
}

export const VarianceComparisonTable: React.FC<{
  rows: TableRow[];
  showForecast: boolean;
  onRowClick: (row: TableRow) => void;
}> = ({ rows, showForecast, onRowClick }) => {
  return (
    <div className="rounded-xl border border-white/10 overflow-x-auto bg-white/5">
      <table className="min-w-[700px] w-full">
        <thead>
          <tr className="bg-white/10">
            <th className="text-left text-white/80 px-4 py-3 font-medium">Ingredient</th>
            <th className="text-left text-white/80 px-4 py-3 font-medium">Waste (2023)</th>
            <th className="text-left text-white/80 px-4 py-3 font-medium">Waste (2024)</th>
            <th className="text-left text-white/80 px-4 py-3 font-medium">Change (%)</th>
            {showForecast && (
              <th className="text-left text-white/80 px-4 py-3 font-medium">Forecast Recommendation</th>
            )}
            <th className="text-left text-white/80 px-4 py-3 font-medium">Alert</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const trendColor =
              row.trend === "up"
                ? "text-red-400"
                : row.trend === "down"
                ? "text-green-400"
                : "text-yellow-400";
            const pillBg =
              row.trend === "up"
                ? "bg-red-500/10"
                : row.trend === "down"
                ? "bg-green-500/10"
                : "bg-yellow-500/10";
            return (
              <tr
                key={row.ingredient}
                className={`transition cursor-pointer ${i % 2 === 0 ? "bg-white/5" : "bg-white/10"} hover:bg-white/10`}
                onClick={() => onRowClick(row)}
              >
                <td className="px-4 py-3 text-white text-base font-semibold">{row.ingredient}</td>
                <td className="px-4 py-3 text-white">{row.waste2023.toFixed(1)} kg</td>
                <td className="px-4 py-3 text-white">{row.waste2024.toFixed(1)} kg</td>
                <td className="px-4 py-3">
                  <div
                    className={`${trendColor} font-bold flex items-center gap-1 relative group`}
                    tabIndex={0}
                  >
                    {row.trend === "up" && <span>↑</span>}
                    {row.trend === "down" && <span>↓</span>}
                    <span>
                      {row.pctChange > 0 ? "+" : ""}
                      {row.pctChange}%
                    </span>
                    {/* Tooltip on hover/focus */}
                    <span className="z-10 absolute left-1/2 bottom-full mb-2 -translate-x-1/2 text-xs font-normal px-3 py-2 bg-[#2b3347] text-white/90 rounded shadow backdrop-blur-lg opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition whitespace-nowrap">
                      Difference between 2023 and 2024 logged waste.
                    </span>
                  </div>
                </td>
                {showForecast && (
                  <td className="px-4 py-3">
                    <span className="relative group text-white/90">
                      {row.forecast}
                      {/* Tooltip */}
                      <span className="z-[11] absolute left-1/2 bottom-full mb-2 -translate-x-1/2 text-xs font-normal px-3 py-2 bg-[#2b3347] text-white/90 rounded shadow backdrop-blur-lg opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition whitespace-nowrap">
                        Generated from year-over-year waste trend.
                      </span>
                    </span>
                  </td>
                )}
                <td className="px-4 py-3">
                  <span
                    className={`${pillBg} px-3 py-1 text-xs rounded-full flex items-center gap-2 w-fit font-medium`}
                  >
                    <span>{row.alert.emoji}</span>
                    <span>{row.alert.label}</span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
