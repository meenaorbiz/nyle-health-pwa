"use client";

import { useState } from "react";
import CRMStatGlance from "@/components/admin/CRMStatGlance";
import CRMFilterBar from "@/components/admin/CRMFilterBar";
import PatientCRMCard, { PatientRecord } from "@/components/admin/PatientCRMCard";
import InviteModal from "@/components/admin/InviteModal";

const MOCK_PATIENTS: PatientRecord[] = [
  {
    id: "1",
    name: "Pooja Sharma",
    initials: "PS",
    phone: "+91 98765 43210",
    playbook: "Perimenopause Intake v2.1",
    intakeCode: "#INT-8492",
    step: "Section 2 of 3: Adaptive Symptoms",
    progressPercent: 45,
    status: "nudge_needed",
    lastActive: "2h ago",
    note: "Drop-off: Vasomotor Scale",
  },
  {
    id: "2",
    name: "Ritu Kapoor",
    initials: "RK",
    phone: "+91 98112 34567",
    playbook: "General Metabolic Intake",
    intakeCode: "#INT-9104",
    step: "All questions validated (14/14)",
    progressPercent: 100,
    status: "completed",
    lastActive: "Submitted: Today 11:30 AM",
    note: "Eligible for App",
  },
  {
    id: "3",
    name: "Ananya Mehta",
    initials: "AM",
    phone: "+91 97123 98765",
    playbook: "Thyroid & Fatigue Protocol",
    intakeCode: "#INT-7721",
    step: "Section 1: Baseline Demographics",
    progressPercent: 20,
    status: "stalled",
    lastActive: "Last active: 2 days ago",
    note: "1 nudge sent yesterday",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all_time");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredPatients = MOCK_PATIENTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.intakeCode.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "progress") return matchesSearch && p.status === "nudge_needed";
    if (activeTab === "completed") return matchesSearch && p.status === "completed";
    if (activeTab === "stalled") return matchesSearch && p.status === "stalled";
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full p-4 pb-28 gap-4 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#85f8c4]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Quick Invite Modal */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onConfirm={() => {
          setIsInviteModalOpen(false);
          showToast("Direct questionnaire enrollment link dispatched via WhatsApp & SMS!");
        }}
      />

      {/* Top Header Context */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
          <span>Admin Settings</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#0057c0] font-semibold">Clients & Pipeline</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Patient Onboarding CRM</h1>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              Track pre-onboarding client profiles & automate form progression
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold shrink-0 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            142 Inquiries
          </span>
        </div>
      </div>

      {/* 1. Metrics Glance Grid & Funnel */}
      <CRMStatGlance />

      {/* 2. Filter Tabs, Search & Date/Time Picker */}
      <CRMFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* 3. Patient Record Cards List */}
      <div className="flex flex-col gap-3">
        {filteredPatients.map((patient) => (
          <PatientCRMCard
            key={patient.id}
            patient={patient}
            onNudge={(name) => showToast(`Automated WhatsApp nudge delivered to ${name}!`)}
            onSendAppLink={(name) => showToast(`Secure mobile app credentials sent to ${name}!`)}
          />
        ))}
      </div>

      {/* Automated Cadence Active Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200/70 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0057c0]/10 text-[#0057c0] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-lg">smart_toy</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-900">Automated WhatsApp Cadence Active</span>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Next scheduled multi-channel ping runs at <span className="font-bold text-slate-800">5:00 PM IST</span> for 14 patients stalled at symptom scoring.
          </p>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed right-4 bottom-20 z-40">
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 h-12 px-4 rounded-full bg-[#0057c0] text-white shadow-xl hover:bg-[#004396] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">person_add</span>
          <span className="text-xs font-bold tracking-wide">Invite Client</span>
        </button>
      </div>

    </div>
  );
}
