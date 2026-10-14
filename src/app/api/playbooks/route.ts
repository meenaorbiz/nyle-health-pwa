import { NextResponse } from "next/server";

let currentPlaybook = {
  version: "v2.2",
  title: "General & Perimenopause Intake",
  updatedAt: new Date().toISOString(),
  questions: [
    {
      id: "q_hot_flashes",
      title: "Are you experiencing hot flashes, sleep disruptions, or irregular cycles?",
      inputType: "Multi-Select + Severity Scale (0-10)",
      mandatory: true,
      voiceScript: "Ask gently about cycle regularity and sleep onset: 'Have you noticed any subtle shifts in your sleep or thermal comfort recently?'",
    },
  ],
};

export async function GET() {
  return NextResponse.json(currentPlaybook);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    currentPlaybook = {
      ...currentPlaybook,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Playbook published successfully",
      playbook: currentPlaybook,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save playbook" },
      { status: 500 }
    );
  }
}
