"use client";

import { useState, useEffect } from "react";
import { LongevityMarker, DEFAULT_LONGEVITY_MARKERS } from "@/config/postIntakeConfig";

type Props = {
  onOpenBooking?: () => void;
  editable?: boolean;
};

export default function LongevityMarkersAccordion({ onOpenBooking, editable = false }: Props) {
  const [markers, setMarkers] = useState<LongevityMarker[]>(DEFAULT_LONGEVITY_MARKERS);
  const [expandedId, setExpandedId] = useState<string | null>("m_grip");
  const [isManageMode, setIsManageMode] = useState(editable);
  const [saveBanner, setSaveBanner] = useState("");

  // New marker form state
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState("Neuromuscular & Metabolic");
  const [newPct, setNewPct] = useState(75);
  const [newInsight, setNewInsight] = useState("");
  const [newNextStep, setNewNextStep] = useState("");

  useEffect(() => {
    fetch("/api/markers")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.markers) && data.markers.length > 0) {
          setMarkers(data.markers);
        }
      })
      .catch(() => {});
  }, []);

  const persistMarkers = async (updated: LongevityMarker[]) => {
    const normalized = updated.map((m, i) => ({
      ...m,
      num: String(i + 1).padStart(2, "0"),
    }));
    setMarkers(normalized);
    try {
      await fetch("/api/markers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markers: normalized }),
      });
      setSaveBanner("Saved & Published Live ✓");
      setTimeout(() => setSaveBanner(""), 2500);
    } catch {}
  };

  const handleDelete = (id: string) => {
    persistMarkers(markers.filter((m) => m.id !== id));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= markers.length) return;
    const copy = [...markers];
    const [item] = copy.splice(index, 1);
    copy.splice(target, 0, item);
    persistMarkers(copy);
  };

  const handleUpdateField = (id: string, field: keyof LongevityMarker, value: string | number) => {
    const updated = markers.map((m) => (m.id === id ? { ...m, [field]: value } : m));
    setMarkers(updated);
  };

  const handleAddMarker = () => {
    if (!newLabel.trim()) return;
    const created: LongevityMarker = {
      id: `m_${Date.now()}`,
      num: String(markers.length + 1).padStart(2, "0"),
      label: newLabel.trim(),
      pct: Number(newPct) || 70,
      category: newCategory.trim() || "Longevity Biomarker",
      clinicalInsight:
        newInsight.trim() ||
        "Evaluates functional physiological reserve and healthy aging trajectory.",
      nextStepAction:
        newNextStep.trim() || "Baseline clinical screening with Dr. Neha.",
    };
    persistMarkers([...markers, created]);
    setNewLabel("");
    setNewInsight("");
    setNewNextStep("");
    setExpandedId(created.id);
  };

  return (
    <section className="bg-[#132338] border border-slate-700/70 rounded-2xl p-5 space-y-5 shadow-xl text-white">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1.5px] bg-[#5b8def]"></span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#5b8def] font-semibold">
              THE ASSESSMENT
            </span>
          </div>
          <h2 className="text-2xl font-serif tracking-tight text-white leading-tight">
            What we <span className="italic font-light text-[#6ea0ff]">look for</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            { markers.length } markers. Tap any marker below to inspect clinical insights and next steps.
          </p>
        </div>

        {editable && (
          <button
            type="button"
            onClick={() => setIsManageMode(!isManageMode)}
            className="text-[10px] bg-slate-800 text-[#6ea0ff] hover:bg-slate-700 border border-slate-600 px-2.5 py-1 rounded-lg font-semibold shrink-0"
          >
            {isManageMode ? "Preview Mode" : "Edit Markers"}
          </button>
        )}
      </div>

      {saveBanner && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-2 rounded-xl font-semibold">
          {saveBanner}
        </div>
      )}

      {/* Accordion List */}
      <div className="divide-y divide-slate-700/60">
        {markers.map((m, idx) => {
          const isOpen = expandedId === m.id;
          return (
            <div key={m.id} className="py-3">
              <div
                onClick={() => setExpandedId(isOpen ? null : m.id)}
                className="flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-[165px]">
                  <span className="text-[11px] font-mono text-[#5b8def]">{m.num}</span>
                  <span className="text-xs font-serif text-slate-100">{m.label}</span>
                </div>

                <div className="flex-1 bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5b8def] h-full rounded-full transition-all duration-300"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>

                <span className="text-[10px] text-slate-400 ml-1">{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && (
                <div className="mt-3 p-3.5 bg-[#0f1c2e] rounded-xl border border-slate-800 space-y-2.5 text-xs">
                  {!isManageMode ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6ea0ff]">
                          {m.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Target Benchmark: {m.pct}%
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {m.clinicalInsight}
                      </p>
                      <p className="text-[11px] text-emerald-400 font-medium">
                        Next Step: {m.nextStepAction}
                      </p>
                    </>
                  ) : (
                    /* Inline Editor Controls for Clinical Team */
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase">Marker Title</label>
                          <input
                            type="text"
                            value={m.label}
                            onChange={(e) => handleUpdateField(m.id, "label", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase">
                            Score Bar ({m.pct}%)
                          </label>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={m.pct}
                            onChange={(e) =>
                              handleUpdateField(m.id, "pct", Number(e.target.value))
                            }
                            className="w-full mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase">Clinical Insight</label>
                        <textarea
                          rows={2}
                          value={m.clinicalInsight}
                          onChange={(e) =>
                            handleUpdateField(m.id, "clinicalInsight", e.target.value)
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase">Next Step Action</label>
                        <input
                          type="text"
                          value={m.nextStepAction}
                          onChange={(e) =>
                            handleUpdateField(m.id, "nextStepAction", e.target.value)
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleMove(idx, -1)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px]"
                          >
                            ↑ Move Up
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 1)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px]"
                          >
                            ↓ Move Down
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => persistMarkers(markers)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(m.id)}
                            className="px-2.5 py-1 bg-red-950/80 border border-red-500/40 text-red-300 rounded text-[10px] font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Marker Panel in Admin/Manage Mode */}
      {isManageMode && (
        <div className="p-3.5 bg-[#0f1c2e] border border-slate-700 rounded-xl space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#6ea0ff]">
            + Add New Longevity Marker
          </p>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Marker Title (e.g., VO2 Max & Cardiorespiratory Fitness)"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
          />
          <input
            type="text"
            value={newInsight}
            onChange={(e) => setNewInsight(e.target.value)}
            placeholder="Clinical insight explanation..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={newNextStep}
              onChange={(e) => setNewNextStep(e.target.value)}
              placeholder="Next Step Action (e.g., Submaximal treadmill test)"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
            <button
              type="button"
              onClick={handleAddMarker}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shrink-0"
            >
              + Add Marker
            </button>
          </div>
        </div>
      )}

      {onOpenBooking && (
        <div className="pt-1 flex flex-col gap-2">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full py-3.5 bg-[#5b8def] hover:bg-[#4a7de0] text-slate-950 font-bold text-xs uppercase tracking-[0.15em] rounded-lg shadow-md transition-all cursor-pointer"
          >
            BOOK ASSESSMENT
          </button>
          <p className="text-[10px] text-center tracking-[0.15em] uppercase text-[#6ea0ff]">
            WHAT DOES YOUR SCORE LOOK LIKE?
          </p>
        </div>
      )}
    </section>
  );
}
