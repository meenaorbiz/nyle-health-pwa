import { NextResponse } from "next/server";
import { PlaybookRepository } from "@/adapters/db/playbook.repository";

const playbookRepo = new PlaybookRepository();

export async function GET() {
  try {
    const data = await playbookRepo.getActivePlaybook();
    return NextResponse.json({ status: "ok", data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
