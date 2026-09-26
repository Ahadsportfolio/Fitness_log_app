"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { Workout, SortOption, PlanItem } from "@/types/workout";
import { StatSummaryCard } from "@/components/StatSummaryCard";
import { PlannedCard } from "@/components/PlannedCard";
import { SortDropdown } from "@/components/SortDropdown";
import { Dumbbell } from "lucide-react";

type TabType = "today" | "saved";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<TabType>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const {
    todayPlan,
    savedList,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = usePlan();

  // Pick target list based on active tab with explicit type mapping
  const rawList: Workout[] =
    activeTab === "today"
      ? todayPlan.map((item: PlanItem) => item.workout)
      : savedList.map((item: PlanItem) => item.workout);

  // Sort list with explicit types on comparator parameters
  const sortedList = [...rawList].sort((a: Workout, b: Workout) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="w-full pb-16">
      {/* Page Title & Subtitle */}
      <div className="mb-8">
        <h1 className="font-oswald text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-2">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base font-normal">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (Exercises, Minutes, Calories) */}
      <StatSummaryCard />

      {/* Controls Row: Tabs + Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tabs: Today's Plan / Saved */}
        <div className="inline-flex items-center p-1 bg-[#13161c] border border-[#1e222d] rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "today"
                ? "bg-[#1d280c] text-[#ccff00] border border-[#ccff00]/30 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
            {todayPlan.length > 0 && (
              <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-[#ccff00]/20 text-[#ccff00]">
                {todayPlan.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "saved"
                ? "bg-[#1d280c] text-[#ccff00] border border-[#ccff00]/30 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
            {savedList.length > 0 && (
              <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                {savedList.length}
              </span>
            )}
          </button>
        </div>

        {/* Sort Dropdown */}
        <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
      </div>

      {/* Workout Cards List / Empty State */}
      {sortedList.length === 0 ? (
        /* Empty State Matching Figma exact UI */
        <div className="w-full bg-[#13161c] border border-dashed border-[#1e222d] rounded-3xl p-12 sm:p-16 text-center my-4 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
            <Dumbbell className="w-8 h-8 text-[#ccff00]" />
          </div>
          <h2 className="font-oswald text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-8 font-normal">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-transform active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.15)] uppercase tracking-wider"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        /* List of Workout Cards */
        <div className="space-y-4">
          {sortedList.map((workout: Workout) => {
            const planItem = todayPlan.find((i: PlanItem) => i.workout.id === workout.id);
            const isDone = planItem?.isDone || false;

            return (
              <PlannedCard
                key={workout.id}
                workout={workout}
                isDone={isDone}
                showMarkAsDone={activeTab === "today"}
                onToggleDone={() => toggleDone(workout.id)}
                onRemove={() => {
                  if (activeTab === "today") {
                    removeFromPlan(workout.id);
                  } else {
                    removeFromSaved(workout.id);
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}