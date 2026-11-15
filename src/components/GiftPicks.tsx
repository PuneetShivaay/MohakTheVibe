"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useGiftBox } from "@/hooks/use-gift-box";
import { toast } from "@/hooks/use-toast";
import { cloudinaryUrl } from "@/lib/images";
import { productPath, type Product } from "@/lib/products";
import { GIFT_BOX_LINK } from "@/lib/site";
import { SeeAllCategories } from "./SeeAllCategories";

// A short list of pieces to add to the gift box from the /gifting info page. Adding shows the same toast as the
// product page "Send as a gift" button, with a link to the box.
export function GiftPicks({ picks }: { picks: Product[] }) {
  const box = useGiftBox();
  if (picks.length === 0) return null;

  const add = (p: Product) => {
    box.add(p.id);
    toast({
      title: "Added to your gift box",
      description: p.name,
      action: (
        <ToastAction altText="View your gift box" asChild>
          <Link href={GIFT_BOX_LINK.href}>View gift box</Link>
        </ToastAction>
      ),
    });
  };

  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
        {picks.map((p) => {
          const qty = box.qtyOf(p.id);
          return (
            <li key={p.id}>
              <Link href={productPath(p.id)} className="relative block aspect-[3/4] overflow-hidden bg-muted border border-border">
                <Image
                  src={cloudinaryUrl(p.image, 500)}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 50vw"
                  className="object-cover"
                />
              </Link>
              <p className="mt-3 text-sm leading-snug line-clamp-2">
                <Link href={productPath(p.id)} className="hover:text-brand-gold transition-colors">
                  {p.name}
                </Link>
              </p>
              <p className="mt-1 text-sm text-foreground/60">{p.price}</p>
              <button
                type="button"
                onClick={() => add(p)}
                className="tap-area mt-3 inline-flex items-center gap-2 text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                {qty > 0 ? (
                  <>
                    <Check aria-hidden className="h-3.5 w-3.5 text-brand-gold" strokeWidth={1.5} />
                    Added ({qty}), add one more
                  </>
                ) : (
                  <>
                    <Plus aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Add to gift box
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <SeeAllCategories className="mt-10 text-center" />
    </div>
  );
}
