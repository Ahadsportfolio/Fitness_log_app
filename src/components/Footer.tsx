"use client";

import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#1e222d] bg-[#090b0e] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand logo + FITLOG */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="font-oswald text-lg font-bold tracking-wider text-white">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright notice */}
        <p className="text-xs sm:text-sm text-zinc-500 text-center sm:text-right font-normal">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};
