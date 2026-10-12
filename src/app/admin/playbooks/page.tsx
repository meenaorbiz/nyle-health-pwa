"use client";

import { useState } from "react";
import { speakText, stopSpeaking } from "@/utils/speech";

type QuestionItem = {
  id: string;
  section: 1 | 2;
  title: string;
  inputType: string;
  mandatory: boolean;
  voiceScript?: string;
  genderTrigger?: string;
  ageTrigger?: number;
};

const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: "q_age",
    section: 1,
    title: "Patient Age (Years)",
    inputType: "#number",
    mandatory: true,
  },
  {
    id: "q_gender",
    section: 1,
    title: "Gender & Biological Sex",
    inputType: "pill_select",
    mandatory: true,
  },
  {
    id: "q_goals",
    section: 1,
    title: "Primary Health Goals & Symptom Overview",
    inputType: "voice_audio",
    mandatory: true,
  },
  {
    id: "q_hot_flashes",
    section: 2,
    title: "Are you experiencing hot flashes, sleep disruptions, or irregular cycles?",
    inputType: "Multi-Select + Severity Scale (0-10)",
    mandatory: true,
    voiceScript: "Ask gently about cycle regularity and sleep onset: 'Have you noticed any subtle shifts in your sleep or thermal comfort recently?'",
    genderTrigger: "Female",
    ageTrigger: 40,
  },
  {
    id: "q_hormone_history",
    section: 2,
    title: "Hormone Therapy / Supplement History",
    inputType: "voice_synthesis",
    mandatory: false,
    voiceScript: "Inquire about current or past HRT usage and thyroid daily supplements.",
  },
];

export default function PlaybooksPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [isSection1Open, setIsSection1Open] = useState(true);
  const [isSection2Open, setIsSection2Open] = useState(true);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>("q_hot_flashes");

  // Voice Preview & Toast States
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [publishStatusText, setPublishStatusText] = useState("Auto-saved draft at 11:58 AM • All validators passed");

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  const updateQuestionField = (id: string, field: keyof QuestionItem, value: any) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  // DUPLICATE QUESTION FUNCTION
  const handleDuplicateQuestion = (id: string) => {
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      const original = questions[index];
      const newId = `q_copy_${Date.now()}`;
      const duplicate: QuestionItem = {
        ...original,
        id: newId,
        title: `${original.title} (Copy)`,
      };
      const updated = [...questions];
      updated.splice(index + 1, 0, duplicate);
      setQuestions(updated);
      setExpandedQuestionId(newId);
      setToastMsg("✓ Question duplicated successfully!");
      setTimeout(() => setToastMsg(null), 2500);
    }
  };

  // DELETE QUESTION
  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    if (expandedQuestionId === id) setExpandedQuestionId(null);
    setToastMsg("Question removed.");
    setTimeout(() => setToastMsg(null), 2500);
  };

  // ADD NEW QUESTION
  const handleAddQuestion = () => {
    const newId = `q_custom_${Date.now()}`;
    const newQ: QuestionItem = {
      id: newId,
      section: 2,
      title: "New Custom Intake Question",
      inputType: "Voice Audio + Text",
      mandatory: true,
      voiceScript: "Please share any additional health concerns or symptoms.",
    };
    setQuestions((prev) => [...prev, newQ]);
    setExpandedQuestionId(newId);
  };

  // PREVIEW VOICE FLOW (SPEAKS ACTIVE AI VOICE SCRIPT)
  const handlePreviewVoice = () => {
    if (isPlayingVoice) {
      stopSpeaking();
      setIsPlayingVoice(false);
      return;
    }

    const activeQ = questions.find((q) => q.id === expandedQuestionId) || questions.find((q) => q.voiceScript);
    const scriptToSpeak = activeQ?.voiceScript || activeQ?.title || "Please share your symptoms.";

    setIsPlayingVoice(true);
    speakText(scriptToSpeak, "en");

    setTimeout(() => setIsPlayingVoice(false), 6000);
  };

  // PUBLISH CHANGES TO API
  const handlePublish = async () => {
    setIsPublishing(true);
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    try {
      const formattedQuestions = questions.map((q) => ({
        id: q.id,
        title: q.title,
        question: { en: q.title, hi: q.title },
        inputType: q.inputType,
        voiceScript: q.voiceScript || "",
        mandatory: q.mandatory,
      }));

      const res = await fetch("/api/playbooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: "v2.2",
          title: "General & Perimenopause Intake",
          questions: formattedQuestions,
        }),
      });

      if (res.ok) {
        setPublishStatusText(`✓ Published at ${now} • Live in Patient Intake`);
        setToastMsg(`✓ Playbook v2.2 Published! Changes live in Patient Intake.`);
      } else {
        setToastMsg("Failed to publish changes.");
      }
    } catch (err) {
      setToastMsg("Error publishing changes.");
    }

    setIsPublishing(false);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const section1Questions = questions.filter((q) => q.section === 1);
  const section2Questions = questions.filter((q) => q.section === 2);

  return (
    <div className="flex flex-col w-full p-3 sm:p-4 gap-3 relative pb-32 font-sans antialiased">
      
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="sticky top-0 left-0 right-0 z-50 bg-[#005049] text-white px-3 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs font-bold border border-[#89f5e7]/40">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#89f5e7] text-lg shrink-0">check_circle</span>
            <span className="truncate">{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-[#89f5e7] text-xs font-bold ml-1 shrink-0">
            ✕
          </button>
        </div>
      )}

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
            Published v2.2
          </span>
        </div>

        {/* Playbook Selector & Action Buttons Row */}
        <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex flex-col gap-2 mt-1">
          <button className="w-full flex items-center justify-between gap-2 bg-slate-100/80 px-3 py-2 rounded-lg text-left text-xs text-[#191c1e] hover:bg-slate-200/60 transition-colors">
            <div className="flex items-center gap-2 truncate">
              <span className="material-symbols-outlined text-[#0057c0] text-base">description</span>
              <span className="font-semibold text-[#0057c0] truncate">General & Perimenopause Intake (v2.2)</span>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-base shrink-0">unfold_more</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#3a80f6] text-white text-xs font-semibold hover:bg-[#0057c0] transition-colors shadow-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Add Question</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setToastMsg("CSV Import module ready.");
                setTimeout(() => setToastMsg(null), 2500);
              }}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-[#191c1e] text-xs font-medium hover:bg-slate-50 transition-colors active:scale-95"
            >
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
            <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px]">
              {section1Questions.length} questions
            </span>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-lg">
            {isSection1Open ? "expand_less" : "expand_more"}
          </span>
        </div>

        {isSection1Open && (
          <div className="flex flex-col gap-1 pl-0.5">
            {section1Questions.map((q) => (
              <div key={q.id} className="bg-white rounded-lg border border-slate-200/70 px-2.5 py-2 flex items-center justify-between gap-1.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className="material-symbols-outlined text-slate-400 cursor-grab text-base select-none shrink-0">drag_indicator</span>
                  <span className="material-symbols-outlined text-[#0057c0] text-base shrink-0">
                    {q.inputType === "voice_audio" ? "mic" : q.inputType === "pill_select" ? "radio_button_checked" : "tag"}
                  </span>
                  <input
                    type="text"
                    value={q.title}
                    onChange={(e) => updateQuestionField(q.id, "title", e.target.value)}
                    className="text-xs font-medium text-[#191c1e] bg-transparent border-b border-transparent focus:border-[#0057c0] focus:outline-none min-w-0 flex-1 truncate"
                  />
                  <span className="text-[9px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">{q.inputType}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 pl-1">
                  <span className="text-[10px] text-[#0057c0] font-medium whitespace-nowrap">
                    {q.mandatory ? "Mandatory" : "Optional"}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuestionField(q.id, "mandatory", !q.mandatory)}
                    className={`w-7 h-4 rounded-full flex items-center px-0.5 transition-colors ${
                      q.mandatory ? "bg-[#3a80f6] justify-end" : "bg-slate-300 justify-start"
                    }`}
                  >
                    <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                  </button>
                  <span className="material-symbols-outlined text-slate-400 text-base shrink-0">expand_more</span>
                </div>
              </div>
            ))}
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
            <span className="px-1.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
              {section2Questions.length} branches
            </span>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-lg">
            {isSection2Open ? "expand_less" : "expand_more"}
          </span>
        </div>

        {isSection2Open && (
          <div className="flex flex-col gap-2 pl-0.5">
            {section2Questions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              return (
                <div key={q.id} className="bg-white rounded-lg border-2 border-[#3a80f6]/50 shadow-xs overflow-hidden flex flex-col">
                  {/* Card Header Bar */}
                  <div
                    onClick={() => toggleQuestion(q.id)}
                    className="px-2.5 py-2 flex items-center justify-between gap-1.5 bg-[#d8e2ff]/20 border-b border-slate-200/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="material-symbols-outlined text-slate-400 cursor-grab text-base select-none shrink-0">drag_indicator</span>
                      <span className="material-symbols-outlined text-[#006a61] text-base shrink-0">
                        {q.inputType.includes("Voice") || q.inputType.includes("synthesis") ? "mic" : "bolt"}
                      </span>
                      <input
                        type="text"
                        value={q.title}
                        onChange={(e) => updateQuestionField(q.id, "title", e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold text-[#191c1e] bg-transparent border-b border-transparent focus:border-[#0057c0] focus:outline-none min-w-0 flex-1 truncate"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 pl-1">
                      <span className="text-[10px] text-[#0057c0] font-medium whitespace-nowrap">
                        {q.mandatory ? "Mandatory" : "Optional"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuestionField(q.id, "mandatory", !q.mandatory);
                        }}
                        className={`w-7 h-4 rounded-full flex items-center px-0.5 transition-colors ${
                          q.mandatory ? "bg-[#3a80f6] justify-end" : "bg-slate-300 justify-start"
                        }`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                      </button>
                      <span className="material-symbols-outlined text-[#0057c0] text-base shrink-0">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Form */}
                  {isExpanded && (
                    <div className="p-2.5 bg-slate-50/60 flex flex-col gap-2.5 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* INPUT TYPE SELECTOR DROPDOWN */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            Input Type Selector
                          </label>
                          <select
                            value={q.inputType}
                            onChange={(e) => updateQuestionField(q.id, "inputType", e.target.value)}
                            className="bg-white border border-slate-200 px-2 py-1.5 rounded-lg text-[#191c1e] text-xs font-semibold focus:outline-none focus:border-[#0057c0]"
                          >
                            <option value="Multi-Select + Severity Scale (0-10)">Multi-Select + Severity Scale (0-10)</option>
                            <option value="Voice Audio + Text">Voice Audio + Text</option>
                            <option value="voice_synthesis">Voice Synthesis</option>
                            <option value="pill_select">Pill Choice Select</option>
                            <option value="#number">Numeric Input (#number)</option>
                          </select>
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
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex flex-col gap-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[#006a61] text-xs font-semibold">
                          <span className="material-symbols-outlined text-base">auto_awesome</span>
                          <span>AI Clinical Voice Guidance (Voice Agent Script)</span>
                        </div>
                        <textarea
                          rows={3}
                          value={q.voiceScript || ""}
                          onChange={(e) => updateQuestionField(q.id, "voiceScript", e.target.value)}
                          placeholder="Type AI prompt voice script..."
                          className="w-full text-xs text-slate-800 italic leading-relaxed bg-slate-50 focus:bg-white rounded-lg p-2.5 border border-slate-200 focus:border-[#0057c0] focus:ring-1 focus:ring-[#0057c0] focus:outline-none transition-all resize-none shadow-inner"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                        {/* FUNCTIONAL DUPLICATE QUESTION BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleDuplicateQuestion(q.id)}
                          className="inline-flex items-center gap-1.5 text-[#0057c0] hover:bg-blue-50 px-2 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer active:scale-95"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                          <span>Duplicate Question</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="inline-flex items-center gap-1 text-[#ba1a1a] hover:bg-[#ffdad6] px-2 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer active:scale-95"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          <span>Delete Question</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Sticky Floating Action Dock */}
      <div className="sticky bottom-0 left-0 right-0 z-30 pt-2 pb-1 bg-gradient-to-t from-[#f7f9fb] via-[#f7f9fb] to-transparent mt-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-slate-200/80 shadow-lg flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePreviewVoice}
              className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                isPlayingVoice
                  ? "bg-emerald-600 text-white animate-pulse"
                  : "bg-slate-100 border border-slate-200/80 hover:bg-slate-200/60 text-[#191c1e]"
              }`}
            >
              <span className="material-symbols-outlined text-base text-[#006a61]">
                {isPlayingVoice ? "volume_up" : "mic"}
              </span>
              <span className="truncate">{isPlayingVoice ? "Playing Voice..." : "Preview Voice Flow"}</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#3a80f6] hover:bg-[#0057c0] text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">publish</span>
              <span className="truncate">{isPublishing ? "Publishing..." : "Publish Changes"}</span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
            <span>{publishStatusText}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
