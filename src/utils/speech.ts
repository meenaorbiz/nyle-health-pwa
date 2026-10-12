// Native Web Speech API Utilities for PWA

const LANG_MAP: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  es: "es-ES",
};

/**
 * Text-to-Speech (TTS): Reads clinical prompts in target language
 */
export function speakText(
  text: string,
  lang: string = "en",
  onEnd?: () => void
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech Synthesis (TTS) is not supported in this browser environment.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_MAP[lang] || "en-IN";
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Alias helper for mobile TTS playback
 */
export const speakMobileText = speakText;

/**
 * Halts active TTS playback
 */
export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Mobile user-gesture trigger to unlock web audio context on Safari/Chrome
 */
export function unlockAudio(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const silent = new SpeechSynthesisUtterance("");
    silent.volume = 0;
    window.speechSynthesis.speak(silent);
  }
}

/**
 * Speech-to-Text (STT): Instantiate cross-browser SpeechRecognition
 */
export function getSpeechRecognition(): any {
  if (typeof window === "undefined") return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  return SpeechRecognition ? new SpeechRecognition() : null;
}
