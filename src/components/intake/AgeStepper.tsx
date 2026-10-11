"use client";

interface AgeStepperProps {
  value: number;
  onChange: (val: number) => void;
}

export default function AgeStepper({ value, onChange }: AgeStepperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-800">What is your current age?</label>
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl shadow-xs">
        <button
          type="button"
          onClick={() => onChange(Math.max(18, value - 1))}
          className="w-9 h-9 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-800 font-bold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-[#0057c0]">{value}</span>
          <span className="text-xs text-slate-500 font-bold">yrs</span>
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(100, value + 1))}
          className="w-9 h-9 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-800 font-bold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
