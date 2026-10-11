import { NextResponse } from "next/server";
import { SarvamVoiceAdapter } from "@/adapters/voice/sarvam.adapter";

const sarvam = new SarvamVoiceAdapter();

export async function POST(req: Request) {
  try {
    const { text, languageCode } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text prompt required" }, { status: 400 });
    }

    const audioBase64 = await sarvam.textToSpeech(text, languageCode || "hi-IN");
    return NextResponse.json({ status: "ok", audioBase64 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
