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
- [x] Deployed: `redesign` merged to `main` (`f1177de`) on 2026-10-30

## Catalog (next project)
Plan: `docs/catalog-plan.md`. Branch: `catalog`. Google Sheet + Cloudinary, categories (earrings, pendants, bracelets), 100–150 products.
- [x] C0. Setup (owner): Cloudinary account, Google Sheet published as CSV with test products (12 valid rows on 2026-11-03). Still to do: real product data.
- [x] C1. Data layer (`catalog.ts`, fallback, validation, Cloudinary helper)
- [x] C2. Category pages (`/shop/[category]`, sitemap)
- [x] C3. Navigation and home (Shop links in navbar/footer, home `CategoryTiles`). Featured products on home were done in C1.
- [x] C4. Large catalog UX: type filter chips and "Load more" (24 per page) on category pages (`CategoryProducts.tsx`); new optional `type` sheet column. No search box yet (discussed: only needed past ~50 products; would reuse this component). Optional `tags` column not added.
- [x] C5. Scheduled refresh and docs. **Hosting moved from Firebase to Vercel** (one URL: https://mohakthevibe.vercel.app, `SITE_URL` in `site.ts` used by sitemap, robots and metadata). Firebase workflow and config removed; `vercel-rebuild.yml` triggers a Vercel Deploy Hook every 3 hours / on demand; `SETUP.md` has "Product catalog" and the Vercel settings. **Owner: in Vercel add env var `CATALOG_SHEET_CSV_URL`; create a Deploy Hook and add GitHub secret `VERCEL_DEPLOY_HOOK_URL`.**
- [ ] C6. Full data entry and QA, then merge. QA run 2026-11-05 on the live sheet (44 rows): 0 skipped, 0 broken image links, every row has a Flipkart or Meesho link, 8 featured. Findings: `id_01`–`id_15` are repeated test rows (5 distinct names ×2–3) to delete or set `active = no`; categories earrings 36 / pendants 5 / bracelets 3. Typecheck, lint and build (18 pages) pass. Merge to `main` after the Vercel env var is set.

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
- 2026-10-28: Added YouTube link (`SITE_LINKS.youtube`: navbar, mobile menu, footer) and "Developed by Otical" credit in the footer.
- 2026-10-28: Added `/terms-and-conditions` and `/privacy-policy` (shared `LegalPage`), linked from the footer Explore column and listed in the sitemap. **Draft text: needs the owner's review.**
- 2026-10-28: Moved contact to its own `/contact` page: `ContactSection` (new `firstScreen` prop: h1 and CSS `FadeIn`) plus new `FaqSection` (ordering/shipping, returns, care) with FAQPage JSON-LD. Removed the section from the home page; `GiftBand` now links to "Contact & FAQs". `PAGE_LINKS.contact` is `/contact`; sitemap updated. **FAQ answers are drafts (delivery times, returns via marketplace): confirm.**
- Not yet verified: a browser check for phase 4 and the changes above.
- 2026-10-30: **Lint set up and passing.** `next lint` had generated `.eslintrc.json` with `eslint-config-next@16`, which crashes on Next 15 ("Converting circular structure to JSON"). Pinned `eslint-config-next@15.5.9`, added `@eslint/eslintrc`, replaced `.eslintrc.json` with flat `eslint.config.mjs` (`next/core-web-vitals`, `next/typescript`). Turned off `react/no-unescaped-entities` (plain quotes in brand copy, `BrandStory.tsx` kept as is); removed the `any` in `placeholder-images.ts`. 0 errors, 2 pre-existing warnings (`layout.tsx` font link, `use-toast.ts`).
- 2026-10-30: **Production build passes**: 15 static pages incl. `/contact`, `/terms-and-conditions`, `/privacy-policy`. Home first-load JS 171 kB, `/contact` 189 kB (form and accordion). A stale `.next` from the Turbopack dev server breaks `/404` export with `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`: delete `.next` and rebuild.
- Note: `next lint` is deprecated in Next 16; migrate to the ESLint CLI when upgrading.
- 2026-10-30: Owner checked the home page in the browser: all content visible. Footer credit shortened to "Developed by Otical" on the copyright line.
- 2026-10-30: **Pre-deploy cleanup**: deleted `src/app/preview/` (temporary design mock), removed its `disallow` from `robots.ts` and its note from the Copilot instructions. `npm run build` passes: 14 static pages.
- 2026-11-03: Catalog plan written (`docs/catalog-plan.md`), sheet template (`docs/catalog-template.csv`), sheet published; URL in `.env.local` (git-ignored).
- 2026-11-03: **Catalog C1 done** on `catalog` (no visible change):
  - New `src/lib/catalog.ts`: `getProducts()` reads the published CSV at build time (10 s timeout, one fetch per build worker), parses with `papaparse`, validates rows with zod, skips bad rows with the row number and reason in the build log, ignores rows with no id and no name, drops `active = no`, sorts by `sort` then `id`, formats price as `₹1,299`. No URL, HTTP error, network error or 0 valid rows → `fallbackProducts`. Never throws.
  - Images must be Cloudinary URLs (`res.cloudinary.com/<cloud>/image/upload/`); template placeholders (`YOUR_…`, `REPLACE_WITH…`) count as empty. `cloudinaryUrl(url, width)` adds `f_auto,q_auto,c_limit,w_<n>`; local `/images/...` pass through. `res.cloudinary.com` added to `next.config.ts` `remotePatterns`.
  - `products.ts`: new `Category` type and `categories` (earrings, pendants, bracelets); `Product` now has `category`, optional `collection`, `image`/`hoverImage` URLs and `featured`; old `products` renamed `fallbackProducts` (all earrings, images by id). Helpers take the product list as an argument; added `getCategory`, `getProductsByCategory`.
  - `JewelryCatalog` (featured products, else first 8), `CollectionTiles` (counts) and `/collections/[slug]` are now async server components using `getProducts()`. `CollectionTile` takes a `count` prop. `ProductCard` renders `product.image` through `cloudinaryUrl`.
  - Verified: parser check with valid rows, quotes and commas in names, `₹1,299`, duplicate id, unknown category, bad price, Drive URL, missing id, hidden row, unknown collection; real sheet (placeholder rows skipped → fallback). Typecheck, lint (0 errors), build: 14 pages, home first-load JS unchanged (171 kB). Exported home and collection pages show the same 8 products and counts as before.
  - Real sheet note: row 5 has a name but no `id`.
- 2026-11-03: Owner added the first real product to the sheet (`ear-002`, studs). Live-sheet check: 1 valid product, Cloudinary resizing applied, Flipkart and Meesho links used. **While the sheet has any valid row, it replaces the fallback list**, so the other collections show 0 pieces until their products are added to the sheet.
- 2026-11-03: Added the **Studs** collection in code (`slug: "stud"`, matching the sheet value). `Collection.coverImageId` is now optional: without it the cover is the first product's photo (new `collectionCover`/`collectionCoverSource` in `ProductCard.tsx`, used by home tiles, collection page, metadata). `CollectionTile` takes `cover` and `wide` props; with an odd number of tiles the last one spans the full row (`spansFullRow`), on the home page and in "More collections". Build passes with `/collections/stud` (15 pages); footer, sitemap and other collection pages pick it up automatically.
- 2026-11-03: **Catalog C2 + C3 done** on `catalog`:
  - New `/shop/earrings`, `/shop/pendants`, `/shop/bracelets` (`(site)/shop/[category]/page.tsx`): intro with `LayeredImages`, product grid, "Coming soon" state when empty (noindex, not in sitemap), "More to shop" tiles. `sitemap.ts` is async and lists non-empty categories (priority 0.9). Shared `productGridClass()` in `ProductCard.tsx`; `CollectionTile` accepts `href`. Build: 18 pages.
  - Home: new `CategoryTiles` ("Shop by category") above the collections. Navbar: Earrings / Pendants / Bracelets / Collections on the left (the "Signature" link was removed from nav and footer; the section is still on the home page). `SHOP_LINKS` added to `site.ts`.
  - Images: Flipkart (`rukminim*.flixcart.com`) and Meesho (`images.meesho.com`) image URLs are now accepted in `image`/`hover_image` besides Cloudinary (not resized; hosts added to `next.config.ts`). Rows 6, 11, 16 of the sheet were previously skipped for this reason.
  - Footer: "Explore" split into Shop (categories + collections) and Company (Our Story, Contact, legal, "Also available on"); trust line (`TRUST_POINTS`: free shipping, easy returns, secure checkout on Flipkart & Meesho: **owner to confirm these claims**); GSTIN (`CONTACT.gstin`) in the copyright line; two columns on phones.
  - Sheet data notes: `id_04` "Studs Earrings" is under `pendants` (likely a typo); rows are repeated test data.
  - Open: "Studs" is really an earring type, not a style. Option: add a `type` column and type filter chips on category pages in C4 (not decided).
  - The dev-console hydration warning about `<head data-locator-hook-status-message>` comes from a browser extension, not the code.
- 2026-11-05: **SEO pass** on `catalog`: root metadata rewritten (title "Mohak The Vibe | Artificial Earrings, Pendants & Bracelets Online India", keywords, `en_IN`, optional Google verification via env `GOOGLE_SITE_VERIFICATION`); new social preview `public/og-image.jpg` (1200×630 crop of the hero photo, 64 KB; replaces the dark logo); JSON-LD via `src/lib/seo.ts` + `JsonLd.tsx`: `OnlineStore` (name aliases "Mohak", "MohakTheVibe", GSTIN as `taxID`, sameAs links), `WebSite`, `BreadcrumbList` (category + collection pages), `CollectionPage`/`ItemList` with `Product` offers (INR) on category pages (first 40). Categories got `seoTitle`, `seoDescription` and visible "About our …" text. Home canonical added. Owner steps: Search Console (add property, submit `/sitemap.xml`), Google Business Profile, backlinks from Instagram/YouTube/Flipkart/Meesho profiles, optional custom domain. Product rich results need per-product pages (not built). the build reads all of them (published CSV updates by itself, no republish needed; restart `npm run dev` after sheet edits). **C4 done**: types vs collections decided (option 2). New optional `type` column (stud, hoop, jhumka, chandbali, korean...); category pages show filter chips (when 2+ types) and "Load more" via client component `CategoryProducts`. Backwards compatible: an unknown value in `collection` is used as the product's `type`, and the `stud` collection also counts as type "stud", so the current sheet works without edits (move types into a `type` column when convenient). `typeLabel()` in `products.ts` names the chips. Image helpers moved to `src/lib/images.ts` (client-safe; `catalog.ts` re-exports `cloudinaryUrl`). Build: 18 pages, `/shop/[category]` 4 kB.
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
- 2026-11-14: **SEO & premium phases 1–3 done** (typecheck and lint only; not built or visually tested).
  Plan: `docs/seo-premium-plan.md`.
  - **Phase 1, metadata.** New `socialMeta()` in `seo.ts` is the single source of Open Graph and Twitter
    tags. Next merges `metadata` shallowly, so every page that wrote its own `openGraph` was silently
    dropping the image, site name, locale and type — confirmed in the old `out/our-story.html`, which had
    only `og:title` and `og:description`. All eight sub-pages now spread `socialMeta()`.
  - Root layout uses a title template (`%s | Mohak The Vibe`); pages set a bare title. Brand suffix is now
    one consistent form (the en-dash `BRAND_NAME` stays for JSON-LD only). Category `seoTitle` values
    shortened so the suffix fits inside Google's truncation.
  - `lang="en-IN"`; `sitemap.ts` gained `lastModified` — build date for catalogue pages (they really do
    change per build), fixed dates for editorial and legal pages, since a build-date lastmod on unchanged
    pages is what makes search engines ignore lastmod everywhere.
  - FAQ JSON-LD moved out of an inline `<script>` in the contact page into `faqJsonLd()` + `<JsonLd />`.
  - **Phase 2, performance.** Fonts now self-hosted via `next/font/local` (files in `src/app/fonts/`,
    variable-weight latin WOFF2) as CSS variables (`--font-body`, `--font-headline`), read by
    `tailwind.config.ts`. First tried `next/font/google`, which failed the build on the user's network
    (the loader crashed parsing Google's response), so don't switch back. Removed the render-blocking
    `fonts.googleapis.com` stylesheet and two preconnects. `BrandLogo` had `'Playfair Display'` hardcoded
    in an inline style — next/font renames the family, so it now points at `var(--font-headline)`.
  - `public/images/` 38 MB → 8.3 MB: deleted 17 PNG/JPEG originals that each had a `.webp` sibling (26 MB,
    nothing unique lost), converted `pratibha2.png` 2.06 MB → `pratibha2.webp` 97 KB (same 924×1152).
    Rewrote the stale `README.txt`, deleted the duplicate `INSTRUCTIONS.txt`.
  - **Phase 3, product structured data.** One shared `productOffer()` feeds both `productJsonLd()` and
    `categoryJsonLd()` so they cannot drift. Added `priceValidUntil` (build + 1 year; its absence warns on
    every product in Search Console) and `itemCondition: NewCondition`.
  - Shipping and returns markup is **built but switched off**: `MERCHANT_TERMS` in `site.ts` is `null`
    until the real Flipkart/Meesho terms are confirmed. `TRUST_POINTS` says "Free shipping, Easy returns",
    but marketplaces fulfil the orders under their own policies, so it cannot be copied across. Set both
    fields to turn the markup on.
  - **Phase 2c not done** (needs a build to measure): framer-motion is used by `Reveal` (every page),
    `Hero` and `FooterWordmark`, so dropping it means converting all three. Measure first — see the
    ~208 KB first-load note under Known issues in `architecture.md`.
- 2026-11-14: **SEO & premium phase 4 done** (typecheck only). Branch `seo-premium`.
  - New optional sheet columns `rating` and `review_count` (documented in `catalog-plan.md`, added to
    `catalog-template.csv`). `parseRating()` in `catalog.ts` needs both, a rating from 1 to 5 and a whole
    count of at least 1; anything else gives the product no rating and logs a warning. It never skips the
    row, so a typo in optional data cannot remove a product. Checked with a throwaway script: valid,
    empty, half-filled, out-of-range, zero and fractional cells all behave, 0 rows skipped.
  - `Product.rating` drives both the small star line under the price on the product page and
    `aggregateRating` in `productJsonLd()`, so the markup and the visible numbers cannot disagree (Google
    requires them to match). Cards deliberately show no stars, to keep the grid quiet.
  - **To use:** copy the real average and count from each product's Flipkart or Meesho listing into the
    sheet. Never estimate. Ratings are rounded to one decimal.
- 2026-11-14: **SEO & premium phase 5 done** (typecheck only). Branch `seo-premium`.
  - **5a, category copy.** `Category.about` is now sections (`{heading, paragraphs}`) rendered as real `<h2>`s
    in their own section, plus per-category `faqs` shown through `FaqSection` (now takes a `groups` prop).
    Page order alternates backgrounds: pieces, copy, FAQ, other categories. Body is 243-265 words per
    category, 330-370 with the FAQ. **These are drafts: the brand must read and correct them before merging.**
  - Copy states only what is true of every piece: "gold-tone", with no base-metal, plating, anti-tarnish or
    oxidised claims (the answer on claims was ambiguous, so the cautious reading was used). Pendants and
    bracelets have only 2 products each, so their copy says "small, considered selection"; revisit when the
    range grows. FAQ answers avoid delivery times and return terms, which the marketplaces decide.
  - **5b, material and size.** New optional free-text sheet columns `material` and `size` (documented in
    `catalog-plan.md`, added to the CSV template). Shown as a small spec list on the product page and sent as
    `material` / `size` in the Product JSON-LD.
  - **5c, descriptions.** Audit of the live sheet: 23 of 34 products have no `description`. The fallback meta
    description now includes material and size when they are filled in. The real fix is writing those 23
    descriptions in the sheet.
  - **5d, internal links.** New `InlineLinks` renders `[label](/path)` in data-file copy as links. The three
    category pages now link into collections and sister categories (13 links). Our Story not touched yet.
  - Not changed: the existing `description` / `seoDescription` text on categories and collections still
    mentions "oxidised" and "gold-plated"; confirm those are true or reword.
- 2026-11-14: Collection pages: "More collections" is now three across from 768px up (6-column grid, tiles
  span 2; a leftover single tile spans the row, a leftover pair spans half each). `threeAcross()` in
  `CollectionTiles.tsx`. Category pages keep two across (they only ever show 2 others).

- 2026-11-14: **SEO & premium phase 6 done: Journal** (typecheck, plus two real builds, see below). Branch
  `seo-premium`. Articles are `.mdx` files in `content/journal/`; how to write one is in
  `content/journal/README.md`, and `_template.mdx` is a copy-me starting file (files starting `_` never publish).
  - New dependency `next-mdx-remote` (compiles MDX at build time inside server components). Chosen over
    `@next/mdx`, whose loader config is fragile with the Turbopack dev server.
  - `src/lib/journal.ts` reads and validates the files (zod) like the sheet catalog does: a file with bad front
    matter is skipped and logged, never fails the build. `draft: true` hides an article; a future `date`
    schedules it (the 3-hourly rebuild publishes it). Own tiny front-matter parser (CRLF-safe), no extra dependency.
  - Pages `/journal` and `/journal/[slug]`, `JournalCard`, `JournalBody` (maps MDX elements to the site's
    type scale), `BlogPosting` JSON-LD, `og:type=article` with published time, sitemap entries, "Shop <category>"
    button and "More from the journal" row. `socialMeta()` gained an `article` option.
  - The **Journal link in the navbar, mobile menu and footer only appears once an article is published**
    (`hasJournal()`, `navLinksRight()` in `site.ts`). With none: no nav link, no sitemap entry, `/journal` is noindex.
  - **Found by building, fixed:** with zero published articles `generateStaticParams()` was empty and static export
    refuses that (`missing "generateStaticParams()"`), which would have broken the deploy. With none, the route now
    generates one placeholder page (`/journal/no-articles-yet`, noindex, "Coming soon") that disappears once an
    article exists. Verified with two builds: with 1 valid + 1 bad + 1 draft + 1 future article (only the valid one
    published, bad one logged), and with 0 articles (clean build, no nav link, no sitemap entry).
  - Deviation from the no-build-per-phase rule: made on purpose, because a new dependency and an empty default state
    could have broken the user's deploy.
  - MDX can run code, so only commit text from the team (noted in the README).
- 2026-11-14: **First four journal articles written** (drafts for the brand to read and correct before merging):
  `minakari-vs-kundan-how-to-tell-the-difference`, `how-to-care-for-artificial-jewellery`, `how-to-style-jhumkas`,
  `how-to-choose-earrings-as-a-gift`. Covers are existing site photos. Build passes with 4 articles; every internal
  link in them resolves; titles are at most 60 characters including the " | Mohak The Vibe" suffix.
  - They make no material, plating, finish or anti-tarnish claim about the brand's pieces. Traditional crafts are
    described as the crafts the pieces are "inspired by", matching the collection pages. Care advice is generic.
    Facts to confirm: Jaipur as a well-known Minakari centre, and Kundan's traditional gold-foil setting.
  - Dated 3, 6, 10 and 12 November 2026 so they are live immediately; change `date` or add `draft: true` to hold one.
  - README title guidance corrected: the site adds 18 characters to every title, so keep the title under about 42.
- 2026-11-14: **Two more journal articles** (drafts for brand review): `studs-vs-hoops-which-earrings-suit-you`
  (13 Nov) and `earrings-for-a-wedding-guest-outfit` (14 Nov), same rules as the first four (no material or finish
  claims, generic advice). Six articles total, 520-614 words each. Checked without a build: front matter validates,
  MDX compiles, every internal link resolves, titles are at most 59 characters with the suffix. A bad link slug
  (title wording instead of the real slug) was caught and fixed before commit.
  - A full build was not possible at that moment: the running Turbopack dev server shares the `.next` folder and
    the build failed with `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'` (the known `.next` clash in
    architecture.md). Stop the dev server before running `npm run build`.
- 2026-11-14: **SEO & premium phase 7 done: cards, gold, buttons** (typecheck only; not seen in a browser).
  Grid stays four across by the user's decision (the plan's three-across idea was dropped).
  - **Cards:** photo, name and price only. The "Flipkart · Meesho" links are gone from the card (they are on the
    product page and the phone buy bar). A product with no listing keeps a quiet "Ask on WhatsApp" link, so it
    still has a way to buy. New `hasListings()` helper in `ProductCard.tsx`.
  - **Gold:** 23 faint gold hairlines (`border-brand-gold/10` to `/30`: footer, navbar, cards, gallery, FAQ, contact,
    journal, promise strip) became the neutral warm `border-border`. Gold stays on labels, icons, hover and active
    states and the journal quote rule. `BrandStory.tsx` untouched (kept as is by decision).
  - **Buttons:** new `cta` colour token (`globals.css` + `tailwind.config.ts`): Midnight with Ivory text in light
    mode, flipped in dark mode. Used by the product-page buy button, `MobileBuyBar` and the wishlist CTA. The hero
    button is Ivory with Midnight text because it sits on a dark photo (a Midnight button would vanish there).
    Copper stays only on the wishlist heart and count badge. **Colour is my recommendation, not confirmed by the
    user.** To revert: set `--cta` to `21 45% 49%` and `--cta-foreground` to `0 0% 100%` in both themes.
  - Also in the footer commit, which carries both the hairline swap and the layout rework: four columns, Get in
    touch under the logo, Collections in its own column, "Also available on" under Shop as three lines (the user
    edited the WhatsApp label to "WhatsApp").
- 2026-11-14: **SEO & premium phase 8 done: typography and motion** (typecheck and lint only; motion not seen).
  - **Typeface decision:** compared Playfair Display with Cormorant Garamond side by side (throwaway page, since
    deleted); the user chose to **stay on Playfair**. No font change.
  - **Eyebrow labels:** `text-eyebrow` is 11px everywhere (was 10px, 11px on phones only), tracking trimmed from
    0.35em to 0.28em so each label stays about as wide (the navbar is tight at laptop widths). The phone-only override in
    `globals.css` was removed.
  - **Image reveal:** new `ImageReveal` (client): product photos wipe open from the top while settling from a 1.12
    zoom, once, on scroll into view. Used in `ProductCard`. Reduced-motion visitors get plain images via a CSS
    override (`.image-reveal`), not a hook, so server and client markup match. Like `Reveal`, it is hidden until
    JavaScript runs, so it is not for first-screen images.
  - **Hero:** the photo does a slow one-time push-in (22s, scale 1 to 1.07, toward the earring); `motion-safe:` only.
  - **Staggers:** left alone. Card grids already stagger by position in the row (`i % 4`); only short lists use a
    plain `i * n`, so the flat-stagger problem the plan feared does not exist.
  - **Not done, on purpose:** the line-by-line headline mask reveal. 18 of the 22 `SectionHeading`s already fade and
    rise inside a `Reveal`, so a second headline animation would layer two movements. Revisit only if the headings
    feel flat once seen.

- 2026-11-14: **Gifting** (branch `gifting`, plan in `docs/gifting-plan.md`; typecheck and lint only, not built or seen).
  - Gift box (`useGiftBox`, localStorage `mohak-gift-box`), "Send as a gift" on product pages, Gifting in the navbar
    (with piece count) and footer Shop column. `/gifting`: intro, how it works, the box with quantities and totals,
    gift details, a WhatsApp order asking for gift wrap and no price on the parcel, a marketplace note and an FAQ.
  - Navbar link row moved from 1024px to 1280px: with Gifting it no longer fit; laptops below 1280px use the menu button.
  - Terms and Privacy drafts for direct gift orders (brand to review); Privacy hosting line corrected to Vercel.
  - Open: real bulk threshold (`BULK_HINT_FROM` = 5 assumed), gift card decision, CA advice on the GST invoice,
    return and cancellation rules, gift-wrap photos.

- 2026-11-14: **Mobile audit and fixes** (branch `gifting`; headless Chrome at 320, 360 and 390px against the dev
  server, 17 pages, with a wishlist and gift box filled in; no real devices, no tablet, no dark mode, no Safari).
  - Found: 1 sideways overflow (`/contact` at 320px: the email address was one unbreakable word wider than its card),
    cramped wrapped small labels everywhere (the label style fixed line-height at 1), about 450 undersized tap
    targets per width (footer links 17px, underlined text links 14-16px, 20px social icons), count badges at 9.6px.
  - No broken images, no JavaScript errors.
  - Fixed: `text-eyebrow` line-height 1 to 1.5 (tailwind.config.ts) which also makes every label button about 5px
    taller; new `.tap-area` utility (invisible enlarged hit area) on small text links and breadcrumbs; footer links
    and contact links padded (same visual rhythm), social icons given a 36px hit area; contact card value wraps
    anywhere; badge digits 11px. A footer-copyright `leading-loose` I added earlier **did not work** (a plain
    leading class loses to the label style's own line-height); replaced by the global fix plus `!leading-[1.9]`.
  - Result: overflow 0, cramped text 0, tap-target offenders about 450 to 78, tiny text 87 to 53 (the rest is the
    8px "MOHAK" and "The Vibe" inside the logo SVG, left as is).
  - Left alone on purpose: "Read our story" link in `BrandStory.tsx` (kept as is by decision), product-name links in
    cards (21px; the photo is also a link), the logo text.
  - Dev-server oddity: `/journal`, `/privacy-policy` and `/terms-and-conditions` kept serving the old footer markup in
    the dev server (same shared component, so the code is right); restart the dev server and re-check them.

- 2026-11-14: **Bug fix: homepage product photos never loaded** (introduced by the phase 8 `ImageReveal`; found by the user,
  reproduced in headless Chrome on a production build). The reveal started each photo fully clipped
  (`clip-path: inset(0 0 100%)`) and waited for the browser to report it in view, but browsers measure "in view"
  after clipping, so it was never seen as in view: the reveal never ran and the lazy-loaded photos never started
  loading. Product pages were unaffected (they use the gallery, not the card).
  - Fix: `ImageReveal` now observes an unclipped wrapper and reveals with a card-coloured cover panel that slides away
    (`.image-reveal-cover`, `scaleY` 1 to 0) instead of a clip; the photo and the observed element are never clipped or
    hidden. Reduced motion hides the cover and drops the zoom (CSS).
  - Verified on a production build (65 pages) at 1366 and 390px: 0 of 56 cards across `/`, `/shop/*`, `/collections/*`,
    a product page and the wishlist had an unloaded photo or a cover still showing. A full production build of the
    whole branch passes (it had not been built since phase 7).
  - Lesson: phase 8 was checked with typecheck only, which cannot show a motion or loading bug. Anything that hides
    content until scroll needs one real-browser check.

## Before merging to main
- [ ] Final test checklist below passes
- [ ] Delete `src/app/preview/` (and its `robots.ts` rule)
- [ ] Resolve the `.env` question (see open questions)
- [x] ~~Decide on the original PNG/JPEG images in `public/images/` (~27 MB, no longer used by the site)~~ — done
      2026-11-14, folder is 8.3 MB. Still to confirm: `earring1/2/7/9.png` and `header.png` are unreferenced
      but have no WebP version, so they were left in place rather than deleted
- [ ] Decide whether `MERCHANT_TERMS` in `site.ts` can be filled in (real shipping and returns terms)
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
