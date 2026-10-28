import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, getCollection, getProductsByCollection } from "@/lib/products";
import { cn } from "@/lib/utils";
import { CollectionTile } from "@/components/CollectionTiles";
import { LayeredImages } from "@/components/LayeredImages";
import { imageUrl, ProductCard, ShopFullRange } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";

type Params = { params: Promise<{ slug: string }> };

// Static export: one HTML page per collection, unknown slugs 404
export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  const title = `${collection.name} Collection | Mohak – The Vibe`;
  const cover = imageUrl(collection.coverImageId);
  return {
    title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: { title, description: collection.description, images: cover ? [cover] : undefined },
    twitter: { title, description: collection.description, images: cover ? [cover] : undefined },
  };
}

// Keep small collections centred instead of leaving empty grid columns
const gridBySize: Record<number, string> = {
  1: "grid-cols-1 max-w-sm",
  2: "grid-cols-2 max-w-2xl",
  3: "grid-cols-2 lg:grid-cols-3 max-w-5xl",
};

export default async function CollectionPage({ params }: Params) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();

  const items = getProductsByCollection(collection.slug);
  const others = collections.filter((c) => c.slug !== collection.slug);
  const cover = imageUrl(collection.coverImageId);
  // Small print: another piece from the collection, so it never repeats the cover
  const detailProduct = items.find((p) => p.imgId !== collection.coverImageId);
  const detail = imageUrl(detailProduct?.imgId);

  return (
    <>
      {/* Intro: text beside the cover photo */}
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8 text-eyebrow uppercase text-foreground/60">
              <Link href="/#collections" className="hover:text-brand-gold transition-colors">
                Collections
              </Link>
              <span className="mx-3 text-brand-gold">/</span>
              <span aria-current="page">{collection.name}</span>
            </nav>
            <Eyebrow className="mb-4">{collection.tagline}</Eyebrow>
            <h1 className="font-headline text-display-xl">{collection.name}</h1>
            <p className="mt-8 max-w-md text-foreground/70 font-light leading-relaxed">{collection.description}</p>
            <p className="mt-6 text-eyebrow uppercase text-foreground/60">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </p>
          </Reveal>
          {cover && (
            <Reveal delay={150} className="lg:mr-8 lg:mb-8">
              <LayeredImages
                main={cover}
                mainAlt={`${collection.name} collection`}
                detail={detail}
                detailAlt={detailProduct?.name}
                priority
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* Pieces */}
      <section className="py-section px-6 md:px-12 bg-card">
        <div className="max-w-site mx-auto">
          <Reveal className="mb-14 md:mb-16">
            <SectionHeading eyebrow={collection.name} title={<>The <em>pieces</em></>} />
          </Reveal>
          <div className={cn("grid mx-auto gap-x-4 md:gap-x-8 gap-y-14", gridBySize[items.length] ?? "grid-cols-2 lg:grid-cols-4")}>
            {items.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 100}>
                <ProductCard product={product} showCollection={false} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 md:mt-20 text-center">
            <ShopFullRange />
          </Reveal>
        </div>
      </section>

      {/* Other collections */}
      {others.length > 0 && (
        <section className="py-section px-6 md:px-12">
          <div className="max-w-site mx-auto">
            <Reveal className="mb-12">
              <SectionHeading align="left" eyebrow="Keep exploring" title={<>More <em>collections</em></>} />
            </Reveal>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {others.map((c, i) => (
                <Reveal key={c.slug} delay={i * 120}>
                  <CollectionTile collection={c} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
