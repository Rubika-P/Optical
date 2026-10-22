import React from 'react';
import { Sparkles } from 'lucide-react';

const LuxurySkeletonLoader = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#FBF9F5] px-4 py-16">
      <div className="w-full max-w-xl mx-auto space-y-8 animate-pulse">
        {/* Brand Monogram Icon */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#171717] to-[#3a3a3a] flex items-center justify-center shadow-lg border border-[#C5A880]/40">
            <Sparkles className="w-6 h-6 text-[#C5A880] animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <span className="font-serif tracking-[0.3em] uppercase text-xs text-[#8C847A]">
            GRAND OPTICALS EYE CLINIC
          </span>
        </div>

        {/* Shimmering Hero Section Skeleton */}
        <div className="h-44 w-full bg-gradient-to-r from-[#EDE7DC] via-[#FAF6EF] to-[#EDE7DC] rounded-none border border-[#E2DAD0]/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
        </div>

        {/* Content Rows */}
        <div className="space-y-3">
          <div className="h-5 w-2/3 mx-auto bg-[#E5DEC3]/50 rounded-none" />
          <div className="h-3.5 w-1/2 mx-auto bg-[#ECE5DA] rounded-none" />
        </div>

        {/* 3-Column Grid Skeleton */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="h-28 bg-[#F0EAE1] border border-[#E6DFD4]" />
          <div className="h-28 bg-[#F0EAE1] border border-[#E6DFD4]" />
          <div className="h-28 bg-[#F0EAE1] border border-[#E6DFD4]" />
        </div>
      </div>
    </div>
  );
};

export default LuxurySkeletonLoader;
