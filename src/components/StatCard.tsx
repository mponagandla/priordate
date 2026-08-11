import React from "react";
import DataSourceBadge from "./DataSourceBadge";
import InfoTooltip from "./InfoTooltip";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  highlight?: boolean;
  sourceName?: string;
  subtitle?: string;
  infoText?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  unit,
  icon,
  highlight = false,
  sourceName,
  subtitle,
  infoText,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`glass-card rounded-lg p-4 md:p-5 flex flex-col justify-between glow-border transition-all duration-300 overflow-hidden ${
        highlight
          ? "ring-1 ring-primary-container/50 bg-primary-container/5 shadow-[0_0_20px_rgba(0,209,255,0.15)]"
          : ""
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`font-mono text-label-mono text-[13px] flex items-center gap-1.5 ${
              highlight ? "text-primary-container font-semibold" : "text-secondary-fixed-dim"
            }`}
          >
            {icon && (
              <span className="material-symbols-outlined text-[18px]">
                {icon}
              </span>
            )}
            <span>{label}</span>
          </span>

          {infoText && <InfoTooltip text={infoText} position="top" />}
        </div>

        <div className="flex items-baseline gap-2 my-1">
          <span
            className={`font-sans text-[30px] md:text-[36px] leading-[40px] font-bold tracking-tight ${
              highlight ? "text-primary-container" : "text-on-surface"
            }`}
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span
              className={`font-sans text-headline-md text-[18px] font-semibold ${
                highlight ? "text-primary-container" : "text-on-surface-variant"
              }`}
            >
              {unit}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="font-sans text-xs text-on-surface-variant mt-1 leading-snug">
            {subtitle}
          </p>
        )}
      </div>

      {sourceName && (
        <div className="mt-3 pt-2.5 border-t border-white/5 overflow-hidden">
          <DataSourceBadge sourceName={sourceName} compact={true} />
        </div>
      )}
    </div>
  );
}
