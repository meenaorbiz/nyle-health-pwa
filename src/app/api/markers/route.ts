import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LONGEVITY_MARKERS, LongevityMarker } from "@/config/postIntakeConfig";

let activeMarkersStore: LongevityMarker[] = [...DEFAULT_LONGEVITY_MARKERS];

export async function GET() {
  return NextResponse.json({ markers: activeMarkersStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body.markers)) {
      return NextResponse.json({ error: "Invalid markers array" }, { status: 400 });
    }
    activeMarkersStore = body.markers.map((m: LongevityMarker, idx: number) => ({
      ...m,
      num: String(idx + 1).padStart(2, "0"),
    }));
    return NextResponse.json({ status: "ok", markers: activeMarkersStore });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
