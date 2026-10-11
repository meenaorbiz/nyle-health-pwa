import { NextResponse } from "next/server";
import { SessionRepository } from "@/adapters/db/session.repository";
import { initDatabase } from "@/infrastructure/db/init";

const sessionRepo = new SessionRepository();

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { playbookId, firstName, lastName, preferredLanguage } = body;

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "First name and last name are required" }, { status: 400 });
    }

    const session = await sessionRepo.createSession(
      playbookId || "playbook_default",
      firstName,
      lastName,
      preferredLanguage || "en"
    );

    return NextResponse.json({ status: "ok", session });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, answers, currentStep } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    await sessionRepo.updateAnswers(sessionId, answers, currentStep || 1);
    return NextResponse.json({ status: "ok", message: "Answers saved" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
