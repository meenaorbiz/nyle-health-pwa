"use client";

export default function PatientHeader() {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#f7f9fb]/95 backdrop-blur-xl border-b border-slate-200/60 px-4 h-[72px] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <img 
          src="/logo.png" 
          alt="Nyle Health Logo" 
          className="h-9 w-auto object-contain shrink-0 drop-shadow-xs" 
        />
        <div className="flex flex-col truncate">
          <span className="font-bold text-base text-[#191c1e] leading-tight truncate">Nyle Health</span>
          <span className="text-[11px] text-slate-500 font-medium truncate">Intake Portal</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 bg-white px-3 py-1.5 rounded-full shadow-xs border border-slate-200/80">
        <div className="relative flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-[#0057c0] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[16px]">person</span>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00855d] ring-2 ring-white"></span>
        </div>
        <div className="flex flex-col pr-1">
          <span className="font-bold text-[10px] text-[#191c1e] leading-none uppercase tracking-wide">Dr. Neha</span>
          <span className="font-semibold text-[9px] text-[#006948] leading-none mt-0.5">Assistant Active</span>
        </div>
      </div>
    </header>
  );
}
