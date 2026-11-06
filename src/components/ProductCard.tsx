import Link from "next/link";
import { cloudinaryUrl } from "@/lib/images";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getCollection, getProductsByCollection, productPath, type Collection, type Product } from "@/lib/products";
import { SITE_LINKS } from "@/lib/site";
import { CardPhotos } from "./CardPhotos";
import { WishlistButton } from "./WishlistButton";

export const imageUrl = (id?: string) => (id ? PlaceHolderImages.find((img) => img.id === id)?.imageUrl : undefined);

// Raw (untransformed) cover source: the collection's local cover image, else its first product's photo
export function collectionCoverSource(collection: Collection, products: Product[]) {
  return collection.coverImageId
    ? imageUrl(collection.coverImageId)
    : getProductsByCollection(products, collection.slug)[0]?.image;
}

// Ready-to-render cover URL (Cloudinary photos are resized; local images pass through)
export function collectionCover(collection: Collection, products: Product[], width = 1200) {
  const source = collectionCoverSource(collection, products);
  return source ? cloudinaryUrl(source, width) : undefined;
}

export const quietLink =
  "border-b border-transparent pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors";

// Keeps small product lists centred instead of leaving empty grid columns
const gridBySize: Record<number, string> = {
  1: "grid-cols-1 max-w-sm",
  2: "grid-cols-2 max-w-2xl",
  3: "grid-cols-2 lg:grid-cols-3 max-w-5xl",
};
export const productGridClass = (count: number) => gridBySize[count] ?? "grid-cols-2 lg:grid-cols-4";

// Only the product's own listings; with none, a WhatsApp message asking about the piece
export function marketplaceLinks(product: Product) {
  const links = [
    { label: "Flipkart", href: product.links?.flipkart },
    { label: "Meesho", href: product.links?.meesho },
    { label: "Amazon", href: product.links?.amazon },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));
  if (links.length > 0) return links;
  const text = encodeURIComponent(`Hi Mohak, I'd like to buy "${product.name}".`);
  return [{ label: "Ask on WhatsApp", href: `${SITE_LINKS.whatsappChat}?text=${text}` }];
}

export function ProductCard({ product, showCollection = true }: { product: Product; showCollection?: boolean }) {
  // Cards are at most ~25vw wide; 800px covers 2x screens. Local images pass through unchanged.
  const img = product.image ? cloudinaryUrl(product.image, 800) : undefined;
  const hoverImg = product.hoverImage ? cloudinaryUrl(product.hoverImage, 800) : undefined;
  const collection = getCollection(product.collection);

  return (
    <article className="group">
      {/* Photo and name open the product page; the marketplace links below go straight to the store */}
      <div className="relative">
        <Link
          href={productPath(product.id)}
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-[3/4] overflow-hidden bg-muted border border-brand-gold/15"
        >
          {img && <CardPhotos main={img} second={hoverImg} alt={product.name} />}
        </Link>
        <WishlistButton
          id={product.id}
          name={product.name}
          className="absolute top-2 right-2 h-9 w-9 rounded-full bg-background/85 backdrop-blur-sm text-foreground/70 hover:text-brand-copper shadow-sm"
        />
      </div>

      <div className="pt-5 text-center">
        {showCollection && collection && <p className="text-eyebrow uppercase text-brand-gold mb-2">{collection.name}</p>}
        <h3 className="font-headline text-base md:text-lg leading-snug">
          <Link href={productPath(product.id)} className="hover:text-brand-gold transition-colors">
            {product.name}
          </Link>
        </h3>
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
