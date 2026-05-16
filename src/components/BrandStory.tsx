
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function BrandStory() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -top-10 -left-10 w-40 h-40 border border-brand-gold/20 rounded-full animate-float -z-10" />
          <div className="relative overflow-hidden aspect-[4/5] border-[12px] border-white shadow-2xl">
            <Image
              src={PlaceHolderImages.find(i => i.id === "lifestyle-1")?.imageUrl || ""}
              alt="The Mohak Vibe Story"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              data-ai-hint="jewelry detail"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 overflow-hidden border-[8px] border-white shadow-xl hidden lg:block">
            <Image
              src={PlaceHolderImages.find(i => i.id === "ring-1")?.imageUrl || ""}
              alt="Detail"
              fill
              className="object-cover"
              data-ai-hint="luxury ring"
            />
          </div>
        </div>

        <div className="space-y-8 md:pl-8">
          <div className="space-y-2">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-semibold">Our Essence</span>
            <h2 className="font-headline text-4xl md:text-6xl text-brand-midnight leading-tight">
              Wear Your Vibe, <br /> 
              <span className="italic text-brand-gold">Own the Room.</span>
            </h2>
          </div>
          
          <p className="text-lg text-brand-midnight/70 font-light leading-relaxed">
            At Mohak Luxe, we believe jewelry is more than an accessory—it's an extension of your persona. Born from the desire to merge boutique elegance with contemporary styles, 'The Vibe' is a celebration of feminine luxury.
          </p>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-brand-gold/10">
            <div>
              <h4 className="font-headline text-xl mb-2">Curated Craft</h4>
              <p className="text-sm opacity-60 font-light">Each piece is hand-selected to meet our stringent standards of 'Luxe Aesthetics'.</p>
            </div>
            <div>
              <h4 className="font-headline text-xl mb-2">Boutique Service</h4>
              <p className="text-sm opacity-60 font-light">We prioritize personal connection over automated checkouts.</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="font-headline text-2xl italic text-brand-midnight">
              "Femininity isn't just a trait, it's a celebration. We're here to provide the crown."
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-brand-gold font-bold">— The Mohak Collective</p>
          </div>
        </div>
      </div>
    </section>
  );
}
