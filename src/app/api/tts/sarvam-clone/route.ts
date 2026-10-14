import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { text, languageCode = "en-IN", pace = 1.05 } = await req.json();

    const apiKey = process.env.SARVAM_API_KEY || "YOUR_SARVAM_API_KEY";
    const audioPath = path.join(process.cwd(), "public", "DrCloned1-speech.wav");

    if (!fs.existsSync(audioPath)) {
      return NextResponse.json(
        { error: "Reference audio file 'DrCloned1-speech.wav' not found in public/" },
        { status: 404 }
      );
    }

    const audioBuffer = fs.readFileSync(audioPath);
    const audioBlob = new Blob([audioBuffer], { type: "audio/wav" });

    const formData = new FormData();
    formData.append("text", text || "I am Dr. Neha. Welcome to Nyle Health.");
    formData.append("language_code", languageCode);
    formData.append("pace", pace.toString());
    formData.append("ref_audio", audioBlob, "DrCloned1-speech.wav");

    const response = await fetch("https://api.sarvam.ai/voices/clone", {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `Sarvam API Error: ${errText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate cloned speech" }, { status: 500 });
  }
}
