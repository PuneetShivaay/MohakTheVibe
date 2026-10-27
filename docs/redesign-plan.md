# Redesign Plan – Mohak The Vibe

Goal: make the site feel premium (editorial, restrained, lots of whitespace). Keep the existing conventions (see `.github/copilot-instructions.md`) and brand tokens. Both Mohak Modes (dark and light) must keep working.

## Concept: "Quiet Heritage" (decided)
Indian craft (minakari, kundan, lotus motifs) presented with quiet, typographic restraint. Every section should read like a magazine spread, not a shop shelf.
- Colour ratio: about 70% Ivory, 20% Midnight text, 10% Gold detail.
- One signature motif: a thin gold lotus/paisley line icon for section dividers and the loader.

## Decisions (edit as we agree)
- Direction: light / Ivory-led (decided). Dark Mohak Mode must still work.
- Instagram: official Graph API for https://www.instagram.com/mohakthevibe/ (decided; see open question on starting with a widget).
- Site structure: hybrid multipage (decided; see "Site structure").
- Gold is an accent only (hairlines, icons, hover). Copper only for the main CTA, at most once per screen.
- Headings: Playfair Display, very large (96–160px desktop), tight tracking, italic for emphasis. Labels: small uppercase Inter, about 0.3em tracking. Prices: Inter, regular weight.
- Section padding: about 120–160px desktop. Max content width constrained.
- Animation: Framer Motion (to be installed in phase 1; not currently in `package.json`). Fade and rise or bottom-up image reveal, 600–800ms ease-out. No bouncy or floating effects.
- Images: `next/image` (unoptimized because of static export, so export photos at web size, ideally WebP), consistent 3:4 product ratio, blur placeholders via static imports, one on-model shot per product for hover swap.
- No discount styling: no strikethrough prices or "SALE" badges. Show one price or none.
- No non-functional UI: remove placeholder arrows and dots that do nothing.
- Logo (decided): use `BrandLogo` (SVG, transparent, gold). `compact` mark centred in the navbar; full logo with "The Vibe" in the footer and brand moments. Do not use `public/mohak.png` on the page (raster with dark background; keep it for Open Graph only). Replace the SVG with the designer's original vector when available.
- Design reference: the approved look is the temporary `/preview` route (`src/app/preview/PreviewHome.tsx`). Build phases from it, then delete it.

## Positioning (decided)
The site is a **brand home**, not another marketplace listing. Products are already sold on Flipkart, Meesho and Amazon, so the site should build brand identity and trust, then send buyers to those marketplaces (or WhatsApp/Instagram).
- Lead with brand story, lookbooks and collections, not price lists or discount banners.
- Fewer products shown, better presented (curated "signature pieces" per collection).
- Marketplace links are secondary and understated text links ("Shop on Flipkart →"), not full-width brand-coloured buttons. Add Amazon alongside the existing ones. Link each product to its own listing, not a store search.
- Consistent photography, packaging and tone of voice on every section.
- Trust signals: handpicked, anti-tarnish, gift-ready, "also available on" marketplace badges (monochrome), customer reviews/UGC from Instagram.

## Site structure (decided)
Hybrid: the home page stays a scrolling brand experience; collections and story get their own URLs for SEO and shareable links.

| Route | Purpose | When |
|---|---|---|
| `/` | Brand home | Now |
| `/collections/[slug]` | Editorial page per collection (e.g. Minakari, Kundan, Festive) | Now |
| `/our-story` | Founder/craft story, packaging, trust | Now |
| `/contact` | WhatsApp plus form | Optional |

No per-product pages for now (decided). Products appear as cards on the home and collection pages and link straight to the marketplaces.

- Product and collection data move from `JewelryCatalog.tsx` into `src/lib/products.ts` (single source for home and collection pages).
- Each route sets its own `metadata` (title, description, Open Graph image).
- Pages are statically generated (`generateStaticParams`) and add a `sitemap.ts`.
- Navbar links change from `#anchors` to routes; shared Navbar/Footer/WhatsAppCTA move into `src/app/layout.tsx`.

### Home page flow
1. Hero: full-bleed model shot, headline overlay, one CTA ("Explore the Collection").
2. Brand promise strip: Handpicked · Anti-tarnish · Gift-ready · Pan-India delivery.
3. Collections: 2–3 large editorial tiles linking to `/collections/[slug]`.
4. Signature Pieces: 4–6 curated 3:4 cards, hover image swap, quiet marketplace text links.
5. Story: the existing **"Our Essence – Wear Your Vibe, Own the Room."** section (`BrandStory.tsx`), kept as is (decided). Layered framed images (large 4:5 print, small square print overlapping bottom-right on desktop), two value columns, pull quote.
6. "Worn by you": Instagram/UGC grid.
7. Gift/packaging moment.
8. Footer: `BrandLogo`, large faded MOHAK wordmark, WhatsApp opt-in, monochrome "Also available on" badges.

## Reference sites (Indian-first, pattern only, no copying assets)
- Giva (giva.co): catalog grid, hover image swap, clean white layout
- Palmonas (palmonas.com): modern minimal, editorial banners, Hero
- Tanishq (tanishq.co.in): festive collection storytelling, premium Indian tone
- Secondary: Mejuri (airy light feel) and Cartier (whitespace, serif typography)

## Phases
1. **Foundations**: typography scale, spacing, colour usage in `globals.css` and `tailwind.config.ts`; shared `SectionHeading`; install Framer Motion and a shared reveal component; move product data to `src/lib/products.ts`; move Navbar/Footer/WhatsAppCTA into `layout.tsx`; update `firebase.json` for multipage (remove the `** → /index.html` rewrite, add `"cleanUrls": true`).
2. **Navbar**: transparent over the hero, blurred on scroll, centred `<BrandLogo compact />` (replaces the missing `/images/logo.png` lookup), route-based links.
3. **Hero**: full-bleed editorial image or video with gradient overlay, tagline, one CTA, subtle parallax. Remove the decorative circle, vertical "INSTAGRAM" text and arrow.
4. **Signature Pieces (JewelryCatalog)**: 3:4 cards, hover crossfade, quiet marketplace links, 1px gold borders; remove sale styling and dead carousel controls.
5. **Collections**: home tiles plus `/collections/[slug]` pages with per-page metadata.
6. **Our Story**: keep `BrandStory` ("Our Essence") on the home page unchanged in layout and copy; only token-level alignment if needed (e.g. `max-w-site`). Add a "Read our story" link once `/our-story` exists, and build `/our-story` in the same visual language (layered framed images, Playfair italic gold accents).
7. **InstagramGrid**: live posts and reels (see below).
8. **Footer and WhatsAppCTA**: refine, keep the number `916388498674` consistent.
9. **Polish**: `sitemap.ts`, 404 page, loading state, accessibility and contrast check in both modes, Lighthouse.

## Instagram feed (phase 7)
Source: Instagram Graph API. The site is a static export (see `architecture.md`), so there is no server at runtime: route handlers, `revalidate` and runtime secrets are not available.
- Requires the account to be Business/Creator, linked to a Facebook Page, plus a Meta developer app.
- Approach: fetch at **build time** in a server component, calling `GET /{user-id}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp`. Add a `schedule` trigger (e.g. daily) to the GitHub deploy workflow so the feed refreshes.
- Store `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` as GitHub Actions secrets, passed to `npm run build`. Never expose them client-side.
- Download or proxy images at build time if needed: `media_url` links expire.
- Long-lived tokens last 60 days and need refreshing (can be a step in the scheduled workflow).
- If near-real-time updates matter, alternatives are a Firebase Cloud Function or a client-side widget.
- `media_type`: IMAGE, CAROUSEL_ALBUM, VIDEO (reels are VIDEO). Show `thumbnail_url` for videos and link to `permalink`.
- Fallback: keep the current `PlaceHolderImages` grid if the fetch fails.
- Alternative with no API setup: a third-party widget (Behold, Elfsight, SnapWidget).

## Out of scope
Cart/checkout, re-enabling the AI Stylist, per-product pages (`/products/[slug]`; revisit once each product has 3+ photos and its own marketplace links).
