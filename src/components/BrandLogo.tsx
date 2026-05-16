
"use client";

import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center transition-all", className)}>
      <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
        {/* Stylized SVG Logo inspired by the provided brand mark */}
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Outer circle with sparkle texture */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="#C9A14A" strokeWidth="1" className="opacity-80" />
          <circle cx="50" cy="50" r="47" fill="none" stroke="#C9A14A" strokeWidth="0.5" strokeDasharray="1 5" className="opacity-30" />
          
          {/* Decorative side flourishes */}
          <path d="M -8 50 C 10 50, 20 55, 30 50" stroke="#C9A14A" strokeWidth="0.5" fill="none" className="opacity-40" />
          <path d="M 70 50 C 80 45, 90 50, 108 50" stroke="#C9A14A" strokeWidth="0.5" fill="none" className="opacity-40" />

          {/* Large script 'm' */}
          <text 
            x="50" 
            y="56" 
            textAnchor="middle" 
            fill="#C9A14A" 
            className="text-5xl italic font-headline select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            m
          </text>
          
          {/* MOHAK text inside circle at bottom */}
          <text 
            x="50" 
            y="80" 
            textAnchor="middle" 
            fill="#C9A14A" 
            className="text-[8px] uppercase tracking-[0.5em] font-light select-none"
          >
            MOHAK
          </text>
          
          {/* Tiny sparkles around circle */}
          <circle cx="25" cy="25" r="0.8" fill="#C9A14A" className="animate-pulse" />
          <circle cx="75" cy="25" r="1" fill="#C9A14A" className="animate-pulse" />
          <circle cx="15" cy="65" r="0.5" fill="#C9A14A" />
          <circle cx="85" cy="75" r="0.7" fill="#C9A14A" />
        </svg>
      </div>
      <span className="text-[8px] uppercase tracking-[0.5em] font-light text-brand-gold/60 mt-0.5">The Vibe</span>
    </div>
  );
}
