"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DoctorAvatar from "@/components/common/DoctorAvatar";
import NyleLogo from "@/components/common/NyleLogo";
import { SARVAM_INDIC_LANGS, transcribeSarvamAudio } from "@/utils/sarvam";

export default function SarvamIntakePage() {
  const router = useRouter();

  // Form State
  const [firstName, setFirstName] = useState("Pooja");
  const [lastName, setLastName] = useState("Sharma");
  const [age, setAge] = useState(48);
  const [gender, setGender] = useState("Female");
  const [selectedLang, setSelectedLang] = useState("hi-IN");
  const [goalsText, setGoalsText] = useState("");

  // MediaRecorder STT State
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Video State
  const [welcomeVideoUrl, setWelcomeVideoUrl] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ");
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [tempVideoUrl, setTempVideoUrl] = useState(welcomeVideoUrl);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setIsProcessing(true);

        const transcript = await transcribeSarvamAudio(audioBlob, selectedLang);
        if (transcript) {
          setGoalsText((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
        } else {
          // Fallback typing notice if key not added
          setGoalsText((prev) => (prev.trim() ? prev : "Sarvam Indic Voice recorded (Add SARVAM_API_KEY in .env.local for live transcription)"));
        }
        setIsProcessing(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone permission denied or unsupported browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleStartVoiceFlow = () => {
    const params = new URLSearchParams({
      lang: selectedLang,
      gender: gender.toLowerCase(),
      firstName: firstName || "Patient",
    });
    router.push(`/onboard/sarvam-flow?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full justify-between font-sans antialiased">
      {/* Header with REAL LOGO */}
      <header className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 shrink-0">
        <div className="flex items-center gap-2">
          <NyleLogo size="w-7 h-7" />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs font-bold text-slate-900 leading-tight">Nyle Health</h1>
              <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 font-extrabold text-[8px] rounded-md border border-purple-200">
                SARVAM AI
              </span>
            </div>
            <p className="text-[9px] font-semibold text-slate-500 leading-none mt-0.5">Indic Voice Intake Engine</p>
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
        
        {/* Sarvam Engine Indicator & Indic Language Selector */}
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 p-2.5 rounded-2xl border border-purple-100 shadow-2xs">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-purple-700 text-sm">graphic_eq</span>
            <span className="text-[10px] font-bold text-purple-950">Saarika Indic Model</span>
          </div>

          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="text-[10px] font-bold bg-white border border-purple-200 text-purple-900 rounded-lg px-2 py-1 focus:outline-none"
          >
            {SARVAM_INDIC_LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Greeting */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="text-xl">🇮🇳</span>
            <div>
              <h2 className="text-xs font-bold text-slate-900">Welcome to Indic Voice Onboarding</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Speak naturally in your preferred Indian language. Powered by Sarvam AI.
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
              <span>{isEditingVideo ? "Cancel" : "Edit Link"}</span>
            </button>
          </div>

          {isEditingVideo && (
            <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
              <input
                type="text"
                value={tempVideoUrl}
                onChange={(e) => setTempVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full text-[11px] p-2 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setWelcomeVideoUrl(tempVideoUrl);
                  setIsEditingVideo(false);
                }}
                className="w-full py-1.5 bg-[#0057c0] text-white text-[10px] font-bold rounded-lg"
              >
                Save Link
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
                    className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-2xl">play_arrow</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Baseline Profile & Sarvam Recording Mic */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-600 text-lg">ecg_heart</span>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Baseline Demographics</h3>
                <p className="text-[10px] text-slate-500">Language: {selectedLang}</p>
              </div>
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
              <span className="text-sm font-bold text-purple-900">{age} <span className="text-[10px] text-slate-500">yrs</span></span>
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
                      ? "bg-purple-900 text-white shadow-xs"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* SARVAM MIC RECORD BUTTON */}
          <div className="space-y-2 pt-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase block">
              Sarvam Indic Voice Input
            </label>
            
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                isProcessing
                  ? "bg-purple-300 text-purple-900 cursor-wait"
                  : isRecording
                  ? "bg-red-500 text-white animate-pulse ring-4 ring-red-200"
                  : "bg-purple-900 text-white hover:bg-purple-950"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isProcessing ? "hourglass_empty" : isRecording ? "mic" : "graphic_eq"}
              </span>
              <span>
                {isProcessing
                  ? "Processing Sarvam AI Audio..."
                  : isRecording
                  ? "🔴 Recording Indic Voice... Tap to Process"
                  : "Tap to Speak in Indian Language (Sarvam AI)"}
              </span>
            </button>

            <textarea
              value={goalsText}
              onChange={(e) => setGoalsText(e.target.value)}
              placeholder="Indic voice transcript will appear here..."
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
          className="w-full py-3 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Begin Sarvam Voice Assessment</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
