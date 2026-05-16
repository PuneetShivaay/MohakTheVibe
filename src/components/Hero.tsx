
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-earrings");

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg?.imageUrl || ""}
          alt="Mohak – The Vibe Earring Collection"
          fill
          className="object-cover scale-105"
          priority
          data-ai-hint="earring model"
        />
        <div className="absolute inset-0 bg-brand-midnight/40 dark:bg-brand-midnight/60 backdrop-blur-[2px]" />
      </div>

      {/* Floating Particles/Elements Hint */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-brand-gold/30 rounded-full animate-float blur-sm" />
      <div className="absolute bottom-40 left-10 w-24 h-24 border border-brand-gold/20 rounded-full animate-float delay-1000 blur-md" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h2 className="text-brand-gold font-body tracking-[0.4em] uppercase text-sm mb-6 drop-shadow-md">
          Curated Earring Boutique
        </h2>
        <h1 className="font-headline text-5xl md:text-8xl text-brand-ivory mb-8 leading-tight">
          Wear <span className="italic">The</span> Vibe
        </h1>
        <p className="text-brand-ivory/90 font-light text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Artificial earrings reimagined. Discover your statement piece from our hand-picked collection of premium luxe aesthetics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-brand-gold text-brand-midnight hover:bg-brand-beige border-none px-10 rounded-none h-14 text-base font-medium"
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Earring Catalog
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-brand-ivory text-brand-ivory hover:bg-brand-ivory/10 px-10 rounded-none h-14 text-base font-medium group"
            onClick={() => document.getElementById('ai-stylist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            AI Style Finder <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  );
}
