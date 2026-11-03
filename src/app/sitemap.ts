import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { categories, collections, getProductsByCategory } from "@/lib/products";

// Static export: generated once at build time as /sitemap.xml
export const dynamic = "force-static";

const BASE_URL = "https://mohak-the-vibe.web.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  return [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    // Category pages without products are noindex, so they stay out of the sitemap
    ...categories
      .filter((c) => getProductsByCategory(products, c.slug).length > 0)
      .map((c) => ({
        url: `${BASE_URL}/shop/${c.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
    { url: `${BASE_URL}/our-story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    ...collections.map((c) => ({
      url: `${BASE_URL}/collections/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
