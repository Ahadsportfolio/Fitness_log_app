"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { todayPlan, savedList } = usePlan();

  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 bg-[#0b0d10]/90 backdrop-blur-md border-b border-[#1e222d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-oswald text-xl font-bold tracking-wider text-white group-hover:text-[#ccff00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isWorkoutsActive
                ? "bg-[#1d280c] text-[#ccff00] border border-[#ccff00]/30 shadow-[0_0_12px_rgba(204,255,0,0.15)]"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isMyPlanActive
                ? "bg-[#1d280c] text-[#ccff00] border border-[#ccff00]/30 shadow-[0_0_12px_rgba(204,255,0,0.15)]"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Status Badges (Counters) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Plan badge: Filled pill with accent background */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black font-semibold text-xs sm:text-sm px-3.5 py-1.5 rounded-full hover:bg-[#b8e600] transition-transform active:scale-95 shadow-sm"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved badge: Pill with outline/border only */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full transition-all active:scale-95 bg-zinc-900/40"
          >
            <span>Saved</span>
            <span className="text-zinc-400 text-xs font-semibold ml-0.5">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
