
import React, { useState } from "react";
import { Download } from "lucide-react";

export const VarianceForecastSidebar = () => {
  const [loading, setLoading] = useState(false);
  const flags = [
    {
      ingredient: "Chicken",
      emoji: "🔴",
      message: "Over-ordering trend → reduce by 12%",
      color: "text-red-400",
    },
    {
      ingredient: "Tomatoes",
      emoji: "🟢",
      message: "Under-ordered last year → increase by 6%",
      color: "text-green-400",
    },
    {
      ingredient: "Cheese",
      emoji: "🟡",
      message: "Consistent usage → maintain levels",
      color: "text-yellow-500",
    },
  ];

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1150);
  };

  return (
    <div className="sticky top-8">
      <div className="bg-white/10 border border-white/20 rounded-lg shadow p-5 mb-6">
        <div className="font-semibold text-white text-lg mb-3">Top Forecast Flags</div>
        <div className="space-y-2 mb-4">
          {flags.map(f => (
            <div key={f.ingredient} className="flex items-center gap-2 rounded p-2">
              <span className={`text-xl ${f.color}`}>{f.emoji}</span>
              <span className="font-medium text-white">{f.ingredient}:</span>
              <span className="text-white/80">{f.message}</span>
            </div>
          ))}
        </div>
        <button
          className="bg-accent px-4 py-2 rounded-lg flex items-center gap-2 text-primary font-semibold mt-2 hover:bg-accent/80 transition disabled:opacity-60"
          onClick={handleDownload}
          disabled={loading}
        >
          <Download size={16} />
          {loading ? <span className="animate-pulse">Generating PDF…</span> : "Generate Forecast Sheet (PDF)"}
        </button>
      </div>
    </div>
  );
};
