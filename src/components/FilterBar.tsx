"use client";

import React, { useState } from "react";
import { searchEmployers, Employer } from "@/lib/dataService";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  priorityDate: string;
  onPriorityDateChange: (date: string) => void;
  serviceCenter: string;
  onServiceCenterChange: (sc: string) => void;
  selectedEmployer?: string;
  onEmployerChange?: (emp: string) => void;
  onSearch?: () => void;
  showServiceCenterWarning?: boolean;
  className?: string;
}

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  priorityDate,
  onPriorityDateChange,
  serviceCenter,
  onServiceCenterChange,
  selectedEmployer = "",
  onEmployerChange,
  onSearch,
  showServiceCenterWarning = true,
  className = "",
}: FilterBarProps) {
  const [employerQuery, setEmployerQuery] = useState(selectedEmployer);
  const [employerResults, setEmployerResults] = useState<Employer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleEmployerInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setEmployerQuery(query);
    if (onEmployerChange) onEmployerChange(query);

    if (query.trim().length >= 2) {
      const results = await searchEmployers(query);
      setEmployerResults(results);
      setShowDropdown(true);
    } else {
      setEmployerResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectEmployer = (emp: Employer) => {
    setEmployerQuery(emp.clean_name);
    if (onEmployerChange) onEmployerChange(emp.clean_name);
    setShowDropdown(false);
  };

  return (
    <div className={`glass-panel rounded-xl p-6 md:p-8 glow-border transition-all duration-300 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Selector */}
        <div className="space-y-2">
          <label className="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-wider block text-xs">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-surface-container-highest/60 border border-outline-variant/50 rounded-lg py-3 px-4 text-on-surface appearance-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors backdrop-blur-md font-sans text-body-md cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-surface-container-highest text-on-surface">
                  {cat}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="material-symbols-outlined absolute right-3 top-3.5 text-on-surface-variant pointer-events-none"
            >
              expand_more
            </span>
          </div>
        </div>

        {/* Priority Date Picker */}
        <div className="space-y-2">
          <label className="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-wider block text-xs">
            Priority Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={priorityDate.length === 7 ? `${priorityDate}-15` : priorityDate}
              onChange={(e) => onPriorityDateChange(e.target.value)}
              className="w-full bg-surface-container-highest/60 border border-outline-variant/50 rounded-lg py-3 px-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors backdrop-blur-md font-sans text-body-md [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Service Center Dropdown */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-wider block text-xs">
              Service Center
            </label>
            {serviceCenter !== "ALL" && showServiceCenterWarning && (
              <span className="text-[10px] font-mono text-tertiary">Not available for I-140 stats</span>
            )}
          </div>
          <div className="relative">
            <select
              value={serviceCenter}
              onChange={(e) => onServiceCenterChange(e.target.value)}
              className="w-full bg-surface-container-highest/60 border border-outline-variant/50 rounded-lg py-3 px-4 text-on-surface appearance-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors backdrop-blur-md font-sans text-body-md cursor-pointer"
            >
              <option value="ALL" className="bg-surface-container-highest text-on-surface">
                All Service Centers
              </option>
              <option value="SRC" className="bg-surface-container-highest text-on-surface">
                Texas (SRC)
              </option>
              <option value="LIN" className="bg-surface-container-highest text-on-surface">
                Nebraska (LIN)
              </option>
              <option value="WAC" className="bg-surface-container-highest text-on-surface">
                California (WAC)
              </option>
              <option value="EAC" className="bg-surface-container-highest text-on-surface">
                Vermont (EAC)
              </option>
            </select>
            <span
              aria-hidden="true"
              className="material-symbols-outlined absolute right-3 top-3.5 text-on-surface-variant pointer-events-none"
            >
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Sponsoring Employer Autocomplete Input (Optional) */}
      {onEmployerChange && (
        <div className="mt-6 space-y-2 relative">
          <label className="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-wider block text-xs">
            Sponsoring Employer (Optional)
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant"
            >
              search
            </span>
            <input
              type="text"
              value={employerQuery}
              onChange={handleEmployerInputChange}
              onFocus={() => employerQuery.length >= 2 && setShowDropdown(true)}
              placeholder="e.g. Google LLC, Microsoft Corporation, Amazon.com..."
              className="w-full bg-surface-container-highest/60 border border-outline-variant/50 rounded-lg py-3 pl-10 pr-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors backdrop-blur-md font-sans text-body-md"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showDropdown && employerResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-surface-container-highest border border-outline-variant/80 rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto backdrop-blur-xl">
              {employerResults.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  onClick={() => handleSelectEmployer(emp)}
                  className="w-full text-left px-4 py-3 hover:bg-primary-container/10 hover:text-primary border-b border-white/5 last:border-0 flex justify-between items-center transition-colors"
                >
                  <span className="font-sans font-medium text-sm text-on-surface">
                    {emp.clean_name}
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    {emp.total_perm_count} PERMs
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notice Banner when Service Center filter is active */}
      {serviceCenter !== "ALL" && showServiceCenterWarning && (
        <div className="mt-4 p-3 rounded-lg bg-tertiary-container/10 border border-tertiary-container/30 text-tertiary text-xs font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>
            Notice: USCIS I-140 annual statistics are published at national &amp; country level only. Service Center filtering applies to inventory snapshots, not annual classification totals.
          </span>
        </div>
      )}

      {/* Search Submit Button */}
      {onSearch && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onSearch}
            className="bg-primary-container text-on-primary-container px-10 py-3 rounded-full font-sans text-headline-md text-[17px] font-bold hover:bg-primary-fixed-dim transition-all primary-glow flex items-center gap-2"
          >
            <span>Analyze Cohort</span>
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              analytics
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
