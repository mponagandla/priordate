import React from "react";
import { parsePriorityDate } from "@/lib/dataService";
import InfoTooltip from "./InfoTooltip";

interface CohortChartProps {
  classification: string;
  priorityYear: number;
  priorityDateString: string;
  approvedPct: number;
  pendingPct: number;
  deniedPct: number;
  totalCohort: number;
  isCurrent: boolean;
  latestCutoff: string;
  dataAvailable?: boolean;
}

export default function CohortChart({
  classification,
  priorityYear,
  priorityDateString,
  approvedPct,
  pendingPct,
  deniedPct,
  totalCohort,
  isCurrent,
  latestCutoff,
  dataAvailable = true,
}: CohortChartProps) {
  // Parse Priority Date cleanly supporting both full ISO dates ("YYYY-MM-DD") and month strings ("YYYY-MM")
  const { dateObj: validDate, year: parsedYear, formattedStr } = parsePriorityDate(
    priorityDateString,
    priorityYear
  );
  const displayYear = priorityYear || parsedYear || 2022;
  const monthNum = validDate.getMonth(); // 0 to 11
  const monthPct = Math.min(90, Math.max(10, Math.round((monthNum / 11) * 80) + 10));
  const svgXPos = Math.round((monthPct / 100) * 800);

  return (
    <div className="glass-panel rounded-xl p-6 min-h-[360px] flex flex-col relative overflow-hidden">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-sans text-headline-md text-on-surface flex items-center gap-2">
            <span>FY{displayYear} Petition Outcomes</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container">
              Annual Aggregate
            </span>
            <InfoTooltip text="Proportion of I-140 petitions Approved, Pending, or Denied by USCIS during this fiscal year cohort." />
          </h3>
          <p className="font-sans text-xs text-on-surface-variant mt-1">
            USCIS annual report totals for {classification} filed in FY{displayYear}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
            <span className="font-mono text-label-mono text-primary-container text-[12px]">
              Approved ({approvedPct}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-surface-bright border border-outline"></div>
            <span className="font-mono text-label-mono text-on-surface-variant text-[12px]">
              Pending ({pendingPct}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="font-mono text-label-mono text-error text-[12px]">
              Denied ({deniedPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Outcome Distribution Bar */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-xs font-mono text-secondary-fixed-dim">
          <span>FY{displayYear} Total Filings: {totalCohort.toLocaleString()}</span>
          <span>Visa Bulletin Status: {isCurrent ? "Current (C)" : `Cutoff: ${latestCutoff}`}</span>
        </div>

        <div className="h-6 w-full bg-surface-container-highest rounded-full overflow-hidden flex p-1 border border-white/10 gap-1">
          <div
            style={{ width: `${approvedPct}%` }}
            className="h-full bg-primary-container rounded-l-full transition-all duration-700 relative group"
            title={`Approved: ${approvedPct}%`}
          >
            <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface-container-highest text-primary font-mono text-[10px] px-2 py-0.5 rounded border border-primary/30 pointer-events-none transition-opacity">
              Approved {approvedPct}%
            </span>
          </div>
          <div
            style={{ width: `${pendingPct}%` }}
            className="h-full bg-outline-variant/60 transition-all duration-700 relative group"
            title={`Pending: ${pendingPct}%`}
          >
            <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface-container-highest text-on-surface font-mono text-[10px] px-2 py-0.5 rounded border border-white/20 pointer-events-none transition-opacity">
              Pending {pendingPct}%
            </span>
          </div>
          <div
            style={{ width: `${deniedPct}%` }}
            className="h-full bg-error/70 rounded-r-full transition-all duration-700 relative group"
            title={`Denied: ${deniedPct}%`}
          >
            <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface-container-highest text-error font-mono text-[10px] px-2 py-0.5 rounded border border-error/30 pointer-events-none transition-opacity">
              Denied {deniedPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Timeline & Marker Canvas */}
      <div className="flex-grow relative border-b border-l border-white/10 mt-2 mx-2 pb-6 min-h-[160px]">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-dashed border-white/30 h-1/3"></div>
          <div className="border-b border-dashed border-white/30 h-1/3"></div>
        </div>

        {/* Liquid Wave Curve SVG */}
        <svg
          className="absolute bottom-0 w-full h-[85%] opacity-80"
          preserveAspectRatio="none"
          viewBox="0 0 800 200"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.4"></stop>
              <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.0"></stop>
            </linearGradient>
          </defs>
          <path
            d="M0 200 L 0 180 C 120 180, 240 160, 360 100 C 480 40, 540 20, 600 20 C 700 20, 750 140, 800 180 L 800 200 Z"
            fill="url(#chartGrad)"
          ></path>
          <path
            d="M0 180 C 120 180, 240 160, 360 100 C 480 40, 540 20, 600 20 C 700 20, 750 140, 800 180"
            fill="none"
            stroke="#00D1FF"
            strokeWidth="2.5"
          ></path>

          {/* Dynamic User Priority Date Indicator Line */}
          <line
            x1={svgXPos}
            y1="0"
            x2={svgXPos}
            y2="200"
            stroke="#ffba49"
            strokeWidth="2"
            strokeDasharray="4 4"
          ></line>
          <circle
            cx={svgXPos}
            cy="60"
            r="6"
            fill="#ffba49"
            className="animate-pulse"
          ></circle>
        </svg>

        {/* Dynamic User Priority Date Marker Overlay */}
        <div
          style={{ left: `${monthPct}%` }}
          className="absolute top-[8%] transform -translate-x-1/2 -translate-y-full flex flex-col items-center z-10 transition-all duration-500"
        >
          <div className="bg-tertiary-fixed-dim/20 border border-tertiary-fixed-dim text-tertiary font-mono text-label-mono px-3 py-1 rounded backdrop-blur-sm whitespace-nowrap shadow-lg">
            Your Priority Date: {formattedStr}
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-tertiary-fixed-dim"></div>
        </div>
      </div>

      {/* Timeline X Axis */}
      <div className="flex justify-between px-2 mt-3 font-mono text-label-mono text-[11px] text-on-surface-variant">
        <span>Q1 FY{displayYear}</span>
        <span>Q2 FY{displayYear}</span>
        <span>Q3 FY{displayYear}</span>
        <span>Q4 FY{displayYear}</span>
      </div>

      {/* Data Source Notice */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-secondary-fixed-dim">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-primary-container">info</span>
          Data is aggregate annual counts by classification from USCIS public releases.
        </span>
      </div>
    </div>
  );
}
