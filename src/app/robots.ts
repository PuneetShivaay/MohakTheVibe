import type { MetadataRoute } from "next";

// Static export: generated once at build time as /robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /preview is the temporary design mock; it is also marked noindex
    rules: { userAgent: "*", allow: "/", disallow: "/preview" },
    sitemap: "https://mohak-the-vibe.web.app/sitemap.xml",
  };
}
