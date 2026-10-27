# Redesign Progress

Update this file after each task. Plan: `docs/redesign-plan.md`.

## Decisions
- Direction: **light / Ivory-led** (dark Mohak Mode must still work)
- Concept: **"Quiet Heritage"** (Indian craft, editorial restraint)
- Instagram: **official Graph API**, account https://www.instagram.com/mohakthevibe/
- Positioning: **brand-first site**; marketplaces (Flipkart, Meesho, Amazon) are secondary buy links
- Structure: **hybrid multipage**: `/`, `/collections/[slug]`, `/our-story`. **No per-product pages** for now
- Animation: **Framer Motion** (installed; use `Reveal`)
- Logo: **`BrandLogo` SVG** (compact mark in navbar, full logo in footer); `mohak.png` for social previews only
- Look: **approved** via `/preview`
- Keep as is: **"Our Essence" section** (`BrandStory.tsx`): layered framed images, copy and layout stay; the redesign builds around it
- Branch: all redesign work on **`redesign`**; merge to `main` (which auto-deploys) only when complete. Delete `src/app/preview/` before merging
- References: Indian sites first (Giva, Palmonas, Tanishq); see `docs/redesign-plan.md`

## Open questions
- [ ] Amazon product links to add alongside Flipkart and Meesho?
- [ ] Per-product marketplace URLs (currently every card links to a store search)?
- [ ] Which collections get their own page? Draft in `src/lib/products.ts`: Minakari, Kundan, Contemporary (Festive could be an edit across them)
- [ ] Has the deploy on `main` been failing? `npm run build` fails there on `calendar.tsx` (fixed on `redesign`); check the GitHub Actions tab
- [ ] Content for `/our-story`: founder story, photos, packaging shots?
- [ ] Original vector logo (SVG/AI/PDF) from the designer? Current options: `public/mohak.png` (raster, dark background, used only for social previews) and `BrandLogo.tsx` (hand-made SVG approximation, used in footer and preview). Navbar's `/images/logo.png` is missing.
- [ ] Is @mohakthevibe a Business/Creator account linked to a Facebook Page? (needed for the API)
- [ ] Meta developer app created, and access token and user ID generated?
- [ ] Start with a widget (e.g. Behold) before the Graph API, to avoid 60-day token refresh?
- [ ] **Product names don't match their photos** (already true on the live site). Correct names in `src/lib/products.ts`, or confirm which image belongs to which product:
  | id | Name in data | Photo shows (`imgId` → file) |
  |---|---|---|
  | p1 | Minakari Half Green Jhumka | Blue leaf jhumka (`earring11`) |
  | p2 | Minakari Half Red Jhumka | Black/red chandbali on stand (`earring21`) |
  | p3 | Lotus Minakari Firozi Drop Earrings | Yellow chandbali (`earring3`) |
  | p4 | Lotus Minakari Black Drop Earrings | Aqua kundan drop (`earring4`) |
  | p5 | Lotus Minakari Wine Drop Earrings | Peacock jhumka (`earring20`) |
  | p6 | Green Crystal Kundan Drop Earrings | Green kundan drop (`earring6`), matches |
  | p7 | Gold Plated Rectangular Drop Earrings | Teal paisley jhumka (`earring18`) |
  | p8 | Rose Gold Mirror Rectangular Drop Earrings | Silver oxidised, square stones (`earring8`) |
- [ ] Which 4–6 products are "Signature"? All 8 are shown for now (plan says 4–6)
- [ ] On-model or second photo per product for the hover swap (`hoverImgId`)? Product photography is consistent (warm beige sets); keep that style. Hero photo is good.
- [ ] Hero copy: keep "Wear the vibe." and the placeholder subline, or provide brand wording?

## Status
- [x] 1. Foundations (tokens, SectionHeading, Framer Motion, `products.ts`, shared layout)
- [x] 2. Navbar
- [x] 3. Hero
- [x] 4. Signature Pieces (JewelryCatalog), production build pending (user runs it)
- [ ] 5. Collections (home tiles and `/collections/[slug]`)
- [ ] 6. Our Story (home teaser and `/our-story`)
- [ ] 7. InstagramGrid (live posts and reels)
- [ ] 8. Footer and WhatsAppCTA
- [ ] 9. Polish and QA (sitemap, 404, accessibility, Lighthouse)

## Log
- 2026-10-27: Plan and progress files created. No code changed yet.
- 2026-10-27: Decided light design and the official Instagram API for @mohakthevibe.
- 2026-10-27: Decided "Quiet Heritage" concept, hybrid multipage structure and Framer Motion. Plan, Copilot instructions, blueprint and SETUP updated. No code changed yet.
- 2026-10-27: Decided no per-product pages for now; moved to out of scope.
- 2026-10-27: Added temporary design preview at `/preview` (`src/app/preview/`, noindex). Delete once the real redesign lands.
- 2026-10-27: Added `compact` prop to `BrandLogo` (mark only, navbar size; existing footer unchanged). Preview uses the logo in navbar, gift band and footer. Preview look approved.
- 2026-10-27: Added `docs/architecture.md`. Corrected docs: site is a static export on Firebase Hosting (not App Hosting), auto-deployed on push to `main`; Genkit is fully removed. Instagram plan changed to build-time fetch with a scheduled rebuild.
- 2026-10-27: **Phase 1 done** on `redesign`:
  - Installed Framer Motion 14.7; added `Reveal` and `SectionHeading`/`Eyebrow` (preview now uses them).
  - Tailwind tokens: `text-display-xl/display/display-sm/eyebrow`, `py-section`, `max-w-site`, `ease-out-soft`.
  - Light theme now Ivory-led (`--background` Soft Ivory, Midnight text, warm borders).
  - `src/lib/products.ts` (products, draft collections) and `src/lib/site.ts` (WhatsApp/Instagram/marketplace links); all components use them.
  - Home moved to `src/app/(site)/` with a shared layout (Navbar, Footer, WhatsAppCTA).
  - `firebase.json`: `cleanUrls`, no SPA rewrite (real 404s), images cached 1 day instead of 1 year.
  - Deleted unused `ui/calendar.tsx`, which broke `npm run build`.
  - Verified: typecheck clean, production build exports `/`, `/preview`, `404`; dev server renders `/` and `/preview`, unknown URL returns 404.
- 2026-10-27: **Phase 2 done** on `redesign`:
  - Navbar rewritten: centred `<BrandLogo compact />` (replaces the missing `logo.png` and its `innerHTML` fallback), links split left/right, Instagram icon, ThemeToggle.
  - Transparent at the top of the home page only; solid blurred Ivory bar with a gold hairline on scroll and on other pages.
  - Removed the non-working search button and the Flipkart/Meesho logo images; marketplaces now appear as quiet text links in the mobile menu.
  - Mobile menu: full-screen, large serif links, closes on Escape or link tap, `aria-expanded`/`aria-controls`.
  - Links come from `NAV_LINKS` in `src/lib/site.ts`; they point to home anchors (`/#festive`, `/#catalog`, `/#brand-story`, `/#contact`) until phases 5–6 add real pages.
  - Smooth scrolling (motion-safe) with `scroll-padding-top` for the fixed bar.
  - Follow-up for phase 3: when the hero becomes a full-bleed dark image, make the transparent navbar text white (`overHero` in `Navbar.tsx`). Done in phase 3.
- 2026-10-27: **Phase 3 done** on `redesign`:
  - Hero rewritten: full-bleed photo, "Wear the *vibe.*" headline, one copper CTA ("Explore the Collection") plus an "Our Story" text link, staggered `Reveal` entrance, subtle scroll parallax (off with reduced motion).
  - Desktop: text on the left over a left-to-right dark gradient. Mobile: photo fills the top ~78% and fades into Midnight so the earring stays clear of the text.
  - Removed the split layout, decorative circle, vertical "INSTAGRAM" text and arrow; deleted the unused `.vertical-text` and `.logo-shadow` CSS.
  - Hero image: `public/images/hero.webp` (56 KB, generated from `header.png`, 1.8 MB). The PNG is kept as the source.
  - Navbar text is white while transparent over the hero.
  - Fixed a hydration mismatch in `Reveal` for reduced-motion visitors (now uses `MotionConfig reducedMotion="user"`: fade only, same server/client markup).
  - Hero/navbar section links come from `PAGE_LINKS` in `src/lib/site.ts`.
  - Verified with headless Edge screenshots at 1440px and a true 390px width (via iframe; headless Edge's minimum window is 496px). No console hydration warnings on `/` or `/preview`. Production build passes; home first-load JS is 208 KB (Framer Motion is most of the increase).
  - Hero copy ("Handpicked Indian jewellery", "Jewellery that carries the craft of India…") is placeholder; confirm or replace.
- 2026-10-27: Decided to keep the "Our Essence – Wear Your Vibe, Own the Room." section (`BrandStory.tsx`) unchanged. Plan phase 6 updated: no redesign of this section; `/our-story` will reuse its visual language.
- 2026-10-28: **Phase 4 done** on `redesign`:
  - `JewelryCatalog` rewritten as "Signature Pieces / The ones she *keeps*" using `SectionHeading` and `Reveal`; now a server component (less client JS).
  - 3:4 cards with 1px gold hairline, collection label, Title Case name, single price; gentle zoom on hover, or crossfade when a product has `hoverImgId`.
  - Removed "SALE", strikethrough prices, the generic tag line, the dead arrows and pagination dots, and the blue/purple Flipkart/Meesho buttons.
  - Marketplace links are quiet text ("Flipkart · Meesho", plus Amazon when a product has a link) with descriptive `aria-label`s; "Shop the full range on Flipkart · Meesho" under the grid.
  - `products.ts`: dropped `oldPrice` and `tags`, prices as "₹199", names in Title Case, added `hoverImgId` and `getCollection()`.
  - Images: every earring image referenced in `placeholder-images.json` converted to WebP (max 1200px, quality 80): 26.6 MB → 2.2 MB. Originals kept. Preview uses the WebP files too. "Our Essence" looks the same (format change only).
  - Fixed `cn()`: `tailwind-merge` treated the custom `text-eyebrow`/`text-display*` sizes as colours and dropped them when combined with a colour class (broke `Eyebrow` labels). Registered them via `extendTailwindMerge` in `src/lib/utils.ts`.
  - Verified: typecheck clean; headless Edge screenshots at 1440px and true 390px; no hydration warnings. **Production build not run** (user runs builds).
