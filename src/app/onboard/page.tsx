"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DoctorAvatar from "@/components/common/DoctorAvatar";
import { speakText, stopSpeaking, getSpeechRecognition, unlockAudio } from "@/utils/speech";

type QuestionStep = {
  id: string;
  title: string;
  question: Record<string, string>;
  tokens: Record<string, string[]>;
};

const CLINICAL_PLAYBOOKS: Record<string, QuestionStep[]> = {
  female: [
    {
      id: "q_hormonal",
      title: "Hormonal & Sleep Symptoms",
      question: {
        en: "Are you currently experiencing hot flashes, sleep disruptions, or irregular cycles?",
        hi: "क्या आप इस समय हॉट फ्लैश, नींद में रुकावट, या अनियमित चक्र का अनुभव कर रहे हैं?",
        es: "¿Experimenta actualmente sofocos, alteraciones del sueño o ciclos irregulares?",
      },
      tokens: {
        en: ["Poor Sleep Quality", "Night Sweats", "Mood Shifts", "Irregular Periods", "None"],
        hi: ["खराब नींद", "रात में पसीना", "मूड़ में बदलाव", "अनियमित माहवारी", "कोई नहीं"],
      },
    },
    {
      id: "q_vitality",
      title: "Energy & Metabolic Balance",
      question: {
        en: "Have you noticed changes in energy levels, joint pain, or mood fluctuations over the past 3 months?",
        hi: "क्या आपने पिछले 3 महीनों में ऊर्जा के स्तर, जोड़ों के दर्द, या मूड स्विंग्स में बदलाव महसूस किया है?",
        es: "¿Ha notado cambios en sus niveles de energía, dolor articular o cambios de humor en los últimos 3 meses?",
      },
      tokens: {
        en: ["Low Morning Energy", "Joint Stiffness", "Brain Fog", "Weight Changes", "None"],
        hi: ["कम ऊर्जा", "जोड़ों में अकड़न", "मानसिक थकान", "वजन में बदलाव", "कोई नहीं"],
      },
    },
    {
      id: "q_medications",
      title: "Current Therapies & Supplements",
      question: {
        en: "Are you currently taking any hormone therapy, thyroid medications, or daily supplements?",
        hi: "क्या आप वर्तमान में कोई हार्मोन थेरेपी, थायराइड की दवाएं, या सप्लीमेंट्स ले रहे हैं?",
        es: "¿Toma actualmente alguna terapia hormonal, medicamentos para la tiroides o suplementos?",
      },
      tokens: {
        en: ["Thyroid Medication", "Vitamin D / B12", "HRT Therapy", "Multivitamins", "None"],
        hi: ["थायराइड दवा", "विटामिन सप्लीमेंट", "हार्मोन थेरेपी", "कोई नहीं"],
      },
    },
  ],
  male: [
    {
      id: "q_stamina",
      title: "Vitality & Endurance",
      question: {
        en: "Are you currently experiencing low energy, muscle loss, sleep disruptions, or reduced stamina?",
        hi: "क्या आप इस समय कम ऊर्जा, मांसपेशियों में कमी, नींद में रुकावट, या स्टैमिना में कमी महसूस कर रहे हैं?",
        es: "¿Experimenta actualmente baja energía, pérdida de masa muscular, trastornos del sueño o menor resistencia?",
      },
      tokens: {
        en: ["Low Stamina", "Sleep Disturbance", "Loss of Energy", "Muscle Loss", "None"],
        hi: ["कम स्टैमिना", "नींद में रुकावट", "ऊर्जा में कमी", "मांसपेशियों में कमी", "कोई नहीं"],
      },
    },
    {
      id: "q_metabolic",
      title: "Recovery & Metabolic Focus",
      question: {
        en: "Have you noticed changes in post-exercise recovery, mental focus, or weight distribution?",
        hi: "क्या आपने कसरत के बाद रिकवरी, मानसिक ध्यान, या शरीर के वजन में कोई बदलाव देखा है?",
        es: "¿Ha notado cambios en la recuperación post-ejercicio, enfoque mental o distribución de peso?",
      },
      tokens: {
        en: ["Slow Recovery", "Brain Fog", "Belly Fat Gain", "High Stress", "None"],
        hi: ["धीमी रिकवरी", "मानसिक धुंधलापन", "पेट की चर्बी", "तनाव", "कोई नहीं"],
      },
    },
    {
      id: "q_medications",
      title: "Current Therapies & Supplements",
      question: {
        en: "Are you currently taking any testosterone support, blood pressure meds, or daily supplements?",
        hi: "क्या आप वर्तमान में कोई टेस्टोस्टेरोन सपोर्ट, ब्लड प्रेशर की दवाएं, या सप्लीमेंट्स ले रहे हैं?",
        es: "¿Toma actualmente soporte de testosterona, medicamentos para la presión arterial o suplementos?",
      },
      tokens: {
        en: ["BP Medications", "Creatine / Whey", "Vitamin D3", "TRT", "None"],
        hi: ["बीपी की दवा", "प्रोटीन/सप्लीमेंट", "विटामिन D3", "कोई नहीं"],
      },
    },
  ],
};

function OnboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const lang = searchParams.get("lang") || "en";
  const gender = (searchParams.get("gender") || "female").toLowerCase();
  const firstName = searchParams.get("firstName") || "Patient";

  const playbook = CLINICAL_PLAYBOOKS[gender] || CLINICAL_PLAYBOOKS.female;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const recognitionRef = useRef<any>(null);

  const currentQuestionObj = playbook[currentStepIndex];
  const questionText = currentQuestionObj?.question[lang] || currentQuestionObj?.question.en || "";
  const tokenSuggestions = currentQuestionObj?.tokens[lang] || currentQuestionObj?.tokens.en || [];

  useEffect(() => {
    if (!isCompleted && questionText) {
      speakText(questionText, lang);
    }
    return () => stopSpeaking();
  }, [currentStepIndex, questionText, lang, isCompleted]);

  const toggleListening = () => {
    unlockAudio();

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = getSpeechRecognition();

    if (!recognition) {
      alert("Browser speech recognition unavailable. Please type your response.");
      return;
    }

    try {
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang === "hi" ? "hi-IN" : lang === "es" ? "es-ES" : "en-IN";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleAddToken = (token: string) => {
    const trimmed = inputText.trim();
    if (!trimmed.includes(token)) {
      setInputText(trimmed ? `${trimmed}, ${token}` : token);
    }
  };

  const handleNextStep = () => {
    stopSpeaking();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestionObj.id]: inputText.trim() || "No symptoms reported",
    };
    setAnswers(updatedAnswers);
    setInputText("");

    if (currentStepIndex + 1 < playbook.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
      speakText(`Thank you ${firstName}. Your intake summary is complete.`, lang);
    }
  };

  const handleSubmitIntake = () => {
    alert("Intake session successfully submitted to Dr. Neha!");
    router.push("/onboard/intake");
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <header className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 shrink-0">
        <button
          type="button"
          onClick={() => {
            stopSpeaking();
            if (currentStepIndex > 0 && !isCompleted) {
              setCurrentStepIndex(currentStepIndex - 1);
            } else {
              router.back();
            }
          }}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-2xs shrink-0"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        <div className="text-center px-2 flex-1 min-w-0">
          <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider truncate">
            {isCompleted ? "Clinical Intake Summary" : currentQuestionObj?.title}
          </h2>
          <p className="text-[9px] text-slate-500 truncate">
            {isCompleted ? "Final Step" : `Question ${currentStepIndex + 1} of ${playbook.length}`}
          </p>
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
      <div className="w-full bg-slate-200 h-1.5 rounded-full my-2 overflow-hidden shrink-0">
        <div
          className="bg-[#0057c0] h-full transition-all duration-300"
          style={{
            width: isCompleted
              ? "100%"
              : `${((currentStepIndex + 1) / playbook.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto py-2 space-y-3 scrollbar-none">
        {!isCompleted ? (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5">
            {/* Dr Neha Prompt Box */}
            <div className="flex items-center justify-between bg-blue-50/80 border border-blue-100 rounded-xl p-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm shrink-0">🎙️</span>
                <p className="text-[10px] text-blue-900 font-medium leading-tight truncate">
                  <strong>Dr. Neha:</strong> "Please share your response in your preferred language."
                </p>
              </div>
              <button
                type="button"
                onClick={() => speakText(questionText, lang)}
                className="px-2 py-0.5 bg-white border border-blue-200 text-blue-700 text-[9px] font-bold rounded-md shrink-0 shadow-2xs"
              >
                Replay 🔊
              </button>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                {gender}
              </span>
              <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                {lang.toUpperCase()}
              </span>
            </div>

            {/* Question */}
            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              {questionText}
            </h3>

            {/* Mic & Text Area */}
            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200/80 rounded-xl gap-2.5">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse ring-4 ring-red-200"
                    : "bg-emerald-600 text-white shadow-md active:scale-95"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {isListening ? "mic" : "mic_none"}
                </span>
              </button>

              <span className="text-[10px] font-semibold text-slate-600">
                {isListening ? "🔴 Listening... Tap to stop" : "Tap Mic to Speak"}
              </span>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Spoken text transcribes here automatically..."
                rows={3}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
              />
            </div>

            {/* Tokens */}
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">
                Quick Select Tokens
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tokenSuggestions.map((token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => handleAddToken(token)}
                    className="text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full"
                  >
                    + {token}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Summary View */
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2.5">
              <span className="text-lg">✅</span>
              <div>
                <h4 className="font-bold text-emerald-900 text-xs">Intake Session Complete</h4>
                <p className="text-[10px] text-emerald-700">
                  Review your responses before sending to Dr. Neha.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-100">
              {playbook.map((q) => (
                <div key={q.id} className="pt-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{q.title}</p>
                  <p className="text-[11px] text-slate-600 italic mb-1">{q.question[lang] || q.question.en}</p>
                  <p className="text-xs font-semibold text-slate-900 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    "{answers[q.id] || "No symptoms reported"}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="pt-2 border-t border-slate-200/80 shrink-0">
        {!isCompleted ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-3 bg-[#0057c0] hover:bg-[#004396] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Confirm & Next</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmitIntake}
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

export default function OnboardPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs text-slate-500">Loading adaptive flow...</div>}>
      <OnboardContent />
    </Suspense>
  );
}
