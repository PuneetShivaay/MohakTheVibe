
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const instaImages = ["insta-1", "insta-2", "insta-3", "insta-4"];

export function InstagramGrid() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl mb-4">On the Gram</h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Join our community of luxe enthusiasts. Tag us <span className="text-brand-gold font-medium">@MohakLuxe</span> to be featured.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instaImages.map((id, index) => {
            const img = PlaceHolderImages.find(i => i.id === id);
            return (
              <div key={id} className="relative aspect-square group overflow-hidden cursor-pointer">
                <Image
                  src={img?.imageUrl || ""}
                  alt={`Instagram Post ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-brand-midnight text-brand-midnight hover:bg-brand-midnight hover:text-white px-10 rounded-none h-12"
            onClick={() => window.open("https://instagram.com/mohakluxe", "_blank")}
          >
            Follow Our Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
