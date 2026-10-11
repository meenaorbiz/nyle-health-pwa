"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center sm:py-6">
      <div className="w-full max-w-md bg-[#f7f9fb] min-h-screen sm:min-h-[884px] sm:max-h-[92vh] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 shadow-2xl flex flex-col relative overflow-hidden font-sans text-[#191c1e] antialiased">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 w-full z-40 bg-[#f7f9fb]/95 backdrop-blur-xl border-b border-slate-200/60 px-4 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={toggleDrawer} 
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-200/50 text-[#191c1e] transition-colors"
              aria-label="Open Navigation"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src="/logo.png" 
                alt="Nyle Health Logo" 
                className="h-10 w-auto object-contain shrink-0 max-w-[120px]" 
              />
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm text-[#0057c0] leading-tight truncate">Nyle Health</span>
                <span className="text-[10px] text-slate-500 font-medium truncate">Admin Portal</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex flex-col text-right">
              <p className="text-xs font-bold text-[#191c1e] leading-none">Dr. Neha Jain</p>
              <p className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">MBBS</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs shadow-xs">
              NJ
            </div>
          </div>
        </header>

        {isDrawerOpen && <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={toggleDrawer} />}

        {/* Side Navigation Drawer */}
        <aside className={`absolute top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Nyle Health" className="h-9 w-auto object-contain" />
              <span className="font-bold text-[#0057c0] text-base">Nyle Health</span>
            </div>
            <button onClick={toggleDrawer} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <Link href="/admin" onClick={() => setIsDrawerOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${pathname === '/admin' ? 'bg-[#0057c0]/10 text-[#0057c0] font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
              <span className="material-symbols-outlined text-xl">dashboard</span><span>Dashboard Home</span>
            </Link>
            <Link href="/admin/acquisition" onClick={() => setIsDrawerOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${pathname === '/admin/acquisition' ? 'bg-[#0057c0]/10 text-[#0057c0] font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
              <span className="material-symbols-outlined text-xl">qr_code_2</span><span>Patient Invites & QR</span>
            </Link>
            <Link href="/admin/playbooks" onClick={() => setIsDrawerOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${pathname === '/admin/playbooks' ? 'bg-[#0057c0]/10 text-[#0057c0] font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
              <span className="material-symbols-outlined text-xl">menu_book</span><span>Playbooks Builder</span>
            </Link>
            <Link href="/admin/branding" onClick={() => setIsDrawerOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${pathname === '/admin/branding' ? 'bg-[#0057c0]/10 text-[#0057c0] font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
              <span className="material-symbols-outlined text-xl">palette</span><span>Branding Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto pb-44 relative">{children}</main>

        <nav className="absolute bottom-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 h-16 flex justify-around items-center px-1">
          <Link href="/admin" className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${pathname === '/admin' ? 'text-[#0057c0] font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="material-symbols-outlined text-2xl">dashboard</span><span className="text-[11px] leading-tight mt-0.5">Home</span>
          </Link>
          <Link href="/admin/playbooks" className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${pathname === '/admin/playbooks' ? 'text-[#0057c0] font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="material-symbols-outlined text-2xl">menu_book</span><span className="text-[11px] leading-tight mt-0.5">Playbooks</span>
          </Link>
          <Link href="/admin/branding" className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${pathname === '/admin/branding' ? 'text-[#0057c0] font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="material-symbols-outlined text-2xl">palette</span><span className="text-[11px] leading-tight mt-0.5">Branding</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
