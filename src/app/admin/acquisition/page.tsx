"use client";

import { useState, useEffect } from "react";
import SendInviteCard from "@/components/acquisition/SendInviteCard";
import DeskTentCard from "@/components/acquisition/DeskTentCard";
import PromoVideoCard from "@/components/acquisition/PromoVideoCard";

export default function AcquisitionPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const directIntakeUrl = `${origin || "http://localhost:3000"}/onboard/intake?doc=dr-neha`;

  return (
    <div className="flex flex-col w-full p-3 sm:p-4 pb-28 gap-4">
      
      {/* Header Info */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <span>Admin Settings</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#0057c0] font-semibold">Client Acquisition</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Client Acquisition Hub</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage digital invite links, clinic desk QR displays, and patient onboarding video.
            </p>
          </div>
          
          {/* Right Action Container: Added Dr. Neha Badge next to existing group_add icon */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs shrink-0">
              <div className="relative w-8 h-8 shrink-0">
                <img
                  src="/dr-neha.jpg"
                  alt="Dr. Neha"
                  className="w-8 h-8 rounded-full object-cover border border-emerald-500"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full"></span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-none">Dr. Neha</span>
                <span className="text-[9px] font-semibold text-emerald-600 leading-none mt-1">Super Admin</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#d8e2ff] text-[#001a42] shadow-xs">
              <span className="material-symbols-outlined text-2xl">group_add</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modular Card 1: WhatsApp Invite Generator */}
      <SendInviteCard directIntakeUrl={directIntakeUrl} />

      {/* Modular Card 2: Printable Table Tent QR Generator */}
      <DeskTentCard directIntakeUrl={directIntakeUrl} />

      {/* Modular Card 3: Welcome Video Configurator */}
      <PromoVideoCard />

    </div>
  );
}
