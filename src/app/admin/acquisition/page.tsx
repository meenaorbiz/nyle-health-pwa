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
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#d8e2ff] text-[#001a42] shadow-xs">
            <span className="material-symbols-outlined text-2xl">group_add</span>
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
