import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { breadcrumbJsonLd, socialMeta } from "@/lib/seo";
import { FadeIn } from "@/components/FadeIn";
import { FaqSection } from "@/components/FaqSection";
import { GiftBoxView } from "@/components/GiftBoxView";
import { JsonLd } from "@/components/JsonLd";
import { ShopFullRange } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";

const title = "Jewellery Gifts, Wrapped & Delivered";
const description =
  "Send jewellery as a gift anywhere in India: gift-wrapped and delivered by courier with no price on the parcel. Single pieces or bulk. Pay by UPI.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gifting" },
  ...socialMeta({ title, description, path: "/gifting" }),
};

// Only true statements here: see "Copy rules" in docs/gifting-plan.md
const PROMISES = ["No price on the parcel", "Gift-wrapped by us", "Courier across India", "Pay by UPI"];

const STEPS = [
  { name: "Choose", text: "Add one piece or many to your gift box, in any quantity." },
  { name: "Personalise", text: "Tell us the occasion, add a gift message and the date you need it by." },
  { name: "Confirm on WhatsApp", text: "We confirm the delivery charge and send a UPI payment request. Share the address in the chat." },
  { name: "We wrap and send", text: "We gift-wrap it and courier it, with no price on the parcel." },
];

const FAQS = [
  {
    group: "Gift orders",
    items: [
      {
        question: "Will the price show on the parcel?",
        answer:
          "No. Gift orders placed with us on WhatsApp are packed and sent by us, so the parcel and the box carry no price.",
      },
      {
        question: "How do I pay?",
        answer:
          "By UPI. Once we have confirmed the pieces, the delivery charge and the address on WhatsApp, we send you a UPI payment request and dispatch after payment.",
      },
      {
        question: "Where do you deliver, and what does it cost?",
        answer:
          "Anywhere in India, by courier. The delivery charge and timing depend on the address, so we confirm both on WhatsApp before you pay.",
      },
      {
        question: "Can I order more than one piece?",
        answer:
          "Yes. Add any mix of pieces in any quantity. For larger orders, such as return gifts or corporate gifts, ask us for our bulk price in the same chat.",
      },
      {
        question: "Can I include a message?",
        answer: "Yes. Write it in the gift message box and it comes to us with your order.",
      },
      {
        question: "Can I buy on Flipkart or Meesho instead?",
        answer:
          "Yes, for single pieces. Their packaging, delivery and invoice rules apply, so we can't promise there will be no price on the parcel. For a gift-wrapped box with no price, order with us on WhatsApp.",
      },
    ],
  },
];

export default async function GiftingPage() {
  const products = await getProducts();
  // Suggestions to add without leaving the page: the featured pieces, or the first few when none are marked
  const featured = products.filter((p) => p.featured);
  const picks = (featured.length > 0 ? featured : products).slice(0, 6);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gifting", path: "/gifting" },
        ])}
      />

      {/* Intro */}
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <FadeIn className="max-w-3xl">
            <Eyebrow className="mb-6">Gifting</Eyebrow>
            <h1 className="font-headline text-display-xl">
              Gift your <em className="text-brand-gold">loved ones.</em>
            </h1>
            <p className="mt-8 max-w-md text-foreground/70 font-light leading-relaxed">
              Choose one piece or a whole box of them. We gift-wrap it and send it by courier anywhere in India, with no
              price on the parcel.
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <ul className="mt-12 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-center gap-3 text-eyebrow uppercase text-foreground/70">
                  <span aria-hidden className="w-1 h-1 rotate-45 bg-brand-gold" />
                  {promise}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <Reveal className="mb-12 md:mb-16">
            <SectionHeading align="left" eyebrow="How it works" title={<>Four simple <em>steps</em></>} />
          </Reveal>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {STEPS.map((step, i) => (
              <li key={step.name}>
                <Reveal delay={i * 100} className="border-t border-border pt-6">
                  <p className="font-headline text-4xl text-brand-gold">{i + 1}</p>
                  <h3 className="mt-4 font-headline text-xl">{step.name}</h3>
                  <p className="mt-3 text-sm text-foreground/70 font-light leading-relaxed">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The gift box */}
      <section id="gift-box" className="py-section px-6 md:px-12 bg-card">
        <div className="max-w-site mx-auto">
          <GiftBoxView products={products} picks={picks} />
        </div>
      </section>

      {/* Marketplaces, said plainly */}
      <section className="py-16 px-6 md:px-12">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/70 font-light leading-relaxed">
            Prefer to order a single piece on a marketplace? You can, but their packaging and invoice rules apply. For a
            gift-wrapped box with no price on the parcel, order with us.
          </p>
          <div className="mt-6">
            <ShopFullRange />
          </div>
        </Reveal>
      </section>

      <FaqSection className="bg-card" groups={FAQS} />
    </>
  );
}
