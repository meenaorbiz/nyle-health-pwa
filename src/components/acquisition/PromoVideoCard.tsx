"use client";

import { useState } from "react";

export default function PromoVideoCard() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=nyle-dr-neha-welcome");
  const [copiedUrlInput, setCopiedUrlInput] = useState(false);
  const [videoSaved, setVideoSaved] = useState(false);

  // Helper to extract YouTube video ID for live preview
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  const handleSaveSettings = () => {
    setVideoSaved(true);
    setTimeout(() => setVideoSaved(false), 2500);
  };

  return (
    <section className="flex flex-col bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-xl">smart_display</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-900 leading-snug">Onboarding Promo Video</h2>
            <span className="text-xs text-slate-500">Custom greetings build warm clinical trust</span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold shrink-0">
          CONFIGURABLE
        </span>
      </div>

      <p className="text-xs text-slate-500 -mt-1">
        This welcome video plays on the first screen when a patient opens their invite link.
      </p>

      {/* Enable / Disable Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-800">Show Video on Patient Welcome Screen</span>
          <span className="text-[11px] text-slate-500 truncate">Autoplays muted with doctor greeting captions</span>
        </div>
        <button
          type="button"
          onClick={() => setVideoEnabled(!videoEnabled)}
          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
            videoEnabled ? "bg-[#00855d]" : "bg-slate-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              videoEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Editable Video URL Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
          <span>Doctor Welcome Video Link</span>
          <span className="text-[#006948] text-[11px] font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-xs">edit</span> Editable
          </span>
        </label>
        <div className="relative">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube, Vimeo, or Video URL here..."
            className="w-full bg-slate-50 text-slate-900 text-xs font-medium pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0057c0]"
          />
          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(videoUrl);
              setCopiedUrlInput(true);
              setTimeout(() => setCopiedUrlInput(false), 2000);
            }}
            title="Copy URL"
            className="absolute right-2.5 top-2.5 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-[#0057c0]"
          >
            <span className="material-symbols-outlined text-base">
              {copiedUrlInput ? "check" : "content_copy"}
            </span>
          </button>
        </div>
        <span className="text-[10px] text-slate-400">
          Paste any video URL. Patients will see this greeting when scanning your clinic QR code.
        </span>
      </div>

      {/* Live Video Preview Frame */}
      {videoEnabled && (
        <div className="relative w-full rounded-2xl bg-slate-900 p-2 shadow-inner">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-800 group flex items-center justify-center">
            {videoId ? (
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="Video Preview"
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <img
                src="https://i.pravatar.cc/600?img=47"
                alt="Dr. Neha Jain"
                className="w-full h-full object-cover opacity-70"
              />
            )}
            <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5 min-w-0 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold truncate">Live Patient Preview</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-2xl">play_arrow</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex flex-col gap-1.5 pt-1">
        <button
          type="button"
          onClick={handleSaveSettings}
          className="w-full h-11 bg-[#0057c0] hover:bg-[#004396] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-lg">save</span>
          <span>{videoSaved ? "Video Link Saved!" : "Save Video Settings"}</span>
        </button>
      </div>
    </section>
  );
}
