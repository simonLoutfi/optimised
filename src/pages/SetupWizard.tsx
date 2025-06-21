
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/setup/ProgressBar";
import StepPOS from "@/components/setup/StepPOS";
import StepIngredients from "@/components/setup/StepIngredients";
import StepRecipes from "@/components/setup/StepRecipes";
import StepTeam from "@/components/setup/StepTeam";
import { toast } from "@/components/ui/use-toast";

const steps = [
  { label: "POS Integration", component: StepPOS },
  { label: "Add Ingredients", component: StepIngredients },
  { label: "Map Recipes", component: StepRecipes },
  { label: "Invite Team", component: StepTeam },
];

export default function SetupWizard() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      toast({
        title: "✅ Setup Complete! Welcome to OptiMised.",
      });
      setTimeout(() => navigate("/dashboard"), 600); // short delay for toast
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSkip = () => handleNext();

  const CurrentStep = steps[step].component;

  return (
    <div className="min-h-screen bg-[#0D1A2B] flex flex-col items-center font-sans">
      <ProgressBar step={step + 1} maxSteps={steps.length} />
      <div className="flex-1 flex w-full justify-center items-center px-2 py-10">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 md:p-12 flex flex-col gap-8 transition-all animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-center text-[#0D1A2B]">
            {steps[step].label}
          </h2>
          <CurrentStep
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            isFirstStep={step === 0}
          />
        </div>
      </div>
    </div>
  );
}
