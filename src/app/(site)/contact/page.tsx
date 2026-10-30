import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { FAQS, FaqSection } from "@/components/FaqSection";

const title = "Contact Us | Mohak – The Vibe";
const description =
  "Get in touch with Mohak – The Vibe, Lucknow. WhatsApp, email and answers to common questions on ordering, shipping, returns and jewellery care.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description },
  twitter: { title, description },
};

// FAQ structured data so search engines can show the questions in results
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((g) =>
    g.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    }))
  ),
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ContactSection firstScreen />
      <FaqSection />
    </>
  );
}
