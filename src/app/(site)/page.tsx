import { Hero } from "@/components/Hero";
import { FestiveCollections } from "@/components/FestiveCollections";
import { JewelryCatalog } from "@/components/JewelryCatalog";
import { BrandStory } from "@/components/BrandStory";
import { InstagramGrid } from "@/components/InstagramGrid";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FestiveCollections />
      <JewelryCatalog />
      <BrandStory />
      <InstagramGrid />
      <ContactSection />
    </>
  );
}
