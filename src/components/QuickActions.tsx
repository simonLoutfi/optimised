import { Plus, Edit, FileText, TrendingDown } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { icon: Plus, label: "Add Stock", color: "bg-accent/80 hover:bg-accent/60" },
    { icon: TrendingDown, label: "Log Spoilage", color: "bg-red-600 hover:bg-red-700" },
    { icon: Edit, label: "Adjust Quantity", color: "bg-yellow-600 hover:bg-yellow-700" },
    { icon: FileText, label: "Generate Report", color: "bg-blue-600 hover:bg-blue-700" },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`${action.color} text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2`}
            >
              <Icon size={24} />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
