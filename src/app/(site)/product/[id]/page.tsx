import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cloudinaryUrl, getProducts } from "@/lib/catalog";
import {
  getCategory,
  getCollection,
  getProduct,
  getRelatedProducts,
  productImages,
  productPath,
} from "@/lib/products";
import { BRAND_NAME, breadcrumbJsonLd, productDescription, productJsonLd } from "@/lib/seo";
import { BRAND_PROMISES, SITE_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";
import { JsonLd } from "@/components/JsonLd";
import { MobileBuyBar } from "@/components/MobileBuyBar";
import { ProductCard, marketplaceLinks, productGridClass, quietLink } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WishlistButton } from "@/components/WishlistButton";

type Params = { params: Promise<{ id: string }> };

// Static export: one HTML page per active product in the sheet, unknown ids 404
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct(await getProducts(), (await params).id);
  if (!product) return {};
  const category = getCategory(product.category);
  const title = `${product.name} | ${BRAND_NAME}`;
  const description = productDescription(product, category?.name ?? "jewellery");
  const image = cloudinaryUrl(product.image, 1200);
  return {
    title,
    description,
    alternates: { canonical: productPath(product.id) },
    openGraph: { title, description, images: [image] },
    twitter: { title, description, images: [image] },
  };
}

export default async function ProductPage({ params }: Params) {
  const products = await getProducts();
  const product = getProduct(products, (await params).id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const collection = getCollection(product.collection);
  const related = getRelatedProducts(products, product);
  const links = marketplaceLinks(product);
  const hasListings = Object.values(product.links ?? {}).some(Boolean);
  const askText = encodeURIComponent(`Hi Mohak, I have a question about "${product.name}".`);

  return (
    <>
      <JsonLd data={productJsonLd(product, category?.name ?? "Jewellery")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          ...(category ? [{ name: category.name, path: `/shop/${category.slug}` }] : []),
          { name: product.name, path: productPath(product.id) },
        ])}
      />

      {/* Gallery beside the details; details stay in view while the photos scroll on desktop */}
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
          <FadeIn>
            <ProductGallery images={productImages(product)} alt={product.name} />
          </FadeIn>

          <FadeIn delay={150} className="md:sticky md:top-28">
            <nav aria-label="Breadcrumb" className="mb-8 text-eyebrow uppercase text-foreground/60">
              <Link href="/" className="hover:text-brand-gold transition-colors">
                Home
              </Link>
              {category && (
                <>
                  <span className="mx-3 text-brand-gold">/</span>
                  <Link href={`/shop/${category.slug}`} className="hover:text-brand-gold transition-colors">
                    {category.name}
                  </Link>
                </>
              )}
            </nav>

            {collection && (
              <Link
                href={`/collections/${collection.slug}`}
                className="inline-block mb-4 text-eyebrow uppercase text-brand-gold hover:text-foreground transition-colors"
              >
                {collection.name}
              </Link>
            )}
            <h1 className="font-headline text-display-sm md:text-display">{product.name}</h1>
            <p className="mt-4 font-headline text-2xl">{product.price}</p>

            {product.description && (
              <p className="mt-8 max-w-md text-foreground/70 font-light leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            )}

            {/* First listing is the main button, the rest are outlined. On phones MobileBuyBar takes over when
                these scroll out of view. */}
            <div id="buy-buttons" className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${hasListings ? "Buy on" : ""} ${link.label} (opens in a new tab)`.trim()}
                  className={cn(
                    "text-center text-eyebrow uppercase px-8 py-4 transition-colors",
                    i === 0
                      ? "bg-brand-copper hover:bg-brand-copper/90 text-white"
                      : "border border-brand-gold/50 hover:border-brand-gold hover:text-brand-gold"
                  )}
                >
                  {hasListings ? `Buy on ${link.label}` : link.label}
                </a>
              ))}
              <WishlistButton
                id={product.id}
                name={product.name}
                withLabel
                className="text-eyebrow uppercase px-8 py-4 border border-brand-gold/50 hover:border-brand-gold hover:text-brand-gold"
              />
            </div>
            {hasListings && (
              <p className="mt-6 text-sm text-foreground/60 font-light">
                Questions about this piece?{" "}
                <a
                  href={`${SITE_LINKS.whatsappChat}?text=${askText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-foreground ${quietLink}`}
                >
                  Ask us on WhatsApp
                </a>
              </p>
            )}

            <ul className="mt-10 pt-8 border-t border-brand-gold/20 grid grid-cols-2 gap-4">
              {BRAND_PROMISES.map((promise) => (
                <li key={promise} className="flex items-center gap-3 text-eyebrow uppercase text-foreground/70">
                  <span aria-hidden className="w-1 h-1 rotate-45 bg-brand-gold" />
                  {promise}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <MobileBuyBar
        targetId="buy-buttons"
        id={product.id}
        name={product.name}
        price={product.price}
        action={{ label: hasListings ? `Buy on ${links[0].label}` : links[0].label, href: links[0].href }}
      />

      {related.length > 0 && (
        <section className="py-section px-6 md:px-12 bg-card">
          <div className="max-w-site mx-auto">
            <Reveal className="mb-14 md:mb-16">
              <SectionHeading eyebrow="Keep exploring" title={<>You may also <em>like</em></>} />
            </Reveal>
            <div className={cn("grid mx-auto gap-x-4 md:gap-x-8 gap-y-14", productGridClass(related.length))}>
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 100}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
