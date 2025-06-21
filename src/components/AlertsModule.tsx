
import { AlertTriangle, Shield, TrendingDown } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "critical",
    icon: AlertTriangle,
    title: "High Variance Detected",
    message: "Chicken usage 23% above expected",
    time: "5 min ago",
  },
  {
    id: 2,
    type: "warning",
    icon: TrendingDown,
    title: "Theft Suspicion",
    message: "Beef inventory discrepancy detected",
    time: "12 min ago",
  },
  {
    id: 3,
    type: "info",
    icon: Shield,
    title: "Stockout Warning",
    message: "Tomato sauce: 2 days remaining",
    time: "1 hour ago",
  },
];

export const AlertsModule = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Real-time Alerts</h3>
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const getAlertColor = () => {
            switch (alert.type) {
              case "critical":
                return "text-red-400";
              case "warning":
                return "text-yellow-400";
              case "info":
                return "text-accent";
            }
          };

          return (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
              <Icon size={18} className={getAlertColor()} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{alert.title}</p>
                <p className="text-xs text-white/70 mt-1">{alert.message}</p>
                <p className="text-xs text-white/50 mt-1">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
