"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { Workout } from "@/types/workout";

interface PlannedCardProps {
  workout: Workout;
  isDone?: boolean;
  onToggleDone?: () => void;
  onRemove: () => void;
  showMarkAsDone?: boolean;
}

export const PlannedCard: React.FC<PlannedCardProps> = ({
  workout,
  isDone = false,
  onToggleDone,
  onRemove,
  showMarkAsDone = true,
}) => {
  const [imgSrc, setImgSrc] = useState(workout.image);

  return (
    <div
      className={`group relative bg-[#13161c] border ${
        isDone
          ? "border-[#ccff00]/40 bg-[#151c14]"
          : "border-[#1e222d] hover:border-zinc-700"
      } rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 shadow-lg`}
    >
      {/* Left: Image & Lift Meta Info */}
      <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
        {/* Thumbnail */}
        <div className="relative w-24 sm:w-32 h-20 sm:h-24 bg-[#0d0f12] rounded-xl overflow-hidden flex-shrink-0 border border-[#1e222d]">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            className="object-cover"
            onError={() => setImgSrc("/assets/hero-machine.png")}
          />
          {isDone && (
            <div className="absolute inset-0 bg-[#ccff00]/20 backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-[#ccff00] text-black font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1 shadow-md">
                <Check className="w-3 h-3 stroke-[3]" />
                DONE
              </div>
            </div>
          )}
        </div>

        {/* Title, Equipment & Specs */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-oswald text-xl sm:text-2xl font-extrabold uppercase tracking-tight truncate ${
              isDone ? "text-zinc-300 line-through decoration-[#ccff00]/70" : "text-white"
            }`}
          >
            {workout.name}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm font-normal mb-2.5 truncate">
            {workout.equipment}
          </p>

          {/* Stats icons */}
          <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold">{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Actions Container */}
      <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#1e222d]">
        {/* View Details Button */}
        <Link
          href={`/workout/${workout.id}`}
          className="px-4 py-2 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition-all active:scale-95 bg-zinc-900/30"
        >
          View Details
        </Link>

        {/* Mark as Done Button */}
        {showMarkAsDone && onToggleDone && (
          <button
            type="button"
            onClick={onToggleDone}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all active:scale-95 shadow-sm ${
              isDone
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                : "bg-[#ccff00] hover:bg-[#b8e600] text-black"
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{isDone ? "Done" : "Mark as Done"}</span>
          </button>
        )}

        {/* Remove (X) Button */}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove exercise"
          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors ml-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
