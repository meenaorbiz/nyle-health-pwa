"use client";

import { useState } from "react";

export default function BrandingPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<"topbar" | "card">("topbar");

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="flex flex-col w-full p-4 sm:p-8">
      <div className="flex flex-col gap-6 max-w-xl mx-auto w-full">
        
        {/* Header */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <span>Admin Settings</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-blue-600 font-semibold">Branding</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinic Branding & Identity</h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>PWA Synced</span>
            </div>
          </div>
          <p className="text-sm text-slate-600">Manage public clinic branding, doctor credentials, and live patient app styling.</p>
        </section>

        {/* Logo Upload Card */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Clinic Brand Logo</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 rounded-full bg-slate-50 p-2 shadow-inner border border-slate-200 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-blue-600 rounded-full text-white flex items-center justify-center text-4xl font-bold">nh</div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            
            <div className="flex-1 w-full flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors text-center">
              <span className="material-symbols-outlined text-3xl text-blue-500 mb-2">cloud_upload</span>
              <p className="text-sm font-semibold text-slate-700">Drag & drop new logo here</p>
              <p className="text-xs text-slate-500 mt-1">Recommended size: 512x512px</p>
            </div>
          </div>

          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full h-12 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-70 transition-all"
          >
            <span className={`material-symbols-outlined ${isSyncing ? "animate-spin" : ""}`}>
              {isSyncing ? "refresh" : "sync"}
            </span>
            <span>{isSyncing ? "Syncing Apps..." : "Sync Across User Apps"}</span>
          </button>
        </section>

        {/* Doctor Profile Card */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Doctor Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-slate-900">Dr. Neha Jain, MBBS</h3>
              <p className="text-sm font-medium text-blue-600">Senior Consultant Physician & Diabetologist</p>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <span className="material-symbols-outlined text-[14px]">badge</span>
                <span>MCI Reg: #48291-MH</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button className="h-11 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              Change Photo
            </button>
            <button className="h-11 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit Bio
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
