// Product types, categories, collections and the fallback product list.
// Live products come from the Google Sheet via getProducts() in src/lib/catalog.ts;
// the list below is used when the sheet is not configured, unreachable or has no valid rows.

export type MarketplaceLinks = {
  flipkart?: string;
  meesho?: string;
  amazon?: string;
};

export type Category = {
  slug: "earrings" | "pendants" | "bracelets";
  name: string;
  tagline: string;
  description: string;
  // Search results title and description (keyword-rich); the page shows `name` and `description`.
  // No brand suffix: the root layout's title template adds "| Mohak The Vibe". Keep under ~45
  // characters so the whole title survives Google's truncation.
  seoTitle: string;
  seoDescription: string;
  // Editorial copy at the bottom of the category page: real text for search engines and for buyers
  // choosing between styles. Paragraphs may contain [label](/path) links to other pages.
  // Only state what is true of every piece: per-product materials and sizes come from the sheet.
  about: AboutSection[];
  // Questions shown under the pieces; answers must not promise policies the marketplaces decide
  faqs: { question: string; answer: string }[];
};

export type AboutSection = { heading: string; paragraphs: string[] };

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  // Intro paragraph on the collection page; also used as its meta description
  description: string;
  // Local image id for the cover; when omitted, the cover is the first product's photo in the collection
  coverImageId?: string;
  // The slug is also a kind of piece (hoop, jhumka...): products in it get it as their `type` for the filter chips
  isType?: boolean;
};

export type ProductRating = {
  // 1 to 5, one decimal
  value: number;
  // Number of ratings behind the average, at least 1
  count: number;
};

export type Product = {
  id: string;
  name: string;
  category: Category["slug"];
  // Collection slug, or undefined when the product belongs to none
  collection?: Collection["slug"];
  // Kind of piece within its category (stud, hoop, jhumka...), lower-case slug; used for filter chips
  type?: string;
  // Display price including ₹, single price only (no compare-at or sale prices)
  price: string;
  // Absolute or site-relative image URLs (Cloudinary for sheet products, /images/... for fallback)
  image: string;
  // Optional second photo (ideally on-model) shown on hover
  hoverImage?: string;
  // Extra photos for the product page gallery (sheet columns image2, image3, ...)
  moreImages?: string[];
  // Free text for the product page (materials, size, styling)
  description?: string;
  // Per-product listings; a card with none shows an "Ask on WhatsApp" link instead
  links?: MarketplaceLinks;
  // Free text from the sheet, e.g. "Brass, gold plated" and "5 cm drop". Shown as a spec list on the
  // product page and sent as `material` / `size` in the structured data.
  material?: string;
  size?: string;
  // Real marketplace rating copied from the sheet (never invented). Shown on the page and sent as
  // aggregateRating structured data, so both always come from the same numbers.
  rating?: ProductRating;
  // Shown in Signature Pieces on the home page
  featured?: boolean;
};

// Product shape for the hardcoded fallback list: images by id in placeholder-images.json
export type FallbackProduct = Omit<Product, "image" | "hoverImage"> & { imgId: string; hoverImgId?: string };

export const categories: Category[] = [
  {
    slug: "earrings",
    name: "Earrings",
    tagline: "Jhumkas, drops and studs",
    description: "Handpicked earrings, from Minakari jhumkas to everyday drops, each one ready to wear and ready to gift.",
    seoTitle: "Artificial Earrings Online India: Jhumkas",
    seoDescription:
      "Shop artificial earrings online from Mohak The Vibe, Lucknow: Minakari jhumkas, Kundan, Korean and gold-plated earrings, studs, hoops and chandbalis. Gift-ready, delivered across India.",
    about: [
      {
        heading: "Earring styles at Mohak",
        paragraphs: [
          "Earrings are the heart of Mohak The Vibe, handpicked in Lucknow for everyday wear and for celebrations. The range runs from [jhumkas](/collections/jhumka), the bell-shaped drops that move with you, to [chandbalis](/collections/chandbali), the crescent shapes made for weddings and festivals.",
          "For quieter days there are [studs](/collections/stud) and [hoops](/collections/hoop), and a lighter, playful side in our [Korean-style earrings](/collections/korean). If you love colour and craft, browse the [Minakari](/collections/minakari) and [Kundan](/collections/kundan) collections, inspired by enamel work and royal-court jewellery.",
        ],
      },
      {
        heading: "How to choose a pair",
        paragraphs: [
          "Start with the occasion. Studs or small hoops go from desk to dinner without a second thought. A jhumka or chandbali is the natural partner for a kurta, saree or lehenga, and is often the only jewellery you need with it.",
          "Then think about your neckline and hair. Bold drops sit best with an open neck or hair tied back, while a simple stud lets a statement [pendant](/shop/pendants) take the lead. Size and drop length are listed on a product page wherever we have them, so check before you order.",
        ],
      },
      {
        heading: "Caring for your earrings",
        paragraphs: [
          "Put earrings on after perfume, lotion and hairspray, and take them off before you shower or swim. Wipe them with a soft dry cloth and store each pair separately in a pouch or box so they do not scratch one another. Fashion jewellery lasts longest when it stays dry.",
        ],
      },
      {
        heading: "Where to buy",
        paragraphs: [
          "Choose a pair here, then order it on Flipkart or Meesho, wherever you already shop. Not sure which to pick, or looking for a gift? Message us on WhatsApp and we will help you choose.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which earrings are best for everyday wear?",
        answer:
          "Studs, small hoops and light Korean-style pieces are the easiest to wear all day. Look for smaller drop lengths if you wear earrings to work.",
      },
      {
        question: "What should I wear with a saree or lehenga?",
        answer:
          "Jhumkas and chandbalis are the classic choice, and Minakari or Kundan pieces add colour and shine. Let the earrings be the statement and keep other jewellery simple.",
      },
      {
        question: "How do I buy a pair?",
        answer:
          "Open the piece you like and use its Flipkart or Meesho button. If a piece has no marketplace listing yet, message us on WhatsApp and we will sort it out.",
      },
    ],
  },
  {
    slug: "pendants",
    name: "Pendants",
    tagline: "A quiet statement at the neckline",
    description: "Pendants that sit close to the heart, from Kundan teardrops to clean contemporary charms.",
    seoTitle: "Artificial Pendants for Women Online",
    seoDescription:
      "Shop artificial pendants online from Mohak The Vibe, Lucknow: Kundan teardrops and contemporary charm pendants, gold-tone and gift-ready. Delivered across India.",
    about: [
      {
        heading: "Pendants at Mohak",
        paragraphs: [
          "Our pendants are made to sit close to the neckline, from [Kundan](/collections/kundan)-style teardrops to clean, contemporary charms. They are handpicked in Lucknow to pair easily with our [earrings](/shop/earrings), so a matching look takes one extra click.",
          "A pendant is worn close to the face, so we look closely at the shape, the way the piece is set and how it hangs before it joins the range. We keep it a small, considered selection rather than a long list.",
        ],
      },
      {
        heading: "How to style a pendant",
        paragraphs: [
          "With a high neckline or a collared shirt, a short pendant sits neatly above the fabric. With a scoop or V neckline, a slightly longer drop fills the space. With a saree or kurta, a Kundan-style pendant brings festive weight without needing a full set.",
          "When the pendant is the statement, keep earrings small: [studs](/collections/stud) work well. When the earrings are the statement, choose a simple charm and let it stay quiet.",
        ],
      },
      {
        heading: "Layering and care",
        paragraphs: [
          "Two pendants of different lengths layer into a modern, deliberate look. Keep the tones matching and let one piece lead.",
          "Put your pendant on after perfume and lotion, take it off before you shower or swim, and store it flat or hanging so the chain does not tangle. A soft dry cloth is all it needs.",
        ],
      },
      {
        heading: "Where to buy",
        paragraphs: [
          "Choose a pendant here, then order it on Flipkart or Meesho. If you would like help choosing, or want it as a gift, message us on WhatsApp.",
        ],
      },
    ],
    faqs: [
      {
        question: "What pendant length suits which neckline?",
        answer:
          "Short pendants suit high and round necklines, longer drops suit scoop and V necklines. Check the size on the product page where it is listed.",
      },
      {
        question: "Can I wear a pendant and earrings together?",
        answer:
          "Yes. Let one of them lead: a statement pendant with small studs, or bold earrings with a simple charm.",
      },
      {
        question: "How do I buy a pendant?",
        answer:
          "Open the piece you like and use its Flipkart or Meesho button. If it has no marketplace listing yet, message us on WhatsApp.",
      },
    ],
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    tagline: "Gold-tone and oxidised, made to stack",
    description: "Bracelets to wear alone or stacked, finished to last and boxed to gift.",
    seoTitle: "Artificial Bracelets for Women Online",
    seoDescription:
      "Shop artificial bracelets online from Mohak The Vibe, Lucknow: gold-tone and oxidised charm bracelets to wear alone or stacked. Gift-ready, delivered across India.",
    about: [
      {
        heading: "Bracelets at Mohak",
        paragraphs: [
          "Our bracelets are made to be worn alone or stacked. Charm bracelets and simple everyday styles sit side by side, handpicked in Lucknow to go with the [earrings](/shop/earrings) and [pendants](/shop/pendants) in our range.",
          "It is a small, considered selection: pieces that are easy to wear every day and easy to gift.",
        ],
      },
      {
        heading: "Finding your size",
        paragraphs: [
          "Wrap a soft tape measure around your wrist, just above the wrist bone, and note the number. Add about 1.5 cm for a snug fit or 2 cm for a looser one, then compare it with the size on the product page wherever we list it.",
          "If you are between sizes, go larger for a bracelet you will wear with a watch or stack with others, and smaller for one you want to stay in place.",
        ],
      },
      {
        heading: "How to wear and stack",
        paragraphs: [
          "One bracelet is a quiet detail. Two or three of different widths make a stack: keep the tones the same, and let one piece be the wider, bolder one. A charm bracelet works well on its own, so give it room.",
          "Keep bracelets away from perfume, lotion and water, take them off before you cook or exercise, and wipe them with a soft dry cloth before storing them in a pouch or box.",
        ],
      },
      {
        heading: "Where to buy",
        paragraphs: [
          "Choose a bracelet here, then order it on Flipkart or Meesho. If you would like help choosing a size, or want it as a gift, message us on WhatsApp.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I find my bracelet size?",
        answer:
          "Measure around your wrist with a soft tape, add about 1.5 cm for a snug fit or 2 cm for a looser one, and compare it with the size on the product page where it is listed.",
      },
      {
        question: "Can I stack bracelets?",
        answer:
          "Yes. Keep the tones matching, mix one or two widths, and let a single piece lead. Charm bracelets look best with plenty of space around them.",
      },
      {
        question: "How do I buy a bracelet?",
        answer:
          "Open the piece you like and use its Flipkart or Meesho button. If it has no marketplace listing yet, message us on WhatsApp.",
      },
    ],
  },
];

// Draft collections: names, slugs and copy still to be confirmed (see docs/redesign-progress.md)
export const collections: Collection[] = [
  {
    slug: "minakari",
    name: "Minakari",
    tagline: "Enamel colour, hand-painted",
    description: "Bright enamel work in the Minakari tradition. Jhumkas and chandbalis with colour that carries across a room.",
    coverImageId: "catalog-jhumka-red",
  },
  {
    slug: "kundan",
    name: "Kundan",
    tagline: "Crystal set, quietly royal",
    description: "Glass stones set in gold-tone frames, inspired by royal courts and light enough to wear every day.",
    coverImageId: "catalog-kundan-green",
  },
  {
    slug: "contemporary",
    name: "Contemporary",
    tagline: "Clean lines for every day",
    description: "Modern shapes and oxidised finishes for workdays, brunches and everything in between.",
    coverImageId: "festive-item-2",
  },
  {
    slug: "korean",
    name: "Korean",
    tagline: "Light, playful, on trend",
    description: "Lightweight Korean-style pieces: pearls, bows, hearts and minimal shapes made for everyday wear.",
    isType: true,
  },
  {
    slug: "jhumka",
    name: "Jhumkas",
    tagline: "Bells that dance as you move",
    description: "Bell-shaped jhumkas in enamel, kundan and oxidised finishes, from everyday drops to festive statements.",
    isType: true,
  },
  {
    slug: "chandbali",
    name: "Chandbalis",
    tagline: "Crescent moons, festive glow",
    description: "The crescent-shaped chandbali, rooted in Indian tradition and made for weddings, festivals and celebrations.",
    isType: true,
  },
  {
    slug: "hoop",
    name: "Hoops",
    tagline: "Classic circles, modern finish",
    description: "Hoops in every size, from slim everyday circles to bold statement pairs in gold tone.",
    isType: true,
  },
  {
    // The sheet's `collection` value for studs is "stud"; cover comes from its first product
    slug: "stud",
    name: "Studs",
    tagline: "Small, bright, every day",
    description: "Small statements that sit close to the ear: patterned buttons, crystals and clean shapes for every day.",
    isType: true,
  },
];

// Fallback list (the original catalog, all earrings). Names carried over from the old catalog;
// several do not match their photo yet (see docs/redesign-progress.md).
export const fallbackProducts: FallbackProduct[] = [
  { id: "p1", imgId: "catalog-jhumka-green", category: "earrings", collection: "minakari", name: "Minakari Half Green Jhumka", price: "₹199" },
  { id: "p2", imgId: "catalog-jhumka-red", category: "earrings", collection: "minakari", name: "Minakari Half Red Jhumka", price: "₹199" },
  { id: "p3", imgId: "catalog-lotus-firozi", category: "earrings", collection: "minakari", name: "Lotus Minakari Firozi Drop Earrings", price: "₹210" },
  { id: "p4", imgId: "catalog-lotus-black", category: "earrings", collection: "minakari", name: "Lotus Minakari Black Drop Earrings", price: "₹210" },
  { id: "p5", imgId: "catalog-lotus-wine", category: "earrings", collection: "minakari", name: "Lotus Minakari Wine Drop Earrings", price: "₹210" },
  { id: "p6", imgId: "catalog-kundan-green", category: "earrings", collection: "kundan", name: "Green Crystal Kundan Drop Earrings", price: "₹299" },
  { id: "p7", imgId: "catalog-rect-gold", category: "earrings", collection: "contemporary", name: "Gold Plated Rectangular Drop Earrings", price: "₹149" },
  { id: "p8", imgId: "catalog-rect-mirror", category: "earrings", collection: "contemporary", name: "Rose Gold Mirror Rectangular Drop Earrings", price: "₹149" },
];

export function getCollection(slug?: string) {
  return slug ? collections.find((c) => c.slug === slug) : undefined;
}

export function getCategory(slug?: string) {
  return slug ? categories.find((c) => c.slug === slug) : undefined;
}

// Helpers take the product list (from getProducts()) so they work for sheet and fallback data alike
export function getProductsByCollection(products: Product[], slug: string) {
  return products.filter((p) => p.collection === slug);
}

// Collections that have at least one product; empty ones are hidden from tiles, the footer and the sitemap
export function nonEmptyCollections(products: Product[]) {
  return collections.filter((c) => products.some((p) => p.collection === c.slug));
}

export function getProductsByCategory(products: Product[], slug: string) {
  return products.filter((p) => p.category === slug);
}

// "₹1,299" -> 1299 (prices are stored as display strings); 0 when it can't be read
export const priceValue = (price: string) => Number(price.replace(/[^0-9.]/g, "")) || 0;
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Product page URL. Uses only the id, so moving a product to another category keeps its link.
export const productPath = (id: string) => `/product/${id}`;

export function getProduct(products: Product[], id: string) {
  return products.find((p) => p.id === id);
}

// "You may also like": same collection first, then same category, never the product itself
export function getRelatedProducts(products: Product[], product: Product, count = 4) {
  const others = products.filter((p) => p.id !== product.id);
  const sameCollection = product.collection ? others.filter((p) => p.collection === product.collection) : [];
  const sameCategory = others.filter((p) => p.category === product.category && !sameCollection.includes(p));
  return [...sameCollection, ...sameCategory].slice(0, count);
}

// Every photo of a product in gallery order: main, hover (on-model), then the extras
export const productImages = (product: Product) =>
  [product.image, product.hoverImage, ...(product.moreImages ?? [])].filter((src): src is string => Boolean(src));

// Display names for product types (filter chips); unknown types fall back to a Title Case slug
const typeLabels: Record<string, string> = {
  stud: "Studs",
  hoop: "Hoops",
  jhumka: "Jhumkas",
  chandbali: "Chandbalis",
  korean: "Korean",
};

export const typeLabel = (slug: string) =>
  typeLabels[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
