// components/Stepper.tsx
import React, { useMemo } from "react";
import { Check } from "lucide-react";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onSave: () => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepChange,
  onSave,
}) => {
  const memoizedSteps = useMemo(
    () =>
      steps.map((step, index) => (
        <div key={index} className="mb-4">
          <button
            className={`flex items-center text-muted-foreground text-sm`}
            onClick={() => onStepChange(index)}
            disabled={index > currentStep}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-base ${
                index < currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {index < currentStep ? <Check /> : index + 1}
            </div>
            <span className={`ml-2 ${index <= currentStep ? "text-muted-foreground" : "text-muted-foreground"}`}>
              {step.title}
            </span>
          </button>
          {index === currentStep && (
            <div className="mt-4">
              {step.content}
              <div className="mt-4 flex space-x-2 items-center justify-end">
                {currentStep > 0 && (
                  <button
                    className="px-4 py-2 text-slate-500 font-medium text-sm hover:bg-slate-100 rounded-md"
                    onClick={() => onStepChange(currentStep - 1)}
                  >
                    Kembali
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    className="px-4 py-2 bg-primary rounded-md text-white text-sm font-medium"
                    onClick={() => onStepChange(currentStep + 1)}
                  >
                    Lanjutkan
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-primary rounded-md text-white text-sm font-medium"
                    onClick={onSave}
                  >
                    Simpan
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )),
    [steps, currentStep, onStepChange, onSave]
  );

  return <div className="flex flex-col">{memoizedSteps}</div>;
};

export default Stepper;
