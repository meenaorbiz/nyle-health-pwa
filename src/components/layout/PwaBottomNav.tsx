"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PwaBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "CRM", icon: "dashboard" },
    { href: "/admin/acquisition", label: "Acquisition", icon: "group_add" },
    { href: "/admin/playbooks", label: "Playbooks", icon: "menu_book" },
    { href: "/onboard/intake", label: "Intake", icon: "assignment" },
    { href: "/", label: "Exit", icon: "logout" },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2 flex items-center justify-around z-40">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? false
            : item.href === "/admin"
            ? pathname === "/admin"
            : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-bold transition-colors ${
              isActive ? "text-[#0057c0]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
