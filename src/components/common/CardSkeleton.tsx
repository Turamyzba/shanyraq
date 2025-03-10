"use client";

import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="relative">
      <div className="min-h-[345px] min-w-[267px] bg-white rounded-[10px] p-4 flex flex-col justify-between items-start shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
        {/* Image Section Skeleton */}
        <div className="relative">
          <div className="w-[240px] h-[130px] rounded-[10px] bg-[#E0E0E0]" />
          <div className="absolute top-[10px] right-[10px] w-8 h-8 rounded-full bg-[#E0E0E0]" />
        </div>

        {/* Card Content Skeleton */}
        <div className="flex flex-col gap-4 w-full">
          {/* Title Skeleton */}
          <div className="w-3/5 h-5 rounded bg-[#E0E0E0]" />
          {/* Location Skeleton */}
          <div className="w-4/5 h-4 rounded bg-[#E0E0E0]" />

          {/* Room Information Skeleton */}
          <div className="flex justify-between w-full">
            <div className="w-1/5 h-4 rounded bg-[#E0E0E0]" />
            <div className="w-1/5 h-4 rounded bg-[#E0E0E0]" />
            <div className="w-1/5 h-4 rounded bg-[#E0E0E0]" />
            <div className="w-1/5 h-4 rounded bg-[#E0E0E0]" />
          </div>

          {/* Price Skeleton */}
          <div className="w-2/5 h-5 rounded bg-[#E0E0E0]" />
        </div>

        {/* Learn More Button Skeleton */}
        <div className="flex">
          <div className="w-1/3 h-4 rounded bg-[#E0E0E0]" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
