
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  trendType: "positive" | "negative" | "warning";
}

export const KPICard = ({ title, value, subtitle, trend, trendType }: KPICardProps) => {
  const getTrendIcon = () => {
    switch (trendType) {
      case "positive":
        return <TrendingUp size={16} className="text-accent" />;
      case "negative":
        return <TrendingDown size={16} className="text-red-400" />;
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trendType) {
      case "positive":
        return "text-accent";
      case "negative":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
      <h3 className="text-sm font-medium text-white/70 mb-2">{title}</h3>
      <div className="flex items-baseline space-x-2 mb-1">
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <p className="text-sm text-white/60 mb-3">{subtitle}</p>
      <div className={cn("flex items-center space-x-1 text-sm", getTrendColor())}>
        {getTrendIcon()}
        <span>{trend}</span>
      </div>
    </div>
  );
};
