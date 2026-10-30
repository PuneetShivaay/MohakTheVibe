// Product and collection data shared by the home and collection pages.
// Images are looked up by id in placeholder-images.json.

export type MarketplaceLinks = {
  flipkart?: string;
  meesho?: string;
  amazon?: string;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  // Intro paragraph on the collection page; also used as its meta description
  description: string;
  coverImageId: string;
};

export type Product = {
  id: string;
  name: string;
  imgId: string;
  collection: Collection["slug"];
  // Single selling price; no compare-at or sale prices (see redesign plan)
  price: string;
  // Optional second photo (ideally on-model) shown on hover
  hoverImgId?: string;
  // Per-product listings; components fall back to the store links in site.ts
  links?: MarketplaceLinks;
};

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
];

// Names carried over from the old catalog. Several do not match their photo yet (see docs/redesign-progress.md).
export const products: Product[] = [
  { id: "p1", imgId: "catalog-jhumka-green", collection: "minakari", name: "Minakari Half Green Jhumka", price: "₹199" },
  { id: "p2", imgId: "catalog-jhumka-red", collection: "minakari", name: "Minakari Half Red Jhumka", price: "₹199" },
  { id: "p3", imgId: "catalog-lotus-firozi", collection: "minakari", name: "Lotus Minakari Firozi Drop Earrings", price: "₹210" },
  { id: "p4", imgId: "catalog-lotus-black", collection: "minakari", name: "Lotus Minakari Black Drop Earrings", price: "₹210" },
  { id: "p5", imgId: "catalog-lotus-wine", collection: "minakari", name: "Lotus Minakari Wine Drop Earrings", price: "₹210" },
  { id: "p6", imgId: "catalog-kundan-green", collection: "kundan", name: "Green Crystal Kundan Drop Earrings", price: "₹299" },
  { id: "p7", imgId: "catalog-rect-gold", collection: "contemporary", name: "Gold Plated Rectangular Drop Earrings", price: "₹149" },
  { id: "p8", imgId: "catalog-rect-mirror", collection: "contemporary", name: "Rose Gold Mirror Rectangular Drop Earrings", price: "₹149" },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((p) => p.collection === slug);
}
