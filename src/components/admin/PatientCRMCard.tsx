"use client";

import { useState } from "react";

export interface PatientRecord {
  id: string;
  name: string;
  initials: string;
  phone: string;
  playbook: string;
  intakeCode: string;
  step: string;
  progressPercent: number;
  status: "nudge_needed" | "completed" | "stalled";
  lastActive: string;
  note: string;
}

interface PatientCardProps {
  patient: PatientRecord;
  onNudge: (name: string) => void;
  onSendAppLink: (name: string) => void;
}

export default function PatientCRMCard({ patient, onNudge, onSendAppLink }: PatientCardProps) {
  const [loading, setLoading] = useState(false);

  const handleNudgeClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNudge(patient.name);
    }, 600);
  };

  const handleAppInviteClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSendAppLink(patient.name);
    }, 600);
  };

  return (
    <div className="p-4 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex flex-col gap-3 relative overflow-hidden">
      {/* Status Bar Trim */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          patient.status === "completed"
            ? "bg-[#006948]"
            : patient.status === "stalled"
            ? "bg-red-500"
            : "bg-[#0057c0]"
        }`}
      />

      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
              patient.status === "completed"
                ? "bg-[#89f5e7] text-[#005049]"
                : patient.status === "stalled"
                ? "bg-slate-200 text-slate-700"
                : "bg-[#d8e2ff] text-[#001a42]"
            }`}
          >
            {patient.initials}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-slate-900 truncate">{patient.name}</span>
              {patient.status === "completed" ? (
                <span className="material-symbols-outlined text-[15px] text-[#006948]">verified_user</span>
              ) : (
                <span className="material-symbols-outlined text-[15px] text-[#006948]">check_circle</span>
              )}
            </div>
            <span className="text-xs text-slate-500 truncate">{patient.phone}</span>
          </div>
        </div>

        {patient.status === "completed" ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#85f8c4]/30 text-[#005137] text-[10px] font-bold shrink-0">
            <span className="material-symbols-outlined text-[12px]">done_all</span> 100% Verified
          </span>
        ) : patient.status === "stalled" ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold shrink-0">
            <span className="material-symbols-outlined text-[12px]">timer_off</span> Inactive &gt; 48 hrs
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#85f8c4]/30 text-[#005137] text-[10px] font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse"></span> Auto-Nudge: ON
          </span>
        )}
      </div>

      {/* Playbook Badge */}
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
          <span className="material-symbols-outlined text-[12px] text-[#0057c0]">assignment_ind</span>
          {patient.playbook}
        </span>
        <span className="text-[10px] text-slate-400 font-mono">{patient.intakeCode}</span>
      </div>

      {/* Progress Section */}
      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-800">{patient.step}</span>
          <span className={patient.status === "completed" ? "text-[#006948]" : "text-[#0057c0]"}>
            {patient.progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className={`h-full rounded-full ${
              patient.status === "completed"
                ? "bg-[#006948]"
                : patient.status === "stalled"
                ? "bg-red-500"
                : "bg-[#0057c0]"
            }`}
            style={{ width: `${patient.progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">schedule</span>
            {patient.lastActive}
          </span>
          <span className="text-red-600 font-medium truncate max-w-[180px]">{patient.note}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-0.5">
        {patient.status === "completed" ? (
          <>
            <button className="flex-1 h-9 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">description</span> Review Data
            </button>
            <button
              onClick={handleAppInviteClick}
              disabled={loading}
              className="flex-1 h-9 px-3 rounded-lg bg-[#006a61] text-white text-xs font-bold shadow-xs hover:bg-[#005049] transition-all flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">phonelink_ring</span> Send App Link
            </button>
          </>
        ) : patient.status === "stalled" ? (
          <>
            <a
              href={`tel:${patient.phone}`}
              className="flex-1 h-9 px-3 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm text-[#0057c0]">call</span> Call Patient
            </a>
            <button
              onClick={handleNudgeClick}
              disabled={loading}
              className="flex-1 h-9 px-3 rounded-lg bg-[#0057c0] text-white text-xs font-bold shadow-xs hover:bg-[#004396] transition-all flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">campaign</span> Re-engage
            </button>
          </>
        ) : (
          <>
            <button className="flex-1 h-9 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">visibility</span> Partial Answers
            </button>
            <button
              onClick={handleNudgeClick}
              disabled={loading}
              className="flex-1 h-9 px-3 rounded-lg bg-[#0057c0] text-white text-xs font-bold shadow-xs hover:bg-[#004396] transition-all flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">notifications_active</span> Send Nudge
            </button>
          </>
        )}
      </div>
    </div>
  );
}
