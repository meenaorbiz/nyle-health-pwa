"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { speakMobileText } from "@/utils/tts";

// Multi-step Clinical Playbooks (Gender -> Language -> Step Questions)
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

  // Multi-step Flow State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentInputText, setCurrentInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const recognitionRef = useRef<any>(null);

  const currentQuestionObj = playbook[currentStepIndex];
  const questionText = currentQuestionObj?.question[lang] || currentQuestionObj?.question.en || "";
  const tokenSuggestions = currentQuestionObj?.tokens[lang] || currentQuestionObj?.tokens.en || [];

  // Play voice prompt on each question change
  useEffect(() => {
    if (!isCompleted && questionText) {
      speakMobileText(questionText, lang);
    }
  }, [currentStepIndex, questionText, lang, isCompleted]);

  // STT Handlers
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser speech recognition unavailable. Please type your response.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang === "hi" ? "hi-IN" : lang === "es" ? "es-ES" : "en-IN";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentInputText(transcript);
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
    const trimmed = currentInputText.trim();
    if (!trimmed.includes(token)) {
      setCurrentInputText(trimmed ? `${trimmed}, ${token}` : token);
    }
  };

  // Next Question / Complete Handler
  const handleConfirmStep = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Save current response
    const updatedAnswers = {
      ...answers,
      [currentQuestionObj.id]: currentInputText.trim() || "No symptoms reported",
    };
    setAnswers(updatedAnswers);
    setCurrentInputText("");

    if (currentStepIndex + 1 < playbook.length) {
      // Advance to next question
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Mark flow completed -> Show Review Summary
      setIsCompleted(true);
      speakMobileText(`Thank you ${firstName}. Your intake summary is complete.`, lang);
    }
  };

  // Final Cloud Submit Handler
  const handleSubmitIntake = () => {
    alert("Intake session successfully submitted to Dr. Neha!");
    router.push("/onboard/intake");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-md mx-auto flex flex-col justify-between relative">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              if (currentStepIndex > 0 && !isCompleted) {
                setCurrentStepIndex(currentStepIndex - 1);
              } else {
                router.back();
              }
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-xs border border-slate-200 text-slate-600"
          >
            ←
          </button>
          <div className="text-center">
            <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {isCompleted ? "Clinical Intake Summary" : currentQuestionObj?.title}
            </h2>
            <p className="text-[10px] text-slate-500">
              {isCompleted ? "Final Step" : `Question ${currentStepIndex + 1} of ${playbook.length}`}
            </p>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
            Dr. Neha Active
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{
              width: isCompleted
                ? "100%"
                : `${((currentStepIndex + 1) / playbook.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* VIEW 1: ACTIVE QUESTION STEP */}
        {!isCompleted ? (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            
            {/* Dr. Neha Prompt Header */}
            <div className="flex items-center justify-between bg-blue-50/80 border border-blue-100 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎙️</span>
                <p className="text-xs text-blue-900 font-medium leading-tight">
                  <strong>Dr. Neha:</strong> "Please share your response in your preferred language."
                </p>
              </div>
              <button
                onClick={() => speakMobileText(questionText, lang)}
                className="px-2 py-1 bg-white border border-blue-200 text-blue-700 text-[10px] font-bold rounded-lg shrink-0 shadow-xs"
              >
                Replay 🔊
              </button>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                {gender}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                {lang.toUpperCase()}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {questionText}
            </h3>

            {/* Voice Mic & Text Area */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl gap-3">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse shadow-lg ring-4 ring-red-200"
                    : "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {isListening ? "mic" : "mic_none"}
                </span>
              </button>

              <span className="text-[11px] font-semibold text-slate-600">
                {isListening ? "🔴 Listening... Tap to finish" : "Tap Mic to Speak"}
              </span>

              <textarea
                value={currentInputText}
                onChange={(e) => setCurrentInputText(e.target.value)}
                placeholder="Spoken text transcribes here automatically. Or type directly..."
                rows={3}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
            </div>

            {/* Quick Select Tokens */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">
                Quick Select Tokens
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tokenSuggestions.map((token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => handleAddToken(token)}
                    className="text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 rounded-full"
                  >
                    + {token}
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* VIEW 2: FINAL INTAKE REVIEW & SUMMARY */
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-emerald-900 text-xs">Intake Session Complete</h4>
                <p className="text-[11px] text-emerald-700">
                  Review your answers before sending to Dr. Neha's clinical team.
                </p>
              </div>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Patient</p>
                <p className="text-sm font-semibold text-slate-800">{firstName} ({gender})</p>
              </div>

              {playbook.map((q) => (
                <div key={q.id} className="pt-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{q.title}</p>
                  <p className="text-xs text-slate-600 italic mb-1">{q.question[lang] || q.question.en}</p>
                  <p className="text-xs font-semibold text-slate-900 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    "{answers[q.id] || "No symptoms reported"}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      {!isCompleted ? (
        <button
          onClick={handleConfirmStep}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md mt-6 mb-2 flex items-center justify-center gap-2"
        >
          <span>Confirm & Next</span>
          <span className="text-sm">➔</span>
        </button>
      ) : (
        <button
          onClick={handleSubmitIntake}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md mt-6 mb-2 flex items-center justify-center gap-2"
        >
          <span>Submit to Dr. Neha</span>
          <span className="text-sm">✓</span>
        </button>
      )}
    </div>
  );
}

export default function OnboardPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs text-slate-500">Loading intake session...</div>}>
      <OnboardContent />
    </Suspense>
  );
}
