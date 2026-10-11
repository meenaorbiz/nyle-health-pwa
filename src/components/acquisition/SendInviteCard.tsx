"use client";

import { useState } from "react";

interface SendInviteCardProps {
  directIntakeUrl: string;
}

export default function SendInviteCard({ directIntakeUrl }: SendInviteCardProps) {
  const [phoneNumber, setPhoneNumber] = useState("98204 88319");
  const [patientName, setPatientName] = useState("Ananya Verma");
  const [selectedPlaybook, setSelectedPlaybook] = useState("General & Perimenopause Intake (v2.1)");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const PLAYBOOKS = [
    "General & Perimenopause Intake (v2.1)",
    "Cardiometabolic Comprehensive (v1.8)",
    "First Visit Rapid Triage (v3.0)",
  ];

  const handleSendWhatsApp = () => {
    setInviteSent(true);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Hello ${patientName || "Patient"}, Dr. Neha Jain has shared your pre-consultation intake link: ${directIntakeUrl}`
    );
    window.open(`https://wa.me/91${cleanPhone}?text=${message}`, "_blank");
    setTimeout(() => setInviteSent(false), 2500);
  };

  return (
    <section className="flex flex-col bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 gap-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#d8e2ff] flex items-center justify-center text-[#0057c0] shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-xl">send</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-900 leading-snug">Send Invite Links</h2>
            <span className="text-xs text-slate-500">Direct digital enrollment for upcoming visits</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#85f8c4]/40 text-[#005137] text-[11px] font-bold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse"></span>
          Instant WhatsApp
        </span>
      </div>

      {/* Phone Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
          <span>Patient Phone Number</span>
          <span className="text-[11px] text-slate-500 font-normal">SMS & WA</span>
        </label>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 rounded-lg text-slate-800 text-xs font-bold shrink-0 select-none">
            <span>🇮🇳</span>
            <span>+91</span>
          </div>
          <div className="relative flex-1">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="98765 43210"
              className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0057c0]"
            />
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 text-lg pointer-events-none">phone_iphone</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined text-xs text-[#006948]">verified</span>
          Sends instant WhatsApp invite with one-tap verification.
        </span>
      </div>

      {/* Playbook Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-800">Select Intake Playbook</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-slate-100 px-3.5 py-2.5 rounded-lg text-left text-xs shadow-xs hover:bg-slate-200/70 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#0057c0] shrink-0"></span>
              <span className="font-semibold text-slate-900 truncate">{selectedPlaybook}</span>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-lg">expand_more</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-1 left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 z-20 py-1 flex flex-col">
              {PLAYBOOKS.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedPlaybook(item);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-3.5 py-2 hover:bg-slate-50 text-xs cursor-pointer flex items-center justify-between ${
                    selectedPlaybook === item ? "font-bold text-[#0057c0] bg-blue-50/50" : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {selectedPlaybook === item && <span className="material-symbols-outlined text-sm">check</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Patient Name Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-800">
          Patient Full Name <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g., Ananya Verma"
            className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0057c0]"
          />
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 text-lg pointer-events-none">person</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleSendWhatsApp}
        className="w-full h-11 bg-[#0057c0] hover:bg-[#004396] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-lg">{inviteSent ? "check_circle" : "chat"}</span>
        <span>{inviteSent ? "Invite Link Dispatched!" : "Send WhatsApp Link 📲"}</span>
      </button>

      {/* Bulk Campaign */}
      <div className="flex justify-center items-center pt-0.5">
        <button type="button" className="inline-flex items-center gap-1 text-[#0057c0] hover:underline text-xs font-bold transition-colors">
          <span className="material-symbols-outlined text-sm">cloud_upload</span>
          <span>or upload CSV for Bulk Campaign ↗</span>
        </button>
      </div>
    </section>
  );
}
