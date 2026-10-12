import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { transcript: "", message: "SARVAM_API_KEY not configured in .env.local" },
        { status: 200 }
      );
    }

    const formData = await req.formData();
    const response = await fetch("https://api.sarvam.ai/speech-to-text", {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json({ transcript: data.transcript || "" });
  } catch (error) {
    console.error("Sarvam STT proxy error:", error);
    return NextResponse.json({ transcript: "" }, { status: 500 });
  }
}
