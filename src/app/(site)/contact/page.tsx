import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { FAQS, FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, socialMeta } from "@/lib/seo";

const title = "Contact Us";
const description =
  "Get in touch with Mohak The Vibe, Lucknow. WhatsApp, email and answers to common questions on ordering, shipping, returns and jewellery care.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  ...socialMeta({ title, description, path: "/contact" }),
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <ContactSection firstScreen />
      <FaqSection />
    </>
  );
}
