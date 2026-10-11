"use client";

import { useState } from "react";

interface DeskTentCardProps {
  directIntakeUrl: string;
}

export default function DeskTentCard({ directIntakeUrl }: DeskTentCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    directIntakeUrl
  )}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(directIntakeUrl);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="flex flex-col bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#89f5e7] flex items-center justify-center text-[#005049] shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-xl">qr_code_2</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-900 leading-snug">Printable Clinic Display</h2>
            <span className="text-xs text-slate-500">Desk Tent Card & Walk-in Triage</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold shrink-0">
          Desk Tent Card
        </span>
      </div>

      <p className="text-xs text-slate-500 -mt-1">
        Place on reception counter or waiting room side-tables for walk-in patient triage.
      </p>

      {/* Table Tent Preview Frame */}
      <div className="relative w-full rounded-2xl bg-slate-100 p-4 flex flex-col items-center justify-center shadow-inner border border-slate-200">
        <div className="relative w-full max-w-[260px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center text-center">
          <div className="w-full h-2 bg-[#0057c0]"></div>

          <div className="pt-4 px-3 pb-2 flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/logo.png" alt="Nyle Health" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-xs text-slate-900 leading-tight">Nyle Health Medical Center</span>
            <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Dr. Neha Jain, MBBS • Lead Physician</span>
          </div>

          {/* Dynamic QR Code */}
          <div className="my-1.5 p-2 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
            <img src={qrCodeImageUrl} alt="Intake QR Code" className="w-32 h-32 object-contain" />
          </div>

          <div className="px-3 pb-4 pt-1 flex flex-col items-center gap-0.5">
            <span className="text-[11px] font-bold text-slate-900">Scan to start pre-consultation profile</span>
            <span className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[11px] text-[#006948]">schedule</span>
              Takes 3-5 mins • No app install required
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopyLink}
          className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0057c0] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs border border-slate-200 transition-all"
        >
          <span className="material-symbols-outlined text-base">{copiedLink ? "check_circle" : "link"}</span>
          <span>{copiedLink ? "Copied Link!" : "Copy Intake Link"}</span>
        </button>

        <a
          href={qrCodeImageUrl}
          download="nyle-health-desk-qr.png"
          target="_blank"
          rel="noreferrer"
          className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs border border-slate-200 transition-all"
        >
          <span className="material-symbols-outlined text-[#006a61] text-base">image</span>
          <span>Download PNG</span>
        </a>
      </div>

      <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] text-center">
        <span className="material-symbols-outlined text-xs">straighten</span>
        <span>Print size: A5 Table Tent (148 × 210 mm) • CMYK 300 DPI</span>
      </div>
    </section>
  );
}
