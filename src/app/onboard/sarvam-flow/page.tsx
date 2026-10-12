"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DoctorAvatar from "@/components/common/DoctorAvatar";
import NyleLogo from "@/components/common/NyleLogo";
import { speakSarvamText, transcribeSarvamAudio } from "@/utils/sarvam";

type QuestionStep = {
  id: string;
  title: string;
  question: Record<string, string>;
  tokens: Record<string, string[]>;
};

const SARVAM_PLAYBOOKS: Record<string, QuestionStep[]> = {
  female: [
    {
      id: "q_hormonal",
      title: "Hormonal & Sleep Balance (हार्मोनल संतुलन)",
      question: {
        "hi-IN": "क्या आप इस समय हॉट फ्लैश, नींद में रुकावट, या अनियमित माहवारी का अनुभव कर रही हैं?",
        "en-IN": "Are you currently experiencing hot flashes, sleep disruptions, or irregular cycles?",
      },
      tokens: {
        "hi-IN": ["खराब नींद", "रात में पसीना", "मूड़ में बदलाव", "अनियमित माहवारी", "कोई नहीं"],
        "en-IN": ["Poor Sleep Quality", "Night Sweats", "Mood Shifts", "Irregular Periods", "None"],
      },
    },
    {
      id: "q_vitality",
      title: "Energy & Vitality (ऊर्जा और स्वास्थ्य)",
      question: {
        "hi-IN": "क्या आपने पिछले 3 महीनों में थकान, जोड़ों में दर्द, या मानसिक सुस्ती महसूस की है?",
        "en-IN": "Have you noticed changes in energy levels, joint stiffness, or brain fog?",
      },
      tokens: {
        "hi-IN": ["सुबह की थकान", "जोड़ों में अकड़न", "मानसिक सुस्ती", "वजन में बदलाव", "कोई नहीं"],
        "en-IN": ["Low Morning Energy", "Joint Stiffness", "Brain Fog", "Weight Changes", "None"],
      },
    },
  ],
  male: [
    {
      id: "q_stamina",
      title: "Endurance & Recovery (स्टैमिना और रिकवरी)",
      question: {
        "hi-IN": "क्या आप इस समय कम ऊर्जा, मांसपेशियों में गिरावट, या नींद में रुकावट महसूस कर रहे हैं?",
        "en-IN": "Are you currently experiencing low energy, muscle loss, or sleep disruptions?",
      },
      tokens: {
        "hi-IN": ["कम स्टैमिना", "नींद में रुकावट", "ऊर्जा में कमी", "मांसपेशियों में कमी", "कोई नहीं"],
        "en-IN": ["Low Stamina", "Sleep Disturbance", "Loss of Energy", "Muscle Loss", "None"],
      },
    },
  ],
};

function SarvamFlowContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const lang = searchParams.get("lang") || "hi-IN";
  const gender = (searchParams.get("gender") || "female").toLowerCase();
  const firstName = searchParams.get("firstName") || "Patient";

  const playbook = SARVAM_PLAYBOOKS[gender] || SARVAM_PLAYBOOKS.female;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentQuestionObj = playbook[currentStepIndex];
  const questionText = currentQuestionObj?.question[lang] || currentQuestionObj?.question["hi-IN"] || currentQuestionObj?.question["en-IN"] || "";
  const tokenSuggestions = currentQuestionObj?.tokens[lang] || currentQuestionObj?.tokens["hi-IN"] || currentQuestionObj?.tokens["en-IN"] || [];

  const handleReplayTTS = () => {
    speakSarvamText(questionText, lang);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setIsProcessing(true);

        const transcript = await transcribeSarvamAudio(audioBlob, lang);
        if (transcript) {
          setInputText((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
        }
        setIsProcessing(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleNextStep = () => {
    const updatedAnswers = {
      ...answers,
      [currentQuestionObj.id]: inputText.trim() || "No response recorded",
    };
    setAnswers(updatedAnswers);
    setInputText("");

    if (currentStepIndex + 1 < playbook.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between font-sans antialiased">
      {/* Header with REAL LOGO */}
      <header className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 shrink-0">
        <button
          type="button"
          onClick={() => {
            if (isSubmitted) setIsSubmitted(false);
            else if (currentStepIndex > 0 && !isCompleted) setCurrentStepIndex(currentStepIndex - 1);
            else router.back();
          }}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-2xs shrink-0"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <NyleLogo size="w-5 h-5" />
          <div className="text-left min-w-0">
            <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider truncate">
              {isSubmitted ? "Submission Complete" : isCompleted ? "Sarvam Summary" : currentQuestionObj?.title}
            </h2>
            <p className="text-[9px] text-purple-800 font-semibold truncate">Sarvam Indic Engine ({lang})</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-slate-200/80 shadow-2xs shrink-0">
          <DoctorAvatar size="w-5 h-5" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold text-slate-800 leading-none">Dr. Neha</span>
            <span className="text-[7px] font-semibold text-emerald-600 leading-none mt-0.5">Active</span>
          </div>
        </div>
      </header>

      {/* Progress Line */}
      {!isSubmitted && (
        <div className="w-full bg-slate-200 h-1.5 rounded-full my-2 overflow-hidden shrink-0">
          <div
            className="bg-purple-800 h-full transition-all duration-300"
            style={{
              width: isCompleted ? "100%" : `${((currentStepIndex + 1) / playbook.length) * 100}%`,
            }}
          ></div>
        </div>
      )}

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto py-2 space-y-3 scrollbar-none">
        {isSubmitted ? (
          /* THANK YOU VIEW WITH VIDEO THUMBNAILS */
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <div className="w-11 h-11 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="text-sm font-bold text-emerald-950">Intake Submitted Successfully</h3>
              <p className="text-xs font-semibold text-emerald-800 leading-relaxed px-1">
                Thank you for submitting — Dr. Neha's office will contact you for an appointment.
              </p>
            </div>

            <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-800 text-lg">calendar_month</span>
                <div className="flex flex-col">
                  <span className="font-bold text-purple-950 text-[11px]">Appointment Review</span>
                  <span className="text-[9px] text-purple-700">Patient: {firstName} ({gender})</span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-900 text-[9px] font-bold rounded-full">In Queue</span>
            </div>

            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-purple-800 text-base">video_library</span>
                <span>Recommended Patient Guides</span>
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2.5 p-2 bg-white border border-slate-200/80 rounded-xl">
                  <div className="relative w-20 h-14 rounded-lg bg-slate-800 shrink-0 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80"
                      alt="Guide 1"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">play_circle</span>
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-900 truncate">Consultation Prep Guide</span>
                    <p className="text-[9px] text-slate-500 truncate mt-0.5">Indic evaluation process overview.</p>
                    <span className="text-[8px] text-purple-800 font-bold mt-0.5">2:45 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : !isCompleted ? (
          /* ACTIVE QUESTION STEP */
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl p-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm shrink-0">🎙️</span>
                <p className="text-[10px] text-purple-950 font-medium leading-tight truncate">
                  <strong>Dr. Neha (Sarvam TTS):</strong> Listen in {lang}
                </p>
              </div>
              <button
                type="button"
                onClick={handleReplayTTS}
                className="px-2 py-0.5 bg-white border border-purple-200 text-purple-900 text-[9px] font-bold rounded-md shadow-2xs"
              >
                Bulbul TTS 🔊
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              {questionText}
            </h3>

            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200/80 rounded-xl gap-2.5">
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isProcessing
                    ? "bg-purple-300 text-purple-900 cursor-wait"
                    : isRecording
                    ? "bg-red-500 text-white animate-pulse ring-4 ring-red-200"
                    : "bg-purple-900 text-white shadow-md active:scale-95"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {isProcessing ? "hourglass_empty" : isRecording ? "mic" : "graphic_eq"}
                </span>
              </button>

              <span className="text-[10px] font-semibold text-slate-600">
                {isProcessing
                  ? "Transcribing with Saarika Model..."
                  : isRecording
                  ? "🔴 Recording Indic Voice..."
                  : "Tap Mic to Record (Sarvam AI)"}
              </span>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Spoken words transcribe here..."
                rows={3}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none resize-none"
              />
            </div>

            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">
                Quick Select Tokens
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tokenSuggestions.map((token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => {
                      const trimmed = inputText.trim();
                      if (!trimmed.includes(token)) setInputText(trimmed ? `${trimmed}, ${token}` : token);
                    }}
                    className="text-[10px] font-medium bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-full"
                  >
                    + {token}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* FINAL REVIEW */
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-2.5 flex items-center gap-2.5">
              <span className="text-lg">✅</span>
              <div>
                <h4 className="font-bold text-purple-950 text-xs">Sarvam Intake Complete</h4>
                <p className="text-[10px] text-purple-700">Review your answers before submitting.</p>
              </div>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-100">
              {playbook.map((q) => (
                <div key={q.id} className="pt-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{q.title}</p>
                  <p className="text-[11px] text-slate-600 italic mb-1">{q.question[lang] || q.question["hi-IN"]}</p>
                  <p className="text-xs font-semibold text-slate-900 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    "{answers[q.id] || "No response recorded"}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="pt-2 border-t border-slate-200/80 shrink-0">
        {isSubmitted ? (
          <button
            type="button"
            onClick={() => router.push("/onboard/sarvam-intake")}
            className="w-full py-3 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Return to Sarvam Home</span>
            <span className="material-symbols-outlined text-sm">home</span>
          </button>
        ) : !isCompleted ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-3 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Confirm & Next</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsSubmitted(true)}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Submit to Dr. Neha</span>
            <span className="material-symbols-outlined text-sm">check</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function SarvamFlowPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs text-slate-500">Loading Sarvam AI flow...</div>}>
      <SarvamFlowContent />
    </Suspense>
  );
}
