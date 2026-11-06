# Premium & Interactive Plan

Step-by-step upgrades on top of the redesign and catalog work. No backend: everything is built from the
Google Sheet at build time or stored in the visitor's browser. `tsc` per phase; the user tests at the end.

## Status
- [x] 1. Homepage cleanup
- [ ] 2. Product detail pages (`/shop/[category]/[id]`) + sheet columns `description`, `images`, `material`, `size`
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

## Open questions
- [ ] Phase 2: what do sheet `id` values look like? Used in product URLs; changing an id breaks its URL (static export)
- [ ] Our Essence copy says "Each pair of earrings" and "jewelry" (site uses "jewellery"); update now that pendants
      and bracelets exist?
- [ ] Pratibha's surname spelling (Kanaujiya vs Kanuajiya) and her one-line note in `src/lib/team.ts`
