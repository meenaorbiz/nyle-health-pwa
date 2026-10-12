import { NextResponse } from "next/server";

// In-memory store for active clinical playbooks
let activePlaybook = {
  version: "v2.1",
  title: "General & Perimenopause Intake",
  welcomeVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  questions: [
    {
      id: "q_hormonal",
      title: "Hormonal & Sleep Symptoms",
      question: {
        en: "Are you currently experiencing hot flashes, sleep disruptions, or irregular cycles?",
        hi: "क्या आप इस समय हॉट फ्लैश, नींद में रुकावट, या अनियमित चक्र का अनुभव कर रहे हैं?",
      },
      tokens: ["Poor Sleep Quality", "Night Sweats", "Mood Shifts", "Irregular Periods", "None"],
    },
    {
      id: "q_vitality",
      title: "Energy & Metabolic Balance",
      question: {
        en: "Have you noticed changes in energy levels, joint pain, or mood fluctuations over the past 3 months?",
        hi: "क्या आपने पिछले 3 महीनों में ऊर्जा के स्तर, जोड़ों के दर्द, या मूड स्विंग्स में बदलाव महसूस किया है?",
      },
      tokens: ["Low Morning Energy", "Joint Stiffness", "Brain Fog", "Weight Changes", "None"],
    },
    {
      id: "q_medications",
      title: "Current Therapies & Supplements",
      question: {
        en: "Are you currently taking any hormone therapy, thyroid medications, or daily supplements?",
        hi: "क्या आप वर्तमान में कोई हार्मोन थेरेपी, थायराइड की दवाएं, या सप्लीमेंट्स ले रहे हैं?",
      },
      tokens: ["Thyroid Medication", "Vitamin D / B12", "HRT Therapy", "Multivitamins", "None"],
    },
  ],
};

// GET: Patient Intake fetches the active playbook dynamically
export async function GET() {
  return NextResponse.json(activePlaybook);
}

// POST: Admin Playbook Builder updates questions / video URLs live
export async function POST(req: Request) {
  try {
    const updatedData = await req.json();
    activePlaybook = { ...activePlaybook, ...updatedData };
    return NextResponse.json({ success: true, playbook: activePlaybook });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update playbook" }, { status: 500 });
  }
}
