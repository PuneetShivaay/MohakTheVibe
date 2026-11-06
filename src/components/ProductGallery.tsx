"use client";

import * as React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

// Product page photos: a swipeable strip (native scroll-snap) with a thumbnail row underneath.
// With a mouse, hovering a photo zooms in around the cursor.
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const show = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: i * track.clientWidth, behavior: smooth ? "smooth" : "auto" });
  };

  // Zoom follows the cursor: position stored as CSS variables on the slide
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--zoom-x", `${((e.clientX - box.left) / box.width) * 100}%`);
    e.currentTarget.style.setProperty("--zoom-y", `${((e.clientY - box.top) / box.height) * 100}%`);
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        role="region"
        aria-label={`${alt} photos${images.length > 1 ? ", swipe or use arrow keys for more" : ""}`}
        className="flex aspect-[4/5] overflow-x-auto snap-x snap-mandatory scrollbar-none bg-muted border border-brand-gold/15 focus-visible:outline focus-visible:outline-brand-gold"
      >
        {images.map((src, i) => (
          <div
            key={`${i}-${src}`}
            onMouseMove={onMouseMove}
            className="group/zoom relative h-full w-full shrink-0 snap-center overflow-hidden can-hover:cursor-zoom-in"
          >
            <Image
              src={cloudinaryUrl(src, 1400)}
              alt={i === 0 ? alt : `${alt}, photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover origin-[var(--zoom-x,50%)_var(--zoom-y,50%)] transition-transform duration-300 ease-out can-hover:group-hover/zoom:scale-[2]"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-2 md:gap-3">
          {images.map((src, i) => (
            <li key={`${i}-${src}`}>
              <button
                type="button"
                onClick={() => show(i)}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                className={cn(
                  "relative block w-full aspect-square overflow-hidden bg-muted border transition-colors",
                  i === active ? "border-brand-gold" : "border-brand-gold/15 hover:border-brand-gold/60"
                )}
              >
                <Image src={cloudinaryUrl(src, 200)} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
