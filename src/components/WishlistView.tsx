"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { productPath, type Product } from "@/lib/products";
import { SHOP_LINKS, SITE_LINKS, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ProductCard, productGridClass } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

// Ready-made WhatsApp message: one numbered line per piece with its price and product page link
function wishlistMessage(items: Product[]) {
  const lines = items.map((p, i) => `${i + 1}. ${p.name} – ${p.price}\n${SITE_URL}${productPath(p.id)}`);
  return `Hi Mohak, I'd like to order these pieces from my wishlist:\n\n${lines.join("\n\n")}`;
}

// Saved pieces in the order they were added. Ids no longer in the catalog are skipped (not deleted,
// so a build that fell back to the default products can't wipe anyone's list).
export function WishlistView({ products }: { products: Product[] }) {
  const { ids } = useWishlist();
  // The saved list is only known in the browser; render nothing until then to avoid an "empty" flash
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);

  const items = ids.flatMap((id) => products.find((p) => p.id === id) ?? []);

  if (!ready) return <div className="min-h-[40vh]" />;

  if (items.length === 0) {
    return (
      <div className="text-center">
        <SectionHeading
          as="h1"
          eyebrow="Wishlist"
          title={
            <>
              Nothing <em>saved</em> yet
            </>
          }
          description="Tap the heart on any piece to keep it here, then send your list to us on WhatsApp when you're ready."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {SHOP_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Shop {link.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-14 md:mb-16 text-center">
        <SectionHeading
          as="h1"
          eyebrow="Wishlist"
          title={
            <>
              Your <em>saved</em> pieces
            </>
          }
          description={`${items.length} ${items.length === 1 ? "piece" : "pieces"}. Send the list to us on WhatsApp and we'll help you order, or buy each one on Flipkart or Meesho.`}
        />
        <a
          href={`${SITE_LINKS.whatsappChat}?text=${encodeURIComponent(wishlistMessage(items))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 bg-brand-copper hover:bg-brand-copper/90 text-white text-eyebrow uppercase px-8 py-4 transition-colors"
        >
          <MessageCircle aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          Send my wishlist on WhatsApp
        </a>
      </div>

      <div className={cn("grid mx-auto gap-x-4 md:gap-x-8 gap-y-14", productGridClass(items.length))}>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className="mt-14 text-center text-sm text-foreground/60 font-light">
        Your wishlist is saved in this browser only. Tap a heart to remove a piece.
      </p>
    </>
  );
}
