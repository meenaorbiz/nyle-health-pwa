"use client";

import { useState } from "react";
import { DR_NEHA_VIDEOS } from "@/config/postIntakeConfig";

export default function InformativeVideosHub() {
  const [activeVideoPlaying, setActiveVideoPlaying] = useState(false);

  return (
    <section className="bg-[#132338] border border-slate-700/70 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">
          Please watch informative videos of Dr. Neha
        </h3>
        <span className="text-[10px] text-[#6ea0ff] font-semibold">Livel Series</span>
      </div>

      <div className="rounded-xl overflow-hidden bg-[#0a1320] border border-slate-800">
        {!activeVideoPlaying ? (
          <button
            type="button"
            onClick={() => setActiveVideoPlaying(true)}
            className="relative w-full aspect-video block group text-left"
          >
            <img
              src="https://www.livel.in/images/frontcard-atmanirbhar.jpg?v=2"
              alt="Livel Story Video"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                ▶
              </div>
            </div>
            <div className="absolute bottom-2 left-3 right-3 text-white">
              <p className="text-xs font-bold drop-shadow">Live Well, Stay Independent — Dr. Neha</p>
            </div>
          </button>
        ) : (
          <video
            src="https://www.livel.in/videos/story-web.mp4"
            controls
            autoPlay
            playsInline
            className="w-full aspect-video object-cover"
          />
        )}
      </div>

      <div className="space-y-2.5">
        {DR_NEHA_VIDEOS.map((vid) => (
          <a
            key={vid.id}
            href={vid.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0f1c2e] border border-slate-800 hover:border-[#5b8def] transition-all group"
          >
            <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-800">
              <img
                src={vid.thumb}
                alt={vid.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shadow">
                  ▶
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-[#6ea0ff]">
                {vid.title}
              </p>
              <span className="text-[10px] text-slate-400 mt-1 inline-block">
                Dr. Neha • {vid.duration}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
