import { CheckCircle, Circle } from "lucide-react";

export interface Step {
  id: number;
  name: string;
  description: string;
  status: "current" | "pending" | "completed";
}

interface KycStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function KycSteps({ steps, currentStep, onStepClick }: KycStepsProps) {
  return (
    <div className='w-full'>
      <ol className='flex flex-col md:flex-row md:space-x-5'>
        {steps.map((step, index) => {
          const isCurrent = step.status === "current";
          const isCompleted = step.status === "completed";

          return (
            <li
              key={step.id}
              className={`relative flex-1 ${
                index !== steps.length - 1 ? "pb-8 md:pb-0" : ""
              }`}>
              <div
                className={`
                  flex items-center cursor-pointer
                  ${
                    isCompleted || isCurrent
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-70"
                  }
                `}
                onClick={() => onStepClick(step.id)}>
                <div
                  className={`
                  flex items-center justify-center h-8 w-8 rounded-full
                  ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                      ? "bg-blue-500"
                      : "bg-gray-700"
                  }
                  ${index !== steps.length - 1 ? "md:relative md:z-10" : ""}
                `}>
                  {isCompleted ? (
                    <CheckCircle className='h-5 w-5 text-white' />
                  ) : (
                    <Circle className='h-5 w-5 text-white' />
                  )}
                </div>

                <div className='ml-3'>
                  <span
                    className={`
                    text-sm font-medium
                    ${
                      isCompleted
                        ? "text-green-500"
                        : isCurrent
                        ? "text-blue-500"
                        : "text-gray-400"
                    }
                  `}>
                    Step {step.id}
                  </span>
                  <span className='block text-white font-medium'>
                    {step.name}
                  </span>
                  <span className='block text-sm text-white/60'>
                    {step.description}
                  </span>
                </div>
              </div>

              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div
                  className={`
                    hidden md:block absolute top-4 left-4 w-full h-0.5 -translate-y-1/2
                    ${isCompleted ? "bg-green-500" : "bg-gray-700"}
                  `}
                  style={{ transform: "translateX(2rem)" }}></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
