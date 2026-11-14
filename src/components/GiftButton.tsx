"use client";

import Link from "next/link";
import { Gift } from "lucide-react";
import { useGiftBox } from "@/hooks/use-gift-box";
import { GIFTING_LINK } from "@/lib/site";
import { cn } from "@/lib/utils";

// Product page: "Send as a gift" adds the piece to the gift box. Once it is in the box the button becomes a
// link to /gifting, where quantities are changed, so a second tap never silently adds another.
export function GiftButton({ id, name, className }: { id: string; name: string; className?: string }) {
  const { qtyOf, add } = useGiftBox();
  const qty = qtyOf(id);
  const classes = cn("inline-flex items-center justify-center gap-3 transition-colors", className);

  if (qty > 0) {
    return (
      <Link href={GIFTING_LINK.href} className={classes}>
        <Gift aria-hidden className="h-4 w-4 text-brand-gold" strokeWidth={1.5} />
        <span>In your gift box{qty > 1 ? ` (${qty})` : ""}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => add(id)} aria-label={`Send ${name} as a gift`} className={classes}>
      <Gift aria-hidden className="h-4 w-4" strokeWidth={1.5} />
      <span>Send as a gift</span>
    </button>
  );
}
