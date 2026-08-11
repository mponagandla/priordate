"use client";

import React, { useState } from "react";

interface InfoTooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function InfoTooltip({
  text,
  position = "top",
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

      {/* Tooltip Content Box */}
      {isOpen && (
        <div
          className={`absolute z-50 transition-all duration-200 ${
            position === "top"
              ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2"
              : position === "bottom"
              ? "top-full left-1/2 transform -translate-x-1/2 mt-2"
              : position === "left"
              ? "right-full top-1/2 transform -translate-y-1/2 mr-2"
              : "left-full top-1/2 transform -translate-y-1/2 ml-2"
          }`}
        >
          <div className="bg-surface-container-highest/95 text-on-surface text-[11px] font-sans font-normal leading-relaxed px-3 py-2 rounded-lg border border-outline-variant/80 shadow-2xl backdrop-blur-xl w-60 whitespace-normal text-left pointer-events-none">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
