import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { socialMeta } from "@/lib/seo";
import { CONTACT, GIFTING_LINK, MARKETPLACES, SITE_LINKS } from "@/lib/site";

const title = "Shipping & Returns";
const description =
  "How delivery, returns and exchanges work for Mohak The Vibe jewellery bought on Flipkart and Meesho, and for gift orders placed with us on WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/shipping-and-returns" },
  ...socialMeta({ title, description, path: "/shipping-and-returns" }),
};

const link = "text-brand-gold hover:underline";
const marketplaceNames = MARKETPLACES.map((m) => m.label).join(" and ");

// Draft text: only repeats what the FAQ and Terms already say. Returns for gift orders beyond damage in
// transit are still a brand decision (docs/gifting-plan.md), so this page promises nothing more.
const sections: LegalSection[] = [
  {
    heading: "How buying works",
    body: (
      <>
        <p>
          This site is our showroom. When you choose a piece, the buy buttons take you to our store on {marketplaceNames},
          where you pay and place the order. The marketplace delivers it and handles returns and refunds under its own
          policies.
        </p>
        <p>
          Gift orders are different: you place them with us directly on WhatsApp from our{" "}
          <Link href={GIFTING_LINK.href} className={link}>
            gifting page
          </Link>
          , and we wrap and courier them ourselves.
        </p>
      </>
    ),
  },
  {
    heading: "Delivery",
    body: (
      <>
        <p>
          <strong className="font-normal text-foreground">Marketplace orders.</strong> We deliver anywhere in India that
          the marketplace delivers to. Most orders arrive within 3–7 working days. The marketplace shows the delivery
          charge, if any, and the expected date for your pin code at checkout, and you can track the order in its app.
        </p>
        <p>
          <strong className="font-normal text-foreground">Gift orders.</strong> We courier them anywhere in India,
          gift-wrapped and with no price on the parcel. The delivery charge and timing depend on the address, so we confirm
          both on WhatsApp before you pay. Delivery times are estimates, not guarantees.
        </p>
      </>
    ),
  },
  {
    heading: "Returns, exchanges and refunds",
    body: (
      <>
        <p>
          For marketplace orders, returns, exchanges and refunds follow the policy of the marketplace you bought from. The
          return window can differ from one listing to another, so check it on the product page there before you buy. To
          start a return, open the order in your {marketplaceNames} account.
        </p>
        <p>
          If you need any help with a request, message us on WhatsApp with your order details and we will follow up.
        </p>
      </>
    ),
  },
  {
    heading: "If your order arrives damaged",
    body: (
      <>
        <p>
          Take photos of the piece and the packaging as soon as you open it. For a marketplace order, raise a return or
          replacement in the marketplace app, then let us know on WhatsApp so we can follow up.
        </p>
        <p>
          For a gift order, or if it is not what you ordered, message us on WhatsApp with the photos as soon as it arrives
          and we will work with you to put it right.
        </p>
      </>
    ),
  },
  {
    heading: "Questions",
    body: (
      <p>
        Chat with us on{" "}
        <a href={SITE_LINKS.whatsappChat} target="_blank" rel="noopener noreferrer" className={link}>
          WhatsApp
        </a>{" "}
        or email{" "}
        <a href={`mailto:${CONTACT.email}`} className={link}>
          {CONTACT.email}
        </a>
        . Answers to common questions are on our{" "}
        <Link href="/contact" className={link}>
          contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function ShippingAndReturnsPage() {
  return (
    <LegalPage
      eyebrow="Help"
      title={title}
      updated="27 November 2026"
      intro="Everything you need to know about getting your jewellery delivered, and what to do if something isn't right."
      sections={sections}
    />
  );
}
