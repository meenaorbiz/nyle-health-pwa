"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface IntakeHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  showDoctorBadge?: boolean;
}

export default function IntakeHeader({
  title = "Intake Journey",
  subtitle,
  onBack,
  rightAction,
  showDoctorBadge = true,
}: IntakeHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 w-full">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-xs border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
      >
        <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
      </button>

      {/* Title & Subtitle */}
      <div className="text-center px-2 flex-1 min-w-0">
        <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider truncate">
          {title}
        </h2>
        {subtitle && <p className="text-[10px] text-slate-500 truncate">{subtitle}</p>}
      </div>

      {/* Right Action Elements */}
      <div className="flex items-center gap-1.5 shrink-0">
        {rightAction}

        {showDoctorBadge && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs">
            <div className="relative w-6 h-6 shrink-0">
              <img
                src="/dr-neha.jpg"
                alt="Dr. Neha"
                className="w-6 h-6 rounded-full object-cover border border-emerald-400"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
            </div>
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-[10px] font-bold text-emerald-900 leading-none">
                Dr. Neha
              </span>
              <span className="text-[8px] font-medium text-emerald-600 leading-none">
                Active
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
