
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const festiveItems = [
  { id: 'festive-item-1', title: 'Emerald Royale' },
  { id: 'festive-item-2', title: 'Ruby Radiance' },
  { id: 'festive-item-3', title: 'Turquoise Lotus' },
  { id: 'festive-item-4', title: 'Royal Kundan' },
  { id: 'festive-item-5', title: 'Midnight Lotus' },
];

export function FestiveCollections() {
  return (
    <section id="festive" className="py-16 sm:py-24 md:py-32 px-6 bg-brand-ivory/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 border border-brand-gold/5 rounded-full pointer-events-none" />
        
        <div className="text-center mb-12 sm:mb-24 animate-fade-in space-y-3 sm:space-y-4">
          <span className="text-brand-gold uppercase tracking-[0.4em] text-[9px] sm:text-[10px] font-semibold">Special Edition</span>
          <h2 className="font-headline text-3xl sm:text-5xl md:text-7xl text-foreground leading-tight">
            Festive Collections
          </h2>
          <p className="text-foreground/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light">
            In this Festive Season, Be the Real You with Mohak. Discover curated elegance for your most celebrated moments.
          </p>
        </div>

        <div className="relative px-0 sm:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {festiveItems.map((item) => {
                const imgData = PlaceHolderImages.find(p => p.id === item.id);
                const img = imgData?.imageUrl;
                
                return (
                  <CarouselItem key={item.id} className="pl-4 sm:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                    <div className="group relative aspect-[4/5] overflow-hidden bg-white shadow-sm transition-all duration-500 hover:shadow-2xl border border-brand-gold/5">
                      {img ? (
                        <Image
                          src={img}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          Image not found
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 sm:p-8">
                        <h3 className="text-white font-headline text-xl sm:text-2xl mb-2">{item.title}</h3>
                        <div className="w-12 h-[1px] bg-brand-gold" />
                        <p className="text-white/70 text-[9px] tracking-widest uppercase mt-4">View Details</p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-white transition-all h-12 w-12 rounded-none" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-white transition-all h-12 w-12 rounded-none" />
            </div>
          </Carousel>
        </div>

        <div className="mt-12 sm:mt-24 text-center">
          <Button 
            variant="outline"
            className="h-10 sm:h-12 px-8 sm:px-12 rounded-none border-brand-midnight/20 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase hover:bg-brand-midnight hover:text-white transition-all group"
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="dashed-link">EXPLORE THE FULL RANGE</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
