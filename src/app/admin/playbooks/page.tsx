"use client";

import { useState } from "react";

export default function PlaybooksPage() {
  const [isSection1Open, setIsSection1Open] = useState(true);
  const [isSection2Open, setIsSection2Open] = useState(true);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>("q_hot_flashes");

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col w-full p-3 sm:p-4 gap-3">
      
      {/* Header Info & Title */}
      <section className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <span>Admin Settings</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#0057c0] font-semibold">Playbooks</span>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#191c1e] tracking-tight">Clinical Playbook Builder</h1>
            <p className="text-xs text-slate-500">Dynamic intake logic, adaptive rules & voice guidance</p>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#89f5e7]/60 text-[#005049] text-[11px] font-semibold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
            Published v2.1
          </span>
        </div>

        {/* Playbook Selector & Action Buttons Row */}
        <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex flex-col gap-2 mt-1">
          <button className="w-full flex items-center justify-between gap-2 bg-slate-100/80 px-3 py-2 rounded-lg text-left text-xs text-[#191c1e] hover:bg-slate-200/60 transition-colors">
            <div className="flex items-center gap-2 truncate">
              <span className="material-symbols-outlined text-[#0057c0] text-base">description</span>
              <span className="font-semibold text-[#0057c0] truncate">General & Perimenopause Intake (v2.1)</span>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-base shrink-0">unfold_more</span>
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#3a80f6] text-white text-xs font-semibold hover:bg-[#0057c0] transition-colors shadow-xs">
              <span className="material-symbols-outlined text-base">add</span>
              <span>Add Question</span>
            </button>
            <button className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-[#191c1e] text-xs font-medium hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-base text-[#0057c0]">upload_file</span>
              <span className="truncate">Import CSV/XLS</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Universal Baseline Questions */}
      <section className="flex flex-col gap-1.5 mt-1">
        <div 
          onClick={() => setIsSection1Open(!isSection1Open)}
          className="flex items-center justify-between py-1.5 px-2.5 bg-slate-100/80 rounded-lg border border-slate-200/60 cursor-pointer hover:bg-slate-200/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#2270e5] text-white flex items-center justify-center text-[11px] font-bold">1</span>
            <span className="text-xs font-semibold text-[#191c1e]">Universal Baseline Questions</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px]">3 questions</span>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-lg">
            {isSection1Open ? 'expand_less' : 'expand_more'}
          </span>
        </div>

        {isSection1Open && (
          <div className="flex flex-col gap-1 pl-0.5">
            {/* Row 1: Patient Age */}
            <div className="bg-white rounded-lg border border-slate-200/70 px-2.5 py-2 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-slate-400 cursor-grab text-base select-none">drag_indicator</span>
                <span className="material-symbols-outlined text-[#0057c0] text-base shrink-0">tag</span>
                <span className="text-xs font-medium text-[#191c1e] truncate">Patient Age (Years)</span>
                <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1 py-0.5 rounded">#number</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-[#0057c0] font-medium">Mandatory</span>
                <div className="w-7 h-4 bg-[#3a80f6] rounded-full flex items-center px-0.5 justify-end">
                  <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-base">expand_more</span>
              </div>
            </div>

            {/* Row 2: Gender & Biological Sex */}
            <div className="bg-white rounded-lg border border-slate-200/70 px-2.5 py-2 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-slate-400 cursor-grab text-base select-none">drag_indicator</span>
                <span className="material-symbols-outlined text-[#0057c0] text-base shrink-0">radio_button_checked</span>
                <span className="text-xs font-medium text-[#191c1e] truncate">Gender & Biological Sex</span>
                <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1 py-0.5 rounded">pill_select</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-[#0057c0] font-medium">Mandatory</span>
                <div className="w-7 h-4 bg-[#3a80f6] rounded-full flex items-center px-0.5 justify-end">
                  <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-base">expand_more</span>
              </div>
            </div>

            {/* Row 3: Primary Health Goals */}
            <div className="bg-white rounded-lg border border-slate-200/70 px-2.5 py-2 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-slate-400 cursor-grab text-base select-none">drag_indicator</span>
                <span className="material-symbols-outlined text-[#006a61] text-base shrink-0">mic</span>
                <span className="text-xs font-medium text-[#191c1e] truncate">Primary Health Goals & Symptom Overview</span>
                <span className="text-[10px] text-[#006a61] font-mono bg-[#89f5e7]/40 px-1 py-0.5 rounded">voice_audio</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-[#0057c0] font-medium">Mandatory</span>
                <div className="w-7 h-4 bg-[#3a80f6] rounded-full flex items-center px-0.5 justify-end">
                  <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-base">expand_more</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Adaptive Logic Branches */}
      <section className="flex flex-col gap-1.5 mt-2">
        <div 
          onClick={() => setIsSection2Open(!isSection2Open)}
          className="flex items-center justify-between py-1.5 px-2.5 bg-slate-100/80 rounded-lg border border-slate-200/60 cursor-pointer hover:bg-slate-200/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#006a61] text-white flex items-center justify-center text-[11px] font-bold">2</span>
            <span className="text-xs font-semibold text-[#191c1e]">Adaptive Logic Branches</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">2 branches</span>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-lg">
            {isSection2Open ? 'expand_less' : 'expand_more'}
          </span>
        </div>

        {isSection2Open && (
          <div className="flex flex-col gap-1.5 pl-0.5">
            {/* Question 1: Hot Flashes (Expanded State) */}
            <div className="bg-white rounded-lg border-2 border-[#3a80f6]/50 shadow-xs overflow-hidden flex flex-col">
              <div 
                onClick={() => toggleQuestion("q_hot_flashes")}
                className="px-2.5 py-2 flex items-center justify-between gap-2 bg-[#d8e2ff]/20 border-b border-slate-200/50 cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-slate-400 cursor-grab text-base select-none">drag_indicator</span>
                  <span className="material-symbols-outlined text-[#006a61] text-base shrink-0">bolt</span>
                  <span className="text-xs font-semibold text-[#191c1e] truncate">Are you experiencing hot flashes, sleep disruptions, or irregular cycles?</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-[#0057c0] font-medium">Mandatory</span>
                  <div className="w-7 h-4 bg-[#3a80f6] rounded-full flex items-center px-0.5 justify-end">
                    <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                  </div>
                  <span className="material-symbols-outlined text-[#0057c0] text-base">
                    {expandedQuestionId === "q_hot_flashes" ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>

              {expandedQuestionId === "q_hot_flashes" && (
                <div className="p-2.5 bg-slate-50/60 flex flex-col gap-2.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Input Type Selector</label>
                      <div className="flex items-center justify-between bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg text-[#191c1e] text-xs">
                        <span className="truncate">Multi-Select + Severity Scale (0-10)</span>
                        <span className="material-symbols-outlined text-sm text-slate-400">arrow_drop_down</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Conditional Rule Trigger</label>
                      <div className="bg-white border border-slate-200 px-2 py-1.5 rounded-lg flex items-center gap-1 overflow-x-auto text-[11px] font-mono">
                        <span className="text-[#0057c0] font-bold">IF</span>
                        <span className="bg-[#d8e2ff] text-[#001a42] px-1.5 py-0.5 rounded font-semibold">Gender == 'Female'</span>
                        <span className="text-[#0057c0] font-bold">AND</span>
                        <span className="bg-[#d8e2ff] text-[#001a42] px-1.5 py-0.5 rounded font-semibold">Age &gt;= 40</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Voice Guidance Block */}
                  <div className="bg-white border border-slate-200/80 rounded-lg p-2 flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[#006a61] text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      <span>AI Clinical Voice Guidance (Voice Agent Script)</span>
                    </div>
                    <p className="text-slate-600 italic text-[11px] leading-relaxed bg-slate-50 rounded p-1.5 m-0 border border-slate-100">
                      “Ask gently about cycle regularity and sleep onset: 'Have you noticed any subtle shifts in your sleep or thermal comfort recently?'”
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <button type="button" className="inline-flex items-center gap-1 text-[#0057c0] hover:underline text-xs font-medium">
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                      <span>Duplicate Question</span>
                    </button>
                    <button type="button" className="inline-flex items-center gap-1 text-[#ba1a1a] hover:bg-[#ffdad6] px-2 py-0.5 rounded text-xs transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Delete Question</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Question 2: Hormone Therapy History (Collapsed) */}
            <div className="bg-white rounded-lg border border-slate-200/70 px-2.5 py-2 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-slate-400 cursor-grab text-base select-none">drag_indicator</span>
                <span className="material-symbols-outlined text-[#006a61] text-base shrink-0">mic</span>
                <span className="text-xs font-medium text-[#191c1e] truncate">Hormone Therapy / Supplement History</span>
                <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1 py-0.5 rounded">voice_synthesis</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-slate-500 font-medium">Optional</span>
                <div className="w-7 h-4 bg-slate-300 rounded-full flex items-center px-0.5">
                  <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-base">expand_more</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sticky Floating Action Dock (Anchored above the bottom nav inside the PWA container) */}
      <div className="absolute bottom-16 left-0 right-0 z-30 px-3 pb-2 pointer-events-none">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-slate-200/80 shadow-lg flex flex-col gap-1.5 pointer-events-auto">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200/80 hover:bg-slate-200/60 text-[#191c1e] text-xs font-semibold transition-colors">
              <span className="material-symbols-outlined text-base text-[#006a61]">mic</span>
              <span className="truncate">Preview Voice Flow</span>
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#3a80f6] hover:bg-[#0057c0] text-white text-xs font-semibold shadow-xs transition-colors">
              <span className="material-symbols-outlined text-base">publish</span>
              <span className="truncate">Publish Changes</span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
            <span>Auto-saved draft at 11:58 AM • All validators passed</span>
          </div>
        </div>
      </div>

    </div>
  );
}
