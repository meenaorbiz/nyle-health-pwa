"use client";

import { useState } from "react";

export default function PhysicianWelcomeCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = "https://www.livel.in/videos/story-web.mp4";
  const posterUrl = "https://www.livel.in/images/article-nyle-protocol-600.jpg";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 mb-3">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-slate-800">
          <span className="material-symbols-outlined text-[#006a61] text-lg">smart_display</span>
          <span className="font-bold text-xs">Physician Welcome — Dr. Neha</span>
        </div>
        <span className="bg-[#89f5e7] text-[#005049] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">
          Livel Story
        </span>
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0f1c2e] shadow-inner">
        {!isPlaying ? (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative group cursor-pointer text-left block"
          >
            <img
              src={posterUrl}
              alt="Dr. Neha Welcome Video"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
              <span className="material-symbols-outlined text-[14px]">play_circle</span>
              <span className="text-[10px] font-medium">Watch Dr. Neha's Story</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">play_arrow</span>
              </div>
            </div>
          </button>
        ) : (
          <video
            src={videoUrl}
            poster={posterUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
