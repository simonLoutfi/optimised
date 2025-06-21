import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { InventoryLog } from "@/components/InventoryLog";
import { VarianceReports } from "@/components/VarianceReports";
import { WasteLog } from "@/components/WasteLog";
import { OrderingAssistant } from "@/components/OrderingAssistant";
import { SystemSettings } from "@/components/SystemSettings";
import { Sidebar } from "@/components/Sidebar";
import { OptiMisedAssistant } from "@/components/OptiMisedAssistant";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <InventoryLog />;
      case "variance":
        return <VarianceReports />;
      case "waste":
        return <WasteLog />;
      case "ordering":
        return <OrderingAssistant />;
      case "settings":
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-primary flex w-full">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-6">
        {renderActiveSection()}
        <OptiMisedAssistant />
      </main>
    </div>
  );
};

export default Index;
