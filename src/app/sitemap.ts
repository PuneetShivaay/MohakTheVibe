import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { categories, getProductsByCategory, nonEmptyCollections, productPath } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

// Static export: generated once at build time as /sitemap.xml
export const dynamic = "force-static";

const BASE_URL = SITE_URL;

// Bump when the copy on these pages actually changes
const PAGE_UPDATED = new Date("2026-11-07");
// Matches the "updated" date shown on both legal pages
const LEGAL_UPDATED = new Date("2026-10-28");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  // Catalogue pages: their content really is rebuilt from the sheet every 3 hours, so build time is
  // honest. Editorial and legal pages get the date their copy last changed instead — a build-date
  // lastmod on a page that did not change is what makes search engines ignore lastmod altogether.
  const lastModified = new Date();

  return [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    // Category pages without products are noindex, so they stay out of the sitemap
    ...categories
      .filter((c) => getProductsByCategory(products, c.slug).length > 0)
      .map((c) => ({
        url: `${BASE_URL}/shop/${c.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
    { url: `${BASE_URL}/our-story`, lastModified: PAGE_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: PAGE_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    ...nonEmptyCollections(products).map((c) => ({
      url: `${BASE_URL}/collections/${c.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${BASE_URL}${productPath(p.id)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
