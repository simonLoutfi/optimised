import { useState } from "react";
import { Button } from "@/components/ui/button";
const templateUrl = "#"; // Not a real file.

const mockRows = [
  { name: "Tomato", category: "Produce", unit: "kg", cost: "2.50", expiry: "5", reorder: "10" },
  { name: "Beef Patty", category: "Meat", unit: "kg", cost: "10.00", expiry: "3", reorder: "5" },
];

const categories = ["Produce", "Meat", "Dairy", "Bakery", "Other"];
const units = ["kg", "L", "pcs", "g"];

export default function StepIngredients({
  onNext,
  onBack,
  isFirstStep,
}: {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
}) {
  const [showCSV, setShowCSV] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [rows, setRows] = useState([
    { name: "", category: "", unit: "", cost: "", expiry: "", reorder: "" },
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="font-semibold text-[#0D1A2B]">Choose how to add ingredients:</label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={showCSV ? "default" : "outline"}
            onClick={() => setShowCSV(true)}
            className={`rounded-full border-2 ${showCSV ? "bg-[#3CE8B3] text-white border-[#3CE8B3]" : "bg-white text-[#0D1A2B] border-[#3CE8B3]"}`}
          >
            Upload CSV
          </Button>
          <Button
            type="button"
            variant={!showCSV ? "default" : "outline"}
            onClick={() => setShowCSV(false)}
            className={`rounded-full border-2 ${!showCSV ? "bg-[#3CE8B3] text-white border-[#3CE8B3]" : "bg-white text-[#0D1A2B] border-[#3CE8B3]"}`}
          >
            Manual Entry
          </Button>
        </div>
      </div>
      {showCSV ? (
        <div className="flex flex-col gap-2">
          <div className="mb-2 flex items-center gap-3">
            <Button
              type="button"
              className="rounded-full bg-[#3CE8B3] text-white font-bold px-6 hover:bg-[#36cfa0]"
              onClick={() => window.open(templateUrl, "_blank")}
            >
              Download Template
            </Button>
            <input
              type="file"
              className="rounded bg-white border border-gray-300 px-3 py-2"
              onChange={() => setUploaded(true)}
              accept=".csv"
            />
          </div>
          {uploaded && (
            <div className="bg-gray-50 border rounded mt-4 p-3">
              <div className="font-semibold mb-2 text-[#0D1A2B]">CSV Preview:</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th>Ingredient</th>
                    <th>Category</th>
                    <th>Unit</th>
                    <th>Cost/Unit</th>
                    <th>Expiry (Days)</th>
                    <th>Reorder Level</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.name}</td>
                      <td>{row.category}</td>
                      <td>{row.unit}</td>
                      <td>${row.cost}</td>
                      <td>{row.expiry}</td>
                      <td>{row.reorder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-3 w-full overflow-x-auto">
          <table className="w-full min-w-[750px] border text-sm bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="whitespace-nowrap px-3 py-2">Ingredient Name</th>
                <th className="whitespace-nowrap px-3 py-2">Category</th>
                <th className="whitespace-nowrap px-3 py-2">Unit</th>
                <th className="whitespace-nowrap px-3 py-2">Cost/Unit</th>
                <th className="whitespace-nowrap px-3 py-2">Expiry (Days)</th>
                <th className="whitespace-nowrap px-3 py-2">Reorder Level</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="whitespace-nowrap px-3 py-2">
                    <input
                      className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none w-full"
                      placeholder="Name"
                      value={row.name}
                      onChange={e =>
                        setRows(r =>
                          r.map((rr, i) => i === idx ? { ...rr, name: e.target.value } : rr
                        ))
                      }
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <select
                      className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none w-full"
                      value={row.category}
                      onChange={e =>
                        setRows(r =>
                          r.map((rr, i) =>
                            i === idx ? { ...rr, category: e.target.value } : rr
                          )
                        )
                      }
                    >
                      <option value="">–</option>
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <select
                      className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none w-full"
                      value={row.unit}
                      onChange={e =>
                        setRows(r =>
                          r.map((rr, i) =>
                            i === idx ? { ...rr, unit: e.target.value } : rr
                          )
                        )
                      }
                    >
                      <option value="">–</option>
                      {units.map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <input
                      type="number"
                      className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none w-full"
                      placeholder="0.00"
                      value={row.cost}
                      onChange={e =>
                        setRows(r =>
                          r.map((rr, i) =>
                            i === idx ? { ...rr, cost: e.target.value } : rr
                          )
                        )
                      }
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <input
                      type="number"
                      className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none w-full"
                      placeholder="Days"
                      value={row.expiry}
                      onChange={e =>
                        setRows(r =>
                          r.map((rr, i) =>
                            i === idx ? { ...rr, expiry: e.target.value } : rr
                          )
                        )
                      }
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <input
                      type="number"
                      className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none w-full"
                      placeholder="Level"
                      value={row.reorder}
                      onChange={e =>
                        setRows(r =>
                          r.map((rr, i) =>
                            i === idx ? { ...rr, reorder: e.target.value } : rr
                          )
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            type="button"
            className="mt-3 rounded-full bg-[#3CE8B3] text-white font-bold px-6 hover:bg-[#36cfa0]"
            onClick={() =>
              setRows(r => [...r, { name: "", category: "", unit: "", cost: "", expiry: "", reorder: "" }])
            }
          >
            + Add Another Ingredient
          </Button>
        </div>
      )}
      <div className="flex justify-between mt-2">
        <Button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className="rounded-full px-6 py-2 bg-gray-200 text-gray-900 font-bold hover:bg-gray-300"
        >
          Back
        </Button>
        <Button
          type="button"
          className="rounded-full px-8 py-2 bg-[#3CE8B3] text-white font-bold hover:bg-[#36cfa0]"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
