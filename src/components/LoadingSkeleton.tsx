"use client";

import React from "react";

export const LibrarySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#13161c] border border-[#1e222d] rounded-2xl overflow-hidden flex flex-col justify-between h-[340px]"
        >
          <div className="w-full aspect-[16/10] bg-[#1a1e27]" />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex gap-2 mb-3">
                <div className="w-14 h-5 bg-[#1a1e27] rounded-full" />
                <div className="w-12 h-5 bg-[#1a1e27] rounded-full" />
              </div>
              <div className="w-3/4 h-6 bg-[#1a1e27] rounded-md mb-2" />
              <div className="w-1/2 h-4 bg-[#1a1e27] rounded-md" />
            </div>
            <div className="pt-4 border-t border-[#1e222d] flex justify-between">
              <div className="w-16 h-4 bg-[#1a1e27] rounded-md" />
              <div className="w-16 h-4 bg-[#1a1e27] rounded-md" />
              <div className="w-12 h-4 bg-[#1a1e27] rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse py-4">
      <div className="lg:col-span-6">
        <div className="w-full aspect-square bg-[#13161c] border border-[#1e222d] rounded-3xl" />
      </div>
      <div className="lg:col-span-6 flex flex-col gap-6">
        <div className="w-3/4 h-10 bg-[#13161c] rounded-lg" />
        <div className="w-full h-16 bg-[#13161c] rounded-lg" />
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-[#13161c] rounded-full" />
          <div className="w-16 h-6 bg-[#13161c] rounded-full" />
        </div>
        <div className="w-full h-64 bg-[#13161c] rounded-2xl" />
        <div className="w-full h-32 bg-[#13161c] rounded-2xl" />
        <div className="flex gap-4">
          <div className="w-1/2 h-12 bg-[#13161c] rounded-full" />
          <div className="w-1/2 h-12 bg-[#13161c] rounded-full" />
        </div>
      </div>
    </div>
  );
};
