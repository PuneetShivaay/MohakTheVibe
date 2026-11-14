// Page metadata helpers and structured data (schema.org JSON-LD) builders.
// Pure functions: pages spread socialMeta() into their `metadata` and render JSON-LD with <JsonLd />.
import type { Metadata } from "next";
import { productImages, productPath, type Category, type Product } from "./products";
import { CONTACT, MARKETPLACES, MERCHANT_TERMS, SITE_LINKS, SITE_URL } from "./site";
import { TEAM } from "./team";

export const BRAND_NAME = "Mohak – The Vibe";
// Spellings people actually type; helps brand searches ("mohak", "mohakthevibe") map to this site
const BRAND_ALIASES = ["Mohak The Vibe", "MohakTheVibe", "Mohak"];

// Plain form (no en dash) for titles and social cards, so search results read consistently.
// BRAND_NAME keeps the typographic form for JSON-LD `name`.
export const BRAND_SUFFIX = "Mohak The Vibe";
// Used by the root layout's title template; pages set a bare title and get the suffix added
export const TITLE_TEMPLATE = `%s | ${BRAND_SUFFIX}`;
export const pageTitle = (title: string) => `${title} | ${BRAND_SUFFIX}`;

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_TITLE = `${BRAND_SUFFIX} | Artificial Earrings, Pendants & Bracelets Online India`;
export const SITE_DESCRIPTION =
  "Mohak The Vibe, Lucknow: handpicked artificial earrings, pendants and bracelets in Minakari, Kundan, Korean and gold-plated styles. Gift-ready, delivered across India.";
export const OG_IMAGE = {
  url: absoluteUrl("/og-image.jpg"),
  width: 1200,
  height: 630,
  alt: "Mohak The Vibe jewellery",
};

// Open Graph and Twitter tags for one page. Next merges `metadata` shallowly, so a page that writes
// its own `openGraph` replaces the root one outright and silently loses the image, site name, locale
// and type. Every page below the root calls this instead of listing the fields by hand.
// `title` is the bare page title (no brand suffix); `image` overrides the default social image.
export function socialMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description?: string;
  path: string;
  image?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const full = pageTitle(title);
  return {
    openGraph: {
      title: full,
      description,
      url: absoluteUrl(path),
      siteName: BRAND_SUFFIX,
      images: image ? [image] : [OG_IMAGE],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [image ?? OG_IMAGE.url],
    },
  };
}

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
    sameAs: [SITE_LINKS.instagram, SITE_LINKS.youtube, SITE_LINKS.linkedin, ...MARKETPLACES.map((m) => m.href)],
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

// Grouped FAQs flattened into one FAQPage. Note: since August 2023 Google only shows FAQ rich
// results for government and health sites, so this earns no accordion in search results; it is kept
// because it still helps search engines understand the page. Don't invest further here.
// https://developers.google.com/search/blog/2023/08/howto-faq-changes
export function faqJsonLd(groups: { items: { question: string; answer: string }[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      }))
    ),
  };
}

// Offers go stale: without priceValidUntil Search Console warns on every product page.
// A year from the build, and the site rebuilds from the sheet every 3 hours.
const priceValidUntil = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

// Delivery and returns, only when the real terms have been confirmed in site.ts. Google shows these
// as "Free delivery" / "Free returns" under the result, so they must match what the buyer gets.
function merchantTerms() {
  if (!MERCHANT_TERMS) return {};
  return {
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: MERCHANT_TERMS.freeShippingAcrossIndia ? 0 : undefined,
        currency: "INR",
      },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: MERCHANT_TERMS.returnDays,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
  };
}

// One Offer, shared by the product page and the category item list so they never drift apart
function productOffer(offerUrl: string, price: string) {
  return {
    "@type": "Offer",
    url: offerUrl,
    priceCurrency: "INR",
    price: priceNumber(price),
    priceValidUntil: priceValidUntil(),
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#organization` },
    ...merchantTerms(),
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
          url: absoluteUrl(productPath(p.id)),
          image: p.image,
          category: category.name,
          brand: { "@type": "Brand", name: BRAND_NAME },
          offers: productOffer(absoluteUrl(productPath(p.id)), p.price),
        },
      })),
    },
  };
}

// Short meta/JSON-LD description: the sheet description when present, otherwise a generated line
export function productDescription(product: Product, categoryName: string) {
  // Without sheet copy, build the line from what we do know, so it is specific to the piece
  // (material and size when filled in) rather than one sentence stamped on every product
  const specs = [product.material, product.size].filter(Boolean).join(", ");
  const text =
    product.description ||
    `${product.name}, handpicked ${categoryName.toLowerCase()} by ${BRAND_NAME}.${specs ? ` ${specs}.` : ""} ${product.price}, gift-ready, delivered across India.`;
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}

// Product page: one Offer per marketplace listing, or a single Offer on our own page when there are none
export function productJsonLd(product: Product, categoryName: string) {
  const url = absoluteUrl(productPath(product.id));
  const listings = Object.values(product.links ?? {}).filter((href): href is string => Boolean(href));
  const offer = (offerUrl: string) => productOffer(offerUrl, product.price);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    sku: product.id,
    name: product.name,
    url,
    image: productImages(product).map((src) => (src.startsWith("/") ? absoluteUrl(src) : src)),
    description: productDescription(product, categoryName),
    category: categoryName,
    brand: { "@type": "Brand", name: BRAND_NAME },
    ...(product.material ? { material: product.material } : {}),
    ...(product.size ? { size: product.size } : {}),
    // Only real figures from the sheet, and the product page shows the same numbers (Google requires it)
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.value,
            reviewCount: product.rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    offers: listings.length > 0 ? listings.map(offer) : offer(url),
  };
}
