
import { useState } from "react";
import { Button } from "@/components/ui/button";

const mockMenu = [
  { name: "Chicken Burger", ingredients: [
    { name: "Bun", qty: "1", unit: "pcs"},
    { name: "Chicken", qty: "200", unit: "g"},
    { name: "Lettuce", qty: "20", unit: "g"},
  ]},
  { name: "Veggie Pizza", ingredients: [
    { name: "Dough", qty: "1", unit: "pcs"},
    { name: "Tomato", qty: "50", unit: "g"},
    { name: "Cheese", qty: "100", unit: "g"},
  ]},
];

const allIngredients = [
  "Tomato", "Beef Patty", "Bun", "Chicken", "Lettuce", "Dough", "Cheese"
];

const units = ["g", "kg", "L", "pcs"];

export default function StepRecipes({
  onNext,
  onBack,
  isFirstStep,
}: {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
}) {
  const [menuItems, setMenuItems] = useState(mockMenu);

  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-[#0D1A2B]">Map Recipes to Ingredients</div>
      <div className="flex flex-col gap-4">
        {menuItems.map((item, idx) => (
          <div key={idx} className="mb-3 p-4 border rounded shadow bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <input
                className="font-bold text-base border-b-2 bg-gray-50 focus:border-b-[#3CE8B3] px-2 py-1 rounded outline-none"
                defaultValue={item.name}
                placeholder="Menu Item Name"
                readOnly
              />
              <Button className="rounded-full px-3 py-1 bg-[#3CE8B3] text-white font-semibold text-xs">
                + Add Ingredient
              </Button>
            </div>
            {item.ingredients.map((ing, ii) => (
              <div key={ii} className="flex gap-2 items-center mb-2 flex-wrap">
                <select className="bg-white border border-gray-300 rounded px-2 py-1 focus:border-[#3CE8B3]">
                  <option>{ing.name}</option>
                  {allIngredients.filter(a => a !== ing.name).map(i => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                <input
                  className="w-20 bg-white border border-gray-300 rounded px-2 py-1 focus:border-[#3CE8B3]"
                  type="number"
                  placeholder="Qty"
                  value={ing.qty}
                  readOnly
                />
                <select className="bg-white border border-gray-300 rounded px-2 py-1 focus:border-[#3CE8B3]">
                  <option>{ing.unit}</option>
                  {units.filter(u => u !== ing.unit).map(u => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
        <div className="text-right">
          <Button className="rounded-full bg-[#3CE8B3] text-white font-bold px-6 hover:bg-[#36cfa0]">
            + New Menu Item
          </Button>
        </div>
      </div>
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
