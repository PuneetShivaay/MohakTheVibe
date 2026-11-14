import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { socialMeta } from "@/lib/seo";
import { WishlistView } from "@/components/WishlistView";

const title = "Your Wishlist";

// Personal page (contents live in the visitor's browser), so kept out of search results and the sitemap.
// Social tags still matter: the WhatsApp share link points here.
export const metadata: Metadata = {
  title,
  alternates: { canonical: "/wishlist" },
  robots: { index: false, follow: true },
  ...socialMeta({ title, path: "/wishlist" }),
};

export default async function WishlistPage() {
  const products = await getProducts();

  return (
    <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
      <div className="max-w-site mx-auto">
        <WishlistView products={products} />
      </div>
    </section>
  );
}
