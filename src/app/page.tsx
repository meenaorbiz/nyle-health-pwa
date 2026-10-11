import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Nyle Health Pre-Onboarding PWA</h1>
      <p className="text-slate-600">Multimodal clinical intake engine for Dr. Neha Jain.</p>
      
      <div className="flex gap-4">
        <Link href="/onboard/intake" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Patient Intake Form
        </Link>
        <Link href="/admin" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900">
          Doctor Admin Portal
        </Link>
        <Link href="/api/session" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
          Test Session API
        </Link>
      </div>
    </main>
  );
}
