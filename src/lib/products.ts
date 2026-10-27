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
  coverImageId: string;
};

export type Product = {
  id: string;
  name: string;
  imgId: string;
  collection: Collection["slug"];
  price: string;
  // Removed from the UI in phase 4 (no discount styling)
  oldPrice?: string;
  tags: string;
  // Per-product listings; components fall back to the store links in site.ts
  links?: MarketplaceLinks;
};

// Draft collections: names and slugs still to be confirmed (see docs/redesign-progress.md)
export const collections: Collection[] = [
  { slug: "minakari", name: "Minakari", tagline: "Enamel colour, hand-painted", coverImageId: "catalog-jhumka-green" },
  { slug: "kundan", name: "Kundan", tagline: "Crystal set, quietly royal", coverImageId: "catalog-kundan-green" },
  { slug: "contemporary", name: "Contemporary", tagline: "Clean lines for every day", coverImageId: "catalog-rect-gold" },
];

export const products: Product[] = [
  { id: "p1", imgId: "catalog-jhumka-green", collection: "minakari", name: "MINAKARI HALF GREEN JHUMKA", oldPrice: "₹299.00", price: "₹199.00", tags: "earrings · Silver Replica · studs" },
  { id: "p2", imgId: "catalog-jhumka-red", collection: "minakari", name: "MINAKARI HALF RED JHUMKA", oldPrice: "₹299.00", price: "₹199.00", tags: "earrings · Silver Replica · studs" },
  { id: "p3", imgId: "catalog-lotus-firozi", collection: "minakari", name: "LOTUS MINAKARI FIROZI DROP EARRINGS", oldPrice: "₹349.00", price: "₹210.00", tags: "earrings · Silver Replica · studs" },
  { id: "p4", imgId: "catalog-lotus-black", collection: "minakari", name: "LOTUS MINAKARI BLACK DROP EARRINGS", oldPrice: "₹349.00", price: "₹210.00", tags: "earrings · Silver Replica · studs" },
  { id: "p5", imgId: "catalog-lotus-wine", collection: "minakari", name: "LOTUS MINAKARI WINE DROP EARRINGS", oldPrice: "₹349.00", price: "₹210.00", tags: "earrings · Silver Replica · studs" },
  { id: "p6", imgId: "catalog-kundan-green", collection: "kundan", name: "GREEN CRYSTAL KUNDAN DROPS EARRING", oldPrice: "₹349.00", price: "₹299.00", tags: "earrings · Silver Replica · studs" },
  { id: "p7", imgId: "catalog-rect-gold", collection: "contemporary", name: "GOLD PLATED RECTANGULAR DROP EARRINGS WITH STONE", oldPrice: "₹249.00", price: "₹149.00", tags: "earrings · Silver Replica · studs" },
  { id: "p8", imgId: "catalog-rect-mirror", collection: "contemporary", name: "RECTANGULAR DROP MIRROR ROSE GOLD PLATED EARRING WITH STONE", oldPrice: "₹249.00", price: "₹149.00", tags: "earrings · Silver Replica · studs" },
];

export function getProductsByCollection(slug: string) {
  return products.filter((p) => p.collection === slug);
}
