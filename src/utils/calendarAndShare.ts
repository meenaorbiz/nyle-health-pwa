export function buildGoogleCalendarUrl(params: {
  patientName: string;
  dateIso: string;
  slotLabel: string;
}): string {
  const baseDate = params.dateIso.replace(/-/g, "");
  const title = encodeURIComponent(
    `Livel Longevity Assessment — ${params.patientName} with Dr. Neha`
  );
  const details = encodeURIComponent(
    `6-Marker Longevity & Clinical Assessment.\nPatient: ${params.patientName}\nPreferred Slot: ${params.slotLabel}\nPortal: https://www.livel.in/`
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${baseDate}T050000Z/${baseDate}T053000Z`;
}

export function buildQrCodeImageUrl(targetUrl: string, size = 240): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&ecc=H&margin=2&data=${encodeURIComponent(
    targetUrl
  )}`;
}

export async function triggerPatientReferralShare(shareUrl: string): Promise<void> {
  const text = "Take your personalized Longevity & Health Assessment with Dr. Neha:";
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Nyle Health & Livel", text, url: shareUrl });
      return;
    } catch {
      // User dismissed native share sheet
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(shareUrl);
  }
}
