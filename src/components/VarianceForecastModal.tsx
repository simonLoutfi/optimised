
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";

// Modal gets row (ingredient record)
type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  row: {
    ingredient: string;
    waste2023: number;
    waste2024: number;
    pctChange: number;
    forecast: string;
    alert: { label: string; emoji: string };
    posDishes: string[];
    forecastMsg: string;
  };
};
export const VarianceForecastModal: React.FC<Props> = ({ open, onOpenChange, row }) => {
  // Static chart: line SVG of 12 months waste
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  // Dummy data
  const chart2023 = [1,2,3,2,2,2,1,2,2,2,2,1].map((v) => 8 + v);
  const chart2024 = [2,4,4,4,2,4,2,4,5,4,5,4].map((v) => 10 + v);

  const width = 380, height = 120, padX = 34, padY = 20;
  const getPoints = (vals: number[]) =>
    vals.map((v, i) => {
      const x = padX + i * ((width - padX * 2) / (months.length - 1));
      const min = Math.min(...chart2023, ...chart2024);
      const max = Math.max(...chart2023, ...chart2024);
      const y = padY + (height - padY * 2) * (1 - (v - min) / (max - min));
      return [x, y];
    });

  // Button loading simulation
  const [isLoading, setIsLoading] = React.useState(false);
  const handleDownload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-[#162037]/95 border-white/15 rounded-xl backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="font-bold text-white text-xl flex items-center gap-2">
              {row.ingredient}
              <span className="text-lg">{row.alert.emoji}</span>
            </span>
          </DialogTitle>
        </DialogHeader>
        {/* Chart */}
        <div className="mb-1">
          <svg width={width} height={height} className="w-full block">
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              rx={16}
              fill="#1c2538"
            />
            {/* 2023 and 2024 lines */}
            <polyline
              fill="none"
              stroke="#9CA3AF"
              strokeWidth={2}
              points={getPoints(chart2023).map((p) => p.join(",")).join(" ")}
            />
            <polyline
              fill="none"
              stroke="#14b8a6"
              strokeWidth={2.5}
              points={getPoints(chart2024).map((p) => p.join(",")).join(" ")}
            />
            {/* Month labels */}
            {months.map((m, i) => {
              const x =
                padX + i * ((width - padX * 2) / (months.length - 1));
              return (
                <text
                  key={m}
                  x={x}
                  y={height - 7}
                  fontSize={11}
                  fill="#b8c3d1"
                  textAnchor="middle"
                >
                  {m}
                </text>
              );
            })}
            {/* Legends */}
            <g>
              <circle cx={width - 90} cy={22} r={6} fill="#9CA3AF" />
              <text x={width - 80} y={26} fontSize={12} fill="#cbd5e1">
                2023
              </text>
              <circle cx={width - 45} cy={22} r={6} fill="#14b8a6" />
              <text x={width - 35} y={26} fontSize={12} fill="#cbd5e1">
                2024
              </text>
            </g>
          </svg>
        </div>
        <div className="mb-1">
          {row.posDishes && row.posDishes.length > 0 && (
            <div className="mb-2 text-white/80 text-[15px]">
              <span className="font-semibold">POS-linked menu items: </span>
              <span>{row.posDishes.join(", ")}</span>
            </div>
          )}
        </div>
        <div className="bg-white/5 rounded-md px-4 py-3 mb-3 text-white/90">
          {row.forecastMsg}
        </div>
        <button
          onClick={handleDownload}
          className="bg-accent px-4 py-2 rounded-lg flex items-center gap-2 text-primary font-semibold hover:bg-accent/80 transition disabled:opacity-60"
          disabled={isLoading}
        >
          <Download size={16} />
          {isLoading ? <span className="animate-pulse">Generating PDF…</span> : `Download Forecast for ${row.ingredient}`}
        </button>
        <DialogClose asChild>
          <button
            className="absolute right-2 top-2 text-white/80 hover:text-white/100 text-lg w-7 h-7 rounded-full bg-white/5 hover:bg-accent/30 transition flex items-center justify-center"
            tabIndex={0}
            aria-label="Close"
          >
            ×
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
