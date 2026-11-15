import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { GIFTING_LINK } from "@/lib/site";
import { FadeIn } from "@/components/FadeIn";
import { GiftBoxView } from "@/components/GiftBoxView";
import { Eyebrow } from "@/components/SectionHeading";

// The checkout step: nothing to rank for, and the box only exists in the visitor's browser.
export const metadata: Metadata = {
  title: "Your Gift Box",
  description: "Review the pieces in your gift box and send your gift order on WhatsApp.",
  alternates: { canonical: "/gifting/box" },
  robots: { index: false, follow: true },
};

const STEPS = ["Pieces", "Details", "Send on WhatsApp"];

export default async function GiftBoxPage() {
  const products = await getProducts();

  return (
    <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
      <div className="max-w-site mx-auto">
        <FadeIn>
          <Eyebrow className="mb-6">Gifting</Eyebrow>
          <h1 className="sr-only">Your gift box</h1>
          <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 text-eyebrow uppercase text-foreground/70">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center border border-brand-gold text-brand-gold">
                    {i + 1}
                  </span>
                  {step}
                </span>
                {i < STEPS.length - 1 && <span aria-hidden className="h-px w-6 bg-border" />}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-foreground/70 font-light">
            No price on the parcel · Gift-wrapped · Pay by UPI.{" "}
            <Link href={GIFTING_LINK.href} className="underline underline-offset-4 hover:text-brand-gold transition-colors">
              How gifting works
            </Link>
          </p>
        </FadeIn>

        <div className="mt-12 md:mt-16">
          <GiftBoxView products={products} />
        </div>
      </div>
    </section>
  );
}
