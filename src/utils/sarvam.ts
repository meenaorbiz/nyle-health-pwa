// Sarvam AI Engine Utilities (Saarika STT + Bulbul TTS)

export const SARVAM_INDIC_LANGS = [
  { code: "hi-IN", label: "हिंदी (Hindi)" },
  { code: "en-IN", label: "English (India)" },
  { code: "mr-IN", label: "मराठी (Marathi)" },
  { code: "bn-IN", label: "বাংলা (Bengali)" },
  { code: "ta-IN", label: "தமிழ் (Tamil)" },
  { code: "te-IN", label: "తెలుగు (Telugu)" },
  { code: "gu-IN", label: "ગુજરાતી (Gujarati)" },
  { code: "kn-IN", label: "ಕನ್ನಡ (Kannada)" },
  { code: "pa-IN", label: "ਪੰਜਾਬੀ (Punjabi)" },
];

/**
 * Transcribe recorded audio blob using Sarvam AI Saarika v2
 */
export async function transcribeSarvamAudio(
  audioBlob: Blob,
  languageCode: string = "hi-IN"
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    formData.append("language_code", languageCode);
    formData.append("model", "saarika:v2");

    const response = await fetch("/api/sarvam/stt", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Sarvam STT endpoint error");
    }

    const data = await response.json();
    return data.transcript || "";
  } catch (err) {
    console.warn("Sarvam API bypass fallback:", err);
    return "";
  }
}

/**
 * Synthesize speech audio using Sarvam AI Bulbul v1
 */
export async function speakSarvamText(
  text: string,
  languageCode: string = "hi-IN"
): Promise<HTMLAudioElement | null> {
  try {
    const response = await fetch("/api/sarvam/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        language_code: languageCode,
        speaker: "meera",
      }),
    });

    if (!response.ok) throw new Error("Sarvam TTS error");

    const data = await response.json();
    if (data.audio_base64) {
      const audio = new Audio(`data:audio/wav;base64,${data.audio_base64}`);
      audio.play();
      return audio;
    }
  } catch (err) {
    console.warn("Sarvam TTS fallback triggered:", err);
  }
  return null;
}
