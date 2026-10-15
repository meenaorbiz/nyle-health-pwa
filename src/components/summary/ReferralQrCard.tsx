"use client";

import { buildQrCodeImageUrl, triggerPatientReferralShare } from "@/utils/calendarAndShare";

export default function ReferralQrCard({ shareUrl }: { shareUrl: string }) {
  const qrApiUrl = buildQrCodeImageUrl(shareUrl);

  return (
    <section className="bg-white text-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 text-center space-y-3">
      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0057c0] px-3 py-1 rounded-full">
        Share Livel Longevity
      </span>
      <h3 className="text-sm font-bold text-slate-900 leading-snug px-2">
        Share with your friends and family for their better life
      </h3>

      <div className="relative w-48 h-48 mx-auto p-2 bg-white rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-center">
        <img
          src={qrApiUrl}
          alt="Scan QR code"
          className="w-full h-full object-contain rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-md border-2 border-[#0057c0] overflow-hidden flex items-center justify-center">
            <img
              src="https://www.livel.in/images/article-nyle-protocol-600.jpg"
              alt="Dr. Neha"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500">
        Scan QR code or tap below to invite loved ones to Dr. Neha's assessment.
      </p>

      <button
        type="button"
        onClick={() => triggerPatientReferralShare(shareUrl)}
        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
      >
        <span>Share Assessment Link</span>
        <span>↗</span>
      </button>
    </section>
  );
}
