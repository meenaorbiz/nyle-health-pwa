"use client";

import PatientHeader from "@/components/client/PatientHeader";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center sm:py-6">
      {/* Mobile-First PWA Frame Container */}
      <div className="w-full max-w-md bg-[#f7f9fb] min-h-screen sm:min-h-[884px] sm:max-h-[92vh] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 shadow-2xl flex flex-col relative overflow-hidden font-sans text-[#191c1e] antialiased">
        
        {/* Modular Header Component */}
        <PatientHeader />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto relative bg-[#f7f9fb]">
          {children}
        </main>
      </div>
    </div>
  );
}
