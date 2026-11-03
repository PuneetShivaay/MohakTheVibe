import { getProducts } from "@/lib/catalog";
import { ProductCard, ShopFullRange } from "./ProductCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SIGNATURE_COUNT = 8;

// Home "Signature Pieces": products marked featured in the sheet, otherwise the first eight
export async function JewelryCatalog() {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  const items = (featured.length > 0 ? featured : products).slice(0, SIGNATURE_COUNT);

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
          {items.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 100}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:mt-20 text-center">
          <ShopFullRange />
        </Reveal>
      </div>
    </section>
  );
}
