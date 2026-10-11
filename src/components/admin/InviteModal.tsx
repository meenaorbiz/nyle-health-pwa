"use client";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function InviteModal({ isOpen, onClose, onConfirm }: InviteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d8e2ff] flex items-center justify-center text-[#0057c0]">
              <span className="material-symbols-outlined text-sm">send</span>
            </div>
            <span className="font-bold text-base text-slate-900">Quick Patient Invite</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700">Patient Full Name</label>
            <input
              type="text"
              placeholder="e.g. Meera Raman"
              className="w-full h-10 px-3 mt-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#0057c0]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">WhatsApp / Phone Number</label>
            <input
              type="tel"
              placeholder="+91 98XXX XXXXX"
              className="w-full h-10 px-3 mt-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#0057c0]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Assign Clinical Playbook</label>
            <select className="w-full h-10 px-3 mt-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none">
              <option>Perimenopause Intake v2.1</option>
              <option>General Metabolic Intake</option>
              <option>Thyroid & Fatigue Protocol</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button onClick={onClose} className="h-10 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
            Cancel
          </button>
          <button onClick={onConfirm} className="h-10 px-4 rounded-xl bg-[#0057c0] text-white text-xs font-bold shadow-md">
            Generate & Dispatch Link
          </button>
        </div>
      </div>
    </div>
  );
}
