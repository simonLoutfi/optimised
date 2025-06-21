import { useState } from "react";
// Use only allowed icons from lucide-react
import { AlertTriangle, CircleAlert, Info, X } from "lucide-react";

// Define alert array with icon as JSX.Element, not as a "function"
const alerts = [{
  type: "warning",
  icon: <AlertTriangle size={20} className="text-yellow-400" />,
  message: "High variance in chicken: 23% over POS expectation",
  detail: "Chicken used was 23% more than what POS sales suggest. Review logs.",
  level: "High"
}, {
  type: "critical",
  icon: <CircleAlert size={20} className="text-red-500" />,
  message: "POS disconnected at 5:43PM",
  detail: "System stopped syncing with POS provider. Data may be outdated.",
  level: "Critical"
}, {
  type: "info",
  icon: <Info size={20} className="text-accent" />,
  message: "Forecast update: reduce tomatoes by 8% next month",
  detail: "AI recommends to reduce next month’s order for tomatoes by 8%.",
  level: ""
}];
export function DashboardAlerts() {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  return <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Real-time Alerts</h3>
      <div className="space-y-3">
        {alerts.map((a, idx) => <button key={idx} onClick={() => setModalIdx(idx)} className="flex items-center w-full text-left bg-white/10 rounded-md p-3 transition hover:bg-white/20 space-x-3">
            {a.icon}
            <div>
              <span className="font-semibold text-white text-sm">{a.message}</span>
              {a.level && <span className="ml-2 rounded px-2 py-0.5 bg-red-600/80 text-xs text-white font-semibold">{a.level}</span>}
            </div>
          </button>)}
      </div>
      {modalIdx !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-dark border border-white/20 rounded-xl p-6 min-w-[340px] max-w-sm relative bg-gray-900">
            <button className="absolute top-2 right-2 text-white/70 hover:text-white" onClick={() => setModalIdx(null)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="text-lg font-bold mb-2 text-white flex items-center gap-2">
              {alerts[modalIdx].icon}
              <span>{alerts[modalIdx].message}</span>
            </div>
            <div className="mb-4 text-white/80">
              <p>{alerts[modalIdx].detail}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/10 text-white px-3 py-1.5 rounded font-semibold text-xs" onClick={() => setModalIdx(null)}>
                Dismiss
              </button>
              <button className="bg-accent text-primary px-3 py-1.5 rounded font-semibold text-xs" onClick={() => setModalIdx(null)}>
                Mark as Resolved
              </button>
              <button className="bg-red-600 text-white px-3 py-1.5 rounded font-semibold text-xs" onClick={() => setModalIdx(null)}>
                Flag
              </button>
            </div>
          </div>
        </div>}
    </div>;
}