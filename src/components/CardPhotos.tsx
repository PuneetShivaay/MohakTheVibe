"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1024px) 25vw, 50vw";

// Product card photos. With a mouse, the second photo fades in on hover; on touch screens the two
// photos sit side by side in a swipeable strip with dots. Must sit inside an element with `group`.
export function CardPhotos({ main, second, alt }: { main: string; second?: string; alt: string }) {
  const [active, setActive] = React.useState(0);

  if (!second) {
    return (
      <Image
        src={main}
        alt={alt}
        fill
        sizes={SIZES}
        className="object-cover transition-transform duration-700 ease-out-soft can-hover:group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <>
      <div
        onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-none can-hover:overflow-hidden"
      >
        <div className="relative h-full w-full shrink-0 snap-center">
          <Image
            src={main}
            alt={alt}
            fill
            sizes={SIZES}
            className="object-cover transition-opacity duration-700 ease-out-soft can-hover:group-hover:opacity-0"
          />
        </div>
        <div className="relative h-full w-full shrink-0 snap-center can-hover:absolute can-hover:inset-0 can-hover:opacity-0 can-hover:group-hover:opacity-100 transition-opacity duration-700 ease-out-soft">
          <Image src={second} alt="" fill sizes={SIZES} className="object-cover" />
        </div>
      </div>
      <span aria-hidden className="can-hover:hidden pointer-events-none absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={cn("h-1.5 w-1.5 rounded-full shadow transition-colors", i === active ? "bg-white" : "bg-white/50")}
          />
        ))}
      </span>
    </>
  );
}
