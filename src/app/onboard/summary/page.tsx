"use client";

import { useEffect, useState } from "react";
import LongevityMarkersAccordion from "@/components/summary/LongevityMarkersAccordion";
import ReferralQrCard from "@/components/summary/ReferralQrCard";
import InformativeVideosHub from "@/components/summary/InformativeVideosHub";
import ClinicalResponsesCard, { IntakeSummaryItem } from "@/components/summary/ClinicalResponsesCard";
import CalendarBookingModal from "@/components/summary/CalendarBookingModal";

type SummarySession = {
  firstName: string;
  items: IntakeSummaryItem[];
};

export default function SummaryOrchestratorPage() {
  const [summary, setSummary] = useState<SummarySession | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("https://www.livel.in/");

  useEffect(() => {
    // Lock browser Back navigation post-submission
    window.history.pushState(null, "", window.location.href);
    const lockBack = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", lockBack);

    const raw = sessionStorage.getItem("nyle_intake_summary");
    if (raw) {
      try {
        setSummary(JSON.parse(raw));
      } catch {}
    }

    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/onboard/intake`);
    }

    return () => window.removeEventListener("popstate", lockBack);
  }, []);

  const patientName = summary?.firstName || "Patient";

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white p-4 pb-16 max-w-md mx-auto space-y-6">
      {/* 1. Submission Banner */}
      <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 text-emerald-300 font-bold">
          ✓
        </div>
        <div>
          <h1 className="text-sm font-bold text-emerald-200">Assessment Submitted to Dr. Neha</h1>
          <p className="text-[11px] text-emerald-300/80">
            Thank you, {patientName}. Your clinical intake profile has been securely recorded.
          </p>
        </div>
      </div>

      {/* 2. Plug-and-Play Feature Modules */}
      <LongevityMarkersAccordion onOpenBooking={() => setIsCalendarOpen(true)} />
      <ReferralQrCard shareUrl={shareUrl} />
      <InformativeVideosHub />
      <ClinicalResponsesCard items={summary?.items} />

      {/* 3. Booking Modal */}
      <CalendarBookingModal
        isOpen={isCalendarOpen}
        patientName={patientName}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
}
