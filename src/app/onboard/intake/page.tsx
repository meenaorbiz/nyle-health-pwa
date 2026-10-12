"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DoctorAvatar from "@/components/common/DoctorAvatar";

export default function PatientIntakePage() {
  const router = useRouter();

  // Form State
  const [firstName, setFirstName] = useState("Pooja");
  const [lastName, setLastName] = useState("Sharma");
  const [age, setAge] = useState(48);
  const [gender, setGender] = useState("Female");
  const [selectedLang, setSelectedLang] = useState("en");
  const [goalsText, setGoalsText] = useState("");

  // STT State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Editable Video URL State
  const [welcomeVideoUrl, setWelcomeVideoUrl] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ");
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [tempVideoUrl, setTempVideoUrl] = useState(welcomeVideoUrl);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const toggleSpeechRecognition = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser speech recognition unavailable. Please type directly.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLang === "hi" ? "hi-IN" : selectedLang === "es" ? "es-ES" : "en-IN";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setGoalsText((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleSaveVideoUrl = () => {
    setWelcomeVideoUrl(tempVideoUrl);
    setIsEditingVideo(false);
  };

  const handleStartVoiceFlow = () => {
    const params = new URLSearchParams({
      lang: selectedLang,
      gender: gender.toLowerCase(),
      firstName: firstName || "Patient",
    });
    router.push(`/onboard?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <header className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#0057c0]/10 text-[#0057c0] flex items-center justify-center font-bold text-xs">
            NH
          </div>
          <div>
            <h1 className="text-xs font-bold text-slate-900 leading-tight">Nyle Health</h1>
            <p className="text-[9px] font-semibold text-slate-500 leading-none">Patient Intake Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-slate-200/80 shadow-2xs">
          <DoctorAvatar size="w-5 h-5" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold text-slate-800 leading-none">Dr. Neha</span>
            <span className="text-[7px] font-semibold text-emerald-600 leading-none mt-0.5">Assistant Active</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3.5 scrollbar-none">
        
        {/* Step Indicator & Language */}
        <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#0057c0] uppercase bg-blue-50 px-2 py-0.5 rounded-md">
              Step 1 of 5
            </span>
            <span className="text-xs font-bold text-slate-800">Identification & Intake</span>
          </div>

          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 focus:outline-none"
          >
            <option value="en">English 🌐</option>
            <option value="hi">हिंदी (Hindi) 🌐</option>
            <option value="es">Español 🌐</option>
          </select>
        </div>

        {/* Greeting & Name Input */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="text-xl">👋</span>
            <div>
              <h2 className="text-xs font-bold text-slate-900">Welcome to Nyle Health</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Share your details so Dr. Neha's team can personalize your protocol.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">First Name *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Last Name *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Editable Physician Welcome Video */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#0057c0] text-base">smart_display</span>
              <span className="text-xs font-bold text-slate-900">Physician Welcome</span>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setTempVideoUrl(welcomeVideoUrl);
                setIsEditingVideo(!isEditingVideo);
              }}
              className="text-[10px] font-bold text-[#0057c0] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[12px]">edit</span>
              <span>{isEditingVideo ? "Cancel" : "Edit Video Link"}</span>
            </button>
          </div>

          {isEditingVideo && (
            <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
              <label className="text-[9px] font-bold text-blue-900 uppercase">Video Stream URL</label>
              <input
                type="text"
                value={tempVideoUrl}
                onChange={(e) => setTempVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full text-[11px] p-2 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveVideoUrl}
                className="w-full py-1.5 bg-[#0057c0] text-white text-[10px] font-bold rounded-lg shadow-2xs hover:bg-[#004396]"
              >
                Save Video Link
              </button>
            </div>
          )}

          <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video border border-slate-200 flex items-center justify-center">
            {isPlayingVideo ? (
              <iframe
                src={`${welcomeVideoUrl}?autoplay=1`}
                title="Physician Welcome Video"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1594824813570-78a333e1033d?auto=format&fit=crop&q=80&w=600"
                  alt="Physician Welcome"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(true)}
                    className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-2xl">play_arrow</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Baseline Health Profile & Mic */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-lg">ecg_heart</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Baseline Health Profile</h3>
              <p className="text-[10px] text-slate-500">Calibrating longevity and metabolic ranges.</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/70 rounded-xl">
            <span className="text-xs font-bold text-slate-700">Current Age</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAge(Math.max(18, age - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 active:scale-95"
              >
                -
              </button>
              <span className="text-sm font-bold text-[#0057c0]">{age} <span className="text-[10px] text-slate-500">yrs</span></span>
              <button
                type="button"
                onClick={() => setAge(age + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1.5">Biological Sex</label>
            <div className="grid grid-cols-3 gap-1.5">
              {["Female", "Male", "Other"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGender(item)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    gender === item
                      ? "bg-[#0057c0] text-white shadow-xs"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase block">Primary Health Goals & Symptoms</label>
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                isListening
                  ? "bg-red-500 text-white animate-pulse ring-4 ring-red-200"
                  : "bg-emerald-700 text-white hover:bg-emerald-800"
              }`}
            >
              <span className="material-symbols-outlined text-base">{isListening ? "mic" : "mic_none"}</span>
              <span>{isListening ? "🔴 Listening... Tap to Finish" : "Tap to speak goals or symptoms"}</span>
            </button>

            <textarea
              value={goalsText}
              onChange={(e) => setGoalsText(e.target.value)}
              placeholder="e.g., Improve energy levels, stay active post 60..."
              rows={3}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
            />
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="pt-2 border-t border-slate-200/80 shrink-0">
        <button
          type="button"
          onClick={handleStartVoiceFlow}
          className="w-full py-3 bg-[#0057c0] hover:bg-[#004396] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Begin Voice Assessment</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
