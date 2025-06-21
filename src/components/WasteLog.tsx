import { useState } from "react";
import { Info, Download, CheckCircle, XCircle } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const kpiCards = [
  {
    label: "Total Discrepancies This Month",
    value: "14",
    subtext: "Discrepancy ≥ ±10%",
    color: "bg-red-600/90",
    tooltip: "Comparison between POS sales and actual inventory change",
    icon: <XCircle className="text-red-200" size={32} />,
  },
  {
    label: "High-Risk Items (Overused)",
    value: "5",
    subtext: "Used more than sold",
    color: "bg-yellow-400/80",
    tooltip: "Comparison between POS sales and actual inventory change",
    icon: <Info className="text-yellow-900" size={32} />,
  },
  {
    label: "Risk Value ($ Loss)",
    value: "$347.20",
    subtext: "Estimated based on unit cost",
    color: "bg-emerald-600/90",
    tooltip: "Comparison between POS sales and actual inventory change",
    icon: <Info className="text-emerald-200" size={32} />,
  },
];

const discrepancyRows = [
  {
    ingredient: "Chicken Breast",
    posSales: 120,
    inventoryUsed: 145,
    delta: 25,
    alert: "high",
    reason: "Overuse",
    percent: 21,
  },
  {
    ingredient: "Cheese Slices",
    posSales: 180,
    inventoryUsed: 160,
    delta: -20,
    alert: "low",
    reason: "Underuse",
    percent: -11,
  },
  {
    ingredient: "Lettuce",
    posSales: 95,
    inventoryUsed: 95,
    delta: 0,
    alert: "normal",
    reason: "–",
    percent: 0,
  },
];

const getAlertBadgeStyles = (alert: string) => {
  switch (alert) {
    case "high":
      return "bg-red-600/20 text-red-400 border-red-500/40";
    case "low":
      return "bg-yellow-400/20 text-yellow-700 border-yellow-400/30";
    case "normal":
    default:
      return "bg-green-500/20 text-green-300 border-green-600/30";
  }
};

const getAlertEmoji = (alert: string) => {
  switch (alert) {
    case "high":
      return "🔴";
    case "low":
      return "🟡";
    case "normal":
    default:
      return "🟢";
  }
};

const getRowGlow = (alert: string) => {
  switch (alert) {
    case "high":
      return "hover:shadow-[0_0_10px_0_rgba(239,68,68,0.3)]";
    case "low":
      return "hover:shadow-[0_0_10px_0_rgba(252,211,77,0.24)]";
    case "normal":
    default:
      return "";
  }
};

const wasteLogRows = [
  {
    date: "June 11",
    item: "Milk",
    qty: 2.0,
    unit: "L",
    reason: "Spoiled",
    staff: "Nour",
    posLinked: true,
  },
  {
    date: "June 10",
    item: "Bread",
    qty: 10,
    unit: "pcs",
    reason: "Over-prep",
    staff: "Elias",
    posLinked: false,
  },
  {
    date: "June 09",
    item: "Tomatoes",
    qty: 3.2,
    unit: "kg",
    reason: "Theft",
    staff: "Dana",
    posLinked: true,
  },
];

// New: Flagged Waste Patterns dummy data
const flaggedTheftRows = [
  {
    ingredient: "Cheese Slices",
    drop: "-12% daily drop",
    evidence: "Logged usage > POS sales",
    alert: "high",
    action: "flag"
  },
  {
    ingredient: "Chicken Breast",
    drop: "Late night variance",
    evidence: "No POS logs past 11PM",
    alert: "medium",
    action: "view"
  },
  {
    ingredient: "Milk",
    drop: "Extra manual edits",
    evidence: "Adjusted 3x without note",
    alert: "high",
    action: "flag"
  }
];
const flaggedExpiryRows = [
  {
    ingredient: "Tomatoes",
    qty: "4.2 kg",
    logged: true,
    remaining: "7.1 kg",
    action: "review"
  },
  {
    ingredient: "Lettuce",
    qty: "3.0 kg",
    logged: false,
    remaining: "2.3 kg",
    action: "log"
  },
  {
    ingredient: "Bread Rolls",
    qty: "1.5 kg",
    logged: false,
    remaining: "0",
    action: "auto"
  }
];
// Helper badge for alert levels in theft section
const getFlaggedAlertBadge = (level: string) => {
  switch (level) {
    case "high": return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold text-xs bg-red-600/20 text-red-400 border-red-500/40">
        High
      </span>
    );
    case "medium": return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold text-xs bg-yellow-400/20 text-yellow-700 border-yellow-400/30">
        Medium
      </span>
    );
    default: return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold text-xs bg-green-500/20 text-green-300 border-green-600/30">
        Normal
      </span>
    );
  }
};

export const WasteLog = () => {
  // Modal for discrepancy row
  const [openDiscrepancyModal, setOpenDiscrepancyModal] = useState<null | typeof discrepancyRows[0]>(null);
  // Modal for manual log
  const [openLogWaste, setOpenLogWaste] = useState(false);

  // New: state for flagged waste pattern modals
  const [openPatternModal, setOpenPatternModal] = useState<null | { type: "theft"|"expiry", idx: number }>(null);

  // --- Waste Log Modal state (dummy, not functional) ---
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [cause, setCause] = useState("Spoiled");
  const [staff, setStaff] = useState("Nour");
  const [posLinked, setPosLinked] = useState(false);

  return (
    <div className="relative min-h-screen px-2 sm:px-6 py-8 bg-[#0D1A2B] font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
        Waste Log &amp; POS Discrepancy Tracking
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {kpiCards.map((card, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className={`${card.color} rounded-xl shadow border border-white/10 px-6 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 relative animate-fade-in`}
              >
                <div className="absolute top-4 right-4">{card.icon}</div>
                <div className="text-3xl font-bold text-white">{card.value}</div>
                <div className="text-base font-medium text-white text-center mb-1">{card.label}</div>
                <div className="text-xs text-white/70">{card.subtext}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-accent border-accent-foreground text-primary">
              {card.tooltip}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Discrepancy Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-8">
        <div className="px-6 py-4">
          <h2 className="text-lg text-white font-semibold mb-2">POS–Inventory Variance Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Ingredient</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">POS Sales</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Inventory Used</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">X − Y (Delta)</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Alert Level</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Reason Detected</th>
              </tr>
            </thead>
            <tbody>
              {discrepancyRows.map((row, idx) => (
                <Tooltip key={row.ingredient}>
                  <TooltipTrigger asChild>
                    <tr
                      className={`transition-colors cursor-pointer select-none ${idx % 2 === 0 ? "bg-white/5" : ""} ${getRowGlow(row.alert)}`}
                      title=""
                      onClick={() => setOpenDiscrepancyModal(row)}
                    >
                      <td className="px-6 py-4 text-white font-medium">{row.ingredient}</td>
                      <td className="px-6 py-4 text-white/90">{row.posSales} units</td>
                      <td className="px-6 py-4 text-white/90">{row.inventoryUsed} units</td>
                      <td className={`px-6 py-4 font-mono font-bold ${
                        row.delta > 0
                          ? "text-red-400"
                          : row.delta < 0
                          ? "text-yellow-400"
                          : "text-green-300"
                      }`}>
                        {row.delta > 0 ? "+" : ""}
                        {row.delta}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-semibold text-xs ${getAlertBadgeStyles(row.alert)}`}>
                          {getAlertEmoji(row.alert)}{" "}
                          {row.alert === "high"
                            ? "High"
                            : row.alert === "low"
                            ? "Low"
                            : "Normal"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/75">{row.reason}</td>
                    </tr>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-accent border-accent-foreground text-primary w-60 text-xs font-medium">
                    This item has a usage mismatch. Investigate source of variance.
                  </TooltipContent>
                </Tooltip>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discrepancy Modal */}
      <Dialog open={!!openDiscrepancyModal} onOpenChange={(open) => !open && setOpenDiscrepancyModal(null)}>
        <DialogContent className="bg-[#142638] border-2 border-teal-400/50 shadow-xl text-white">
          <DialogHeader>
            <DialogTitle>
              Discrepancy Details – {openDiscrepancyModal?.ingredient}
            </DialogTitle>
          </DialogHeader>
          {/* Dummy details */}
          <div className="mb-5">
            <div className="mb-2">
              <span className="inline-block font-semibold text-white/80 mb-1">Timeline (last 3 entries):</span>
              <ul className="text-sm text-white/85 pl-5 list-disc">
                <li>2024-06-11: 5 units removed by Mike (Overuse)</li>
                <li>2024-06-10: 10 units logged by Anna (Over-prep)</li>
                <li>2024-06-09: 7 units on POS, matched inventory</li>
              </ul>
            </div>
            <div className="mb-2">
              <span className="inline-block font-semibold text-white/80 mb-1">Staff Logs:</span>
              <div className="text-sm text-white/85">
                Mike (shift lead), Anna (kitchen), Dana (manager)
              </div>
            </div>
            <div className="mb-2">
              <span className="inline-block font-semibold text-white/80 mb-1">Detected Reason:</span>
              <div className="text-sm text-white/85">{openDiscrepancyModal?.reason}</div>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenDiscrepancyModal(null)}>
              Ignore
            </Button>
            <Button variant="secondary">Log Waste</Button>
            <Button variant="destructive">Flag for Investigation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MANUAL WASTE LOG TABLE */}
      <div className="mt-10 bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-8">
        <div className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg text-white font-semibold mb-2">Logged Waste Entries (Manual)</h2>
          <Button
            variant="default"
            className="bg-accent text-primary px-3 py-2 rounded-lg hover:bg-accent/80"
            onClick={() => setOpenLogWaste(true)}
          >
            + Log New Waste
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Item</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">POS Linked?</th>
              </tr>
            </thead>
            <tbody>
              {wasteLogRows.map((row, idx) => (
                <tr key={row.date + row.item} className={`${idx % 2 === 0 ? "bg-white/5" : ""} hover:shadow-lg transition-shadow`}>
                  <td className="px-6 py-4 text-white font-medium">{row.date}</td>
                  <td className="px-6 py-4 text-white/90">{row.item}</td>
                  <td className="px-6 py-4 text-white/90">{row.qty}</td>
                  <td className="px-6 py-4 text-white/90">{row.unit}</td>
                  <td className="px-6 py-4 text-white/80">{row.reason}</td>
                  <td className="px-6 py-4 text-white/70">{row.staff}</td>
                  <td className="px-6 py-4">
                    {row.posLinked ? (
                      <CheckCircle className="text-green-400" size={20} aria-label="POS Linked" />
                    ) : (
                      <XCircle className="text-red-400" size={20} aria-label="Not Linked" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Waste Modal */}
      <Dialog open={openLogWaste} onOpenChange={setOpenLogWaste}>
        <DialogContent className="bg-[#142638] border-2 border-teal-400/50 shadow-xl text-white">
          <DialogHeader>
            <DialogTitle>New Waste Entry</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-xs text-white/70 mb-1">Ingredient</label>
              <input className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white" value={selectedIngredient} onChange={e=>setSelectedIngredient(e.target.value)} placeholder="Select ingredient" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-white/70 mb-1">Quantity</label>
                <input type="number" className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white" value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="0.0" />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Unit</label>
                <select value={unit} onChange={e=>setUnit(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white">
                  <option>kg</option>
                  <option>pcs</option>
                  <option>L</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Cause</label>
              <select value={cause} onChange={e=>setCause(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white">
                <option>Spoiled</option>
                <option>Over-prep</option>
                <option>Theft</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Staff</label>
              <input className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white" value={staff} onChange={e=>setStaff(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="pos-linked" checked={posLinked} onChange={e=>setPosLinked(e.target.checked)} className="accent-accent h-4 w-4" />
              <label htmlFor="pos-linked" className="text-xs text-white/70">POS Linked?</label>
            </div>
            <DialogFooter>
              <Button variant="secondary" type="button" onClick={() => setOpenLogWaste(false)}>
                Cancel
              </Button>
              <Button variant="default" type="button" onClick={() => setOpenLogWaste(false)}>
                Save Entry
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─────────────── Flagged Waste Patterns SECTION ─────────────── */}
      <section className="max-w-full mt-4 mb-28">
        {/* Summary Bar */}
        <div className="w-full flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4">
          <div className="flex items-center gap-2 bg-red-600/90 text-white font-semibold px-4 py-2 rounded-lg shadow text-sm">
            <span>Potential Theft Cases Detected:</span>
            <span className="font-bold">{flaggedTheftRows.length} items</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-400/80 text-yellow-900 font-semibold px-4 py-2 rounded-lg shadow text-sm">
            <span>Unlogged Expiry Waste:</span>
            <span className="font-bold">{flaggedExpiryRows.filter(r=>!r.logged).length} ingredients</span>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* A. Potential Theft Indicators */}
          <div className="flex-1 min-w-[330px]">
            <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-2">
              Potential Theft Indicators
            </h3>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full divide-y divide-white/10">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Ingredient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Drop Pattern</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Evidence Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">Alert Level</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          Detected mismatch between POS activity and real inventory usage.
                        </TooltipContent>
                      </Tooltip>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedTheftRows.map((row, idx) => (
                    <tr key={row.ingredient}
                        className={`${idx % 2 === 0 ? "bg-white/5" : ""} hover:shadow-[0_0_10px_0_rgba(239,68,68,0.13)] cursor-pointer transition-shadow`}>
                      <td className="px-4 py-3 text-white">{row.ingredient}</td>
                      <td className="px-4 py-3 text-white/90">{row.drop}</td>
                      <td className="px-4 py-3 text-white/80">{row.evidence}</td>
                      <td className="px-4 py-3">{getFlaggedAlertBadge(row.alert)}</td>
                      <td className="px-4 py-3">
                        {row.action === "flag" ? (
                          <button
                            className="rounded bg-red-500/90 hover:bg-red-700/80 px-3 py-1 text-xs font-bold text-white shadow border-none"
                            onClick={() => setOpenPatternModal({type:'theft', idx})}
                            type="button"
                          >Flag</button>
                        ) : (
                          <button
                            className="rounded bg-yellow-400/80 hover:bg-yellow-300 px-3 py-1 text-xs font-bold text-yellow-950 shadow border-none"
                            onClick={() => setOpenPatternModal({type:'theft', idx})}
                            type="button"
                          >View</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Expiry-Related Waste Tracker */}
          <div className="flex-1 min-w-[330px]">
            <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-2">
              Expiry-Related Waste Tracker
            </h3>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full divide-y divide-white/10">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Ingredient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Qty Expired</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Logged Waste?</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Remaining Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/70">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedExpiryRows.map((row, idx) => (
                    <tr key={row.ingredient}
                        className={`${idx % 2 === 0 ? "bg-white/5" : ""} hover:shadow-[0_0_8px_0_rgba(252,211,77,0.14)]`}>
                      <td className="px-4 py-3 text-white">{row.ingredient}</td>
                      <td className="px-4 py-3 text-white/90">{row.qty}</td>
                      <td className="px-4 py-3">
                        {row.logged ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold text-xs bg-green-500/20 text-green-300 border-green-600/30">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold text-xs bg-red-600/20 text-red-400 border-red-500/40">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/80">{row.remaining}</td>
                      <td className="px-4 py-3">
                        {row.action === "review" ? (
                          <button
                            className="rounded bg-sky-500/90 hover:bg-sky-700/80 px-3 py-1 text-xs font-bold text-white shadow border-none"
                            onClick={() => setOpenPatternModal({type:'expiry', idx})}
                            type="button"
                          >Review</button>
                        ) : row.action === "log" ? (
                          <button
                            className="rounded bg-yellow-400/90 hover:bg-yellow-300 px-3 py-1 text-xs font-bold text-yellow-950 shadow border-none"
                            onClick={() => setOpenPatternModal({type:'expiry', idx})}
                            type="button"
                          >Log Now</button>
                        ) : (
                          <button
                            className="rounded bg-neutral-300/90 hover:bg-neutral-400 px-3 py-1 text-xs font-bold text-gray-700 shadow border-none"
                            type="button"
                          >Auto-Log</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Alert Modal (Theft/Expiry details) */}
      <Dialog open={!!openPatternModal} onOpenChange={(opened) => !opened && setOpenPatternModal(null)}>
        <DialogContent className="bg-[#142638] border-2 border-teal-400/50 shadow-xl text-white max-w-lg">
          <DialogHeader>
            {openPatternModal?.type === "theft" ? (
              <DialogTitle>
                Potential Theft Detail – {flaggedTheftRows[openPatternModal.idx].ingredient}
              </DialogTitle>
            ): openPatternModal?.type === "expiry" ? (
              <DialogTitle>
                Expiry Waste Review – {flaggedExpiryRows[openPatternModal.idx].ingredient}
              </DialogTitle>
            ): ""}
          </DialogHeader>
          <div className="space-y-4 text-white/90 mt-2">
            {openPatternModal?.type === "theft" && (
              <div>
                <div className="mb-2">
                  <span className="block font-semibold text-white/80 mb-1">Drop Pattern:</span>
                  <span className="ml-2">{flaggedTheftRows[openPatternModal.idx].drop}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold text-white/80 mb-1">Evidence Type:</span>
                  <span className="ml-2">{flaggedTheftRows[openPatternModal.idx].evidence}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold text-white/80 mb-1">Alert Level:</span>
                  {getFlaggedAlertBadge(flaggedTheftRows[openPatternModal.idx].alert)}
                </div>
                <div>
                  <span className="block font-semibold text-white/80 mb-1">Suggested Action:</span>
                  <span className="ml-2">Investigate staff log-ins, verify manual usage entries outside business hours.</span>
                </div>
              </div>
            )}
            {openPatternModal?.type === "expiry" && (
              <div>
                <div className="mb-2">
                  <span className="block font-semibold text-white/80 mb-1">Qty Expired:</span>
                  <span className="ml-2">{flaggedExpiryRows[openPatternModal.idx].qty}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold text-white/80 mb-1">Waste Logged?</span>
                  <span className="ml-2">{flaggedExpiryRows[openPatternModal.idx].logged ? "Yes" : "No"}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold text-white/80 mb-1">Remaining Stock:</span>
                  <span className="ml-2">{flaggedExpiryRows[openPatternModal.idx].remaining}</span>
                </div>
                <div>
                  <span className="block font-semibold text-white/80 mb-1">Suggested Action:</span>
                  <span className="ml-2">
                    {flaggedExpiryRows[openPatternModal.idx].logged
                      ? "No action needed."
                      : flaggedExpiryRows[openPatternModal.idx].remaining !== "0"
                        ? "Log the expired waste to keep inventory accurate."
                        : "Auto-log function will remove expired units."}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenPatternModal(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EXPORT SECTION */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-40">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="lg"
              className="bg-accent text-primary relative group hover:bg-accent/80 transition-all w-60 text-nowrap px-2 text-sm font-medium"
            >
              <Download className="mr-2" />
              Download Discrepancy Log (CSV)
              <span className="absolute inset-0 rounded-lg ring-accent transition-all pointer-events-none group-hover:ring-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-accent border-accent-foreground text-primary">
            Export a snapshot of current waste and discrepancies
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="bg-[#0D1A2B] text-white border-white/15 hover:bg-white/5 w-60 text-nowrap px-2 text-sm font-medium"
            >
              <Download className="mr-2" />
              Download Waste Entries (CSV)
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-accent border-accent-foreground text-primary">
            Export a snapshot of current waste and discrepancies
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
