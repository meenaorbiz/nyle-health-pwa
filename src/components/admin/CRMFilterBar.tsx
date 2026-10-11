"use client";

import { useState } from "react";

interface FilterBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  dateRange: string;
  onDateRangeChange: (d: string) => void;
}

export default function CRMFilterBar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}: FilterBarProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const TABS = [
    { id: "all", label: "All Clients", count: 142 },
    { id: "progress", label: "In Progress", count: 28 },
    { id: "completed", label: "Completed", count: 84 },
    { id: "stalled", label: "Unresponsive", count: 30 },
  ];

  const DATE_OPTIONS = [
    { id: "all_time", label: "All Time" },
    { id: "today", label: "Today" },
    { id: "7_days", label: "Last 7 Days" },
    { id: "30_days", label: "Last 30 Days" },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#0057c0] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label} <span className="opacity-80 text-[10px]">({tab.count})</span>
            </button>
          );
        })}
      </div>

      {/* Search & Date/Time Filter Controls */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {/* Text Search Input */}
          <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-xs border border-slate-200">
            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search name, phone or intake ID..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* NEW DATE/TIME FILTER BUTTON */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`h-10 px-3 rounded-xl bg-white border text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors ${
                dateRange !== "all_time"
                  ? "border-[#0057c0] text-[#0057c0] bg-blue-50/50"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span className="hidden sm:inline">{DATE_OPTIONS.find((d) => d.id === dateRange)?.label || "Date"}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {/* Date Range Dropdown Popover */}
            {showDatePicker && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-30 p-2 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Filter by Date</span>
                {DATE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onDateRangeChange(opt.id);
                      setShowDatePicker(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center justify-between ${
                      dateRange === opt.id ? "bg-[#d8e2ff] text-[#001a42] font-bold" : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {dateRange === opt.id && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                ))}
                <div className="border-t border-slate-100 my-1 pt-1 px-1">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Custom DateTime</label>
                  <input
                    type="datetime-local"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-1 text-[10px] text-slate-700"
                    onChange={(e) => {
                      if (e.target.value) {
                        onDateRangeChange("custom");
                        setShowDatePicker(false);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Filter & Sort Icons */}
          <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 shadow-xs hover:bg-slate-50 shrink-0">
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>
    </div>
  );
}
