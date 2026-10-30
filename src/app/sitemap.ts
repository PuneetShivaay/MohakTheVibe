import type { MetadataRoute } from "next";
import { collections } from "@/lib/products";

// Static export: generated once at build time as /sitemap.xml
export const dynamic = "force-static";

const BASE_URL = "https://mohak-the-vibe.web.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
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
