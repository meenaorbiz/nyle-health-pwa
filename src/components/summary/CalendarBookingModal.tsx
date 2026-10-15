"use client";

import { useState, useEffect } from "react";
import { AVAILABLE_TIME_SLOTS } from "@/config/postIntakeConfig";
import { buildGoogleCalendarUrl } from "@/utils/calendarAndShare";

type Props = {
  isOpen: boolean;
  patientName: string;
  onClose: () => void;
};

export default function CalendarBookingModal({ isOpen, patientName, onClose }: Props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(AVAILABLE_TIME_SLOTS[0]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const url = buildGoogleCalendarUrl({
      patientName,
      dateIso: selectedDate,
      slotLabel: selectedSlot,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Schedule Longevity Assessment</h4>
            <p className="text-[11px] text-slate-500">Select a slot on Google Calendar</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
              Available Time Slots (IST)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 text-xs font-semibold rounded-lg border ${
                    selectedSlot === slot
                      ? "bg-[#0057c0] text-white border-[#0057c0]"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-3 bg-[#0057c0] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
        >
          Confirm & Open Google Calendar ➔
        </button>
      </div>
    </div>
  );
}
