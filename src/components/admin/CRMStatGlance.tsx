"use client";

export default function CRMStatGlance() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-2">
        {/* Card 1: Invites */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-white shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Invites</span>
            <span className="material-symbols-outlined text-[16px] text-[#0057c0]">forward_to_inbox</span>
          </div>
          <div className="mt-2">
            <span className="text-xl font-extrabold text-slate-900 leading-none">142</span>
            <div className="flex items-center gap-0.5 mt-1 text-[#006948]">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              <span className="text-[10px] font-bold">+18 wk</span>
            </div>
          </div>
        </div>

        {/* Card 2: Incomplete */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-red-50/50 shadow-xs border border-red-100">
          <div className="flex items-center justify-between text-red-700">
            <span className="text-[10px] font-bold uppercase tracking-wider">Incomplete</span>
            <span className="material-symbols-outlined text-[16px] text-red-600">hourglass_bottom</span>
          </div>
          <div className="mt-2">
            <span className="text-xl font-extrabold text-slate-900 leading-none">28</span>
            <div className="flex items-center gap-0.5 mt-1 text-red-600 font-bold text-[10px]">
              Needs nudge
            </div>
          </div>
        </div>

        {/* Card 3: App Ready */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-emerald-50/50 shadow-xs border border-emerald-100">
          <div className="flex items-center justify-between text-[#006948]">
            <span className="text-[10px] font-bold uppercase tracking-wider">App Ready</span>
            <span className="material-symbols-outlined text-[16px] text-[#006948]">verified</span>
          </div>
          <div className="mt-2">
            <span className="text-xl font-extrabold text-slate-900 leading-none">84</span>
            <div className="flex items-center gap-0.5 mt-1 text-[#006948] font-bold text-[10px]">
              Verified
            </div>
          </div>
        </div>
      </div>

      {/* Funnel Visualizer */}
      <div className="p-3.5 rounded-xl bg-white shadow-xs border border-slate-200/80 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Intake Velocity & Drop-off Ratio</span>
          <span className="text-[11px] text-slate-500 font-semibold">81.7% Overall Health</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
          <div className="h-full bg-[#0057c0]" style={{ width: "59%" }}></div>
          <div className="h-full bg-red-500" style={{ width: "20%" }}></div>
          <div className="h-full bg-slate-300" style={{ width: "21%" }}></div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-0.5">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0057c0]"></span> Ready (59%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Incomplete (20%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Stalled (21%)</span>
        </div>
      </div>
    </div>
  );
}
