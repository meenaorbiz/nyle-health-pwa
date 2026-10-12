import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { audio_base64: null, message: "SARVAM_API_KEY not configured" },
        { status: 200 }
      );
    }

    const { text, language_code, speaker } = await req.json();

    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: language_code || "hi-IN",
        speaker: speaker || "meera",
        pitch: 0,
        pace: 1.0,
        loudness: 1.5,
        speech_sample_rate: 8000,
        enable_preprocessing: true,
        model: "bulbul:v1",
      }),
    });

    const data = await response.json();
    const audioBase64 = data.audios?.[0] || null;

    return NextResponse.json({ audio_base64: audioBase64 });
  } catch (error) {
    console.error("Sarvam TTS proxy error:", error);
    return NextResponse.json({ audio_base64: null }, { status: 500 });
  }
}
