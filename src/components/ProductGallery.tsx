"use client";

import * as React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

// Product page photos: one large image with a thumbnail strip underneath (hidden for a single photo)
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = React.useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted border border-brand-gold/15">
        {current && (
          <Image
            key={current}
            src={cloudinaryUrl(current, 1200)}
            alt={active === 0 ? alt : `${alt}, photo ${active + 1}`}
            fill
            priority={active === 0}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover motion-safe:animate-reveal"
          />
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-2 md:gap-3">
          {images.map((src, i) => (
            <li key={`${i}-${src}`}>
              <button
                type="button"
                onClick={() => setActive(i)}
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
