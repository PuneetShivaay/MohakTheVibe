// Single source for brand contact and marketplace links
// Public site address (Vercel). Change here when a custom domain is added.
export const SITE_URL = "https://mohakthevibe.vercel.app";
export const WHATSAPP_NUMBER = "916388498674";

export const SITE_LINKS = {
  instagram: "https://www.instagram.com/mohakthevibe/",
  youtube: "https://www.youtube.com/@Mohakthevibe",
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

export const MARKETPLACES = [
  { label: "Flipkart", href: SITE_LINKS.flipkartStore },
  { label: "Meesho", href: SITE_LINKS.meeshoStore },
] as const;

// Brand promises: the strip under the hero and on the Our Story page (only list things that are true)
export const BRAND_PROMISES = ["Handpicked", "Anti-tarnish", "Gift-ready", "Pan-India delivery"] as const;

// Short reassurance row at the top of the footer (only list things that are true)
export const TRUST_POINTS = ["Free shipping", "Easy returns", "Secure checkout on Flipkart & Meesho"] as const;
