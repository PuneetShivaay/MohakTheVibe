import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SHOP_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

// Links to the three category pages. Default is the quiet one-line "See all: Earrings · Pendants · Bracelets";
// `prominent` is three outlined buttons under a "See all" label, for places where it is the main next step
// (the home page, below Signature Pieces).
export function SeeAllCategories({ className, prominent = false }: { className?: string; prominent?: boolean }) {
  if (prominent) {
    return (
      <div className={cn("flex flex-col items-center gap-5", className)}>
        <p className="text-eyebrow uppercase text-brand-gold">See all</p>
        <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
          {SHOP_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group inline-flex items-center gap-3 border border-foreground/30 px-6 md:px-8 py-4 text-eyebrow uppercase hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                {link.label}
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.25}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <p className={cn("text-eyebrow uppercase text-foreground/60", className)}>
      See all:{" "}
      {SHOP_LINKS.map((link, i) => (
        <React.Fragment key={link.href}>
          {i > 0 && " · "}
          <Link href={link.href} className="text-foreground hover:text-brand-gold transition-colors">
            {link.label}
          </Link>
        </React.Fragment>
      ))}
    </p>
  );
}
