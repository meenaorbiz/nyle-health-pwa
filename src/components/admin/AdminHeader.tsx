"use client";

import React from "react";
import Link from "next/link";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({
  title = "Clinical Command Center",
  subtitle = "Nyle Health Admin Portal",
}: AdminHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      
      {/* 1. Left: Branding & Section Title */}
      <div className="flex items-center gap-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-xs">
            nh
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight hidden sm:inline">
            Nyle Health Admin
          </span>
        </Link>

        <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

        <div>
          <h1 className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">
            {title}
          </h1>
          <p className="text-[10px] text-slate-500 leading-none">
            {subtitle}
          </p>
        </div>
      </div>

      {/* 2. Center/Right Actions & Dr. Neha Profile Badge */}
      <div className="flex items-center gap-3">
        {/* Quick Search Input */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <span className="material-symbols-outlined text-slate-400 text-sm absolute left-2.5 top-2.5">
            search
          </span>
          <input
            type="text"
            placeholder="Search patient, ID, or phone..."
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Notifications Icon */}
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 relative transition-colors"
        >
          <span className="material-symbols-outlined text-base">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-5 w-px bg-slate-200"></div>

        {/* Dr. Neha Admin Profile Badge */}
        <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100/80 p-1.5 pr-3 rounded-full border border-slate-200 transition-colors cursor-pointer">
          <div className="relative w-7 h-7 shrink-0">
            <img
              src="/dr-neha.jpg"
              alt="Dr. Neha"
              className="w-7 h-7 rounded-full object-cover border border-emerald-500"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 leading-tight">
              Dr. Neha
            </span>
            <span className="text-[9px] font-semibold text-emerald-600 leading-none">
              Super Admin
            </span>
          </div>
        </div>
      </div>

    </header>
  );
}
