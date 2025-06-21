
import { useState } from "react";
import { Button } from "@/components/ui/button";

const posOptions = [
  "POSRocket (Lebanon)",
  "SnapSystems",
  "PointCheckout",
  "Other",
];

export default function StepPOS({
  onNext,
  onSkip,
  onBack,
  isFirstStep,
}: {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  isFirstStep: boolean;
}) {
  const [selectedPOS, setSelectedPOS] = useState("");
  const [otherPOS, setOtherPOS] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [skip, setSkip] = useState(false);

  const showApiKey = 
    selectedPOS === "POSRocket (Lebanon)" ||
    selectedPOS === "SnapSystems" ||
    selectedPOS === "PointCheckout";

  return (
    <form
      className="flex flex-col gap-6"
      tabIndex={-1}
      onSubmit={(e) => {
        e.preventDefault();
        skip ? onSkip() : onNext();
      }}
    >
      <div className="flex flex-col gap-2">
        <label className="font-semibold mb-1 text-[#0D1A2B]">Select POS Provider</label>
        <select
          className="rounded border border-gray-300 focus:border-[#3CE8B3] focus:ring-2 focus:ring-[#3CE8B3] bg-white py-2 px-3 text-[#0D1A2B] font-medium"
          value={selectedPOS}
          onChange={(e) => setSelectedPOS(e.target.value)}
        >
          <option value="">Select...</option>
          {posOptions.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
        {selectedPOS === "Other" && (
          <input
            type="text"
            className="mt-2 rounded border border-gray-300 focus:border-[#3CE8B3] focus:ring-2 focus:ring-[#3CE8B3] bg-white py-2 px-3 text-[#0D1A2B] font-medium"
            value={otherPOS}
            onChange={(e) => setOtherPOS(e.target.value)}
            placeholder="Enter POS name"
          />
        )}
        {showApiKey && (
          <input
            type="text"
            className="mt-2 rounded border border-gray-300 focus:border-[#3CE8B3] focus:ring-2 focus:ring-[#3CE8B3] bg-white py-2 px-3 text-[#0D1A2B] font-medium"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API Key (optional)"
          />
        )}
      </div>
      <div className="flex items-center mt-2 space-x-2">
        <input
          type="checkbox"
          id="skip-pos"
          checked={skip}
          onChange={() => setSkip(!skip)}
          className="accent-[#3CE8B3] scale-125"
        />
        <label htmlFor="skip-pos" className="text-gray-700 cursor-pointer">Skip this step</label>
      </div>
      <div className="flex justify-between mt-4">
        <Button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className="rounded-full px-6 py-2 bg-gray-200 text-gray-900 font-bold hover:bg-gray-300 border-none"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="rounded-full px-8 py-2 bg-[#3CE8B3] text-white font-bold hover:bg-[#36cfa0] transition-all"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
