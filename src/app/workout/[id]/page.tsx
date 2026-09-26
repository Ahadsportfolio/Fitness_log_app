"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchWorkoutById } from "@/lib/api";
import { Workout } from "@/types/workout";
import { usePlan, MAX_PLAN_CAP } from "@/context/PlanContext";
import { DetailSkeleton } from "@/components/LoadingSkeleton";
import { CalendarPlus, Bookmark, ArrowLeft, Check } from "lucide-react";

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string>("");

  const { addToPlan, addToSaved, isInPlan, isInSaved, todayPlan } = usePlan();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchWorkoutById(workoutId);
      if (data) {
        setWorkout(data);
        setImgSrc(data.image);
      }
      setLoading(false);
    }
    loadData();
  }, [workoutId]);

  if (loading) {
    return (
      <div className="py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to workouts</span>
        </Link>
        <DetailSkeleton />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="py-16 text-center">
        <h2 className="font-oswald text-3xl font-extrabold text-white mb-4">
          WORKOUT NOT FOUND
        </h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
          The requested workout could not be located in our library.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-full text-sm hover:bg-[#b8e600] transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Workouts</span>
        </Link>
      </div>
    );
  }

  const isAlreadyInPlan = isInPlan(workout.id);
  const isAlreadyInSaved = isInSaved(workout.id);
  const isPlanFull = todayPlan.length >= MAX_PLAN_CAP && !isAlreadyInPlan;

  const keySpecs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="w-full pb-16">
      {/* Back navigation button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Workouts</span>
      </Link>

      {/* Two-column layout matching Figma design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual/Media Container */}
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-square bg-[#13161c] border border-[#1e222d] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={imgSrc || workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              onError={() => setImgSrc("/assets/hero-machine.png")}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Column: Title, Description, Specs, Instructions & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Workout Title */}
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-3">
            {workout.name}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed mb-4">
            {workout.description}
          </p>

          {/* Category Tag Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {workout.muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-xs tracking-wider px-3 py-1 rounded-full uppercase"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Table / Panel */}
          <div className="w-full bg-[#13161c] border border-[#1e222d] rounded-2xl p-5 mb-8 shadow-md">
            <div className="divide-y divide-[#1e222d]/70">
              {keySpecs.map((spec, index) => (
                <div
                  key={index}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs sm:text-sm font-medium"
                >
                  <span className="text-zinc-400 tracking-wider uppercase font-semibold">
                    {spec.label}
                  </span>
                  <span className="text-white font-semibold">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="w-full mb-8">
            <h3 className="font-oswald text-xl font-extrabold text-white uppercase tracking-wider mb-4">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-3">
              {workout.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed"
                >
                  <span className="text-zinc-400 font-bold shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            {/* Primary Button: Add to today's plan */}
            <button
              type="button"
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull}
              className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 font-extrabold text-sm px-6 py-3.5 rounded-full transition-all active:scale-95 shadow-md ${
                isAlreadyInPlan
                  ? "bg-[#1d280c] text-[#ccff00] border border-[#ccff00]/40"
                  : isPlanFull
                  ? "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed opacity-60"
                  : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-[0_0_20px_rgba(204,255,0,0.15)]"
              }`}
            >
              {isAlreadyInPlan ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Today&apos;s Plan</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {isPlanFull ? "Plan Cap Reached (5/5)" : "Add to today's plan"}
                  </span>
                </>
              )}
            </button>

            {/* Secondary Button: Save for later */}
            <button
              type="button"
              onClick={() => addToSaved(workout)}
              className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 font-extrabold text-sm px-6 py-3.5 rounded-full border transition-all active:scale-95 ${
                isAlreadyInSaved
                  ? "bg-zinc-800/80 text-zinc-200 border-zinc-600"
                  : "bg-transparent hover:bg-zinc-800/50 text-white border-zinc-700 hover:border-zinc-500"
              }`}
            >
              <Bookmark className="w-4 h-4 stroke-[2.5]" />
              <span>{isAlreadyInSaved ? "Saved" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
