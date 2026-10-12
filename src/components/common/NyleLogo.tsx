"use client";

import React from "react";

export default function NyleLogo({ size = "w-7 h-7" }: { size?: string }) {
  return (
    <div className={`${size} shrink-0 flex items-center justify-center overflow-hidden`}>
      <img
        src="/logo.png"
        alt="Nyle Health Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
