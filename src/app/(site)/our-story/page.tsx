import type { Metadata } from "next";
import Link from "next/link";
import { LayeredImages } from "@/components/LayeredImages";
import { PromiseStrip } from "@/components/PromiseStrip";
import { imageUrl } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { PAGE_LINKS, SITE_LINKS } from "@/lib/site";

const title = "Our Story | Mohak – The Vibe";
const description =
  "Mohak – The Vibe is a boutique jewellery label: handpicked Indian earrings, finished to last and packed to be gifted.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-story" },
  openGraph: { title, description },
  twitter: { title, description },
};

// Placeholder copy drawn from the Our Essence section; replace with the founder's own words (see progress doc)
const values = [
  {
    name: "Curated craft",
    text: "Every pair is chosen by hand for its finish, its weight and the way it moves.",
  },
  {
    name: "Made to last",
    text: "Anti-tarnish finishes so a favourite stays a favourite, wear after wear.",
  },
  {
    name: "Ready to gift",
    text: "Each piece arrives boxed and wrapped, as lovely to receive as it is to wear.",
  },
  {
    name: "Boutique service",
    text: "Questions go to a person, not a bot. Message us on WhatsApp or Instagram.",
  },
];

const howToShop = [
  { step: "Browse", text: "Explore our collections and signature pieces here." },
  { step: "Choose your store", text: "Buy on Flipkart or Meesho, wherever you already shop." },
  { step: "Ask us anything", text: "Need styling advice or a gift note? We reply on WhatsApp." },
];

const ctaLink = "text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors";

export default function OurStoryPage() {
  const mainImg = imageUrl("brand-story-lifestyle");
  const detailImg = imageUrl("festive-item-3");

  return (
    <>
      {/* Intro beside the two framed prints */}
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <Eyebrow className="mb-6">Our Story</Eyebrow>
            <h1 className="font-headline text-display-xl">
              Wear your vibe, <em className="text-brand-gold">own the room.</em>
            </h1>
            <p className="mt-8 max-w-md text-foreground/70 font-light leading-relaxed">
              Mohak – The Vibe began with a simple belief: jewellery is more than an accessory, it is an extension of who
              you are. We bring boutique elegance to everyday dressing, with pieces rooted in Indian craft and styled for
              the way you live now.
            </p>
          </Reveal>
          {mainImg && (
            <Reveal delay={150} className="lg:mr-8 lg:mb-8">
              <LayeredImages main={mainImg} mainAlt="Mohak earrings, styled" detail={detailImg} priority />
            </Reveal>
          )}
        </div>
      </section>

      <PromiseStrip />

      {/* Values */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <Reveal className="mb-14 md:mb-20">
            <SectionHeading eyebrow="What we stand for" title={<>Small label, <em>high standards</em></>} />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {values.map((value, i) => (
              <Reveal key={value.name} delay={i * 100} className="border-t border-brand-gold/30 pt-6">
                <h3 className="font-headline text-xl mb-3">{value.name}</h3>
                <p className="text-sm text-foreground/70 font-light leading-relaxed">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-section px-6 md:px-12 bg-brand-midnight text-brand-ivory">
        <Reveal className="max-w-3xl mx-auto text-center">
          <blockquote className="font-headline italic text-display-sm">
            “Femininity isn&apos;t just a trait, it&apos;s a celebration. We&apos;re here to provide the crown.”
          </blockquote>
          <p className="mt-8 text-eyebrow uppercase text-brand-gold">The Mohak – The Vibe Collective</p>
        </Reveal>
      </section>

      {/* How to shop */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <Reveal className="mb-14 md:mb-20">
            <SectionHeading
              eyebrow="How to shop"
              title={<>Three <em>simple</em> steps</>}
              description="We don't run a checkout of our own. Find a piece you love here, then buy it from a store you trust."
            />
          </Reveal>
          <ol className="grid md:grid-cols-3 gap-10 md:gap-12 max-w-5xl mx-auto">
            {howToShop.map((item, i) => (
              <li key={item.step} className="text-center">
                <Reveal delay={i * 100}>
                  <span className="font-headline italic text-display-sm text-brand-gold">0{i + 1}</span>
                  <h3 className="mt-4 font-headline text-xl">{item.step}</h3>
                  <p className="mt-3 text-sm text-foreground/70 font-light leading-relaxed">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-16 flex flex-wrap justify-center gap-10">
            <Link href={PAGE_LINKS.collections} className={ctaLink}>
              Explore the collections
            </Link>
            <a href={SITE_LINKS.whatsappChat} target="_blank" rel="noopener noreferrer" className={ctaLink}>
              Message us on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
