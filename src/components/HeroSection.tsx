"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  const handleScrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#13161c] border border-[#1e222d] rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <span className="text-[#ccff00] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-md">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05] mb-4">
            TRAIN WITH INTENT.
            <br />
            <span className="text-white">LOG EVERY SET.</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            onClick={handleScrollToLibrary}
            className="inline-flex items-center gap-2.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.2)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <span>BROWSE WORKOUTS</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Right Column - Hero Graphic */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10 relative">
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center">
            {/* Subtle glow behind machine image */}
            <div className="absolute inset-0 bg-[#ccff00]/5 rounded-full blur-3xl -z-10" />
            <Image
              src="/assets/hero-machine.png"
              alt="Gym Equipment Graphic"
              width={420}
              height={420}
              className="object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
