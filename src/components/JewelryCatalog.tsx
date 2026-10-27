import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getCollection, products, type Product } from "@/lib/products";
import { SITE_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const imageUrl = (id?: string) => (id ? PlaceHolderImages.find((img) => img.id === id)?.imageUrl : undefined);

// Per-product listing where we have one, otherwise the store page
function marketplaceLinks(product: Product) {
  const links = [
    { label: "Flipkart", href: product.links?.flipkart ?? SITE_LINKS.flipkartStore },
    { label: "Meesho", href: product.links?.meesho ?? SITE_LINKS.meeshoStore },
  ];
  if (product.links?.amazon) links.push({ label: "Amazon", href: product.links.amazon });
  return links;
}

const quietLink =
  "border-b border-transparent pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors";

function ProductCard({ product }: { product: Product }) {
  const img = imageUrl(product.imgId);
  const hoverImg = imageUrl(product.hoverImgId);
  const collection = getCollection(product.collection);

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted border border-brand-gold/15">
        {img && (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={cn(
              "object-cover transition-all duration-700 ease-out-soft",
              hoverImg ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"
            )}
          />
        )}
        {hoverImg && (
          <Image
            src={hoverImg}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-700 ease-out-soft group-hover:opacity-100"
          />
        )}
      </div>

      <div className="pt-5 text-center">
        {collection && <p className="text-eyebrow uppercase text-brand-gold mb-2">{collection.name}</p>}
        <h3 className="font-headline text-base md:text-lg leading-snug">{product.name}</h3>
        <p className="mt-1 text-sm text-foreground/60">{product.price}</p>
        <div className="mt-4 flex justify-center gap-5 text-eyebrow uppercase text-foreground/60">
          {marketplaceLinks(product).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buy ${product.name} on ${link.label} (opens in a new tab)`}
              className={quietLink}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function JewelryCatalog() {
  return (
    <section id="catalog" className="py-section px-6 md:px-12 bg-card">
      <div className="max-w-site mx-auto">
        <Reveal className="mb-16 md:mb-20">
          <SectionHeading
            eyebrow="Signature Pieces"
            title={
              <>
                The ones she <em>keeps</em>
              </>
            }
            description="Handpicked favourites, each one ready to wear and ready to gift."
          />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-14">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 100}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:mt-20 text-center">
          <p className="text-eyebrow uppercase text-foreground/60">
            Shop the full range on{" "}
            <a href={SITE_LINKS.flipkartStore} target="_blank" rel="noopener noreferrer" className={`text-foreground ${quietLink}`}>
              Flipkart
            </a>{" "}
            ·{" "}
            <a href={SITE_LINKS.meeshoStore} target="_blank" rel="noopener noreferrer" className={`text-foreground ${quietLink}`}>
              Meesho
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
