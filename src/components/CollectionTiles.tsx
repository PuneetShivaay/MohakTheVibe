import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/catalog";
import { collections, getProductsByCollection, type Collection } from "@/lib/products";
import { cn } from "@/lib/utils";
import { collectionCover } from "./ProductCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// A lone last tile spans both columns so an odd number of collections never leaves a gap
export const spansFullRow = (index: number, total: number) => total > 1 && total % 2 === 1 && index === total - 1;

// Editorial tile: cover photo with caption overlay. Links to the collection page by default, or to
// `href` (used for category tiles). `count` is the number of products and `cover` the ready-to-render
// photo URL (both derived from getProducts()). `wide` is the full-row variant; `compact` is the small
// portrait tile used in the four-across home grid.
export function CollectionTile({
  collection,
  count,
  cover,
  href,
  wide = false,
  compact = false,
}: {
  collection: Pick<Collection, "slug" | "name" | "tagline">;
  count: number;
  cover?: string;
  href?: string;
  wide?: boolean;
  compact?: boolean;
}) {
  const img = cover;

  return (
    <Link href={href ?? `/collections/${collection.slug}`} className="group relative block h-full overflow-hidden bg-muted">
      <div
        className={cn(
          "relative w-full",
          compact ? "aspect-[3/4]" : wide ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
        )}
      >
        {img && (
          <Image
            src={img}
            alt={`${collection.name} ${href ? "category" : "collection"}`}
            fill
            sizes={compact ? "(min-width: 1024px) 25vw, 50vw" : wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform [transition-duration:1200ms] ease-out-soft group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      </div>
      <div className={cn("absolute bottom-0 inset-x-0 text-white", compact ? "p-4 md:p-6" : "p-6 md:p-10")}>
        <p className={cn("text-eyebrow uppercase text-brand-beige", compact ? "mb-2 hidden sm:block" : "mb-3")}>
          {collection.tagline}
        </p>
        <h3 className={cn("font-headline flex items-center gap-4", compact ? "text-xl md:text-2xl" : "text-display-sm")}>
          {collection.name}
          <ArrowRight
            aria-hidden
            className="w-5 h-5 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
            strokeWidth={1}
          />
        </h3>
        <p className="mt-2 text-eyebrow uppercase text-white/70">
          {count} {count === 1 ? "piece" : "pieces"}
        </p>
      </div>
    </Link>
  );
}

export async function CollectionTiles() {
  const products = await getProducts();
  const countOf = (slug: string) => getProductsByCollection(products, slug).length;

  return (
    <section id="collections" className="py-section px-6 md:px-12">
      <div className="max-w-site mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <SectionHeading
            align="left"
            eyebrow="Collections"
            title={
              <>
                Crafted <em>stories</em>
              </>
            }
          />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {collections.map((collection, i) => (
            <Reveal key={collection.slug} delay={(i % 4) * 100}>
              <CollectionTile
                collection={collection}
                count={countOf(collection.slug)}
                cover={collectionCover(collection, products, 800)}
                compact
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
