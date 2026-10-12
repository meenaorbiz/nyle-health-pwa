export default function DrNehaBadge() {
  return (
    <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs shrink-0">
      <div className="relative w-7 h-7 shrink-0">
        <img
          src="/dr-neha.jpg"
          alt="Dr. Neha"
          className="w-7 h-7 rounded-full object-cover border border-emerald-500"
        />
        <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs font-bold text-slate-800 leading-none">
          Dr. Neha
        </span>
        <span className="text-[9px] font-semibold text-emerald-600 leading-none">
          Active
        </span>
      </div>
    </div>
  );
}
