"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export function FestiveCollections() {
  const collectionImg = PlaceHolderImages.find(img => img.id === "lifestyle-earring")?.imageUrl;

  return (
    <section id="festive" className="py-32 px-6 bg-background overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Background Decorative Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
          </svg>
        </div>

        <div className="relative z-10 animate-fade-in space-y-8">
          <h2 className="font-headline text-5xl md:text-7xl text-foreground leading-tight">
            Festive Special Collections
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-light">
            In this Festive Season Be Real You with Mohak
          </p>
          <div className="pt-8">
            <Button 
              variant="outline"
              className="h-12 px-12 rounded-none border-foreground/20 text-[10px] tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="dashed-link">EXPLORE NOW</span>
            </Button>
          </div>
        </div>

        {/* Carousel-like dots indicator */}
        <div className="flex justify-center gap-3 mt-16">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className={cn(
              "w-2 h-2 rounded-full border border-foreground/20",
              i === 1 ? "bg-foreground/10" : "transparent"
            )} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";