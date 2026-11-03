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

// Editorial tile: cover photo with caption overlay, links to the collection page.
// `count` is the number of products in the collection and `cover` the ready-to-render photo URL
// (both derived from getProducts()). `wide` is the full-row variant.
export function CollectionTile({
  collection,
  count,
  cover,
  tall = false,
  wide = false,
}: {
  collection: Collection;
  count: number;
  cover?: string;
  tall?: boolean;
  wide?: boolean;
}) {
  const img = cover;

  return (
    <Link href={`/collections/${collection.slug}`} className="group relative block h-full overflow-hidden bg-muted">
      <div
        className={cn(
          "relative w-full",
          tall ? "aspect-[3/4] md:aspect-auto md:h-full md:min-h-[640px]" : wide ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
        )}
      >
        {img && (
          <Image
            src={img}
            alt={`${collection.name} collection`}
            fill
            sizes={wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform [transition-duration:1200ms] ease-out-soft group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 text-white">
        <p className="text-eyebrow uppercase text-brand-beige mb-3">{collection.tagline}</p>
        <h3 className="font-headline text-display-sm flex items-center gap-4">
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
  const [first, ...rest] = collections;

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

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {first && (
            <Reveal className="md:row-span-2">
              <CollectionTile collection={first} count={countOf(first.slug)} cover={collectionCover(first, products)} tall />
            </Reveal>
          )}
          {rest.map((collection, i) => {
            const wide = spansFullRow(i, rest.length);
            return (
              <Reveal key={collection.slug} delay={(i + 1) * 120} className={wide ? "md:col-span-2" : undefined}>
                <CollectionTile
                  collection={collection}
                  count={countOf(collection.slug)}
                  cover={collectionCover(collection, products)}
                  wide={wide}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
