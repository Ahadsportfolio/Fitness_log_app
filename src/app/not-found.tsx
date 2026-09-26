"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-[#13161c] border border-[#1e222d] flex items-center justify-center mb-6 shadow-2xl">
        <Dumbbell className="w-10 h-10 text-[#ccff00] animate-bounce" />
      </div>

      <span className="text-[#ccff00] font-semibold text-xs tracking-widest uppercase mb-2 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-md">
        404 ERROR
      </span>

      <h1 className="font-oswald text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight mb-4">
        LIFT NOT FOUND
      </h1>

      <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8 font-normal leading-relaxed">
        Looks like you stepped off the lifting platform! The page or workout route you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm px-6 py-3.5 rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.2)] uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Return to Workouts</span>
      </Link>
    </div>
  );
}
