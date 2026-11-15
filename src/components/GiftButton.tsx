"use client";

import Link from "next/link";
import { Gift } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useGiftBox } from "@/hooks/use-gift-box";
import { toast } from "@/hooks/use-toast";
import { GIFT_BOX_LINK } from "@/lib/site";
import { cn } from "@/lib/utils";

// Product page: "Send as a gift" adds the piece to the gift box and shows a toast linking to the box page, so
// the buyer keeps browsing. Once it is in the box the button becomes a link to /gifting/box, where quantities
// are changed, so a second tap never silently adds another.
export function GiftButton({ id, name, className }: { id: string; name: string; className?: string }) {
  const { qtyOf, add } = useGiftBox();
  const qty = qtyOf(id);
  const classes = cn("inline-flex items-center justify-center gap-3 transition-colors", className);

  if (qty > 0) {
    return (
      <Link href={GIFT_BOX_LINK.href} className={classes}>
        <Gift aria-hidden className="h-4 w-4 text-brand-gold" strokeWidth={1.5} />
        <span>In your gift box{qty > 1 ? ` (${qty})` : ""}</span>
      </Link>
    );
  }

  const handleAdd = () => {
    add(id);
    toast({
      title: "Added to your gift box",
      description: name,
      action: (
        <ToastAction altText="View your gift box" asChild>
          <Link href={GIFT_BOX_LINK.href}>View gift box</Link>
        </ToastAction>
      ),
    });
  };

  return (
    <button type="button" onClick={handleAdd} aria-label={`Send ${name} as a gift`} className={classes}>
      <Gift aria-hidden className="h-4 w-4" strokeWidth={1.5} />
      <span>Send as a gift</span>
    </button>
  );
}
