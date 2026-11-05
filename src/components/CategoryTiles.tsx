import { getProducts } from "@/lib/catalog";
import { cloudinaryUrl } from "@/lib/catalog";
import { categories, getProductsByCategory } from "@/lib/products";
import { CollectionTile } from "./CollectionTiles";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Home page: "Shop by category" tiles linking to /shop/<category>. Empty categories are hidden.
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
            align="left"
            eyebrow="Shop"
            title={
              <>
                Shop by <em>category</em>
              </>
            }
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {shown.map(({ category, items }, i) => (
            <Reveal key={category.slug} delay={i * 120}>
              <CollectionTile
                collection={category}
                href={`/shop/${category.slug}`}
                count={items.length}
                cover={cloudinaryUrl(items[0].image, 900)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
