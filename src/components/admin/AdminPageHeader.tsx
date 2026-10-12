"use client";

import React from "react";

interface AdminPageHeaderProps {
  section?: string;
  category: string;
  title: string;
  subtitle?: string;
  actionIcon?: string;
  rightAction?: React.ReactNode;
}

export default function AdminPageHeader({
  section = "Admin Settings",
  category,
  title,
  subtitle,
  actionIcon,
  rightAction,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 pt-1 mb-2 w-full">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-1 text-slate-500 text-xs">
        <span>{section}</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#0057c0] font-semibold">{category}</span>
      </div>

      {/* 2. Title & Dr. Neha Profile Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        {/* Right Section: Dr. Neha Badge + Custom Page Action */}
        <div className="flex items-center gap-3 shrink-0">
          {rightAction}

          {/* Dr. Neha Super Admin Badge */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs">
            <div className="relative w-8 h-8 shrink-0">
              <img
                src="/dr-neha.jpg"
                alt="Dr. Neha"
                className="w-8 h-8 rounded-full object-cover border border-emerald-500"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-none">
                Dr. Neha
              </span>
              <span className="text-[9px] font-semibold text-emerald-600 leading-none mt-0.5">
                Super Admin
              </span>
            </div>
          </div>

          {actionIcon && (
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#d8e2ff] text-[#001a42] shadow-xs shrink-0">
              <span className="material-symbols-outlined text-2xl">{actionIcon}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
