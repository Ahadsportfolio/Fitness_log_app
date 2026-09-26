"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const [imgSrc, setImgSrc] = useState(workout.image);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#13161c] border border-[#1e222d] hover:border-[#ccff00]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <div>
        {/* Top Media Thumbnail Container */}
        <div className="relative w-full aspect-[16/10] bg-[#0d0f12] overflow-hidden">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => {
              // Fallback if remote image fails
              setImgSrc("/assets/hero-machine.png");
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13161c] via-transparent to-transparent opacity-80" />
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Category Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {workout.muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider px-2.5 py-0.5 rounded-full uppercase"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Title */}
          <h3 className="font-oswald text-xl font-extrabold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors line-clamp-1 mb-1">
            {workout.name}
          </h3>

          {/* Equipment Line */}
          <p className="text-zinc-400 text-xs font-normal mb-5 line-clamp-1">
            {workout.equipment}
          </p>
        </div>
      </div>

      {/* Stats Row with icons */}
      <div className="px-5 pb-5 pt-0 border-t border-[#1e222d]/60 pt-3 flex items-center justify-between text-xs text-zinc-400 font-medium">
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
    </Link>
  );
};
