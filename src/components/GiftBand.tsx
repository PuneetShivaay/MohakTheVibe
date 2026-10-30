import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { Reveal } from "./Reveal";
import { CONTACT, PAGE_LINKS } from "@/lib/site";

// Midnight brand moment: gift-ready promise with a WhatsApp prompt
export function GiftBand() {
  return (
    <section className="bg-brand-midnight text-brand-ivory py-section px-6 md:px-12">
      <Reveal className="max-w-3xl mx-auto text-center">
        <BrandLogo className="mb-10" />
        <h2 className="font-headline text-display">
          Every piece arrives <em className="text-brand-gold">gift-ready.</em>
        </h2>
        <p className="mt-6 max-w-lg mx-auto text-brand-ivory/60 font-light leading-relaxed">
          Wrapped in our signature box, so it is as lovely to receive as it is to wear. Need a gift note or styling advice?
        </p>
        <a
          href={CONTACT.whatsappHello}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-brand-midnight text-eyebrow uppercase px-8 py-4 transition-colors"
        >
          Ask us on WhatsApp
        </a>
        <p className="mt-6">
          <Link
            href={PAGE_LINKS.contact}
            className="text-eyebrow uppercase text-brand-ivory/60 border-b border-brand-ivory/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
          >
            Contact &amp; FAQs
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
