"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/SectionHeading";

const navLinks = ["Collections", "Signature", "Our Story", "Journal"];

const promises = ["Handpicked", "Anti-tarnish", "Gift-ready", "Pan-India delivery"];

const collections = [
  { name: "Minakari", line: "Enamel colour, hand-painted", img: "/images/earring/earring11.png" },
  { name: "Kundan", line: "Crystal set, quietly royal", img: "/images/earring/earring6.png" },
  { name: "The Festive Edit", line: "For your brightest evenings", img: "/images/earring/earring15.jpeg" },
];

// Second image stands in for the on-model shot used on hover
const pieces = [
  { name: "Minakari Half Jhumka", colour: "Emerald", price: "₹199", img: "/images/earring/earring11.png", alt: "/images/earring/earring21.png" },
  { name: "Lotus Minakari Drop", colour: "Firozi", price: "₹210", img: "/images/earring/earring3.png", alt: "/images/earring/earring4.png" },
  { name: "Crystal Kundan Drop", colour: "Green", price: "₹299", img: "/images/earring/earring6.png", alt: "/images/earring/earring19.png" },
  { name: "Rectangular Mirror Drop", colour: "Rose Gold", price: "₹149", img: "/images/earring/earring8.png", alt: "/images/earring/earring18.png" },
];

const ugc = [
  "/images/earring/earring12.jpeg",
  "/images/earring/earring17.png",
  "/images/earring/earring14.png",
  "/images/earring/earring16.png",
  "/images/earring/earring13.jpeg",
  "/images/earring/earring10.jpeg",
];

const marketplaces = ["Flipkart", "Meesho", "Amazon"];

function Lotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="0.75" className={className} aria-hidden>
      <path d="M24 22C24 14 20 6 24 2C28 6 24 14 24 22Z" />
      <path d="M24 22C20 16 12 12 8 12C10 18 18 22 24 22Z" />
      <path d="M24 22C28 16 36 12 40 12C38 18 30 22 24 22Z" />
      <path d="M2 22H46" />
    </svg>
  );
}

export function PreviewHome() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-brand-ivory dark:bg-background text-foreground">
      {/* Preview badge */}
      <div className="fixed bottom-4 left-4 z-[200] bg-brand-midnight text-brand-ivory text-[10px] uppercase tracking-[0.3em] px-3 py-2">
        Design preview
      </div>

      {/* Navbar */}
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-[100] transition-all duration-500",
          isScrolled
            ? "bg-brand-ivory/90 dark:bg-background/90 backdrop-blur-md border-b border-brand-gold/20 text-foreground py-4"
            : "bg-transparent text-white py-7"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-3 items-center">
          <div className="hidden md:flex gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <a key={link} href="#" className="text-[10px] uppercase tracking-[0.3em] hover:text-brand-gold transition-colors">
                {link}
              </a>
            ))}
          </div>
          <a href="#" aria-label="Mohak – The Vibe" className="col-start-2 justify-self-center">
            <BrandLogo compact />
          </a>
          <div className="hidden md:flex gap-8 justify-self-end items-center">
            {navLinks.slice(2).map((link) => (
              <a key={link} href="#" className="text-[10px] uppercase tracking-[0.3em] hover:text-brand-gold transition-colors">
                {link}
              </a>
            ))}
            <Instagram className="w-4 h-4" strokeWidth={1.25} />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <Image src="/images/header.png" alt="Model wearing Mohak earrings" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-20 md:pb-28 text-white">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-beige mb-6">The Festive Edit · 2026</p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-headline text-6xl sm:text-8xl lg:text-[9rem] leading-[0.9] tracking-tight">
              Wear the <span className="italic text-brand-beige">vibe.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 max-w-md text-sm md:text-base font-light text-white/80 leading-relaxed">
              Handpicked jewellery that carries the craft of India, made for the way you live now.
            </p>
          </Reveal>
          <Reveal delay={450} className="mt-10 flex flex-wrap items-center gap-8">
            <a href="#collections" className="bg-brand-copper hover:bg-brand-copper/90 text-white text-[10px] uppercase tracking-[0.3em] px-8 py-4 transition-colors">
              Explore the Collection
            </a>
            <a href="#story" className="text-[10px] uppercase tracking-[0.3em] border-b border-white/40 pb-1 hover:border-white transition-colors">
              Our Story
            </a>
          </Reveal>
        </div>
      </section>

      {/* Promise strip */}
      <section className="border-y border-brand-gold/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {promises.map((p) => (
            <div key={p} className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/70">
              <span className="w-1 h-1 rotate-45 bg-brand-gold" />
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="py-28 md:py-40 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <Lotus className="w-12 mx-auto mb-10 text-brand-gold" />
          <p className="font-headline text-3xl md:text-5xl leading-[1.25] text-foreground">
            Jewellery is a feeling before it is an ornament. We choose each piece for the way it{" "}
            <span className="italic text-brand-gold">moves, catches light</span> and makes you feel.
          </p>
        </Reveal>
      </section>

      {/* Collections */}
      <section id="collections" className="px-6 md:px-12 pb-28 md:pb-40">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <Eyebrow className="mb-4">Collections</Eyebrow>
              <h2 className="font-headline text-4xl md:text-6xl tracking-tight">Crafted stories</h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] hover:text-brand-gold transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </a>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {collections.map((c, i) => (
              <Reveal key={c.name} delay={i * 120} className={cn(i === 0 && "md:row-span-2")}>
                <a href="#" className="group relative block overflow-hidden h-full">
                  <div className={cn("relative w-full", i === 0 ? "aspect-[3/4] md:aspect-auto md:h-full md:min-h-[720px]" : "aspect-[4/3]")}>
                    <Image src={c.img} alt={c.name} fill className="object-cover transition-transform [transition-duration:1200ms] ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 text-white">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-beige mb-2">{c.line}</p>
                    <h3 className="font-headline text-3xl md:text-4xl flex items-center gap-4">
                      {c.name}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" strokeWidth={1} />
                    </h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature pieces */}
      <section className="px-6 md:px-12 py-28 md:py-40 bg-white/60 dark:bg-card">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-16 md:mb-20">
            <Eyebrow className="mb-4">Signature Pieces</Eyebrow>
            <h2 className="font-headline text-4xl md:text-6xl tracking-tight">
              The ones she <span className="italic">keeps</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-14">
            {pieces.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory dark:bg-background border border-brand-gold/15">
                    <Image src={p.img} alt={p.name} fill className="object-cover transition-opacity duration-700 group-hover:opacity-0" />
                    <Image src={p.alt} alt="" fill className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>
                  <div className="pt-5 text-center">
                    <h3 className="font-headline text-lg md:text-xl">{p.name}</h3>
                    <p className="mt-1 text-[11px] text-foreground/50 tracking-wide">
                      {p.colour} · {p.price}
                    </p>
                    <div className="mt-4 flex justify-center gap-4 text-[9px] uppercase tracking-[0.25em] text-foreground/60">
                      {marketplaces.map((m) => (
                        <a key={m} href="#" className="hover:text-brand-gold border-b border-transparent hover:border-brand-gold transition-colors pb-0.5">
                          {m}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="px-6 md:px-12 py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/images/earring/earring10.jpeg" alt="Mohak craft detail" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow className="mb-6">Our Story</Eyebrow>
            <blockquote className="font-headline italic text-3xl md:text-5xl leading-[1.2] mb-8">
              “Be the real you, and let the jewellery follow.”
            </blockquote>
            <p className="text-foreground/70 font-light leading-relaxed max-w-md mb-10">
              Mohak began with a simple belief: beautiful, well-made jewellery should not wait for a special occasion. Every design is
              chosen by hand, finished to resist tarnish, and packed to be gifted.
            </p>
            <a href="#" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
              Read our story <ArrowRight className="w-3 h-3" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Worn by you */}
      <section className="pb-28 md:pb-40">
        <Reveal className="text-center mb-12 px-6">
          <Eyebrow className="mb-4">@mohakthevibe</Eyebrow>
          <h2 className="font-headline text-4xl md:text-6xl tracking-tight">
            Worn by <span className="italic">you</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {ugc.map((src, i) => (
            <a key={src} href="https://www.instagram.com/mohakthevibe/" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden">
              <Image src={src} alt={`Instagram post ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.25} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Gift moment */}
      <section className="bg-brand-midnight text-brand-ivory px-6 md:px-12 py-28 md:py-36">
        <Reveal className="max-w-3xl mx-auto text-center">
          <BrandLogo className="mb-10 scale-125" />
          <h2 className="font-headline text-4xl md:text-6xl tracking-tight mb-6">
            Every piece arrives <span className="italic text-brand-gold">gift-ready.</span>
          </h2>
          <p className="text-brand-ivory/60 font-light max-w-lg mx-auto mb-10">
            Wrapped in our signature box, so it is as lovely to receive as it is to wear.
          </p>
          <a href="https://wa.me/916388498674" target="_blank" rel="noopener noreferrer" className="inline-block border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-brand-midnight text-[10px] uppercase tracking-[0.3em] px-8 py-4 transition-colors">
            Ask us on WhatsApp
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 pt-24 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-brand-gold/20">
            <div className="md:col-span-2">
              <BrandLogo className="items-start mb-8" />
              <p className="font-headline text-2xl mb-4">Stay in the vibe</p>
              <p className="text-sm text-foreground/60 font-light max-w-sm">New collections and festive edits, first on WhatsApp and Instagram.</p>
            </div>
            <div className="space-y-3 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
              <p className="text-brand-gold">Explore</p>
              {navLinks.map((l) => (
                <p key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></p>
              ))}
            </div>
            <div className="space-y-3 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
              <p className="text-brand-gold">Also available on</p>
              {marketplaces.map((m) => (
                <p key={m}><a href="#" className="hover:text-foreground transition-colors">{m}</a></p>
              ))}
            </div>
          </div>
          <p className="font-headline text-[22vw] md:text-[16vw] leading-none tracking-[0.08em] text-center text-foreground/[0.06] select-none pt-10">
            MOHAK
          </p>
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-foreground/40 mt-4">© 2026 Mohak – The Vibe</p>
        </div>
      </footer>
    </main>
  );
}
