"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { unlockMobileSpeech } from "@/utils/tts";
import LanguageModal from "@/components/intake/LanguageModal";
import IntakeProgressTracker from "@/components/intake/IntakeProgressTracker";
import PatientIdentityCard from "@/components/intake/PatientIdentityCard";
import PhysicianWelcomeCard from "@/components/intake/PhysicianWelcomeCard";
import AgeStepper from "@/components/intake/AgeStepper";
import SexSelector from "@/components/intake/SexSelector";
import SymptomVoiceInput from "@/components/intake/SymptomVoiceInput";
import FloatingIntakeDock from "@/components/intake/FloatingIntakeDock";

export default function PatientIntakePage() {
  const router = useRouter();

  // Session State
  const [firstName, setFirstName] = useState("Pooja");
  const [lastName, setLastName] = useState("Sharma");
  const [age, setAge] = useState(48);
  const [gender, setGender] = useState("Female");
  const [symptoms, setSymptoms] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Language Modal State
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [language, setLanguage] = useState({ code: "en", label: "🌐 English" });

  const handleAddTag = (tag: string) => {
    const current = symptoms.trim();
    if (!current.includes(tag)) {
      setSymptoms(current ? `${current}, ${tag}` : tag);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        handleAddTag("Improve energy levels & stay active post 60");
        setIsRecording(false);
      }, 3000);
    }
  };

  // Pass demographic context in query params: e.g. /onboard?lang=hi&gender=male&firstName=Pooja
  const handleBeginIntake = () => {
    unlockMobileSpeech();
    const params = new URLSearchParams({
      lang: language.code,
      gender: gender.toLowerCase(),
      firstName: firstName,
    });
    router.push(`/onboard?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full p-4 pb-32 relative">
      
      {/* 1. Language Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        selectedCode={language.code}
        onSelectLanguage={(lang) => {
          setLanguage(lang);
          setIsLangModalOpen(false);
        }}
      />

      {/* 2. Top Navigation Bar */}
      <div className="flex items-center justify-between mb-3">
        <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-xs border border-slate-200">
          <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
        </button>
        <span className="text-xs font-semibold text-slate-500">Intake Journey</span>
        <button
          type="button"
          onClick={() => setIsLangModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-xs border border-slate-200"
        >
          <span className="text-xs font-bold text-[#0057c0]">{language.label}</span>
          <span className="material-symbols-outlined text-[#0057c0] text-sm">expand_more</span>
        </button>
      </div>

      {/* 3. Progress Bar */}
      <IntakeProgressTracker
        currentStep={1}
        totalSteps={5}
        stepTitle="Identification & Intake"
        percentage={20}
        estimatedMins={3}
      />

      {/* 4. Identity Profile */}
      <PatientIdentityCard
        firstName={firstName}
        lastName={lastName}
        onChangeFirstName={setFirstName}
        onChangeLastName={setLastName}
      />

      {/* 5. Welcome Video */}
      <PhysicianWelcomeCard />

      {/* 6. Baseline Profile Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 mb-3 flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#89f5e7] text-[#005049] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">vital_signs</span>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-[15px]">Baseline Health Profile</h2>
            <p className="text-[11px] text-slate-500 leading-snug">Calibrating longevity, endocrine & hormonal ranges.</p>
          </div>
        </div>

        <AgeStepper value={age} onChange={setAge} />

        <SexSelector selectedSex={gender} onSelect={setGender} />

        <SymptomVoiceInput
          value={symptoms}
          onChange={setSymptoms}
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
          onAddTag={handleAddTag}
        />
      </div>

      {/* 7. Floating Bottom Dock */}
      <FloatingIntakeDock
        onSaveDraft={() => console.log("Draft saved")}
        onNext={handleBeginIntake}
      />

    </div>
  );
}
