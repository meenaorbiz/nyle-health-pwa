"use client";

import { useEffect, useState } from "react";

export default function IntakePage() {
  const [dbStatus, setDbStatus] = useState<string>("Testing session API...");

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => setDbStatus(`Connected (DB Time: ${data.dbTime || "N/A"})`))
      .catch((err) => setDbStatus(`Error: ${err.message}`));
  }, []);

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Clinical Intake Engine</h1>
      <p className="text-sm text-slate-500">Dr. Neha Jain — Multimodal PWA</p>
      <div className="p-3 bg-slate-100 rounded text-xs font-mono">{dbStatus}</div>
    </div>
  );
}
