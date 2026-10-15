"use client";

export type IntakeSummaryItem = {
  id: string;
  title: string;
  question: string;
  answer: string;
};

export default function ClinicalResponsesCard({ items }: { items?: IntakeSummaryItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#132338] border border-slate-700/70 rounded-2xl p-5 space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Your Recorded Clinical Responses
      </h3>
      <div className="divide-y divide-slate-800 space-y-2.5">
        {items.map((item) => (
          <div key={item.id} className="pt-2.5">
            <p className="text-[10px] font-bold text-[#6ea0ff] uppercase">{item.title}</p>
            <p className="text-[11px] text-slate-400 italic mb-1">{item.question}</p>
            <p className="text-xs font-medium text-white bg-[#0f1c2e] p-2.5 rounded-lg border border-slate-800">
              "{item.answer}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
