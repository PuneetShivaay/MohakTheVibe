"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export function Hero() {
  const modelImg = PlaceHolderImages.find(img => img.id === "hero-earrings")?.imageUrl;

  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden bg-background">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32 lg:py-0 z-10">
        <div className="max-w-xl animate-fade-in-up">
          <h1 className="font-headline text-7xl md:text-9xl leading-[0.9] text-foreground mb-8">
            finest <br /> 
            <span className="italic">jewelry,</span>
          </h1>
          <p className="text-foreground/70 text-xl font-light mb-12 italic">
            inspired by our life.
          </p>
          <div className="flex">
            <Button 
              variant="outline"
              className="group h-12 px-8 rounded-none border-foreground/20 text-[10px] tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="dashed-link">EXPLORE NOW</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Image Container */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative">
        <div className="absolute inset-0 z-0">
          {modelImg && (
            <Image
              src={modelImg}
              alt="Mohak Luxe Signature Collection"
              fill
              className="object-cover object-center"
              priority
              data-ai-hint="luxury model"
            />
          )}
          {/* Subtle circle overlay decoration inspired by image */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[120%] h-[120%] border border-foreground/5 rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 right-8 flex flex-col gap-8 items-center text-[10px] tracking-[0.3em] vertical-text mix-blend-difference text-white">
            <span className="rotate-90 origin-center whitespace-nowrap opacity-40">INSTAGRAM</span>
            <div className="w-[1px] h-12 bg-white/40" />
          </div>
        </div>
      </div>

      {/* Aesthetic arrow indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-24 bg-foreground/20 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b border-foreground/20 rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
}