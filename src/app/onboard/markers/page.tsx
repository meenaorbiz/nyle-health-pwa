"use client";

import { useState } from "react";
import Link from "next/link";
import LongevityMarkersAccordion from "@/components/summary/LongevityMarkersAccordion";
import CalendarBookingModal from "@/components/summary/CalendarBookingModal";

export default function OnboardMarkersPage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white p-4 pb-16 max-w-md mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <Link
          href="/onboard/summary"
          className="text-xs text-[#6ea0ff] hover:underline flex items-center gap-1"
        >
          ← Back to Summary Hub
        </Link>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Livel Biomarkers
        </span>
      </div>

      <LongevityMarkersAccordion
        editable={false}
        onOpenBooking={() => setIsCalendarOpen(true)}
      />

      <CalendarBookingModal
        isOpen={isCalendarOpen}
        patientName="Patient"
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
}
