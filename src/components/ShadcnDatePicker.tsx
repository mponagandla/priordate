"use client";

import React, { useState, useEffect, useRef } from "react";
import { parsePriorityDate } from "@/lib/dataService";

interface ShadcnDatePickerProps {
  value: string; // e.g. "2022-10-15" or "2022-10"
  onChange: (val: string) => void;
  className?: string;
}

export default function ShadcnDatePicker({
  value,
  onChange,
  className = "",
}: ShadcnDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const parsed = parsePriorityDate(value);
  const [currentYear, setCurrentYear] = useState<number>(parsed.year);
  const [currentMonth, setCurrentMonth] = useState<number>(parsed.dateObj.getMonth());
  const selectedDay = parsed.dateObj.getDate();

  useEffect(() => {
    const updated = parsePriorityDate(value);
    setCurrentYear(updated.year);
    setCurrentMonth(updated.dateObj.getMonth());
  }, [value]);

  // Handle click outside to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Days in month calculation
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Year options for fast dropdown (2010 to 2026)
  const years = Array.from({ length: 20 }, (_, i) => 2010 + i);

  const handleSelectDay = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const isoString = `${currentYear}-${monthStr}-${dayStr}`;
    onChange(isoString);
    setIsOpen(false);
  };

  const handleApplyPreset = (presetYearsAgo: number) => {
    const now = new Date();
    const targetYear = now.getFullYear() - presetYearsAgo;
    const targetMonth = String(now.getMonth() + 1).padStart(2, "0");
    const targetDay = String(now.getDate()).padStart(2, "0");
    const isoString = `${targetYear}-${targetMonth}-${targetDay}`;
    onChange(isoString);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Shadcn-Style Date Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-surface-container-highest/60 border border-outline-variant/50 hover:border-primary-container focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg py-3 px-4 text-on-surface flex items-center justify-between transition-all backdrop-blur-md font-sans text-body-md shadow-sm group"
      >
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary-container text-[20px] group-hover:scale-110 transition-transform">
            calendar_today
          </span>
          <span className="font-sans font-medium text-on-surface text-sm">
            {parsed.formattedStr}
          </span>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
          {isOpen ? "unfold_less" : "unfold_more"}
        </span>
      </button>

      {/* Shadcn Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-72 bg-surface-container-highest border border-outline-variant/80 rounded-xl shadow-2xl p-4 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header Navigation & Month/Year Selectors */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10 gap-1">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              className="bg-surface-container-high border border-white/10 rounded-md px-2.5 py-1 text-xs font-sans text-on-surface focus:border-primary-container outline-none [color-scheme:dark]"
            >
              {monthNames.map((m, idx) => (
                <option key={m} value={idx}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              className="bg-surface-container-high border border-white/10 rounded-md px-2.5 py-1 text-xs font-mono text-on-surface focus:border-primary-container outline-none [color-scheme:dark]"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2 font-mono text-[10px] uppercase text-secondary-fixed-dim font-bold">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots before first day of month */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-7 w-7"></div>
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const isSelected =
                parsed.year === currentYear &&
                parsed.dateObj.getMonth() === currentMonth &&
                selectedDay === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-7 w-7 rounded-md font-mono text-xs flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-primary-container text-on-primary-container font-bold shadow-[0_0_12px_rgba(0,209,255,0.4)] scale-105"
                      : "text-on-surface hover:bg-white/10 hover:text-primary"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Presets Bar */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5 justify-between">
            <button
              type="button"
              onClick={() => handleApplyPreset(0)}
              className="text-[10px] font-mono py-1 px-2 rounded bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset(1)}
              className="text-[10px] font-mono py-1 px-2 rounded bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors"
            >
              1 yr ago
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset(3)}
              className="text-[10px] font-mono py-1 px-2 rounded bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors"
            >
              3 yrs ago
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset(5)}
              className="text-[10px] font-mono py-1 px-2 rounded bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors"
            >
              5 yrs ago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
