import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { socialMeta } from "@/lib/seo";
import { CONTACT } from "@/lib/site";

const title = "Terms & Conditions";
const description = "The terms for using the Mohak The Vibe website and buying our jewellery through our partner stores.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms-and-conditions" },
  ...socialMeta({ title, description, path: "/terms-and-conditions" }),
};

// Draft text: have it reviewed before relying on it legally (see progress doc)
const sections: LegalSection[] = [
  {
    heading: "About this website",
    body: (
      <p>
        This website showcases the jewellery of Mohak – The Vibe, {CONTACT.location}. By using it you agree to these terms.
        If you do not agree, please do not use the site.
      </p>
    ),
  },
  {
    heading: "How to buy",
    body: (
      <>
        <p>
          There are two ways to buy. Product buttons take you to marketplaces such as Flipkart and Meesho. A purchase there
          is a contract between you and that marketplace, and its own terms, payment, delivery, return and refund policies
          apply.
        </p>
        <p>
          Gift orders are placed with us directly on WhatsApp (see &quot;Gift orders&quot; below). For those, these terms
          and what we confirm with you in the chat apply.
        </p>
      </>
    ),
  },
  {
    heading: "Gift orders",
    body: (
      <>
        <p>
          You can build a gift box on our gifting page and send it to us on WhatsApp. An order is accepted only when we
          confirm it in the chat, together with the price, any bulk price and the delivery charge.
        </p>
        <p>
          Payment is by UPI, after we confirm the order and before we dispatch it. We deliver by courier to addresses in
          India; delivery times depend on the address and the courier and are estimates, not guarantees. We gift-wrap the
          order and do not put a price on the parcel or in the box.
        </p>
        <p>
          If a gift order arrives damaged or is not what you ordered, message us on WhatsApp with photos as soon as it
          arrives and we will work with you to put it right.
        </p>
      </>
    ),
  },
  {
    heading: "Products and prices",
    body: (
      <p>
        We take care to show our jewellery accurately, but colours may look slightly different on your screen. Prices and
        availability on this site are indicative and can change. For marketplace orders, the price shown on the
        marketplace at checkout applies; for gift orders, the price we confirm with you on WhatsApp applies.
      </p>
    ),
  },
  {
    heading: "Care and use",
    body: (
      <p>
        Fashion jewellery lasts longer with care. Keep it dry, store it in the box provided, and put it on after perfume or
        lotions. Our anti-tarnish finish is not a guarantee against damage from water, sweat or chemicals.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The Mohak name, logo, photographs, text and designs on this site belong to Mohak – The Vibe. Please do not copy,
        reuse or republish them without our written permission.
      </p>
    ),
  },
  {
    heading: "Links to other sites",
    body: (
      <p>
        We link to third-party sites and are not responsible for their content or practices. Using them is at your own
        discretion.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        The site is provided as is. To the extent the law allows, Mohak – The Vibe is not liable for any loss arising from
        using this site or relying on its content.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: <p>These terms are governed by the laws of India. Disputes fall under the courts of Lucknow, Uttar Pradesh.</p>,
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${CONTACT.email}`} className="text-brand-gold hover:underline">
          {CONTACT.email}
        </a>{" "}
        or message us on WhatsApp.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="14 November 2026"
      intro="Please read these terms before using our website or buying our jewellery through our partner stores."
      sections={sections}
    />
  );
}
