"use client";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCode: string;
  onSelectLanguage: (lang: { code: string; label: string }) => void;
}

const LANGUAGES = [
  { code: "en", label: "🌐 English" },
  { code: "hi", label: "🇮🇳 हिंदी" },
  { code: "mr", label: "🇮🇳 मराठी" },
  { code: "ta", label: "🇮🇳 தமிழ்" },
  { code: "te", label: "🇮🇳 తెలుగు" },
  { code: "bn", label: "🇮�� বাংলা" },
];

export default function LanguageModal({ isOpen, onClose, selectedCode, onSelectLanguage }: LanguageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end justify-center">
      <div className="w-full bg-white rounded-t-3xl p-6 shadow-xl animate-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0057c0]">translate</span>
            <h3 className="font-bold text-lg text-slate-800">Select Language / भाषा चुनें</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-4">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang)}
              className={`p-3 rounded-xl font-semibold text-xs flex items-center justify-between transition-colors ${
                selectedCode === lang.code
                  ? "bg-[#d8e2ff] text-[#001a42]"
                  : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{lang.label}</span>
              {selectedCode === lang.code && <span className="material-symbols-outlined text-base">check_circle</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
