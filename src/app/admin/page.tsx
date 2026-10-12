"use client";

import { useState } from "react";
import Link from "next/link";

export default function CrmDashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const patients = [
    {
      id: "INT-8492",
      name: "Pooja Sharma",
      phone: "+91 98765 43210",
      initials: "PS",
      status: "In Progress",
      nudgeOn: true,
      protocol: "Perimenopause Intake v2.1",
      section: "Section 2 of 3: Adaptive Symptoms",
      progress: 45,
      time: "2h ago",
      dropoff: "Drop-off: Vasomotor Scale",
      verified: false,
    },
    {
      id: "INT-9104",
      name: "Ritu Kapoor",
      phone: "+91 98112 34567",
      initials: "RK",
      status: "100% Verified",
      nudgeOn: false,
      protocol: "General Metabolic Intake",
      progress: 100,
      verified: true,
    },
  ];

  return (
    <div className="flex flex-col w-full p-1 sm:p-2 gap-3 relative min-h-full font-sans antialiased pb-20">
      
      {/* Header Info */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Patient Onboarding CRM
          </h1>
          <p className="text-[10px] text-slate-500">
            Track pre-onboarding client profiles & progression
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          142 Inquiries
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Invites</span>
            <span className="material-symbols-outlined text-blue-600 text-sm">mail</span>
          </div>
          <div className="mt-1">
            <span className="text-lg font-black text-slate-900">142</span>
            <div className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-600 mt-0.5">
              <span className="material-symbols-outlined text-[10px]">trending_up</span>
              <span>+18 wk</span>
            </div>
          </div>
        </div>

        <div className="p-2.5 bg-red-50/50 border border-red-100 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] font-bold text-red-800 uppercase tracking-wider">
            <span>Incomplete</span>
            <span className="material-symbols-outlined text-red-600 text-sm">hourglass_bottom</span>
          </div>
          <div className="mt-1">
            <span className="text-lg font-black text-red-950">28</span>
            <span className="block text-[9px] font-semibold text-red-600 mt-0.5">Needs nudge</span>
          </div>
        </div>

        <div className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] font-bold text-emerald-800 uppercase tracking-wider">
            <span>App Ready</span>
            <span className="material-symbols-outlined text-emerald-600 text-sm">verified</span>
          </div>
          <div className="mt-1">
            <span className="text-lg font-black text-emerald-950">84</span>
            <span className="block text-[9px] font-semibold text-emerald-600 mt-0.5">Verified</span>
          </div>
        </div>
      </div>

      {/* Intake Velocity Bar */}
      <div className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span>Intake Velocity & Drop-off Ratio</span>
          <span className="text-[10px] text-slate-500 font-normal">81.7% Overall Health</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
          <div className="bg-blue-600 h-full w-[59%]" />
          <div className="bg-red-500 h-full w-[20%]" />
          <div className="bg-amber-400 h-full w-[21%]" />
        </div>
        <div className="flex items-center justify-between text-[9px] font-bold text-slate-500">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Ready (59%)</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Incomplete (20%)</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Stalled (21%)</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5 text-xs font-bold">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "all" ? "bg-[#0057c0] text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            All Clients (142)
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "progress" ? "bg-[#0057c0] text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            In Progress (28)
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "completed" ? "bg-[#0057c0] text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            Completed (84)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined text-slate-400 text-base absolute left-2.5 top-2.5">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, phone or intake ID..."
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-base">tune</span>
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-2.5">
        {patients.map((p) => (
          <div key={p.id} className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0057c0] font-bold text-xs flex items-center justify-center">
                  {p.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-bold text-slate-900">{p.name}</h3>
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{p.phone}</p>
                </div>
              </div>
              {p.nudgeOn ? (
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  • Auto-Nudge: ON
                </span>
              ) : (
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  ✓ 100% Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 bg-slate-50 p-2 rounded-xl">
              <span className="material-symbols-outlined text-blue-600 text-sm">assignment</span>
              <span className="truncate">{p.protocol}</span>
              <span className="text-slate-400 font-mono text-[9px] ml-auto">#{p.id}</span>
            </div>

            {!p.verified && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
                  <span>{p.section}</span>
                  <span className="text-blue-600">{p.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-[9px] text-slate-400 font-medium pt-0.5">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span>{p.time}</span>
                  <span className="text-red-500 font-bold">{p.dropoff}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button className="py-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span>Partial Answers</span>
                  </button>
                  <button className="py-2 bg-[#0057c0] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">notifications</span>
                    <span>Send Nudge</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FLOATING INVITE CLIENT BUTTON - ANCHORED INSIDE PWA FRAME */}
      <Link
        href="/admin/acquisition"
        className="absolute bottom-16 right-3 z-30 bg-[#0057c0] hover:bg-[#004396] text-white text-xs font-bold px-3.5 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">group_add</span>
        <span>Invite Client</span>
      </Link>

    </div>
  );
}
