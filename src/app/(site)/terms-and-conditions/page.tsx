import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { CONTACT } from "@/lib/site";

const title = "Terms & Conditions | Mohak – The Vibe";
const description = "The terms for using the Mohak – The Vibe website and buying our jewellery through our partner stores.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: { title, description },
  twitter: { title, description },
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
      <p>
        We do not sell directly on this website. Product buttons take you to marketplaces such as Flipkart and Meesho, or
        to WhatsApp and Instagram so you can ask us questions. Your purchase is a contract between you and that
        marketplace, and its own terms, payment, delivery, return and refund policies apply.
      </p>
    ),
  },
  {
    heading: "Products and prices",
    body: (
      <p>
        We take care to show our jewellery accurately, but colours may look slightly different on your screen. Prices and
        availability on this site are indicative and can change. The price shown on the marketplace at checkout is the
        one that applies.
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
      updated="28 October 2026"
      intro="Please read these terms before using our website or buying our jewellery through our partner stores."
      sections={sections}
    />
  );
}
