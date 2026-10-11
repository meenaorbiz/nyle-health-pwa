export class SarvamVoiceAdapter {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SARVAM_API_KEY || "";
  }

  // Convert patient audio response to text (STT)
  async speechToText(audioBase64: string, languageCode: string = "hi-IN"): Promise<string> {
    if (!this.apiKey) {
      console.warn("SARVAM_API_KEY missing, returning simulated transcription.");
      return "Simulated transcription: Patient reports mild hot flashes and sleep onset issues.";
    }

    const response = await fetch("https://api.sarvam.ai/speech-to-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": this.apiKey,
      },
      body: JSON.stringify({
        audio: audioBase64,
        language_code: languageCode,
        model: "saarika:v1",
      }),
    });

    if (!response.ok) {
      throw new Error(`Sarvam STT Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.transcript || "";
  }

  // Convert personalized clinical question prompt to voice audio (TTS)
  async textToSpeech(text: string, languageCode: string = "hi-IN"): Promise<string> {
    if (!this.apiKey) {
      console.warn("SARVAM_API_KEY missing, skipping real TTS synthesis.");
      return "";
    }

    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": this.apiKey,
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: languageCode,
        speaker: "meera",
        pitch: 0,
        pace: 1.0,
        loudness: 1.5,
        speech_sample_rate: 16000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sarvam TTS Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.audios?.[0] || "";
  }
}
