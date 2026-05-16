
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: 'p1', imgId: 'necklace-1', name: 'Celestial Gold Choker', price: '₹2,499', category: 'Necklace' },
  { id: 'p2', imgId: 'earrings-1', name: 'Vintage Pearl Drops', price: '₹1,299', category: 'Earrings' },
  { id: 'p3', imgId: 'bracelet-1', name: 'Infinity Cuff', price: '₹1,899', category: 'Bracelet' },
  { id: 'p4', imgId: 'ring-1', name: 'Royal Solitaire', price: '₹999', category: 'Ring' },
  { id: 'p5', imgId: 'lifestyle-1', name: 'Daily Luxe Set', price: '₹3,299', category: 'Curation' },
];

export function JewelryCatalog() {
  return (
    <section id="catalog" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl md:text-5xl mb-4 text-foreground">The Collection</h2>
            <p className="text-muted-foreground font-light text-lg">
              A curated selection of our finest pieces, designed for the woman who speaks through her accessories.
            </p>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="border-brand-gold text-brand-gold px-4 py-1 text-sm rounded-none">All Pieces</Badge>
            <Badge variant="ghost" className="hover:text-brand-gold px-4 py-1 text-sm rounded-none">Necklaces</Badge>
            <Badge variant="ghost" className="hover:text-brand-gold px-4 py-1 text-sm rounded-none">Earrings</Badge>
          </div>
        </div>

        <div className="pinterest-grid">
          {products.map((product) => {
            const img = PlaceHolderImages.find(i => i.id === product.imgId);
            return (
              <div key={product.id} className="mb-8 break-inside-avoid group cursor-pointer relative">
                <div className="relative overflow-hidden bg-brand-ivory border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500">
                  <Image
                    src={img?.imageUrl || ""}
                    alt={product.name}
                    width={600}
                    height={800}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-midnight/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="flex flex-wrap gap-2 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Button size="sm" variant="secondary" className="bg-brand-gold hover:bg-brand-beige text-brand-midnight border-none">
                        <ShoppingBag className="w-4 h-4 mr-2" /> Flipkart
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-brand-midnight text-brand-ivory border border-brand-gold/30 hover:bg-brand-gold hover:text-brand-midnight">
                        <ShoppingBag className="w-4 h-4 mr-2" /> Meesho
                      </Button>
                      <Button size="sm" variant="outline" className="text-brand-ivory border-brand-ivory/40 hover:bg-brand-ivory/10">
                        <Instagram className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">{product.category}</span>
                    <h3 className="font-headline text-xl mt-1 text-foreground">{product.name}</h3>
                  </div>
                  <p className="font-medium text-brand-gold">{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="ghost" className="text-brand-gold font-medium hover:bg-brand-gold/5 group">
            View All Jewelry <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
