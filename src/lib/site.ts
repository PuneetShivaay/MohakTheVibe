// Single source for brand contact and marketplace links
export const WHATSAPP_NUMBER = "916388498674";

export const SITE_LINKS = {
  instagram: "https://www.instagram.com/mohakthevibe/",
  whatsappChat: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappCatalog: `https://wa.me/c/${WHATSAPP_NUMBER}`,
  flipkartStore: "https://www.flipkart.com/search?q=mohak+the+vibe",
  meeshoStore: "https://www.meesho.com/MohakTheVibe",
} as const;

// Home-page anchors for now; switch to /collections and /our-story when those pages ship (phases 5–6)
export const NAV_LINKS = {
  left: [
    { label: "Collections", href: "/#festive" },
    { label: "Signature", href: "/#catalog" },
  ],
  right: [
    { label: "Our Story", href: "/#brand-story" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export const MARKETPLACES = [
  { label: "Flipkart", href: SITE_LINKS.flipkartStore },
  { label: "Meesho", href: SITE_LINKS.meeshoStore },
] as const;
