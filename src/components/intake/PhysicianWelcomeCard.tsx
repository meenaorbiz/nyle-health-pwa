"use client";

export default function PhysicianWelcomeCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 mb-3">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-slate-800">
          <span className="material-symbols-outlined text-[#006a61] text-lg">smart_display</span>
          <span className="font-bold text-xs">Physician Welcome</span>
        </div>
        <span className="bg-[#89f5e7] text-[#005049] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">HD Audio</span>
      </div>
      
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 cursor-pointer shadow-inner">
        <img src="https://i.pravatar.cc/600?img=47" alt="Dr. Neha Jain" className="w-full h-full object-cover opacity-70" />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
          <span className="material-symbols-outlined text-[14px]">play_circle</span>
          <span className="text-[10px] font-medium">Interactive Walkthrough (1:12)</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-2xl">play_arrow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
