"use client";

import React, { useState } from "react";

interface InfoTooltipProps {
  text: string;
  position?: "top" | "bottom" | "auto";
  className?: string;
}

export default function InfoTooltip({
  text,
  position = "bottom",
  className = "",
}: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Information"
        className="text-on-surface-variant/70 hover:text-primary-container focus:text-primary-container transition-colors cursor-pointer inline-flex items-center justify-center p-0.5"
      >
        <span className="material-symbols-outlined text-[15px]">info</span>
      </button>

      {/* Top-Level Tooltip Content Box */}
      {isOpen && (
        <div
          className={`absolute z-[100] transition-all duration-200 ${
            position === "top"
              ? "bottom-full right-0 mb-2"
              : "top-full right-0 mt-2"
          }`}
        >
          <div className="bg-surface-container-highest/98 text-on-surface text-[11px] font-sans font-normal leading-relaxed px-3 py-2 rounded-lg border border-outline-variant/80 shadow-2xl backdrop-blur-2xl w-60 whitespace-normal text-left pointer-events-none ring-1 ring-white/10">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
