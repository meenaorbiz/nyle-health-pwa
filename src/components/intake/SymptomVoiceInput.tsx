"use client";

interface SymptomProps {
  value: string;
  onChange: (text: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onAddTag: (tag: string) => void;
}

const LONGEVITY_TAGS = [
  { key: "energy", label: "Improve Energy", text: "Improve Energy Levels", type: "positive" },
  { key: "active60", label: "Active Post 60", text: "Stay Active Post 60", type: "positive" },
  { key: "mobility", label: "Increase Mobility", text: "Increase Mobility", type: "positive" },
  { key: "weight", label: "Optimum Weight", text: "Optimum Weight", type: "positive" },
  { key: "sleep", label: "Sleep Disruption", text: "Sleep Disruption", type: "clinical" },
  { key: "mood", label: "Mood Fluctuations", text: "Mood Fluctuations", type: "clinical" },
  { key: "sweats", label: "Night Sweats", text: "Night Sweats", type: "clinical" },
];

export default function SymptomVoiceInput({ value, onChange, isRecording, onToggleRecording, onAddTag }: SymptomProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-800">Primary Health Goals & Symptoms</label>
        <span className="text-[10px] text-[#006948] font-bold bg-[#85f8c4]/30 px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[12px]">lock</span> Private
        </span>
      </div>

      {/* Voice Recording Button */}
      <div
        onClick={onToggleRecording}
        className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer shadow-xs transition-colors ${
          isRecording ? "bg-red-600 text-white" : "bg-[#006a61] text-white"
        }`}
      >
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">{isRecording ? "graphic_eq" : "mic"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold">
            {isRecording ? "Listening... Speak in English/हिन्दी" : "Tap to speak goals or symptoms"}
          </span>
          <span className="text-[10px] opacity-90">AI transcribes longevity goals & symptoms</span>
        </div>
      </div>

      {/* Multimodal Text Area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:ring-2 focus:ring-[#0057c0] outline-none min-h-[85px] leading-relaxed"
        placeholder="e.g., Improve energy levels, stay active post 60, increase mobility, stay at optimum weight, or sleep disruption, mood fluctuations, night sweats..."
      />

      {/* Quick Select Tokens */}
      <div className="flex flex-col gap-1.5 mt-0.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quick Select Tokens:</span>
        <div className="flex flex-wrap gap-1.5">
          {LONGEVITY_TAGS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => onAddTag(t.text)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                t.type === "positive"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              + {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
