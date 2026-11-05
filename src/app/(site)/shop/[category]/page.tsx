import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cloudinaryUrl, getProducts } from "@/lib/catalog";
import { categories, getCategory, getProductsByCategory } from "@/lib/products";
import { breadcrumbJsonLd, categoryJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { CategoryProducts } from "@/components/CategoryProducts";
import { CollectionTile, spansFullRow } from "@/components/CollectionTiles";
import { FadeIn } from "@/components/FadeIn";
import { JsonLd } from "@/components/JsonLd";
import { LayeredImages } from "@/components/LayeredImages";
import { ShopFullRange } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";

type Params = { params: Promise<{ category: string }> };

// Static export: one HTML page per category, unknown slugs 404
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  const items = getProductsByCategory(await getProducts(), category.slug);
  const title = category.seoTitle;
  const description = category.seoDescription;
  const cover = items[0] ? cloudinaryUrl(items[0].image, 1200) : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/shop/${category.slug}` },
    openGraph: { title, description, images: cover ? [cover] : undefined },
    twitter: { title, description, images: cover ? [cover] : undefined },
    // A category with no products yet should not appear in search results
    robots: items.length === 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function CategoryPage({ params }: Params) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const products = await getProducts();
  const items = getProductsByCategory(products, category.slug);
  // Other categories that have pieces, so the "keep exploring" row never links to an empty page
  const others = categories
    .filter((c) => c.slug !== category.slug)
    .map((c) => ({ category: c, items: getProductsByCategory(products, c.slug) }))
    .filter((o) => o.items.length > 0);
  const cover = items[0] ? cloudinaryUrl(items[0].image, 1200) : undefined;
  const detailProduct = items.find((p) => p.image !== items[0]?.image);
  const detail = detailProduct ? cloudinaryUrl(detailProduct.image, 600) : undefined;

  return (
    <>
      {items.length > 0 && <JsonLd data={categoryJsonLd(category, items)} />}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: category.name, path: `/shop/${category.slug}` },
        ])}
      />
      {/* Intro: text beside the cover photo (or text only while the category is empty) */}
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className={cn("max-w-site mx-auto grid gap-10 md:gap-20 items-center", cover && "md:grid-cols-2")}>
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-8 text-eyebrow uppercase text-foreground/60">
              <Link href="/" className="hover:text-brand-gold transition-colors">
                Shop
              </Link>
              <span className="mx-3 text-brand-gold">/</span>
              <span aria-current="page">{category.name}</span>
            </nav>
            <Eyebrow className="mb-4">{category.tagline}</Eyebrow>
            <h1 className="font-headline text-display-xl">{category.name}</h1>
            <p className="mt-8 max-w-md text-foreground/70 font-light leading-relaxed">{category.description}</p>
            <p className="mt-6 text-eyebrow uppercase text-foreground/60">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </p>
          </FadeIn>
          {cover && (
            <FadeIn delay={150} className="lg:mr-8 lg:mb-8">
              <LayeredImages
                main={cover}
                mainAlt={`${category.name} by Mohak`}
                detail={detail}
                detailAlt={detailProduct?.name}
                priority
              />
            </FadeIn>
          )}
        </div>
      </section>

      {/* Pieces */}
      <section className="py-section px-6 md:px-12 bg-card">
        <div className="max-w-site mx-auto">
          {items.length > 0 ? (
            <>
              <Reveal className="mb-14 md:mb-16">
                <SectionHeading eyebrow={category.name} title={<>The <em>pieces</em></>} />
              </Reveal>
              <CategoryProducts products={items} />
            </>
          ) : (
            <Reveal className="text-center">
              <SectionHeading
                eyebrow="Coming soon"
                title={
                  <>
                    New <em>{category.name.toLowerCase()}</em> are on their way
                  </>
                }
                description="We are adding this range. Meanwhile, see everything we have on Flipkart and Meesho."
              />
            </Reveal>
          )}
          <Reveal className="mt-16 md:mt-20 text-center">
            <ShopFullRange />
          </Reveal>
          {items.length > 0 && (
            <Reveal className="mt-20 md:mt-24 mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-display-sm">
                About our <em>{category.name.toLowerCase()}</em>
              </h2>
              <div className="mt-6 space-y-4 text-foreground/70 font-light leading-relaxed">
                {category.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Other categories */}
      {others.length > 0 && (
        <section className="py-section px-6 md:px-12">
          <div className="max-w-site mx-auto">
            <Reveal className="mb-12">
              <SectionHeading align="left" eyebrow="Keep exploring" title={<>More <em>to shop</em></>} />
            </Reveal>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {others.map((o, i) => {
                const wide = spansFullRow(i, others.length);
                return (
                  <Reveal key={o.category.slug} delay={i * 120} className={wide ? "md:col-span-2" : undefined}>
                    <CollectionTile
                      collection={o.category}
                      href={`/shop/${o.category.slug}`}
                      count={o.items.length}
                      cover={cloudinaryUrl(o.items[0].image, 1200)}
                      wide={wide}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
