
import { useState } from "react";
import { Info, ArrowUp, ArrowDown, AlertTriangle, FileText } from "lucide-react";

interface KPIProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  trendPositive?: boolean;
  badge?: string;
  risk?: string;
  children?: React.ReactNode;
}

export function DashboardKPI(props: KPIProps) {
  const [modal, setModal] = useState(false);

  // Example: dynamic color based on trend/risk
  let trendColor = props.trendPositive === true
    ? "text-accent"
    : props.trendPositive === false
    ? "text-red-400"
    : "text-yellow-400";

  // Tooltip only on hover
  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="relative group bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col text-left transition shadow hover:scale-[1.025] focus:outline-accent"
        tabIndex={0}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-white/70 text-xs">{props.title}</span>
          {props.badge && (
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-red-600/80 text-white animate-pulse">
              {props.badge}
            </span>
          )}
          {props.risk && (
            <Info size={16} className="text-yellow-400 ml-1" />
          )}
        </div>
        <span className="text-2xl font-bold text-white">{props.value}</span>
        <span className="text-xs text-white/50 mb-2">{props.subtitle}</span>
        {(props.trend || props.risk) && (
          <div className={`flex items-center space-x-1 text-xs font-medium ${trendColor}`}>
            {props.trendPositive === true && <ArrowUp size={16} />}
            {props.trendPositive === false && <ArrowDown size={16} />}
            {props.trend == null && props.risk && <AlertTriangle size={16} />}
            <span>
              {props.trend || props.risk}
            </span>
          </div>
        )}
        {/* Tooltip on hover */}
        <div className="pointer-events-none absolute left-2 top-2 group-hover:opacity-100 opacity-0 transition w-52 z-40 bg-black/80 border border-white/10 rounded p-2 text-xs text-white shadow">
          <span>
            {props.title === "Expiring Soon"
              ? "Hover to preview expiring items"
              : props.title === "Forecast Risk"
              ? "AI predicts shortages/overstock risk based on usage"
              : `Click for details and export!`
            }
          </span>
        </div>
      </button>
      {/* Modal for details */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-dark border border-white/20 rounded-xl p-6 min-w-[340px] max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-white/70 hover:text-white"
              onClick={() => setModal(false)}
              aria-label="Close"
            >
              <svg width="20" height="20">
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="white" strokeWidth="2"/>
              </svg>
            </button>
            <div className="text-lg font-bold mb-2 text-white">{props.title}</div>
            <div className="mb-4 text-white/80">
              <p>
                {props.title === "Total Waste This Month" && (
                  <>15.2 kg wasted this month.<br/>Estimated cost: $127.40.<br />8% less than last month.</>
                )}
                {props.title === "Inventory Value" && (
                  <>Current inventory value: $12,847.<br/>Up 5% vs last report.</>
                )}
                {props.title === "Expiring Soon" && (
                  <>8 items expiring within 72h.<br/>3 marked critical.<br /><a href="#" className="underline text-accent">View detail in Inventory</a></>
                )}
                {props.title === "Forecast Risk" && (
                  <>Overstock risk on chicken. <br/>Shortage risk for bread rolls.</>
                )}
              </p>
            </div>
            <button
              className="flex items-center gap-2 mt-2 bg-accent text-primary px-4 py-2 rounded font-semibold text-sm hover:bg-accent/80"
              onClick={() => {/* fake download effect here if wanted */}}
            >
              <FileText size={18} /> Export PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
}
