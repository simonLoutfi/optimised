
import { useState } from "react";
import { Settings, Database, Bell, Users, Utensils, Building, Save, AlertCircle } from "lucide-react";

export const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    lowStockThreshold: 5,
    expiryAlertDays: 3,
    wasteThreshold: 15,
    currency: "USD",
    language: "en",
    timezone: "UTC",
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    pos: {
      system: "Square",
      apiKey: "sk_test_***************",
      connected: true
    },
    branches: [
      { id: "1", name: "Main Restaurant", address: "123 Main St", active: true },
      { id: "2", name: "Downtown Branch", address: "456 Oak Ave", active: false }
    ]
  });

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "pos", label: "POS Integration", icon: Database },
    { id: "alerts", label: "Alerts & Notifications", icon: Bell },
    { id: "users", label: "User Management", icon: Users },
    { id: "recipes", label: "Recipe Configuration", icon: Utensils },
    { id: "branches", label: "Multi-Branch", icon: Building }
  ];

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    setSettings(prev => {
      const newSettings = { ...prev };
      let current = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">General Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Low Stock Threshold (%)</label>
            <input
              type="number"
              value={settings.lowStockThreshold}
              onChange={(e) => updateSetting('lowStockThreshold', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Expiry Alert (Days)</label>
            <input
              type="number"
              value={settings.expiryAlertDays}
              onChange={(e) => updateSetting('expiryAlertDays', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Waste Threshold (%)</label>
            <input
              type="number"
              value={settings.wasteThreshold}
              onChange={(e) => updateSetting('wasteThreshold', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => updateSetting('currency', e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="LBP">LBP (ل.ل)</option>
              <option value="SAR">SAR (﷼)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => updateSetting('timezone', e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Beirut">Beirut (GMT+2)</option>
              <option value="Asia/Dubai">Dubai (GMT+4)</option>
              <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPOSSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">POS Integration</h3>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Database size={24} className="text-accent" />
            <div>
              <h4 className="text-lg font-semibold text-white">Current POS System</h4>
              <p className="text-white/70">{settings.pos.system}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm ${settings.pos.connected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {settings.pos.connected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">POS System</label>
            <select
              value={settings.pos.system}
              onChange={(e) => updateSetting('pos.system', e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="Square">Square</option>
              <option value="Toast">Toast</option>
              <option value="Clover">Clover</option>
              <option value="Lightspeed">Lightspeed</option>
              <option value="Resy">Resy</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">API Key</label>
            <input
              type="password"
              value={settings.pos.apiKey}
              onChange={(e) => updateSetting('pos.apiKey', e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
              placeholder="Enter your POS API key"
            />
          </div>
          
          <div className="flex space-x-3">
            <button className="bg-accent hover:bg-accent/80 text-primary px-4 py-2 rounded-lg transition-colors">
              Test Connection
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Reconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlertSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Alerts & Notifications</h3>
      
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Notification Channels</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => updateSetting('notifications.email', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent"
              />
              <span className="text-white">Email Notifications</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => updateSetting('notifications.push', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent"
              />
              <span className="text-white">Push Notifications</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => updateSetting('notifications.sms', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent"
              />
              <span className="text-white">SMS Notifications</span>
            </label>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Alert Types</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white">Low Stock Alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Expiry Warnings</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">High Variance Alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Theft Suspicion</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "pos":
        return renderPOSSettings();
      case "alerts":
        return renderAlertSettings();
      case "users":
        return (
          <div className="text-center py-12">
            <Users size={48} className="text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">User Management</h3>
            <p className="text-white/70">Manage staff roles and permissions</p>
          </div>
        );
      case "recipes":
        return (
          <div className="text-center py-12">
            <Utensils size={48} className="text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Recipe Configuration</h3>
            <p className="text-white/70">Link menu items to ingredient usage</p>
          </div>
        );
      case "branches":
        return (
          <div className="text-center py-12">
            <Building size={48} className="text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Multi-Branch Management</h3>
            <p className="text-white/70">Configure multiple restaurant locations</p>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">System Settings</h1>
        <button className="bg-accent hover:bg-accent/80 text-primary px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-accent/20 text-accent"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            {renderActiveContent()}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">Database Connected</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">POS Integration Active</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-white">Backup Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};
