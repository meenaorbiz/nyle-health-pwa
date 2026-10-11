export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dr. Neha Jain — Control Center</h1>
            <p className="text-xs text-slate-500">Patient Pipeline & Playbook Management</p>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-lg font-semibold border border-blue-200">
            GCP Cloud Run Active
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">Total Invited</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">128</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">In Progress</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">14</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">Pre-Load Ready</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">94</p>
          </div>
        </div>
      </div>
    </div>
  );
}
