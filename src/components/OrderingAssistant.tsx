
import { ShoppingCart, Send, Check, Clock, AlertTriangle, Package } from "lucide-react";
import { useState } from "react";
import { useEffect} from "react";
import axios from "axios";


interface OrderItem {
  "Ingredient Name": string;
  "Current Stock": number;
  "Recommended Order Quantity": number;
  "Unit": string;
  "Cost per Unit": number;
  "Total Cost": number;
  "Reason": string;
  "Priority": "High" | "Medium" | "Low";
  "supplier": string;
  selected?: boolean;
  id?: string;
}


export const OrderingAssistant = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState("all");


useEffect(() => {
  async function fetchRecommendations() {
    try {
      const res = await fetch("http://localhost:8000/optimize-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          test_data_path: "restaurant_inventory_data.csv",
          model_path: "inventory_model_20250619_090850.pkl"
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to fetch recommendations");
      }

      const data = await res.json();
      
      // Transform API data to match our component's needs
const transformedItems = data.sample_recommendations.map((item: OrderItem, index: number) => ({
  ...item,
  id: index.toString(),
  selected: false,
}));



      setOrderItems(transformedItems);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  }

  fetchRecommendations();
}, []);
  const toggleItemSelection = (itemId: string) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, recommendedQuantity: newQuantity } : item
      )
    );
  };

  const selectedItems = orderItems.filter(item => item.selected);
  const totalCost = selectedItems.reduce((sum, item) => sum + item["Total Cost"], 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "recommended":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "optional":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-accent/20 text-accent border-accent/30";
    }
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "urgent":
        return <AlertTriangle size={16} className="text-red-400" />;
      case "recommended":
        return <Clock size={16} className="text-yellow-400" />;
      case "optional":
        return <Package size={16} className="text-green-400" />;
      default:
        return null;
    }
  };

  const filteredItems = orderItems.filter(item => {
    const matchesSupplier = selectedSupplier === "all" || item.supplier === selectedSupplier;
    return matchesSupplier;
  });

  const suppliers = [...new Set(orderItems.map(item => item.supplier))];

  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Ordering Assistant</h1>
        <div className="flex space-x-3">
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Package size={20} />
            <span>View Orders</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="text-red-400" size={24} />
            <h3 className="text-lg font-semibold text-red-300">Urgent Items</h3>
          </div>
          <div className="text-3xl font-bold text-red-400">
            {filteredItems.filter(item => item.Priority === 'High').length}
          </div>
          <p className="text-red-300/70 text-sm">Need immediate ordering</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="text-yellow-400" size={24} />
            <h3 className="text-lg font-semibold text-yellow-300">Recommended</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {filteredItems.filter(item => item.Priority === 'Medium').length}
          </div>
          <p className="text-yellow-300/70 text-sm">Should order soon</p>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <ShoppingCart className="text-accent" size={24} />
            <h3 className="text-lg font-semibold text-accent">Selected Items</h3>
          </div>
          <div className="text-3xl font-bold text-accent">{selectedItems.length}</div>
          <p className="text-accent/70 text-sm">Ready to order</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">💰</span>
            <h3 className="text-lg font-semibold text-white">Total Cost</h3>
          </div>
          <div className="text-3xl font-bold text-white">${totalCost.toFixed(2)}</div>
          <p className="text-white/70 text-sm">Current selection</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent w-full md:w-auto"
          >
            <option value="all">All Suppliers</option>
            {suppliers.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
{/* Order Items Table */}
<table className="w-full">
  <thead className="bg-white/10">
    <tr>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Select</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Item</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Current Stock</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Recommended Qty</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Unit</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Cost/Unit</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total Cost</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Priority</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Reason</th>
    </tr>
  </thead>
  <tbody>
    {filteredItems.map((item, index) => (
      <tr key={item.id} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''}`}>
        <td className="px-6 py-4">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => toggleItemSelection(item.id)}
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent"
          />
        </td>
        <td className="px-6 py-4">
          <div className="font-medium text-white">{item["Ingredient Name"]}</div>
        </td>
        <td className="px-6 py-4 text-white">{item["Current Stock"].toFixed(1)} {item["Unit"]}</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={item["Recommended Order Quantity"]}
            onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value) || 0)}
            className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-accent"
            step="0.1"
            min="0"
          />
        </td>
        <td className="px-6 py-4 text-white">{item["Unit"]}</td>
        <td className="px-6 py-4 text-white">${item["Cost per Unit"].toFixed(2)}</td>
        <td className="px-6 py-4 text-white">${item["Total Cost"].toFixed(2)}</td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.Priority.toLowerCase())}`}>
            <StatusIcon status={item.Priority.toLowerCase()} />
            <span className="capitalize">{item.Priority}</span>
          </span>
        </td>
        <td className="px-6 py-4 text-white text-sm">{item["Reason"]}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </div>

      {/* Order Summary & Submit */}
      {selectedItems.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-accent">Order Summary</h3>
            <div className="text-2xl font-bold text-accent">${totalCost.toFixed(2)}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Selected Items ({selectedItems.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white">{item["Ingredient Name"]}</span>
                    <span className="text-accent">{item["Recommended Order Quantity"]} {item["Unit"]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Order by Supplier</h4>
              <div className="space-y-2">
                {Object.entries(
                  selectedItems.reduce((acc, item) => {
                    acc[item.supplier] = (acc[item.supplier] || 0) + (item["Recommended Order Quantity"] * item["Cost per Unit"]);
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([supplier, cost]) => (
                  <div key={supplier} className="flex justify-between text-sm">
                    <span className="text-white">{supplier}</span>
                    <span className="text-accent">${cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-accent hover:bg-accent/80 text-primary px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors font-medium">
              <Send size={20} />
              <span>Send Order to Suppliers</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
              <Check size={20} />
              <span>Save as Draft</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
