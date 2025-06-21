
import React, { useState } from "react";
import { Download } from "lucide-react";
import { VarianceFilterBar } from "./VarianceFilterBar";
import { VarianceWasteChart } from "./VarianceWasteChart";
import { VarianceComparisonTable } from "./VarianceComparisonTable";
import { VarianceForecastModal } from "./VarianceForecastModal";
import { VarianceForecastSidebar } from "./VarianceForecastSidebar";

const ingredientsList = [
  { name: "Chicken", icon: "🥩" },
  { name: "Tomatoes", icon: "🍅" },
  { name: "Cheese", icon: "🧀" },
];

const tableData = [
  {
    ingredient: "Chicken",
    waste2023: 18.3,
    waste2024: 26.1,
    pctChange: 43,
    trend: "up" as const,
    forecast: "Reduce reorder by 12%",
    alert: { label: "High", emoji: "🔴" },
    posDishes: ["Chicken Wrap", "Burger"],
    forecastMsg: "Waste rose by 43% in 2024. System recommends reducing reorder by 12% for Q3."
  },
  {
    ingredient: "Tomatoes",
    waste2023: 12.2,
    waste2024: 11.5,
    pctChange: -6,
    trend: "down" as const,
    forecast: "Increase reorder by 6%",
    alert: { label: "Improved", emoji: "🟢" },
    posDishes: ["Veggie Sandwich", "BLT"],
    forecastMsg: "Waste fell by 6% in 2024. Increase reorders by 6% to meet sales demand."
  },
  {
    ingredient: "Cheese",
    waste2023: 8.7,
    waste2024: 9.1,
    pctChange: 5,
    trend: "neutral" as const,
    forecast: "Keep current volume",
    alert: { label: "Neutral", emoji: "🟡" },
    posDishes: ["Grilled Cheese", "Cheesy Nachos"],
    forecastMsg: "Waste changed minimally. Maintain current order levels."
  },
];

const chartData = [
  // Jan–Dec (mock data, total waste, in kg for each year)
  { month: "Jan", w2023: 72, w2024: 85 },
  { month: "Feb", w2023: 68, w2024: 79 },
  { month: "Mar", w2023: 85, w2024: 104 },
  { month: "Apr", w2023: 77, w2024: 95 },
  { month: "May", w2023: 64, w2024: 76 },
  { month: "Jun", w2023: 92, w2024: 99 },
  { month: "Jul", w2023: 86, w2024: 112 },
  { month: "Aug", w2023: 81, w2024: 101 },
  { month: "Sep", w2023: 73, w2024: 85 },
  { month: "Oct", w2023: 80, w2024: 93 },
  { month: "Nov", w2023: 69, w2024: 81 },
  { month: "Dec", w2023: 87, w2024: 118 },
];

export const VarianceReports = () => {
  // FILTERS
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showForecast, setShowForecast] = useState(true);

  // MODAL
  const [modalRow, setModalRow] = useState<null | typeof tableData[0]>(null);

  // Simulate PDF download loading
  const [pdfLoading, setPdfLoading] = useState(false);
  const handleDownloadPDF = () => {
    setPdfLoading(true);
    setTimeout(() => setPdfLoading(false), 1200);
  };

  // Filtering for table (ingredient multi-select visual)
  const filteredTable = selectedIngredients.length === 0
    ? tableData
    : tableData.filter(row => selectedIngredients.includes(row.ingredient));

  return (
    <div className="flex flex-col md:flex-row min-h-[100vh] bg-[#0D1A2B] relative">
      {/* MAIN COL */}
      <div className="flex-1 md:pr-6 space-y-4 pb-8">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between pt-8 pb-2 px-4 md:px-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Variance Reports &amp; Forecasting</h1>
          </div>
          <button
            className="bg-accent px-5 py-2 rounded-lg flex items-center gap-2 text-primary font-medium hover:bg-accent/80 shadow transition disabled:opacity-60"
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            title="Export this full table as a PDF for print or email"
          >
            <Download size={18} />
            {pdfLoading ? (
              <span className="animate-pulse">Generating PDF…</span>
            ) : (
              <span>Download Full Report (PDF)</span>
            )}
          </button>
        </div>

        {/* Filter Bar */}
        <VarianceFilterBar
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          showForecast={showForecast}
          setShowForecast={setShowForecast}
          ingredientsList={ingredientsList}
        />

        {/* Trend Chart */}
        <VarianceWasteChart chartData={chartData} />

        {/* Main Table */}
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold text-white mb-2 px-2 sm:px-0">Year-over-Year Waste Comparison</h3>
          <VarianceComparisonTable
            rows={filteredTable}
            showForecast={showForecast}
            onRowClick={setModalRow}
          />
        </div>
      </div>

      {/* RIGHT SIDEBAR (Desktop) */}
      <div className="min-w-[280px] w-full md:w-[350px] pt-8 pr-4 md:sticky md:top-0">
        <VarianceForecastSidebar />
      </div>

      {/* Modal (Forecast Details) */}
      {modalRow && (
        <VarianceForecastModal
          open={!!modalRow}
          onOpenChange={(open) => { if (!open) setModalRow(null); }}
          row={modalRow}
        />
      )}
    </div>
  );
}
