
import { useState } from "react";
import { Plus, Edit, Trash2, Filter, Search, Package, AlertTriangle, Clock, CheckCircle } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  currentQuantity: number;
  unit: string;
  batchTag: string;
  expiryDate: string;
  costPerUnit: number;
  totalValue: number;
  category: string;
  supplier: string;
  status: "optimal" | "expiring" | "expired" | "low";
}

const mockInventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Chicken Breast",
    currentQuantity: 15.5,
    unit: "kg",
    batchTag: "CB-240611",
    expiryDate: "2024-06-14",
    costPerUnit: 12.50,
    totalValue: 193.75,
    category: "Meat",
    supplier: "Fresh Farms Co",
    status: "optimal"
  },
  {
    id: "2",
    name: "Tomatoes",
    currentQuantity: 3.2,
    unit: "kg",
    batchTag: "TM-240610",
    expiryDate: "2024-06-13",
    costPerUnit: 4.20,
    totalValue: 13.44,
    category: "Vegetables",
    supplier: "Garden Fresh",
    status: "expiring"
  },
  {
    id: "3",
    name: "Milk",
    currentQuantity: 0.8,
    unit: "L",
    batchTag: "ML-240609",
    expiryDate: "2024-06-12",
    costPerUnit: 3.50,
    totalValue: 2.80,
    category: "Dairy",
    supplier: "Dairy Direct",
    status: "expired"
  },
  {
    id: "4",
    name: "Rice",
    currentQuantity: 25.0,
    unit: "kg",
    batchTag: "RC-240608",
    expiryDate: "2024-12-15",
    costPerUnit: 2.80,
    totalValue: 70.00,
    category: "Grains",
    supplier: "Grain Masters",
    status: "optimal"
  },
  {
    id: "5",
    name: "Lettuce",
    currentQuantity: 1.2,
    unit: "kg",
    batchTag: "LT-240611",
    expiryDate: "2024-06-13",
    costPerUnit: 5.50,
    totalValue: 6.60,
    category: "Vegetables",
    supplier: "Garden Fresh",
    status: "low"
  }
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "optimal":
      return <CheckCircle size={16} className="text-green-500" />;
    case "expiring":
      return <Clock size={16} className="text-yellow-500" />;
    case "expired":
      return <AlertTriangle size={16} className="text-red-500" />;
    case "low":
      return <Package size={16} className="text-orange-500" />;
    default:
      return null;
  }
};

export const InventoryLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredData = mockInventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "expiring":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "expired":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "low":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default:
        return "bg-accent/20 text-accent border-accent/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Inventory Log</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-accent hover:bg-accent/80 text-primary px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Stock</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="all">All Categories</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="all">All Status</option>
            <option value="optimal">Optimal</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
            <option value="low">Low Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Item</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Batch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Expiry</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''}`}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-sm text-white/70">{item.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{item.currentQuantity} {item.unit}</td>
                  <td className="px-6 py-4 text-white/70">{item.batchTag}</td>
                  <td className="px-6 py-4 text-white/70">{item.expiryDate}</td>
                  <td className="px-6 py-4 text-white">${item.totalValue.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      <StatusIcon status={item.status} />
                      <span className="capitalize">{item.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <Edit size={16} className="text-white/70" />
                      </button>
                      <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors">
                        <Trash2 size={16} className="text-red-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="text-white/70 text-sm">Total Items</div>
          <div className="text-2xl font-bold text-white">{filteredData.length}</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="text-white/70 text-sm">Total Value</div>
          <div className="text-2xl font-bold text-accent">
            ${filteredData.reduce((sum, item) => sum + item.totalValue, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="text-white/70 text-sm">Expiring Soon</div>
          <div className="text-2xl font-bold text-yellow-400">
            {filteredData.filter(item => item.status === 'expiring').length}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="text-white/70 text-sm">Low Stock</div>
          <div className="text-2xl font-bold text-orange-400">
            {filteredData.filter(item => item.status === 'low').length}
          </div>
        </div>
      </div>
    </div>
  );
};
