// Single source for brand contact and marketplace links
// Public site address (Vercel). Change here when a custom domain is added.
export const SITE_URL = "https://mohakthevibe.vercel.app";
export const WHATSAPP_NUMBER = "916388498674";

export const SITE_LINKS = {
  instagram: "https://www.instagram.com/mohakthevibe/",
  youtube: "https://www.youtube.com/@Mohakthevibe",
  linkedin: "https://www.linkedin.com/company/mohakthevibe",
  developer: "https://otical.vercel.app/",
  whatsappChat: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappCatalog: `https://wa.me/c/${WHATSAPP_NUMBER}`,
  flipkartStore: "https://www.flipkart.com/search?q=mohak+the+vibe",
  meeshoStore: "https://www.meesho.com/MohakTheVibe",
} as const;

// Public business contact details shown in the footer and contact section
export const CONTACT = {
  email: "mohakthevibe@gmail.com",
  location: "Gomti Nagar, Lucknow, Uttar Pradesh, India",
  phoneDisplay: "+91 63884 98674",
  phoneHref: `tel:+${WHATSAPP_NUMBER}`,
  // GST registration number; shown in the footer when filled in (leave "" to hide)
  gstin: "09IFMPP3041D1ZB",
  whatsappHello: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Mohak, I'd like to know more about a piece.")}`,
} as const;

// Home-page anchors plus the story page; collection pages live at /collections/[slug]
export const PAGE_LINKS = {
  collections: "/#collections",
  signature: "/#catalog",
  story: "/our-story",
  contact: "/contact",
  wishlist: "/wishlist",
} as const;

export const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const;

export const SHOP_LINKS = [
  { label: "Earrings", href: "/shop/earrings" },
  { label: "Pendants", href: "/shop/pendants" },
  { label: "Bracelets", href: "/shop/bracelets" },
] as const;

export const NAV_LINKS = {
  left: [...SHOP_LINKS, { label: "Collections", href: PAGE_LINKS.collections }],
  right: [
    { label: "Our Story", href: PAGE_LINKS.story },
    { label: "Contact", href: PAGE_LINKS.contact },
  ],
} as const;

// Gift orders: built in the gift box (browser only), sent to us on WhatsApp, delivered with no price on the
// parcel. See docs/gifting-plan.md.
export const GIFTING_LINK = { label: "Gifting", href: "/gifting" } as const;
// The checkout page: only the box, the details and the WhatsApp button. /gifting is the info page.
export const GIFT_BOX_LINK = { label: "Gift box", href: "/gifting/box" } as const;
// From this many pieces in one gift order, the WhatsApp message asks for our bulk price. Assumption until the
// brand sets a real threshold; the page itself names no number.
export const BULK_HINT_FROM = 5;

// Shown in the navbar and footer only once there is a published article (see hasJournal() in journal.ts)
export const JOURNAL_LINK = { label: "Journal", href: "/journal" } as const;

// Right-hand navigation links, with the journal slotted in after Our Story when it has articles
export const navLinksRight = (journal: boolean) =>
  journal ? [NAV_LINKS.right[0], JOURNAL_LINK, ...NAV_LINKS.right.slice(1)] : [...NAV_LINKS.right];

export const MARKETPLACES = [
  { label: "Flipkart", href: SITE_LINKS.flipkartStore },
  { label: "Meesho", href: SITE_LINKS.meeshoStore },
] as const;

// Brand promises: the strip under the hero and on the Our Story page (only list things that are true)
export const BRAND_PROMISES = ["Handpicked", "Anti-tarnish", "Gift-ready", "Pan-India delivery"] as const;

// Short reassurance row at the top of the footer (only list things that are true)
export const TRUST_POINTS = ["Free shipping", "Easy returns", "Secure checkout on Flipkart & Meesho"] as const;

// Delivery and returns as declared to search engines in Product structured data, which enables the
// "Free delivery" / "Free returns" lines under a search result.
// Deliberately null: orders are fulfilled by Flipkart and Meesho under THEIR policies, so these
// cannot be filled in from TRUST_POINTS above without confirming the real terms first. Declaring
// terms a buyer does not actually get is a Merchant Center problem, not just a wrong label.
// To switch on, set both fields; `seo.ts` picks them up automatically.
// See docs/seo-premium-plan.md, open questions.
export const MERCHANT_TERMS: { freeShippingAcrossIndia: boolean; returnDays: number } | null = null;
