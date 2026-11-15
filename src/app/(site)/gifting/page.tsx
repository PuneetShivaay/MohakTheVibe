import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { breadcrumbJsonLd, socialMeta } from "@/lib/seo";
import { GIFT_BOX_LINK } from "@/lib/site";
import { FadeIn } from "@/components/FadeIn";
import { FaqSection } from "@/components/FaqSection";
import { GiftPicks } from "@/components/GiftPicks";
import { JsonLd } from "@/components/JsonLd";
import { imageUrl } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
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
  // Pieces to add from this page: the featured ones, or the first few when none are marked
  const featured = products.filter((p) => p.featured);
  const picks = (featured.length > 0 ? featured : products).slice(0, 6);
  // Small gift box print, shown in the intro and beside "Start your gift box". It is a stock image with a pngtree
  // watermark: replace it with a real photo of a wrapped Mohak gift by changing the `gifting-giftbox` entry in
  // placeholder-images.json (docs/gifting-plan.md).
  const boxImg = imageUrl("gifting-giftbox");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gifting", path: "/gifting" },
        ])}
      />

      {/* Intro: text beside the small gift box print (same framed print as "Start your gift box" below). */}
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <div className={boxImg ? "grid gap-10 md:gap-16 md:grid-cols-[7fr_5fr] items-center" : undefined}>
            <FadeIn>
              <Eyebrow className="mb-6">Gifting</Eyebrow>
              <h1 className="font-headline text-display-xl">
                Gift your <em className="text-brand-gold">loved ones.</em>
              </h1>
              <p className="mt-8 max-w-md text-foreground/70 font-light leading-relaxed">
                Choose one piece or a whole box of them. We gift-wrap it and send it by courier anywhere in India, with no
                price on the parcel.
              </p>
              <Link
                href={GIFT_BOX_LINK.href}
                className="tap-area mt-10 inline-block text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                Start your gift box
              </Link>
            </FadeIn>
            {boxImg && (
              <FadeIn delay={150} className="mx-auto w-full max-w-xs md:max-w-sm md:ml-auto">
                <div className="relative aspect-square overflow-hidden border border-border bg-muted p-3">
                  <div className="relative h-full w-full">
                    <Image
                      src={boxImg}
                      alt="A gift box tied with a gold ribbon"
                      fill
                      priority
                      sizes="(min-width: 768px) 30vw, 80vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
          <FadeIn delay={300}>
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

      {/* Pieces to gift: add to the box from here, then review it on the box page */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <Reveal className="mb-12 md:mb-16">
            <SectionHeading align="left" eyebrow="Pieces to gift" title={<>Add to your <em>gift box</em></>} />
          </Reveal>
          <GiftPicks picks={picks} />
        </div>
      </section>

      {/* Hand-off to the checkout page: the small gift box print beside the text */}
      <section className="py-section px-6 md:px-12 bg-card">
        <div className="max-w-site mx-auto grid gap-10 md:gap-16 md:grid-cols-[5fr_7fr] items-center">
          {boxImg && (
            <Reveal className="mx-auto w-full max-w-xs md:max-w-sm">
              <div className="relative aspect-square overflow-hidden border border-border bg-muted p-3">
                <div className="relative h-full w-full">
                  <Image
                    src={boxImg}
                    alt="A gift box tied with a gold ribbon"
                    fill
                    sizes="(min-width: 768px) 30vw, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          )}
          <Reveal className={boxImg ? "text-center md:text-left" : "max-w-2xl mx-auto text-center md:col-span-2"}>
            <SectionHeading
              align={boxImg ? "left" : "center"}
              eyebrow="Ready?"
              title={<>Start your <em>gift box</em></>}
            />
            <p className="mt-6 max-w-md mx-auto md:mx-0 text-foreground/70 font-light leading-relaxed">
              Add a piece from any product page with “Send as a gift”, then review everything in your gift box.
            </p>
            <div className="mt-8">
              <Link
                href={GIFT_BOX_LINK.href}
                className="inline-block bg-cta hover:bg-cta/90 text-cta-foreground text-eyebrow uppercase px-8 py-4 transition-colors"
              >
                Open your gift box
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Marketplaces, said plainly */}
      <section className="py-16 px-6 md:px-12">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/70 font-light leading-relaxed">
            Prefer to order a single piece on a marketplace? You can, but their packaging and invoice rules apply. For a
            gift-wrapped box with no price on the parcel, order with us.
          </p>
        </Reveal>
      </section>

      <FaqSection className="bg-card" groups={FAQS} />
    </>
  );
}
