
type Props = {
  step: number;
  maxSteps: number;
};
export default function ProgressBar({ step, maxSteps }: Props) {
  const percent = ((step - 1) / (maxSteps - 1)) * 100;
  return (
    <div className="w-full fixed top-0 left-0 z-30 bg-[#0D1A2B]">
      <div className="mx-auto max-w-3xl">
        <div className="flex justify-between items-center pt-6 px-4">
          <span className="text-white text-base font-bold">{`Step ${step} of ${maxSteps}`}</span>
          <span className="text-white text-base tracking-tight">Setup Wizard</span>
        </div>
        <div className="w-full mt-2 h-2 bg-gray-200 rounded-full overflow-hidden shadow">
          <div
            className="h-2 transition-all bg-[#3CE8B3]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
