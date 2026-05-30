
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { 
    id: 'p1', 
    imgId: 'jhumka-green', 
    name: 'MINAKARI HALF GREEN JHUMKA', 
    oldPrice: '₹299.00', 
    price: '₹199.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
  { 
    id: 'p2', 
    imgId: 'jhumka-red', 
    name: 'MINAKARI HALF RED JHUMKA', 
    oldPrice: '₹299.00', 
    price: '₹199.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
  { 
    id: 'p3', 
    imgId: 'lotus-firozi', 
    name: 'LOTUS MINAKARI FIROZI DROP EARRINGS', 
    oldPrice: '₹349.00', 
    price: '₹210.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
  { 
    id: 'p4', 
    imgId: 'lotus-black', 
    name: 'LOTUS MINAKARI BLACK DROP EARRINGS', 
    oldPrice: '₹349.00', 
    price: '₹210.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
  { 
    id: 'p5', 
    imgId: 'lotus-wine', 
    name: 'LOTUS MINAKARI WINE DROP EARRINGS', 
    oldPrice: '₹349.00', 
    price: '₹210.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
  { 
    id: 'p6', 
    imgId: 'kundan-green', 
    name: 'GREEN CRYSTAL KUNDAN DROPS EARRING', 
    oldPrice: '₹349.00', 
    price: '₹299.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
  { 
    id: 'p7', 
    imgId: 'rect-gold', 
    name: 'GOLD PLATED RECTANGULAR DROP EARRINGS WITH STONE', 
    oldPrice: '₹249.00', 
    price: '₹149.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
  { 
    id: 'p8', 
    imgId: 'rect-mirror', 
    name: 'RECTANGULAR DROP MIRROR ROSE GOLD PLATED EARRING WITH STONE', 
    oldPrice: '₹249.00', 
    price: '₹149.00', 
    tags: 'earrings · Silver Replica · studs' 
  },
];

export function JewelryCatalog() {
  const flipkartSearchUrl = "https://www.flipkart.com/search?q=mohak+the+vibe";
  const flipkartLogo = PlaceHolderImages.find(img => img.id === "flipkart-logo")?.imageUrl || "/images/flipkart-logo.png";

  return (
    <section id="catalog" className="py-16 sm:py-24 px-6 md:px-12 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-foreground">Earrings</h2>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 hidden md:block z-10">
          <Button variant="ghost" size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-foreground/10 bg-white/80 shadow-sm">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/40" />
          </Button>
        </div>
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 hidden md:block z-10">
          <Button variant="ghost" size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-foreground/10 bg-white/80 shadow-sm">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/40" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16">
          {products.map((product) => {
            const img = PlaceHolderImages.find(i => i.id === product.imgId)?.imageUrl;
            return (
              <div key={product.id} className="flex flex-col group">
                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden bg-brand-ivory border border-foreground/[0.03]">
                  {img && (
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* SALE Badge */}
                  <div className="absolute top-0 right-0 p-3">
                    <span className="text-[9px] sm:text-[10px] tracking-widest text-foreground/40 uppercase font-medium">SALE</span>
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3 flex-grow">
                  <div className="flex justify-between items-start gap-3 sm:gap-4">
                    <h3 className="text-[10px] sm:text-[11px] font-bold tracking-widest leading-tight text-foreground uppercase max-w-[70%]">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-end whitespace-nowrap">
                      <span className="text-[9px] sm:text-[10px] text-foreground/30 line-through">{product.oldPrice}</span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-foreground">{product.price}</span>
                    </div>
                  </div>
                  <p className="text-[9px] sm:text-[10px] italic text-foreground/40 font-light">
                    {product.tags}
                  </p>
                </div>

                {/* Buy on Flipkart Button */}
                <div className="mt-4">
                  <a 
                    href={flipkartSearchUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button 
                      className="w-full bg-[#2874f0] hover:bg-[#1b5ec0] text-white rounded-none h-10 sm:h-11 text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase transition-all flex items-center justify-center gap-3 border-none"
                    >
                      <Image 
                        src={flipkartLogo}
                        alt="Flipkart"
                        width={20}
                        height={20}
                        className="object-contain h-5 w-auto"
                      />
                      Buy on Flipkart
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel pagination dots */}
        <div className="flex justify-center gap-3 mt-12 sm:mt-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-foreground/20 ${i === 3 ? 'bg-foreground/20' : 'transparent'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
