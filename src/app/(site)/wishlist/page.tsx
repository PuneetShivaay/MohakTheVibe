import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { WishlistView } from "@/components/WishlistView";

// Personal page (contents live in the visitor's browser), so kept out of search results and the sitemap
export const metadata: Metadata = {
  title: "Your Wishlist | Mohak – The Vibe",
  alternates: { canonical: "/wishlist" },
  robots: { index: false, follow: true },
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
