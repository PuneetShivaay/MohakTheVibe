import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/SectionHeading";
import { PAGE_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | Mohak – The Vibe",
  robots: { index: false },
};

const ctaLink = "text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors";

// Rendered for unknown URLs (exported as 404.html). Outside (site), so it adds the navbar and footer itself.
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[80vh] flex items-center justify-center px-6 pt-28 pb-section text-center">
        <div className="max-w-xl">
          <Eyebrow className="mb-6">Error 404</Eyebrow>
          <h1 className="font-headline text-display">
            This piece has <em>wandered off.</em>
          </h1>
          <p className="mt-6 text-foreground/70 font-light leading-relaxed">
            The page you were looking for doesn&apos;t exist or has moved. Let&apos;s get you back to something beautiful.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            <Link href="/" className={ctaLink}>
              Back to home
            </Link>
            <Link href={PAGE_LINKS.collections} className={ctaLink}>
              Explore the collections
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
