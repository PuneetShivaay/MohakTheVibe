// Structured data (schema.org JSON-LD) builders. Pure functions: pages render them with <JsonLd />.
import type { Category, Product } from "./products";
import { CONTACT, MARKETPLACES, SITE_LINKS, SITE_URL } from "./site";
import { TEAM } from "./team";

export const BRAND_NAME = "Mohak – The Vibe";
// Spellings people actually type; helps brand searches ("mohak", "mohakthevibe") map to this site
const BRAND_ALIASES = ["Mohak The Vibe", "MohakTheVibe", "Mohak"];

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const priceNumber = (price: string) => Number(price.replace(/[^0-9.]/g, "")) || undefined;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    alternateName: BRAND_ALIASES,
    url: SITE_URL,
    logo: absoluteUrl("/mohak.png"),
    image: absoluteUrl("/og-image.jpg"),
    description:
      "Handpicked artificial jewellery from Lucknow: earrings, pendants and bracelets in Minakari, Kundan, Korean and contemporary styles.",
    email: CONTACT.email,
    telephone: CONTACT.phoneDisplay,
    ...(CONTACT.gstin ? { taxID: CONTACT.gstin } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    areaServed: "IN",
    founder: TEAM.filter((m) => m.founder).map((m) => ({ "@type": "Person", name: m.name })),
    sameAs: [SITE_LINKS.instagram, SITE_LINKS.youtube, ...MARKETPLACES.map((m) => m.href)],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND_NAME,
    alternateName: BRAND_ALIASES,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

// Category page: a list of products with price and brand. Capped so very large categories stay light.
export function categoryJsonLd(category: Pick<Category, "slug" | "name" | "description">, products: Product[]) {
  const url = absoluteUrl(`/shop/${category.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} | ${BRAND_NAME}`,
    description: category.description,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 40).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          image: p.image,
          category: category.name,
          brand: { "@type": "Brand", name: BRAND_NAME },
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "INR",
            price: priceNumber(p.price),
            availability: "https://schema.org/InStock",
            seller: { "@id": `${SITE_URL}/#organization` },
          },
        },
      })),
    },
  };
}
