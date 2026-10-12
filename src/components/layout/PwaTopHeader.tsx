"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DoctorAvatar from "@/components/common/DoctorAvatar";

export default function PwaTopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin", label: "CRM Dashboard", icon: "dashboard" },
    { href: "/admin/acquisition", label: "Client Acquisition", icon: "group_add" },
    { href: "/admin/playbooks", label: "Clinical Playbooks", icon: "menu_book" },
    { href: "/onboard/intake", label: "Patient Intake Flow", icon: "assignment" },
    { href: "/onboard/sarvam-intake", label: "Sarvam Indic Intake", icon: "graphic_eq" },
    { href: "/", label: "Logout", icon: "logout" },
  ];

  return (
    <header className="relative w-full pb-2 mb-1 border-b border-slate-200/80 shrink-0 z-50">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-lg">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <img
            src="/logo.png"
            alt="Nyle Health Logo"
            className="h-8 w-auto object-contain shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="text-xs font-bold text-slate-900 tracking-tight truncate">
            Nyle Health Portal
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 pr-2 rounded-full border border-slate-200/80 shadow-2xs shrink-0">
          <DoctorAvatar size="w-6 h-6" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-slate-800 leading-none">Dr. Neha</span>
            <span className="text-[8px] font-semibold text-emerald-600 leading-none mt-0.5">Admin</span>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-11 left-0 right-0 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[#0057c0]/10 text-[#0057c0]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined text-base">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
