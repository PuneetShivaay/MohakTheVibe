import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { cloudinaryUrl } from "@/lib/catalog";
import { categories, getProductsByCategory } from "@/lib/products";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Home page: compact "Shop by category" row linking to /shop/<category>. Empty categories are hidden.
export async function CategoryTiles() {
  const products = await getProducts();
  const shown = categories
    .map((category) => ({ category, items: getProductsByCategory(products, category.slug) }))
    .filter((c) => c.items.length > 0);

  if (shown.length === 0) return null;

  return (
    <section id="shop" className="py-section px-6 md:px-12">
      <div className="max-w-site mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <SectionHeading
            eyebrow="Shop"
            title={
              <>
                Shop by <em>category</em>
              </>
            }
          />
        </Reveal>

        <ul className="grid grid-cols-3 gap-3 md:gap-6">
          {shown.map(({ category, items }, i) => (
            <li key={category.slug}>
              <Reveal delay={i * 100}>
                <Link href={`/shop/${category.slug}`} className="group block text-center">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted border border-brand-gold/15">
                    <Image
                      src={cloudinaryUrl(items[0].image, 900)}
                      alt={`${category.name} category`}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 md:mt-5 font-headline text-lg md:text-2xl group-hover:text-brand-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-eyebrow uppercase text-foreground/60">
                    {items.length} {items.length === 1 ? "piece" : "pieces"}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
