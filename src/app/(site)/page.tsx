import { Hero } from "@/components/Hero";
import { CollectionTiles } from "@/components/CollectionTiles";
import { CategoryTiles } from "@/components/CategoryTiles";
import { PromiseStrip } from "@/components/PromiseStrip";
import { GiftBand } from "@/components/GiftBand";
import { JewelryCatalog } from "@/components/JewelryCatalog";
import { BrandStory } from "@/components/BrandStory";
import { InstagramGrid } from "@/components/InstagramGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <CategoryTiles />
      <CollectionTiles />
      <JewelryCatalog />
      <BrandStory />
      <InstagramGrid />
      <GiftBand />
    </>
  );
}
