"use client";

import React, { useEffect, useState } from "react";
import { getDataSourcesWithLogs, DataSource } from "@/lib/dataService";

interface DataSourceBadgeProps {
  sourceName: string;
  compact?: boolean;
  className?: string;
}

export default function DataSourceBadge({
  sourceName,
  compact = false,
  className = "",
}: DataSourceBadgeProps) {
  const [source, setSource] = useState<DataSource | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadSourceInfo() {
      const sources = await getDataSourcesWithLogs();
      if (!isMounted) return;

      const match = sources.find(
        (s) =>
          s.name.toLowerCase().includes(sourceName.toLowerCase()) ||
          sourceName.toLowerCase().includes(s.name.toLowerCase())
      );

      setSource(match || sources[0] || null);
      setLoading(false);
    }
    loadSourceInfo();
    return () => {
      isMounted = false;
    };
  }, [sourceName]);

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-md bg-white/5 text-on-surface-variant font-mono text-[10px] animate-pulse">
        <span>Source:</span>
        <span className="w-10 h-2.5 bg-white/10 rounded"></span>
      </span>
    );
  }

  const refreshedDate = source?.last_refreshed
    ? new Date(source.last_refreshed).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Aug 10, 2026";

  const hasError = source?.has_failed_run || source?.status === "error";

  if (compact) {
    return (
      <div className={`flex flex-col gap-0.5 max-w-full overflow-hidden ${className}`}>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-mono text-on-surface-variant leading-tight max-w-full">
          <span className="inline-flex items-center gap-1 font-semibold text-on-surface truncate max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0"></span>
            <span className="truncate">{source?.name || sourceName}</span>
          </span>
          <span className="text-outline-variant hidden sm:inline">·</span>
          <span className="text-secondary-fixed-dim text-[9.5px] whitespace-nowrap">
            Refreshed: {refreshedDate}
          </span>
        </div>

        {hasError && (
          <span className="inline-flex items-center gap-1 text-[9px] text-tertiary font-mono bg-tertiary-container/20 border border-tertiary-container/40 px-1.5 py-0.5 rounded max-w-full truncate">
            <span className="material-symbols-outlined text-[11px] shrink-0">warning</span>
            <span className="truncate">Ingestion delayed</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col gap-1 max-w-full overflow-hidden ${className}`}>
      <div className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 py-1 px-2.5 rounded-full bg-surface-container-high/60 border border-white/10 text-on-surface-variant font-mono text-[11px] backdrop-blur-md max-w-full">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0"></span>
        <span className="font-medium text-on-surface">{source?.name || sourceName}</span>
        <span className="text-outline">·</span>
        <span className="whitespace-nowrap">Refreshed: {refreshedDate}</span>
      </div>

      {hasError && (
        <span className="inline-flex items-center gap-1 text-[10px] text-tertiary font-mono bg-tertiary-container/20 border border-tertiary-container/40 px-2 py-0.5 rounded-md max-w-full">
          <span className="material-symbols-outlined text-[12px] shrink-0">warning</span>
          <span>Data may be delayed (last ingestion issue detected)</span>
        </span>
      )}
    </div>
  );
}
