"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { WishlistButton } from "./WishlistButton";

// Phones only: price and the main buy button pinned to the bottom of the product page whenever the
// page's own buy buttons (element `targetId`) are out of view. While mounted it marks <html> with
// `data-buy-bar`, which pads the page bottom and hides the floating WhatsApp button (globals.css).
export function MobileBuyBar({
  targetId,
  id,
  name,
  price,
  action,
}: {
  targetId: string;
  id: string;
  name: string;
  price: string;
  action: { label: string; href: string };
}) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.buyBar = "";
    const target = document.getElementById(targetId);
    const observer = target
      ? new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
      : undefined;
    if (target) observer?.observe(target);
    return () => {
      observer?.disconnect();
      delete root.dataset.buyBar;
    };
  }, [targetId]);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-t border-brand-gold/20",
        "px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out-soft",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-headline text-sm truncate">{name}</p>
          <p className="text-sm text-foreground/70">{price}</p>
        </div>
        <WishlistButton id={id} name={name} className="h-11 w-11 shrink-0 border border-brand-gold/40 text-foreground/70" />
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-brand-copper hover:bg-brand-copper/90 text-white text-eyebrow uppercase px-5 h-11 inline-flex items-center"
        >
          {action.label}
        </a>
      </div>
    </div>
  );
}
