"use client";

import PwaTopHeader from "@/components/layout/PwaTopHeader";
import PwaBottomNav from "@/components/layout/PwaBottomNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center sm:py-4">
      <div className="w-full max-w-md bg-[#f7f9fb] h-screen sm:h-[884px] sm:max-h-[94vh] sm:rounded-[36px] sm:border-[6px] sm:border-slate-800 shadow-2xl flex flex-col relative overflow-hidden font-sans antialiased p-3 sm:p-4">
        <PwaTopHeader />
        <main className="flex-1 w-full overflow-y-auto pb-16 scrollbar-none">
          {children}
        </main>
        <PwaBottomNav />
      </div>
    </div>
  );
}
