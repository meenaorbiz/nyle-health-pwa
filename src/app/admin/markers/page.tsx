"use client";

import Link from "next/link";
import LongevityMarkersAccordion from "@/components/summary/LongevityMarkersAccordion";

export default function AdminMarkersPage() {
  return (
    <div className="min-h-screen bg-[#0a1320] text-white p-4 pb-20 max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6ea0ff]">
            Nyle Clinical CMS
          </span>
          <h1 className="text-lg font-bold text-white">Longevity Markers Builder</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/onboard/summary"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            View Patient Summary ↗
          </Link>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Add, edit, reorder, or remove longevity markers below. Changes publish immediately to the patient summary and marker explorer pages.
      </p>

      <LongevityMarkersAccordion editable={true} />
    </div>
  );
}
