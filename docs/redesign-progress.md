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
- Signature pattern: **two framed prints** (large 4:5 + small square overlapping bottom-right), from "Our Essence"; reused via `LayeredImages` on collection pages and `/our-story`
- Testing: **no per-phase builds or screenshots**; finish all phases, then test together (see "Final test checklist")
- Branch: all redesign work on **`redesign`**; merge to `main` (which auto-deploys) only when complete. Delete `src/app/preview/` before merging
- References: Indian sites first (Giva, Palmonas, Tanishq); see `docs/redesign-plan.md`

## Open questions
- [ ] Amazon product links to add alongside Flipkart and Meesho?
- [ ] Per-product marketplace URLs (currently every card links to a store search)?
- [ ] Confirm collections. Built with the draft in `src/lib/products.ts`: Minakari (5 pieces), Kundan (1), Contemporary (2), with placeholder taglines/descriptions. Kundan needs more pieces to feel complete. "Oxidised" may suit the Contemporary pieces better
- [ ] **Security: `.env` is committed to git** (tracked and in history; `.gitignore` only covers `.env*.local`). Check what it contains; rotate any key in it; then untrack it and ignore it (needs your go-ahead)
- [ ] Removed dead footer links (they pointed to `#`): Facebook, Amazon, Shipping Info, Privacy Policy, Terms. Provide the Facebook page and Amazon store URLs to add them back. Privacy/Terms/Shipping pages may be worth adding (the contact form handles names and emails)
- [ ] Has the deploy on `main` been failing? `npm run build` fails there on `calendar.tsx` (fixed on `redesign`); check the GitHub Actions tab
- [ ] Content for `/our-story`: page is built with placeholder copy (intro, four values, "How to shop"). Founder story, real values wording and packaging photos would replace it. Is "Anti-tarnish" accurate for all pieces? It appears in the promise strip on home and story pages
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
- [x] 5. Collections (home tiles and `/collections/[slug]`)
- [x] 6. Our Story (`/our-story`; home "Our Essence" unchanged)
- [x] 7. InstagramGrid (live feed code ready; shows local photos until the token is set up)
- [x] 8. Footer and WhatsAppCTA (plus gift band and contact section)
- [x] 9. Polish (sitemap, robots, 404, first-screen visibility, dark-mode flash, skip link). Lighthouse and QA run in the final test

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
- 2026-10-28: Added YouTube link (`SITE_LINKS.youtube`: navbar, mobile menu, footer) and "Designed & developed by Otical" credit in the footer.
- 2026-10-28: Added `/terms-and-conditions` and `/privacy-policy` (shared `LegalPage`), linked from the footer Explore column and listed in the sitemap. **Draft text: needs the owner's review.**
- 2026-10-28: Moved contact to its own `/contact` page: `ContactSection` (new `firstScreen` prop: h1 and CSS `FadeIn`) plus new `FaqSection` (ordering/shipping, returns, care) with FAQPage JSON-LD. Removed the section from the home page; `GiftBand` now links to "Contact & FAQs". `PAGE_LINKS.contact` is `/contact`; sitemap updated. **FAQ answers are drafts (delivery times, returns via marketplace): confirm.**
- Not yet verified: a browser check for phase 4 and the changes above.
- 2026-10-30: **Lint set up and passing.** `next lint` had generated `.eslintrc.json` with `eslint-config-next@16`, which crashes on Next 15 ("Converting circular structure to JSON"). Pinned `eslint-config-next@15.5.9`, added `@eslint/eslintrc`, replaced `.eslintrc.json` with flat `eslint.config.mjs` (`next/core-web-vitals`, `next/typescript`). Turned off `react/no-unescaped-entities` (plain quotes in brand copy, `BrandStory.tsx` kept as is); removed the `any` in `placeholder-images.ts`. 0 errors, 2 pre-existing warnings (`layout.tsx` font link, `use-toast.ts`).
- 2026-10-30: **Production build passes**: 15 static pages incl. `/contact`, `/terms-and-conditions`, `/privacy-policy`. Home first-load JS 171 kB, `/contact` 189 kB (form and accordion). A stale `.next` from the Turbopack dev server breaks `/404` export with `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`: delete `.next` and rebuild.
- Note: `next lint` is deprecated in Next 16; migrate to the ESLint CLI when upgrading.
- 2026-10-28: **Phase 4 done** on `redesign`:
  - `JewelryCatalog` rewritten as "Signature Pieces / The ones she *keeps*" using `SectionHeading` and `Reveal`; now a server component (less client JS).
  - 3:4 cards with 1px gold hairline, collection label, Title Case name, single price; gentle zoom on hover, or crossfade when a product has `hoverImgId`.
  - Removed "SALE", strikethrough prices, the generic tag line, the dead arrows and pagination dots, and the blue/purple Flipkart/Meesho buttons.
  - Marketplace links are quiet text ("Flipkart · Meesho", plus Amazon when a product has a link) with descriptive `aria-label`s; "Shop the full range on Flipkart · Meesho" under the grid.
  - `products.ts`: dropped `oldPrice` and `tags`, prices as "₹199", names in Title Case, added `hoverImgId` and `getCollection()`.
  - Images: every earring image referenced in `placeholder-images.json` converted to WebP (max 1200px, quality 80): 26.6 MB → 2.2 MB. Originals kept. Preview uses the WebP files too. "Our Essence" looks the same (format change only).
  - Fixed `cn()`: `tailwind-merge` treated the custom `text-eyebrow`/`text-display*` sizes as colours and dropped them when combined with a colour class (broke `Eyebrow` labels). Registered them via `extendTailwindMerge` in `src/lib/utils.ts`.
  - Verified: typecheck clean; headless Edge screenshots at 1440px and true 390px; no hydration warnings. **Production build not run** (user runs builds).
- 2026-10-28: **Phase 5 done** on `redesign`:
  - Home: `FestiveCollections` carousel replaced by `CollectionTiles` ("Collections / Crafted *stories*"): tall Minakari tile beside stacked Kundan and Contemporary tiles, each with tagline, piece count and hover arrow. Section id `collections`; `PAGE_LINKS.collections` is now `/#collections`. `FestiveCollections.tsx` deleted (restore from git if wanted).
  - New static pages `/collections/minakari`, `/collections/kundan`, `/collections/contemporary`: breadcrumb, tagline, large title, description, piece count beside the "Our Essence" two-prints layout (`LayeredImages`: cover + another piece; Kundan shows the cover only), product grid (small collections centred), "Shop the full range", tiles for the other collections. Unknown slugs 404.
  - Per-collection title, description, canonical URL and Open Graph/Twitter image; `metadataBase` added to the root layout. Site description no longer mentions the removed AI stylist.
  - Shared `ProductCard`/`ShopFullRange` extracted from `JewelryCatalog`; collections gained a `description` field; covers chosen by photo (Minakari: black/red chandbali, Kundan: green kundan, Contemporary: oxidised silver chandbali).
  - Checked before the no-testing decision: routes and 404, metadata, no hydration warnings, desktop and 390px screenshots of tiles and pages (single-print version). The two-prints intro was added after and is not visually tested. Typecheck clean.
- 2026-10-28: **Phase 6 done** on `redesign` (typecheck only, not visually tested):
  - New `/our-story` page: intro ("Wear your vibe, *own the room.*") beside the two framed prints (Our Essence photo + pink peacock jhumka), promise strip, four values (Curated craft, Made to last, Ready to gift, Boutique service), Midnight pull-quote band with the existing brand quote, "How to shop" in three steps, links to collections and WhatsApp. Own title, description and canonical URL.
  - New `PromiseStrip` (Handpicked · Anti-tarnish · Gift-ready · Pan-India delivery), also added on home directly under the hero.
  - Navbar and hero "Our Story" links now open `/our-story` (`PAGE_LINKS.story`).
  - `BrandStory.tsx` ("Our Essence") untouched.
  - Copy is placeholder, based on the existing Our Essence wording; see open question.
- 2026-10-28: **Phase 7 done** on `redesign` (typecheck only, not visually tested):
  - `InstagramGrid` rewritten as a server component: "@mohakthevibe / Worn by *you*", edge-to-edge 3×2 (mobile) / 6×1 (desktop) grid, hover overlay, play badge for reels, "Follow us on Instagram" link.
  - `src/lib/instagram.ts`: build-time fetch of the latest 6 posts when `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` are set; 10 s timeout; on any error logs a status (never the token) and falls back.
  - Fallback: local photos `insta-post-1…6` (added 5 and 6) linking to the profile. This is what the site shows until the API is set up.
  - Deploy workflow passes the two GitHub secrets to `npm run build`; daily `schedule` added but commented out (would redeploy `main` daily). Steps to switch on in `docs/redesign-plan.md`.
  - Found: `.env` is committed to git (see open questions). Not read, not changed.
- 2026-10-28: **Phase 8 done** on `redesign` (typecheck only, not visually tested):
  - Footer rewritten as a server component on the Ivory background: logo and line, Instagram/WhatsApp icons; Explore (collection pages, Signature, Our Story, Contact); Also available on (Flipkart, Meesho, WhatsApp Catalogue); Get in touch (location, tap-to-call phone, mailto email); oversized faded MOHAK wordmark; copyright year from the build date.
  - Removed dead `#` links (Facebook, Amazon, Shipping Info, Privacy Policy, Terms); see open question.
  - `WhatsAppCTA`: Midnight/gold 48px button instead of the bright green floating one; fades in after scrolling past the first screen; opens a chat with a prefilled hello (was the catalogue).
  - New `GiftBand` ("Every piece arrives *gift-ready.*") on home between Instagram and Contact.
  - `ContactSection` restyled with the redesign tokens and `SectionHeading`, dark-mode aware; adds a WhatsApp line; form logic unchanged.
  - New `CONTACT` in `site.ts`; no contact details hardcoded in components any more.
- 2026-10-28: **Phase 9 done** on `redesign` (typecheck only, not visually tested). **All nine phases are implemented.**
  - `sitemap.ts` and `robots.ts` (static; robots disallows `/preview`).
  - Branded 404 (`app/not-found.tsx`: "This piece has *wandered off.*", links home and to collections, `noindex`).
  - New CSS-only `FadeIn` (`animate-reveal`) replaces `Reveal` in the hero and the collection/story page intros, so first-screen content shows without waiting for JavaScript (fixes the blank-page risk seen in phase 5, helps LCP).
  - Inline script applies the saved dark mode before first paint (no light flash).
  - "Skip to content" link; `main#main` on all pages.
  - Cleanup: removed the dead logo entries from `placeholder-images.json` and unused CSS (`dashed-link`, `font-serif-italic`, `animate-fade-in`).
  - Not done by design: `loading.tsx` (pages are pre-built HTML, no loading state needed); Lighthouse (part of the final test).

## Before merging to main
- [ ] Final test checklist below passes
- [ ] Delete `src/app/preview/` (and its `robots.ts` rule)
- [ ] Resolve the `.env` question (see open questions)
- [ ] Decide on the original PNG/JPEG images in `public/images/` (~27 MB, no longer used by the site)
- [ ] Confirm or replace placeholder copy: hero subline, collection descriptions, `/our-story`, product names
- [ ] Merge `redesign` into `main` (this deploys the live site)

## Final test checklist
Run after all phases (user builds with `npm run build`, then `npx serve out`):
- [ ] Production build passes and exports `/`, `/collections/*`, `/our-story`, `/preview`, `404`
- [ ] Home, desktop and mobile: hero crop and text, navbar transparent → solid on scroll, mobile menu
- [ ] Collection pages: two-prints intro (small print from 1024px up), Kundan single-piece layout, "More collections" tiles
- [ ] Signature Pieces cards, quiet marketplace links open the right store in a new tab
- [ ] "Our Essence" unchanged (two framed prints, floating circle)
- [ ] `/our-story`: two-prints intro, promise strip, values, quote band (dark in both modes), "How to shop" steps
- [ ] Promise strip under the hero on home (2 columns on mobile)
- [ ] Dark mode on every page
- [ ] Reduced-motion setting: content visible, no movement
- [ ] Unknown URL shows the branded 404 page with navbar and footer
- [ ] `/sitemap.xml` lists home, our-story and the three collections; `/robots.txt` disallows /preview
- [ ] Dark mode: reload with dark mode saved, no light flash
- [ ] Keyboard: Tab shows "Skip to content" first; menu, links and form reachable
- [ ] Lighthouse (performance, accessibility, SEO) on home and one collection page
- [ ] Instagram section: 6 local photos without a token; with a token in .env.local, live posts and reel badges
- [ ] Footer (both modes), gift band, contact form (validation messages, opens email app), WhatsApp button appears after scrolling and opens chat with the prefilled message
