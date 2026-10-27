# Redesign Progress

Update this file after each task. Plan: `docs/redesign-plan.md`.

## Decisions
- Direction: **light / Ivory-led** (dark Mohak Mode must still work)
- Concept: **"Quiet Heritage"** (Indian craft, editorial restraint)
- Instagram: **official Graph API**, account https://www.instagram.com/mohakthevibe/
- Positioning: **brand-first site**; marketplaces (Flipkart, Meesho, Amazon) are secondary buy links
- Structure: **hybrid multipage**: `/`, `/collections/[slug]`, `/our-story`. **No per-product pages** for now
- Animation: **Framer Motion** (install in phase 1)
- Logo: **`BrandLogo` SVG** (compact mark in navbar, full logo in footer); `mohak.png` for social previews only
- Look: **approved** via `/preview`
- References: Indian sites first (Giva, Palmonas, Tanishq); see `docs/redesign-plan.md`

## Open questions
- [ ] Amazon product links to add alongside Flipkart and Meesho?
- [ ] Per-product marketplace URLs (currently every card links to a store search)?
- [ ] Which collections get their own page (Minakari, Kundan, Festive, others)?
- [ ] Content for `/our-story`: founder story, photos, packaging shots?
- [ ] Original vector logo (SVG/AI/PDF) from the designer? Current options: `public/mohak.png` (raster, dark background, used only for social previews) and `BrandLogo.tsx` (hand-made SVG approximation, used in footer and preview). Navbar's `/images/logo.png` is missing.
- [ ] Is @mohakthevibe a Business/Creator account linked to a Facebook Page? (needed for the API)
- [ ] Meta developer app created, and access token and user ID generated?
- [ ] Start with a widget (e.g. Behold) before the Graph API, to avoid 60-day token refresh?
- [ ] Do we have high-quality, consistent product, on-model and hero images or video?

## Status
- [ ] 1. Foundations (tokens, SectionHeading, Framer Motion, `products.ts`, shared layout)
- [ ] 2. Navbar
- [ ] 3. Hero
- [ ] 4. Signature Pieces (JewelryCatalog)
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
