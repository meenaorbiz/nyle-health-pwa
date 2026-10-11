"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate secure authentication before routing to the Admin layout
    setTimeout(() => {
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center sm:py-6">
      {/* Mobile-First PWA Frame Container */}
      <div className="w-full max-w-md bg-[#f7f9fb] min-h-screen sm:min-h-[884px] sm:max-h-[92vh] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden font-sans antialiased p-6">
        
        <div className="w-full bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center">
          
          {/* Logo Placement */}
          <div className="w-28 h-28 mb-6 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100 shadow-xs p-3">
             <img src="/logo.png" alt="Nyle Health" className="w-full h-full object-contain drop-shadow-sm" />
          </div>

          <h1 className="text-2xl font-bold text-[#191c1e] mb-1">Welcome Back</h1>
          <p className="text-sm text-slate-500 mb-8 text-center">Enter your credentials to access the clinical control center.</p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Work Email</label>
              <input
                type="email"
                defaultValue="dr.neha@nylehealth.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0057c0]/20 focus:border-[#0057c0] transition-all text-sm font-medium text-[#191c1e]"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0057c0]/20 focus:border-[#0057c0] transition-all text-sm font-medium text-[#191c1e]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#0057c0] hover:bg-[#004396] text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
              ) : (
                <>
                  <span>Secure Login</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center flex flex-col items-center gap-2 text-slate-400 text-xs">
          <div className="flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>End-to-End Encrypted</span>
          </div>
          <span>Nyle Health © 2026</span>
        </div>

      </div>
    </div>
  );
}
