import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FestiveCollections } from "@/components/FestiveCollections";
import { JewelryCatalog } from "@/components/JewelryCatalog";
import { AIStylist } from "@/components/AIStylist";
import { BrandStory } from "@/components/BrandStory";
import { InstagramGrid } from "@/components/InstagramGrid";
import { Footer } from "@/components/Footer";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FestiveCollections />
      <JewelryCatalog />
      <BrandStory />
      <AIStylist />
      <InstagramGrid />
      <Footer />
      <WhatsAppCTA />
    </main>
  );
}