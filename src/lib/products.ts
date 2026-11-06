// Product types, categories, collections and the fallback product list.
// Live products come from the Google Sheet via getProducts() in src/lib/catalog.ts;
// the list below is used when the sheet is not configured, unreachable or has no valid rows.

export type MarketplaceLinks = {
  flipkart?: string;
  meesho?: string;
  amazon?: string;
};

export type Category = {
  slug: "earrings" | "pendants" | "bracelets";
  name: string;
  tagline: string;
  description: string;
  // Search results title and description (keyword-rich); the page shows `name` and `description`
  seoTitle: string;
  seoDescription: string;
  // Short paragraphs shown at the bottom of the category page (also useful text for search engines)
  about: string[];
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  // Intro paragraph on the collection page; also used as its meta description
  description: string;
  // Local image id for the cover; when omitted, the cover is the first product's photo in the collection
  coverImageId?: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category["slug"];
  // Collection slug, or undefined when the product belongs to none
  collection?: Collection["slug"];
  // Kind of piece within its category (stud, hoop, jhumka...), lower-case slug; used for filter chips
  type?: string;
  // Display price including ₹, single price only (no compare-at or sale prices)
  price: string;
  // Absolute or site-relative image URLs (Cloudinary for sheet products, /images/... for fallback)
  image: string;
  // Optional second photo (ideally on-model) shown on hover
  hoverImage?: string;
  // Extra photos for the product page gallery (sheet columns image2, image3, ...)
  moreImages?: string[];
  // Free text for the product page (materials, size, styling)
  description?: string;
  // Per-product listings; a card with none shows an "Ask on WhatsApp" link instead
  links?: MarketplaceLinks;
  // Shown in Signature Pieces on the home page
  featured?: boolean;
};

// Product shape for the hardcoded fallback list: images by id in placeholder-images.json
export type FallbackProduct = Omit<Product, "image" | "hoverImage"> & { imgId: string; hoverImgId?: string };

export const categories: Category[] = [
  {
    slug: "earrings",
    name: "Earrings",
    tagline: "Jhumkas, drops and studs",
    description: "Handpicked earrings, from Minakari jhumkas to everyday drops, each one ready to wear and ready to gift.",
    seoTitle: "Artificial Earrings Online India: Jhumka, Studs, Hoops | Mohak The Vibe",
    seoDescription:
      "Shop artificial earrings online from Mohak The Vibe, Lucknow: Minakari jhumkas, Kundan, Korean and gold-plated earrings, studs, hoops and chandbalis. Gift-ready, delivered across India.",
    about: [
      "Mohak The Vibe earrings are handpicked in Lucknow for everyday wear and for celebrations. The range covers Minakari jhumkas, chandbalis, studs, hoops and Korean-style earrings, in gold-tone and oxidised finishes.",
      "Every pair arrives gift-ready. You can order on Flipkart or Meesho, or message us on WhatsApp for help choosing.",
    ],
  },
  {
    slug: "pendants",
    name: "Pendants",
    tagline: "A quiet statement at the neckline",
    description: "Pendants that sit close to the heart, from Kundan teardrops to clean contemporary charms.",
    seoTitle: "Artificial Pendants for Women Online India | Mohak The Vibe",
    seoDescription:
      "Shop artificial pendants online from Mohak The Vibe, Lucknow: Kundan teardrops and contemporary charm pendants, gold-tone and gift-ready. Delivered across India.",
    about: [
      "Our pendants range from Kundan teardrops to simple contemporary charms. They are made to sit close to the neckline and pair easily with the earrings in our range.",
      "Every pendant arrives gift-ready. Order on Flipkart or Meesho, or message us on WhatsApp.",
    ],
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    tagline: "Gold-tone and oxidised, made to stack",
    description: "Bracelets to wear alone or stacked, finished to last and boxed to gift.",
    seoTitle: "Artificial Bracelets for Women Online India | Mohak The Vibe",
    seoDescription:
      "Shop artificial bracelets online from Mohak The Vibe, Lucknow: gold-tone and oxidised charm bracelets to wear alone or stacked. Gift-ready, delivered across India.",
    about: [
      "Our bracelets come in gold-tone and oxidised finishes, made to be worn alone or stacked. Charm bracelets and simple everyday styles sit side by side.",
      "Every bracelet arrives gift-ready. Order on Flipkart or Meesho, or message us on WhatsApp.",
    ],
  },
];

// Draft collections: names, slugs and copy still to be confirmed (see docs/redesign-progress.md)
export const collections: Collection[] = [
  {
    slug: "minakari",
    name: "Minakari",
    tagline: "Enamel colour, hand-painted",
    description: "Bright enamel work in the Minakari tradition. Jhumkas and chandbalis with colour that carries across a room.",
    coverImageId: "catalog-jhumka-red",
  },
  {
    slug: "kundan",
    name: "Kundan",
    tagline: "Crystal set, quietly royal",
    description: "Glass stones set in gold-tone frames, inspired by royal courts and light enough to wear every day.",
    coverImageId: "catalog-kundan-green",
  },
  {
    slug: "contemporary",
    name: "Contemporary",
    tagline: "Clean lines for every day",
    description: "Modern shapes and oxidised finishes for workdays, brunches and everything in between.",
    coverImageId: "festive-item-2",
  },
  {
    // The sheet's `collection` value for studs is "stud"; cover comes from its first product
    slug: "stud",
    name: "Studs",
    tagline: "Small, bright, every day",
    description: "Small statements that sit close to the ear: patterned buttons, crystals and clean shapes for every day.",
  },
];

// Fallback list (the original catalog, all earrings). Names carried over from the old catalog;
// several do not match their photo yet (see docs/redesign-progress.md).
export const fallbackProducts: FallbackProduct[] = [
  { id: "p1", imgId: "catalog-jhumka-green", category: "earrings", collection: "minakari", name: "Minakari Half Green Jhumka", price: "₹199" },
  { id: "p2", imgId: "catalog-jhumka-red", category: "earrings", collection: "minakari", name: "Minakari Half Red Jhumka", price: "₹199" },
  { id: "p3", imgId: "catalog-lotus-firozi", category: "earrings", collection: "minakari", name: "Lotus Minakari Firozi Drop Earrings", price: "₹210" },
  { id: "p4", imgId: "catalog-lotus-black", category: "earrings", collection: "minakari", name: "Lotus Minakari Black Drop Earrings", price: "₹210" },
  { id: "p5", imgId: "catalog-lotus-wine", category: "earrings", collection: "minakari", name: "Lotus Minakari Wine Drop Earrings", price: "₹210" },
  { id: "p6", imgId: "catalog-kundan-green", category: "earrings", collection: "kundan", name: "Green Crystal Kundan Drop Earrings", price: "₹299" },
  { id: "p7", imgId: "catalog-rect-gold", category: "earrings", collection: "contemporary", name: "Gold Plated Rectangular Drop Earrings", price: "₹149" },
  { id: "p8", imgId: "catalog-rect-mirror", category: "earrings", collection: "contemporary", name: "Rose Gold Mirror Rectangular Drop Earrings", price: "₹149" },
];

export function getCollection(slug?: string) {
  return slug ? collections.find((c) => c.slug === slug) : undefined;
}

export function getCategory(slug?: string) {
  return slug ? categories.find((c) => c.slug === slug) : undefined;
}

// Helpers take the product list (from getProducts()) so they work for sheet and fallback data alike
export function getProductsByCollection(products: Product[], slug: string) {
  return products.filter((p) => p.collection === slug);
}

export function getProductsByCategory(products: Product[], slug: string) {
  return products.filter((p) => p.category === slug);
}

// Product page URL. Uses only the id, so moving a product to another category keeps its link.
export const productPath = (id: string) => `/product/${id}`;

export function getProduct(products: Product[], id: string) {
  return products.find((p) => p.id === id);
}

// "You may also like": same collection first, then same category, never the product itself
export function getRelatedProducts(products: Product[], product: Product, count = 4) {
  const others = products.filter((p) => p.id !== product.id);
  const sameCollection = product.collection ? others.filter((p) => p.collection === product.collection) : [];
  const sameCategory = others.filter((p) => p.category === product.category && !sameCollection.includes(p));
  return [...sameCollection, ...sameCategory].slice(0, count);
}

// Every photo of a product in gallery order: main, hover (on-model), then the extras
export const productImages = (product: Product) =>
  [product.image, product.hoverImage, ...(product.moreImages ?? [])].filter((src): src is string => Boolean(src));

// Display names for product types (filter chips); unknown types fall back to a Title Case slug
const typeLabels: Record<string, string> = {
  stud: "Studs",
  hoop: "Hoops",
  jhumka: "Jhumkas",
  chandbali: "Chandbalis",
  korean: "Korean",
};

export const typeLabel = (slug: string) =>
  typeLabels[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
