"use client";

import * as React from "react";
import type { Product } from "@/lib/products";
import { typeLabel } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductCard, productGridClass } from "./ProductCard";

const PAGE_SIZE = 24;

// Category page product list: type filter chips (when products have 2+ types) and "Load more".
// Works over the build-time list, so it needs no server.
export function CategoryProducts({ products }: { products: Product[] }) {
  const [type, setType] = React.useState<string | null>(null);
  const [shown, setShown] = React.useState(PAGE_SIZE);

  // Types in order of popularity, with counts
  const types = React.useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => p.type && counts.set(p.type, (counts.get(p.type) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [products]);

  const filtered = type ? products.filter((p) => p.type === type) : products;
  const visible = filtered.slice(0, shown);

  const choose = (next: string | null) => {
    setType(next);
    setShown(PAGE_SIZE);
  };

  const chip = (active: boolean) =>
    cn(
      "px-4 py-2 border text-eyebrow uppercase transition-colors",
      active
        ? "border-brand-gold bg-brand-gold text-brand-midnight"
        : "border-brand-gold/30 text-foreground/70 hover:border-brand-gold hover:text-brand-gold"
    );

  return (
    <div>
      {types.length >= 2 && (
        <div role="group" aria-label="Filter by type" className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
          <button type="button" aria-pressed={type === null} onClick={() => choose(null)} className={chip(type === null)}>
            All <span className="opacity-60">({products.length})</span>
          </button>
          {types.map(([slug, count]) => (
            <button key={slug} type="button" aria-pressed={type === slug} onClick={() => choose(slug)} className={chip(type === slug)}>
              {typeLabel(slug)} <span className="opacity-60">({count})</span>
            </button>
          ))}
        </div>
      )}

      <div className={cn("grid mx-auto gap-x-4 md:gap-x-8 gap-y-14", productGridClass(visible.length))}>
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length > shown && (
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="px-8 py-3 border border-brand-gold/40 text-eyebrow uppercase hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            Load more ({filtered.length - shown} left)
          </button>
        </div>
      )}
    </div>
  );
}
