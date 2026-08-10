"use client";

import React, { useEffect, useState } from "react";
import { getDataSourcesWithLogs, DataSource } from "@/lib/dataService";

interface DataSourceBadgeProps {
  sourceName: string;
  className?: string;
}

export default function DataSourceBadge({
  sourceName,
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
      <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-full bg-white/5 text-on-surface-variant font-mono text-[11px] animate-pulse">
        <span>Source:</span>
        <span className="w-12 h-3 bg-white/10 rounded"></span>
      </span>
    );
  }

  const refreshedDate = source?.last_refreshed
    ? new Date(source.last_refreshed).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  const hasError = source?.has_failed_run || source?.status === "error";

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-surface-container-high/60 border border-white/10 text-on-surface-variant font-mono text-[11px] backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
        <span className="font-medium text-on-surface">{source?.name || sourceName}</span>
        <span className="text-outline">·</span>
        <span>Refreshed: {refreshedDate}</span>
      </div>

      {hasError && (
        <span className="inline-flex items-center gap-1 text-[10px] text-tertiary font-mono bg-tertiary-container/20 border border-tertiary-container/40 px-2 py-0.5 rounded-md">
          <span className="material-symbols-outlined text-[12px]">warning</span>
          <span>Data may be delayed (last ingestion issue detected)</span>
        </span>
      )}
    </div>
  );
}
