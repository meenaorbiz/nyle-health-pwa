"use client";

interface IdentityProps {
  firstName: string;
  lastName: string;
  onChangeFirstName: (val: string) => void;
  onChangeLastName: (val: string) => void;
}

export default function PatientIdentityCard({ firstName, lastName, onChangeFirstName, onChangeLastName }: IdentityProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 mb-3">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#d8e2ff] text-[#001a42] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">badge</span>
        </div>
        <div>
          <h2 className="font-bold text-slate-900 text-[15px]">Welcome to Nyle Health</h2>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Please share your preferred name so Dr. Neha's AI assistant can personalize your consultation note.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-1">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => onChangeFirstName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0057c0] outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => onChangeLastName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0057c0] outline-none"
          />
        </div>
      </div>
    </div>
  );
}
