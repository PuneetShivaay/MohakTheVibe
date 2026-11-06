# Premium & Interactive Plan

Step-by-step upgrades on top of the redesign and catalog work. No backend: everything is built from the
Google Sheet at build time or stored in the visitor's browser. `tsc` per phase; the user tests at the end.

## Status
- [x] 1. Homepage cleanup
- [x] 2. Product detail pages (`/product/[id]`) + sheet columns `description`, `image2`/`image3`/`image4`... (main photo column renamed `main_image`)
- [ ] 3. Mobile gallery: swipe on product pages, tap/swipe to the on-model photo on cards
- [ ] 4. Wishlist (browser storage) with "Send my wishlist on WhatsApp"
- [ ] 5. Recently viewed strip
- [ ] 6. Gift finder (occasion, budget, style); may add an `occasion` column
- [ ] 7. Later: lookbook (needs a shoot), reviews tab in the sheet

## Phase 1: Homepage cleanup (done)
- Order: Hero → PromiseStrip → Signature pieces → Shop by category → Collections → Our Essence → Instagram → Gift band
- Shop by category: three large 4:5 photos with name and count below (only three fixed categories)
- Collections: small `compact` portrait tiles, four across on desktop, two on phones (other pages keep the large tiles)
- Our Essence (`BrandStory.tsx`): layout and copy kept (redesign decision); now a server component on theme tokens
  (fixes unreadable text in dark mode), reuses `LayeredImages`, adds "Read our story"
- `BRAND_PROMISES` moved to `src/lib/site.ts` next to `TRUST_POINTS`
- Cards show only the product's own marketplace links; with none, "Ask on WhatsApp" with the product name
- Removed the unused `AIStylist.tsx` stub

## Phase 2: Product pages (done)
- URL `/product/<id>` (ids like `mohak001`); id only, so a category change keeps the link. Ids must be letters, digits, `-`, `_`
- Sheet: `description` (free text; material and size go here) and `image2`, `image3`, `image4`... (one link per cell,
  any number of columns). `image` renamed `main_image`.
  `material`/`size` columns dropped for now; add later if customers keep asking
- Page: gallery with thumbnails (`ProductGallery`), breadcrumb, collection link, price, description, buy buttons
  (first is the main button) or "Ask on WhatsApp", promise list, "You may also like" (same collection, then category)
- SEO: per-product title/description/canonical/OG image, `Product` JSON-LD (one Offer per marketplace), breadcrumb
  JSON-LD, sitemap entries; category JSON-LD items now point at product pages
- Cards: photo and name open the product page; marketplace links still go straight to the store
- Known risk (accepted): if the sheet can't be read at build time the fallback products (`p1`–`p8`) are used and
  `mohak0XX` pages 404 until the next good build

## Extra: more collections (done)
- Added `korean`, `jhumka`, `chandbali`, `hoop` (matching the sheet's dropdown); copy is placeholder
- Empty collections are hidden from home tiles, footer, "More collections" and the sitemap; their page shows
  "Coming soon" and is `noindex`
- `isType` collections (korean, jhumka, chandbali, hoop, stud) also fill `type` when it is empty, so filter chips keep working

## Open questions
- [ ] Our Essence copy says "Each pair of earrings" and "jewelry" (site uses "jewellery"); update now that pendants
      and bracelets exist?
- [ ] Pratibha's surname spelling (Kanaujiya vs Kanuajiya) and her one-line note in `src/lib/team.ts`
