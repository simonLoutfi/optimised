
import { BarChart3, Package, TrendingDown, Trash2, ShoppingCart, Settings, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "inventory", label: "Inventory Log", icon: Package },
  { id: "variance", label: "Variance Reports", icon: BarChart3 },
  { id: "waste", label: "Waste Log", icon: Trash2 },
  { id: "ordering", label: "Ordering Assistant", icon: ShoppingCart },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="w-64 bg-primary border-r border-accent/20 p-6">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <img 
            src="/lovable-uploads/8b5eeac1-aa2e-4fee-ae27-07892dbcf765.png" 
            alt="OptiMised Logo" 
            className="h-16 w-auto opacity-90 filter brightness-110"
          />
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                activeSection === item.id
                  ? "bg-accent/20 text-accent"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
