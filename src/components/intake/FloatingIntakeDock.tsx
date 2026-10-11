"use client";

interface DockProps {
  onSaveDraft: () => void;
  onNext: () => void;
}

export default function FloatingIntakeDock({ onSaveDraft, onNext }: DockProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-4 pt-3 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-2">
        <button
          type="button"
          onClick={onSaveDraft}
          className="w-1/3 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs hover:bg-slate-200 transition-colors"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-2/3 py-3 rounded-xl bg-[#0057c0] hover:bg-[#004396] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Begin Intake</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[10px] font-medium pb-2">
        <span className="material-symbols-outlined text-[#006948] text-sm">verified_user</span>
        <span>HIPAA encrypted & autosaved in real-time</span>
      </div>
    </div>
  );
}
