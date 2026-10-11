import { NextResponse } from "next/server";
import { SarvamVoiceAdapter } from "@/adapters/voice/sarvam.adapter";

const sarvam = new SarvamVoiceAdapter();

export async function POST(req: Request) {
  try {
    const { audioBase64, languageCode } = await req.json();
    if (!audioBase64) {
      return NextResponse.json({ error: "Audio data required" }, { status: 400 });
    }

    const transcript = await sarvam.speechToText(audioBase64, languageCode || "hi-IN");
    return NextResponse.json({ status: "ok", transcript });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
