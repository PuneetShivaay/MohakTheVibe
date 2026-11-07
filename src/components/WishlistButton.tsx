"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

// Heart toggle. `withLabel` is the product page version (text beside the heart); the bare icon sits on cards.
export function WishlistButton({
  id,
  name,
  withLabel = false,
  className,
}: {
  id: string;
  name: string;
  withLabel?: boolean;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={saved}
      aria-label={withLabel ? undefined : saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      title={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={cn("inline-flex items-center justify-center gap-3 transition-colors", className)}
    >
      <Heart aria-hidden className={cn("h-4 w-4", saved && "fill-brand-copper text-brand-copper")} strokeWidth={1.5} />
      {withLabel && <span>{saved ? "Saved to wishlist" : "Save to wishlist"}</span>}
    </button>
  );
}
