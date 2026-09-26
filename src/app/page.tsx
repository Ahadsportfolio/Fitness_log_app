"use client";

import React, { useEffect, useState } from "react";
import { fetchAllWorkouts } from "@/lib/api";
import { Workout, SortOption } from "@/types/workout";
import { HeroSection } from "@/components/HeroSection";
import { WorkoutCard } from "@/components/WorkoutCard";
import { SortDropdown } from "@/components/SortDropdown";
import { LibrarySkeleton } from "@/components/LoadingSkeleton";
import { Search, Dumbbell } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchAllWorkouts();
      setWorkouts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Filter workouts by search query (name or muscle group tag)
  const filteredWorkouts = workouts.filter((w) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = w.name.toLowerCase().includes(q);
    const tagMatch = w.muscleGroups.some((group) =>
      group.toLowerCase().includes(q)
    );
    const equipmentMatch = w.equipment.toLowerCase().includes(q);
    return nameMatch || tagMatch || equipmentMatch;
  });

  // Sort filtered workouts
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
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
      {/* Top Hero Banner */}
      <HeroSection />

      {/* Library Section */}
      <section id="library" className="pt-4 scroll-mt-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-2">
              THE LIBRARY
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-normal">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls: Search Input & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lift or tag..."
                className="w-full bg-[#13161c] border border-[#1e222d] text-white text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-[#ccff00]/50 focus:ring-1 focus:ring-[#ccff00]/50 placeholder:text-zinc-500 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Workout Grid / Loading State / Empty State */}
        {loading ? (
          <LibrarySkeleton />
        ) : sortedWorkouts.length === 0 ? (
          <div className="bg-[#13161c] border border-[#1e222d] rounded-2xl p-12 text-center my-8">
            <Dumbbell className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-oswald text-2xl font-bold text-white mb-2">
              NO LIFTS FOUND
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              No workouts match your search query &quot;{searchQuery}&quot;. Try searching for another exercise or muscle group like &quot;Chest&quot; or &quot;Arms&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
