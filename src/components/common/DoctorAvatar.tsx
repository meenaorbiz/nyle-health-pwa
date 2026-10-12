"use client";

import React, { useState } from "react";

interface DoctorAvatarProps {
  size?: string;
}

export default function DoctorAvatar({ size = "w-7 h-7" }: DoctorAvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${size} shrink-0 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] border border-emerald-400 overflow-hidden shadow-2xs`}>
      {!hasError ? (
        <img
          src="/dr-neha.jpg"
          alt="Dr. Neha"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>DN</span>
      )}
      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-white rounded-full"></span>
    </div>
  );
}
