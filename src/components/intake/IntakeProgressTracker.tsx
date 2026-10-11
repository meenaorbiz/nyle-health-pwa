"use client";

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  percentage: number;
  estimatedMins: number;
}

export default function IntakeProgressTracker({ currentStep, totalSteps, stepTitle, percentage, estimatedMins }: ProgressProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 mb-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0057c0] animate-pulse"></span>
          <span className="text-[10px] font-bold text-[#0057c0] uppercase tracking-wider">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-500">{stepTitle}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className="bg-[#0057c0] h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="flex justify-between items-center pt-0.5 text-[10px] font-medium text-slate-500">
        <span>Estimated: {estimatedMins} mins</span>
        <span className="text-[#006a61] font-bold">{percentage}% Completed</span>
      </div>
    </div>
  );
}
