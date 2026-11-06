import { Hero } from "@/components/Hero";
import type { Metadata } from "next";
import { CollectionTiles } from "@/components/CollectionTiles";
import { CategoryTiles } from "@/components/CategoryTiles";
import { PromiseStrip } from "@/components/PromiseStrip";
import { GiftBand } from "@/components/GiftBand";
import { JewelryCatalog } from "@/components/JewelryCatalog";
import { BrandStory } from "@/components/BrandStory";
import { InstagramGrid } from "@/components/InstagramGrid";

// Title, description and social image come from the root layout; only the canonical URL is set here
export const metadata: Metadata = { alternates: { canonical: "/" } };

// Products come first; backgrounds alternate card / page so neighbouring sections stay distinct
export default function Home() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <JewelryCatalog />
      <CategoryTiles />
      <CollectionTiles />
      <BrandStory />
      <InstagramGrid />
      <GiftBand />
    </>
  );
}
