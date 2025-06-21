
import React from "react";

interface Props {
  selectedTimeframe: string;
  setSelectedTimeframe: (tf: string) => void;
  selectedIngredients: string[];
  setSelectedIngredients: (list: string[]) => void;
  showForecast: boolean;
  setShowForecast: (on: boolean) => void;
  ingredientsList: { name: string; icon: string }[];
}

export const VarianceFilterBar: React.FC<Props> = ({
  selectedTimeframe,
  setSelectedTimeframe,
  selectedIngredients,
  setSelectedIngredients,
  showForecast,
  setShowForecast,
  ingredientsList,
}) => {
  // Multi-select visuals only
  const onToggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((v) => v !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-stretch bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-2">
      {/* Timeframe Dropdown */}
      <select
        className="rounded-lg px-4 py-2 bg-white/10 text-white focus:outline-accent border border-white/10"
        value={selectedTimeframe}
        onChange={e => setSelectedTimeframe(e.target.value)}
      >
        <option>This Month</option>
        <option>This Quarter</option>
        <option>This Year</option>
        <option>Last Year</option>
        <option>Custom Range</option>
      </select>

      {/* Ingredient Multi-Selector */}
      <div className="flex items-center gap-2">
        <span className="text-white/70 font-medium text-sm hidden sm:inline">Ingredients:</span>
        <div className="flex flex-wrap gap-1">
          {ingredientsList.map(({ name, icon }) => {
            const active = selectedIngredients.includes(name);
            return (
              <button
                type="button"
                key={name}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-white/10 border ${active ? "border-accent bg-white/20 text-accent font-semibold" : "border-white/5 text-white/80"} hover:bg-accent/20 transition`}
                onClick={() => onToggleIngredient(name)}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </button>
            );
          })}
          {ingredientsList.length === 0 && (
            <span className="text-white/60">Select Ingredients</span>
          )}
        </div>
      </div>

      {/* Forecast Toggle */}
      <button
        type="button"
        className={`ml-auto flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition ${showForecast ? "text-accent" : "text-white/60"}`}
        onClick={() => setShowForecast(!showForecast)}
        title="Toggle forecast recommendations"
      >
        <span className="relative flex items-center">
          <span className="block w-7 h-4 bg-white/20 rounded-full mr-2" />
          <span className={`block w-4 h-4 rounded-full transition ${showForecast ? "bg-accent translate-x-3" : "bg-gray-400"} absolute left-0 top-0`} />
        </span>
        Show Forecast Recommendations
      </button>
    </div>
  )
}
