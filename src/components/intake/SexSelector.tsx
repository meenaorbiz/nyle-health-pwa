"use client";

interface SexProps {
  selectedSex: string;
  onSelect: (sex: string) => void;
}

export default function SexSelector({ selectedSex, onSelect }: SexProps) {
  const options = ["Female", "Male", "Other"];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-800">Biological Sex</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onSelect(g)}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
              selectedSex === g ? "bg-[#0057c0] text-white shadow-xs" : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}
