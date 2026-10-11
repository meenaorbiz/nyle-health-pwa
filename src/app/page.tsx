import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-6">
        nh
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Nyle Health Pre-Onboarding PWA</h1>
      <p className="text-slate-600 max-w-md mb-8">
        Multimodal clinical intake engine for Dr. Neha Jain. Hosted on GCP Cloud Run.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <Link 
          href="/onboard"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Patient PWA Portal
        </Link>
        <Link 
          href="/admin"
          className="w-full py-3 px-6 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-100 transition shadow-sm"
        >
          Doctor Admin Portal
        </Link>
      </div>
    </div>
  );
}
