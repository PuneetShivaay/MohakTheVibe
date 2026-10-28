import { Hero } from "@/components/Hero";
import { CollectionTiles } from "@/components/CollectionTiles";
import { PromiseStrip } from "@/components/PromiseStrip";
import { GiftBand } from "@/components/GiftBand";
import { JewelryCatalog } from "@/components/JewelryCatalog";
import { BrandStory } from "@/components/BrandStory";
import { InstagramGrid } from "@/components/InstagramGrid";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <CollectionTiles />
      <JewelryCatalog />
      <BrandStory />
      <InstagramGrid />
      <GiftBand />
      <ContactSection />
    </>
  );
}
