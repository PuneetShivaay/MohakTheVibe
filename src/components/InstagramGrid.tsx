
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const instaImages = ["insta-1", "insta-2", "insta-3", "insta-4"];

export function InstagramGrid() {
  const instagramUrl = "https://www.instagram.com/mohakthevibe/";

  return (
    <section className="py-16 sm:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl mb-4">On the Gram</h2>
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto">
            Join our community of Mohak enthusiasts. Tag us <span className="text-brand-gold font-medium">@mohakthevibe</span> to be featured.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {instaImages.map((id, index) => {
            const img = PlaceHolderImages.find(i => i.id === id)?.imageUrl;
            
            return (
              <div key={id} className="relative aspect-square group overflow-hidden cursor-pointer" onClick={() => window.open(instagramUrl, "_blank")}>
                {img && (
                  <Image
                    src={img}
                    alt={`Instagram Post ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-brand-midnight text-brand-midnight hover:bg-brand-midnight hover:text-white px-8 sm:px-10 rounded-none h-11 sm:h-12 text-[10px] sm:text-xs"
            onClick={() => window.open(instagramUrl, "_blank")}
          >
            Follow Our Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
