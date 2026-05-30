
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function BrandStory() {
  const lifestyleImg = PlaceHolderImages.find(i => i.id === "lifestyle-1")?.imageUrl;
  const detailImg = PlaceHolderImages.find(i => i.id === "earring-detail")?.imageUrl;

  return (
    <section id="brand-story" className="py-16 sm:py-24 px-6 md:px-12 bg-brand-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
        <div className="relative group">
          <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-32 h-32 sm:w-40 sm:h-40 border border-brand-gold/20 rounded-full animate-float -z-10" />
          <div className="relative overflow-hidden aspect-[4/5] border-[8px] sm:border-[12px] border-white shadow-xl sm:shadow-2xl">
            {lifestyleImg && (
              <Image
                src={lifestyleImg}
                alt="The Mohak – The Vibe Story"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            )}
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 sm:w-48 sm:h-48 overflow-hidden border-[8px] border-white shadow-xl hidden lg:block">
            {detailImg && (
              <Image
                src={detailImg}
                alt="Detail"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 md:pl-8">
          <div className="space-y-2">
            <span className="text-brand-gold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs font-semibold">Our Essence</span>
            <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl text-brand-midnight leading-tight">
              Wear Your Vibe, <br /> 
              <span className="italic text-brand-gold">Own the Room.</span>
            </h2>
          </div>
          
          <p className="text-base sm:text-lg text-brand-midnight/70 font-light leading-relaxed">
            At Mohak – The Vibe, we believe jewelry is more than an accessory—it's an extension of your persona. Born from the desire to merge boutique elegance with contemporary styles, our brand is a celebration of feminine luxury.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-6 sm:py-8 border-y border-brand-gold/10">
            <div>
              <h4 className="font-headline text-lg sm:text-xl mb-2">Curated Craft</h4>
              <p className="text-xs sm:text-sm opacity-60 font-light">Each pair of earrings is hand-selected to meet our stringent standards of 'Luxe Aesthetics'.</p>
            </div>
            <div>
              <h4 className="font-headline text-lg sm:text-xl mb-2">Boutique Service</h4>
              <p className="text-xs sm:text-sm opacity-60 font-light">We prioritize personal connection over automated checkouts.</p>
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            <p className="font-headline text-xl sm:text-2xl italic text-brand-midnight">
              "Femininity isn't just a trait, it's a celebration. We're here to provide the crown."
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-brand-gold font-bold">— The Mohak – The Vibe Collective</p>
          </div>
        </div>
      </div>
    </section>
  );
}
