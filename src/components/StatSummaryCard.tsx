"use client";

import React from "react";
import { usePlan } from "@/context/PlanContext";

export const StatSummaryCard: React.FC = () => {
  const { totalExercises, totalMinutes, totalCalories } = usePlan();

  return (
    <div className="w-full bg-[#13161c] border border-[#1e222d] rounded-2xl p-6 mb-8 shadow-xl">
      <div className="grid grid-cols-3 divide-x divide-[#1e222d]">
        {/* Exercises */}
        <div className="px-3 sm:px-6 first:pl-0">
          <span className="block text-xs sm:text-sm text-zinc-400 font-medium mb-1">
            Exercises
          </span>
          <span className="font-oswald text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#ccff00] leading-none">
            {totalExercises}
          </span>
        </div>

        {/* Minutes */}
        <div className="px-3 sm:px-6">
          <span className="block text-xs sm:text-sm text-zinc-400 font-medium mb-1">
            Minutes
          </span>
          <span className="font-oswald text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none">
            {totalMinutes}
          </span>
        </div>

        {/* Calories */}
        <div className="px-3 sm:px-6 last:pr-0">
          <span className="block text-xs sm:text-sm text-zinc-400 font-medium mb-1">
            Calories
          </span>
          <span className="font-oswald text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none">
            {totalCalories}
          </span>
        </div>
      </div>
    </div>
  );
};
