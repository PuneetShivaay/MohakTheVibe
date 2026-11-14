import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { hasJournal } from "@/lib/journal";

// Shared chrome for every public page. Route group "(site)" does not affect URLs.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar journal={hasJournal()} />
      <main id="main" className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppCTA />
    </>
  );
}
