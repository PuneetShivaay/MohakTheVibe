import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FestiveCollections } from "@/components/FestiveCollections";
import { JewelryCatalog } from "@/components/JewelryCatalog";
import { BrandStory } from "@/components/BrandStory";
import { InstagramGrid } from "@/components/InstagramGrid";
import { ContactSection } from "@/components/ContactSection";
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
      <InstagramGrid />
      <ContactSection />
      <Footer />
      <WhatsAppCTA />
    </main>
  );
}