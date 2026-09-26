"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { SortOption } from "@/types/workout";

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  duration: "Duration",
  calories: "Calories",
  rating: "Rating",
};

export const SortDropdown: React.FC<SortDropdownProps> = ({
  currentSort,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: SortOption[] = ["duration", "calories", "rating"];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm text-zinc-400 font-medium">
          Sort By
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 bg-[#13161c] hover:bg-[#1a1e27] text-white text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl border border-[#1e222d] hover:border-zinc-700 transition-all focus:outline-none focus:ring-1 focus:ring-[#ccff00]/50"
        >
          <span>{SORT_LABELS[currentSort]}</span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#13161c] border border-[#1e222d] shadow-xl z-30 py-1.5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSortChange(option);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm font-medium text-left transition-colors ${
                currentSort === option
                  ? "bg-[#1d280c] text-[#ccff00]"
                  : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
              }`}
            >
              <span>{SORT_LABELS[option]}</span>
              {currentSort === option && (
                <Check className="w-4 h-4 text-[#ccff00]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
