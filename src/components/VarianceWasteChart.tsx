
import React from "react";

// Only static SVG, not a live chart, for visual purpose only
const chartColors = {
  bg: "#182743",
  grid: "#334155",
  gray: "#9CA3AF",
  accent: "#14b8a6", // teal
};

interface ChartData {
  month: string;
  w2023: number;
  w2024: number;
}
export const VarianceWasteChart: React.FC<{ chartData: ChartData[] }> = ({ chartData }) => {
  // Y axis scaling for static demo
  const allVals = chartData.flatMap(row => [row.w2023, row.w2024]);
  const minVal = Math.min(...allVals);
  const maxVal = Math.max(...allVals);
  const height = 170, width = 680, padY = 30, padX = 36;
  const yTicks = 4;
  // Returns SVG (X,Y) for data array
  const getPoints = (key: "w2023" | "w2024") => chartData.map((d, i) => {
    const x = padX + i * ((width - padX * 2) / (chartData.length - 1));
    const y = padY + (height - padY * 2) * (1 - (d[key] - minVal) / (maxVal - minVal));
    return [x, y];
  });
  const points2023 = getPoints("w2023");
  const points2024 = getPoints("w2024");

  // Chart tooltip logic would go here in a real app

  return (
    <div className="bg-white/5 rounded-2xl p-5 mt-2 mb-2 relative overflow-x-auto border border-white/10">
      <div className="mb-2 flex justify-between items-center">
        <span className="font-semibold text-white text-base">Total Waste Trends – 2023 vs 2024</span>
      </div>
      <div className="w-full overflow-x-auto">
        <svg width={width} height={height} className="block" style={{ minWidth: 360 }} aria-label="Waste trend chart">
          {/* BG */}
          <rect x={0} y={0} width={width} height={height} rx={16} fill={chartColors.bg} />
          {/* GRID + Y Ticks */}
          {[...Array(yTicks+1).keys()].map(i => {
            const y = padY + i * ((height - padY * 2) / yTicks);
            return (
              <g key={i}>
                <line x1={padX} x2={width-padX} y1={y} y2={y} stroke={chartColors.grid} strokeDasharray="3 6" strokeWidth={1}/>
              </g>
            );
          })}
          {/* Y Axis labels */}
          {[...Array(yTicks+1).keys()].map(i => {
            const y = padY + i * ((height - padY * 2) / yTicks);
            const val = maxVal - (maxVal-minVal)*i/yTicks;
            return (
              <text key={i} x={0} y={y+4} fill="#b8c3d1" fontSize={12}>{Math.round(val)} kg</text>
            );
          })}
          {/* X Axis labels */}
          {chartData.map((d, i) => {
            const x = padX + i * ((width - padX * 2) / (chartData.length - 1));
            return (
              <text key={i} x={x} y={height-7} fill="#b8c3d1" textAnchor="middle" fontSize={12}>{d.month}</text>
            );
          })}
          {/* 2023 line */}
          <polyline
            fill="none"
            stroke={chartColors.gray}
            strokeWidth={2}
            points={points2023.map(p => p.join(",")).join(" ")}
          />
          {/* 2024 line */}
          <polyline
            fill="none"
            stroke={chartColors.accent}
            strokeWidth={2.5}
            points={points2024.map(p => p.join(",")).join(" ")}
          />
          {/* Legend */}
          <g>
            <circle cx={width-110} cy={26} r={6} fill={chartColors.gray} />
            <text x={width-98} y={30} fontSize={12} fill="#cbd5e1">2023</text>
            <circle cx={width-48} cy={26} r={6} fill={chartColors.accent} />
            <text x={width-36} y={30} fontSize={12} fill="#cbd5e1">2024</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
