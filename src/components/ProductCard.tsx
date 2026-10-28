import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getCollection, type Product } from "@/lib/products";
import { SITE_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export const imageUrl = (id?: string) => (id ? PlaceHolderImages.find((img) => img.id === id)?.imageUrl : undefined);

export const quietLink =
  "border-b border-transparent pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors";

// Per-product listing where we have one, otherwise the store page
function marketplaceLinks(product: Product) {
  const links = [
    { label: "Flipkart", href: product.links?.flipkart ?? SITE_LINKS.flipkartStore },
    { label: "Meesho", href: product.links?.meesho ?? SITE_LINKS.meeshoStore },
  ];
  if (product.links?.amazon) links.push({ label: "Amazon", href: product.links.amazon });
  return links;
}

export function ProductCard({ product, showCollection = true }: { product: Product; showCollection?: boolean }) {
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
        {showCollection && collection && <p className="text-eyebrow uppercase text-brand-gold mb-2">{collection.name}</p>}
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

export function ShopFullRange() {
  return (
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
  );
}
