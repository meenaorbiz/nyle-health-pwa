export default function OnboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-md mx-auto flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
              nh
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Nyle Health</h2>
              <p className="text-xs text-slate-500">Intake Portal</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">
            Dr. Neha Active
          </span>
        </div>

        <div className="my-6">
          <div className="flex justify-between text-xs text-slate-500 font-medium mb-2">
            <span className="text-blue-600 font-bold">1. Baseline</span>
            <span>2. Profile</span>
            <span>3. Review</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-1/3"></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-900">
            🎙️ <strong>Dr. Neha:</strong> "Please share your symptoms freely in English, Hindi, or Hinglish."
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            Are you currently experiencing hot flashes, sleep disruptions, or irregular cycles?
          </h3>

          <div className="h-24 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-xs">
            [ Voice Mic & Transcriber Component Placeholder ]
          </div>
        </div>
      </div>

      <button className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold shadow-md mt-6">
        Confirm & Next →
      </button>
    </div>
  );
}
