"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PAGE_LINKS } from "@/lib/site";
import { FadeIn } from "./FadeIn";

export function Hero() {
  const heroImg = PlaceHolderImages.find((img) => img.id === "hero-main-bg")?.imageUrl ?? "/images/hero.webp";

  // Subtle parallax: the photo drifts down slightly slower than the page scrolls
  const sectionRef = React.useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-brand-midnight">
      {/* Mobile: photo fills the top ~3/4 so the earring stays clear of the text below */}
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 top-0 h-[78%] md:h-[115%]">
        <Image
          src={heroImg}
          alt="Model wearing Mohak kundan chandelier earrings"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_35%]"
        />
      </motion.div>

      {/* Overlays: photo fades into Midnight on mobile, left fade on desktop, light top fade for the navbar */}
      <div className="absolute inset-x-0 top-[40%] h-[38.5%] bg-gradient-to-b from-transparent to-brand-midnight md:hidden" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />

      <div className="relative h-full max-w-site mx-auto px-6 md:px-12 flex flex-col justify-end md:justify-center pb-20 md:pb-0 text-white">
        <div className="max-w-xl">
          <FadeIn>
            <p className="text-eyebrow uppercase text-brand-beige mb-6">Handpicked Indian jewellery</p>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="font-headline text-display-xl">
              Wear the <em className="text-brand-beige">vibe.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-8 max-w-md text-sm md:text-base font-light text-white/80 leading-relaxed">
              Jewellery that carries the craft of India, made for the way you live now.
            </p>
          </FadeIn>
          <FadeIn delay={450} className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href={PAGE_LINKS.collections}
              className="bg-brand-copper hover:bg-brand-copper/90 text-white text-eyebrow uppercase px-8 py-4 transition-colors"
            >
              Explore the Collection
            </Link>
            <Link
              href={PAGE_LINKS.story}
              className="text-eyebrow uppercase border-b border-white/40 pb-1 hover:border-white transition-colors"
            >
              Our Story
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
