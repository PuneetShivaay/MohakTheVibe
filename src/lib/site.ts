// Single source for brand contact and marketplace links
export const WHATSAPP_NUMBER = "916388498674";

export const SITE_LINKS = {
  instagram: "https://www.instagram.com/mohakthevibe/",
  whatsappChat: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappCatalog: `https://wa.me/c/${WHATSAPP_NUMBER}`,
  flipkartStore: "https://www.flipkart.com/search?q=mohak+the+vibe",
  meeshoStore: "https://www.meesho.com/MohakTheVibe",
} as const;

// Home-page anchors plus the story page; collection pages live at /collections/[slug]
export const PAGE_LINKS = {
  collections: "/#collections",
  signature: "/#catalog",
  story: "/our-story",
  contact: "/#contact",
} as const;

export const NAV_LINKS = {
  left: [
    { label: "Collections", href: PAGE_LINKS.collections },
    { label: "Signature", href: PAGE_LINKS.signature },
  ],
  right: [
    { label: "Our Story", href: PAGE_LINKS.story },
    { label: "Contact", href: PAGE_LINKS.contact },
  ],
} as const;

export const MARKETPLACES = [
  { label: "Flipkart", href: SITE_LINKS.flipkartStore },
  { label: "Meesho", href: SITE_LINKS.meeshoStore },
] as const;
