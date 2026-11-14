import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { socialMeta } from "@/lib/seo";
import { CONTACT, SITE_LINKS } from "@/lib/site";

const title = "Privacy Policy";
const description = "How Mohak The Vibe handles your information when you visit this website or contact us.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  ...socialMeta({ title, description, path: "/privacy-policy" }),
};

// Draft text: have it reviewed before relying on it legally (see progress doc)
const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        This website is operated by Mohak – The Vibe, {CONTACT.location}. You can reach us at{" "}
        <a href={`mailto:${CONTACT.email}`} className="text-brand-gold hover:underline">
          {CONTACT.email}
        </a>
        .
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>
          This site does not have accounts or online payments, and it does not send anything you type to us. The form on
          our contact page only opens your own email app with your message filled in, and the form on our gifting page only
          writes a WhatsApp message for you. Nothing is sent until you press send there.
        </p>
        <p>
          If you message us on WhatsApp or Instagram, or email us, we receive the information you choose to share, such as
          your name, phone number and the products you ask about. We use it only to reply and to help with your order or
          enquiry.
        </p>
      </>
    ),
  },
  {
    heading: "Orders and payments",
    body: (
      <>
        <p>
          Marketplace purchases are completed on Flipkart, Meesho or other marketplaces we link to. Those platforms collect
          and process your order, address and payment details under their own privacy policies.
        </p>
        <p>
          For gift orders placed with us on WhatsApp, you share your name and phone number, the recipient&apos;s name and
          delivery address, and your gift message. We use them only to confirm, pack and deliver the order, and we share
          the recipient&apos;s name, address and phone number with the courier only as needed for delivery. You pay by UPI
          through your own UPI app: we see that the payment arrived, never your UPI PIN, card or bank login.
        </p>
      </>
    ),
  },
  {
    heading: "Third-party services",
    body: (
      <>
        <p>
          Our pages show content from, and link to, services such as{" "}
          <a href={SITE_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
            Instagram
          </a>
          ,{" "}
          <a href={SITE_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
            YouTube
          </a>
          , WhatsApp, Flipkart and Meesho. When you open them, their own privacy policies apply.
        </p>
        <p>
          The website is hosted on Vercel, which may log standard technical data such as IP address and browser type to
          deliver and secure the site.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies and local storage",
    body: (
      <p>
        We store your light or dark display choice, your wishlist and your gift box (product ids and quantities) in your
        browser so the site remembers them. They stay on your device, are not sent to us unless you choose to send your
        list or order on WhatsApp, and are not used to identify you.
      </p>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask us to delete messages or details you have shared with us, or to correct them, by emailing{" "}
        {CONTACT.email}. We keep your information only as long as needed to help you.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="14 November 2026"
      intro="Your privacy matters to us. This page explains what information we handle when you visit this website or get in touch."
      sections={sections}
    />
  );
}
