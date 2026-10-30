import type { MetadataRoute } from "next";

// Static export: generated once at build time as /robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://mohak-the-vibe.web.app/sitemap.xml",
  };
}
