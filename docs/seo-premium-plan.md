# SEO & Premium Plan

Next project after `docs/premium-plan.md`. Two goals that pull in the same direction: **be found** (search)
and **look expensive** (art direction). Same constraints as always: static export, no backend, data from the
Google Sheet at build time, nothing existing breaks.

Follow `.github/copilot-instructions.md` and the conventions in `docs/redesign-plan.md`. Log progress in
`docs/redesign-progress.md`.

## Status
- [x] 1. Metadata fixes (Open Graph inheritance, title template, brand name, `lang`)
- [x] 2. Performance pass (`next/font`, image cleanup) — except 2c, which needs a build to measure
- [x] 3. Product structured data completeness — shipping/returns built but off, pending confirmation
- [x] 4. Ratings and reviews from the sheet — code done; no product shows stars until real figures are entered
- [ ] 5. Content depth (category copy, `material`/`size`, internal links)
- [ ] 6. Journal (`/journal`)
- [ ] 7. Premium pass A: cards, colour, CTA, price
- [ ] 8. Premium pass B: typography and motion
- [ ] 9. Boutique content (packaging, craft, founder letter, care, sizing)
- [ ] 10. Copy and trust tone
- [ ] 11. Photography — needs a shoot (brand decision, not a code task)
- [ ] 12. Custom domain — **last**, domain not chosen yet

## Working rules
- `npm run typecheck` per phase. No builds, no dev server, no screenshots per phase; the user tests at the end.
- Phases are independently shippable. Do them in order unless a phase is blocked on a brand decision.
- Branch per phase group, merge to `main` only after review (`main` auto-deploys).

## Decisions already taken
| Topic | Decision |
|---|---|
| Brand name in titles | **"Mohak The Vibe"** everywhere (no en dash). The en-dash form `Mohak – The Vibe` stays only in `BRAND_NAME` for JSON-LD `name`, with the plain form already in `BRAND_ALIASES` |
| Price on cards | Keep the price. Removing it was considered and rejected: buyers come from marketplaces and expect to see it |
| Marketplace links on cards | Move off the card face (phase 7). The card is photo, name, price |
| Ratings | Only real Flipkart/Meesho numbers, entered in the sheet. Never invent ratings — fabricated review markup is a manual-action risk |
| FAQ markup | Keep it, expect no rich result (see phase 3) |
| Dark mode toggle | Keep in the navbar. Noted as a non-luxury signal, accepted |
| Journal content | Written by the brand, not generated. Scaffolding only in phase 6 |

---

## Phase 1: Metadata fixes

Smallest change with the widest reach. Every social share and every search snippet runs through this.

**1a. Open Graph tags are missing on sub-pages (bug).**
Confirmed in the current build output: `out/our-story.html` and `out/contact.html` emit only `og:title` and
`og:description` — no `og:image`, `og:url`, `og:site_name`, `og:locale`, `og:type`. `out/index.html` has all
ten. Product, shop and collection pages keep their own image but still lose site name, locale and type.

Cause: Next.js merges `metadata` **shallowly**, so a page's `openGraph` object replaces the root one in
`src/app/layout.tsx` wholesale rather than filling in around it
([generateMetadata reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)).

Fix: add to `src/lib/seo.ts`

```ts
// Open Graph fields every page shares; pages spread this and override title/description/images.
// Next merges `metadata` shallowly, so a page that sets `openGraph` without these loses them.
export function openGraphBase() { /* siteName, locale, type, images: [OG_IMAGE] */ }
```

Move `SITE_TITLE`, `SITE_DESCRIPTION` and `OG_IMAGE` out of `layout.tsx` into `seo.ts` so there is one source.
Then spread `...openGraphBase()` in the `openGraph` of:
`(site)/our-story`, `(site)/contact`, `(site)/product/[id]`, `(site)/shop/[category]`,
`(site)/collections/[slug]`, `(site)/privacy-policy`, `(site)/terms-and-conditions`, `(site)/wishlist`.
Set `url` per page (the canonical) and `type: "website"`. Do the same for `twitter`, which merges the same way.

Pages that set a `title`/`description` but no OG image (our-story, contact, legal) should fall back to
`/og-image.jpg`.

**1b. Title template.** `layout.tsx` sets a plain string title, so every page hand-writes its own brand suffix
and they disagree. Change to:

```ts
title: { default: SITE_TITLE, template: "%s | Mohak The Vibe" }
```

Then strip the suffix from the page titles in `our-story`, `contact`, `product/[id]`, `collections/[slug]`,
`wishlist` and `categories[].seoTitle` in `src/lib/products.ts`. Watch the length: Google truncates around
~60 characters, so the category `seoTitle` values need shortening once the template adds the suffix.

**1c. `lang`.** `<html lang="en">` in `layout.tsx` → `lang="en-IN"`, matching the `en_IN` OG locale and the
`inLanguage: "en-IN"` already in `websiteJsonLd()`.

**1d. Sitemap `lastModified`.** `src/app/sitemap.ts` emits no dates. Add `lastModified` to every entry —
build date for static pages, and for products either a new optional `updated` sheet column or the build date.

**1e. Verification.** `GOOGLE_SITE_VERIFICATION` is read in `layout.tsx` but needs confirming in the Vercel
dashboard. Add Bing Webmaster Tools too (cheap, and it feeds ChatGPT search).

Done when: every page in `out/` has the full OG block, one consistent brand suffix, `lang="en-IN"`, dated sitemap.

---

## Phase 2: Performance pass

Core Web Vitals are a ranking input and the site is giving away easy points.

**2a. Fonts are render-blocking.** `src/app/layout.tsx` loads Playfair Display and Inter with a `<link>` to
`fonts.googleapis.com`: a third-party connection on the critical path plus a flash of unstyled text. Replace
with `next/font/google`, which self-hosts the files, preloads them and generates a size-adjusted fallback.
Expose them as CSS variables and point `tailwind.config.ts` `fontFamily.body`/`headline` at the variables.
Direct LCP and CLS improvement. Remove the three `<link>` tags and the two `preconnect`s.

**2b. Image payload.** `public/images/` is **38 MB** and ships whole on every deploy, but only ~17 WebP files
plus `hero.webp` are referenced in `src/lib/placeholder-images.json`.
- Delete the superseded originals: every `earring*.png` / `earring*.jpeg` that has a `.webp` sibling
  (`earring11.png` alone is 6.6 MB), plus `header.png` (1.8 MB, referenced nowhere).
- `pratibha2.png` is 2.1 MB and **is** used — `src/lib/team.ts` points at it. Convert to WebP ≤1200px and
  update the path.
- `flipkart-logo.png` and `meesho_logo.png` are unreferenced in `src/`; confirm before deleting.
- Check `public/images/INSTRUCTIONS.txt` and `README.txt` still describe reality afterwards.

**2c. framer-motion on the critical path (investigate, don't assume).** `Reveal` uses it and appears on every
page, so it is in the main bundle regardless. `Hero` and `FooterWordmark` also use it. Converting `Reveal` to
IntersectionObserver + a CSS class only pays off if all three go. Measure the bundle before committing; if
`Hero`'s parallax and the `FooterWordmark` scroll effect are worth keeping, leave this alone.

Done when: no third-party font request, `public/images/` under ~5 MB, a note in the progress doc on 2c.

---

## Phase 3: Product structured data completeness

`productJsonLd()` in `src/lib/seo.ts` is valid but minimal, so it earns a plain blue link where competitors get
price, availability and delivery annotations. Against the
[Product structured data spec](https://developers.google.com/search/docs/appearance/structured-data/product), add:

- `priceValidUntil` on every Offer — its absence produces a Search Console warning on every product page.
  Use build date + 1 year.
- `itemCondition: "https://schema.org/NewCondition"`.
- `hasMerchantReturnPolicy` and `shippingDetails` — these drive the "Free delivery" / "Free returns"
  annotations under the result. Values must match what the marketplaces actually offer; take them from
  `TRUST_POINTS` in `src/lib/site.ts` only after confirming each one is true.
- `aggregateRating` / `review` — blocked on phase 4.

Also in this phase:
- `categoryJsonLd()` items inherit the same Offer gaps — fix both through one shared `offer()` helper.
- **FAQ markup:** Google restricted FAQ rich results to authoritative government and health sites in
  August 2023 ([announcement](https://developers.google.com/search/blog/2023/08/howto-faq-changes)), so the
  `FAQPage` block in `(site)/contact/page.tsx` will not produce an accordion in results. Keep it — it still
  helps entity understanding — but do not invest further there, and move it to `src/lib/seo.ts` as
  `faqJsonLd()` for consistency with the rest (it is currently an inline `<script>` rather than `<JsonLd />`).
- Consider an **image sitemap** for product photos. Jewellery gets meaningful traffic from Google Images.

Done when: Rich Results Test shows zero warnings on a product page.

---

## Phase 4: Ratings and reviews from the sheet

The highest-CTR item on this plan. Stars in a result lift click-through substantially, and we currently show none.

- New optional sheet columns: `rating` (1–5, one decimal) and `review_count` (integer). Validate in
  `src/lib/catalog.ts` with the existing zod schema; both must be present and `review_count >= 1` or the
  product gets no rating markup at all.
- Add `aggregateRating` to `productJsonLd()` only when both are present.
- Show the rating on the product page and optionally on the card — if it is in the markup it must be visible
  on the page, or it breaks Google's structured data policy.
- Source: the real figures from the matching Flipkart/Meesho listing, copied by hand when the catalogue is
  updated. **Never generate or estimate these.**
- Document the two columns in `docs/catalog-plan.md` and add them to `docs/catalog-template.csv`.

Done when: products with real ratings show stars in the Rich Results Test; products without are unaffected.

---

## Phase 5: Content depth

Thin pages rank badly, and the catalogue's own copy is the cheapest fix available.

**5a. Category pages.** `categories[].about` in `src/lib/products.ts` is two short paragraphs — not enough to
compete for "artificial earrings online India". Take each to roughly 300–500 words with sub-headings covering
styles, finishes, occasions, care and sizing, written in brand voice. Render the sub-headings as real `<h2>`/
`<h3>`. Add a per-category FAQ by extending `FaqSection` to take an items prop (it currently always renders the
module-level `FAQS`).

**5b. Bring back `material` and `size`.** Phase 2 of `docs/premium-plan.md` dropped these columns. They are
exactly what buyers type ("gold plated jhumka 2 inch", "anti tarnish brass earrings") and exactly what the
product page needs. Add them back as optional sheet columns, show them as a small spec list on the product
page, and feed them into `productJsonLd()` as `material` and `size`.

**5c. Product descriptions.** `productDescription()` falls back to a generated sentence when the sheet has no
`description`, which produces near-duplicate meta descriptions across the catalogue. Audit how many products
rely on the fallback and fill the gaps in the sheet. Keep the fallback as a safety net.

**5d. Internal links.** Nothing in the body copy links to categories or collections — the only paths in are
tiles and the navbar. Add contextual links inside the category `about` copy and the Our Story page.

**5e. Positioning note.** Our product pages compete directly with our own Flipkart and Meesho listings for the
same product names, and marketplace domains will usually win that fight. The site's job is to rank for brand,
style and informational queries and then hand off. Differentiate with styling notes, care and journal links
rather than restating specs.

---

## Phase 6: Journal (`/journal`)

The only sustainable organic growth channel here, and it doubles as the thing that makes a brand read premium.

- Route `(site)/journal/page.tsx` (index) and `(site)/journal/[slug]/page.tsx`, static export, in the sitemap.
- Content source: decide between MDX files in the repo and a second sheet tab. MDX is the better fit — long-form
  copy with headings and images is painful in a spreadsheet cell — but it means the brand needs GitHub access
  or sends copy to be committed. **Open question, see below.**
- `Article` / `BlogPosting` JSON-LD, per-post OG image, author, `datePublished`.
- Link posts from the matching category page and from related products.
- Starter topics (brand writes them): "Minakari vs Kundan, how to tell", "How to stop artificial jewellery
  turning black", "Styling jhumkas with a kurta", and seasonal gift guides (Karwa Chauth, Diwali, bridesmaids).
- Also worth doing once the journal exists: submit the catalogue to **Google Merchant Center free listings**.
  Most of the required structured data lands in phases 3 and 4.

---

## Phase 7: Premium pass A — cards, colour, CTA, price

Honest diagnosis: the site currently reads as *well built*, not as *expensive*. The architecture is good; what
is missing is art direction. Phases 7–11 address that, cheapest first.

- **Product cards.** `ProductCard` puts "Flipkart · Meesho" under every card — a price-comparison pattern that
  pushes visitors off-site before they have engaged. Card becomes photo, name, price. Marketplace links move to
  the product page (and `MobileBuyBar`, which already has them). Keep the "Ask on WhatsApp" fallback for
  products with no listing, since otherwise those cards have no route to purchase.
- **Gold is spread too thin.** `#C9A14A` appears almost only as `/15`–`/20` opacity hairlines, which reads
  tentative rather than rich. Reserve it for two or three real moments per page; let ivory and midnight do the
  structural work. This matches the 70/20/10 ratio already decided in `docs/redesign-plan.md` — the ratio is
  right, the application drifted.
- **CTA colour.** `brand-copper` `#B76E48` as the primary button (hero, buy buttons) reads craft-market rather
  than boutique. Try solid midnight, or an ivory outline on the hero. Needs the user's eye — prepare both.
- **Grid density.** Four columns inside `max-w-site` (1400px) makes each piece small. Three on desktop, two on
  tablet, with more whitespace, is the luxury proportion. `productGridClass()` already special-cases small
  counts; change the default from `lg:grid-cols-4` to `lg:grid-cols-3`.

---

## Phase 8: Premium pass B — typography and motion

- **Playfair Display is the tell.** It is the default "make it look luxury" face, so it signals template.
  Cormorant Garamond is free, has better letterforms and a genuine display italic. Paid alternatives if there
  is budget: Canela, Ogg, Editorial New. Swap via the `next/font` setup from phase 2, so this is a one-line
  change once that is done. **Needs the user's eye — prepare a comparison.**
- **Eyebrow legibility.** `text-eyebrow` is 10px at `0.35em` tracking (11px on phones, per the mobile pass).
  That is at the edge of readable. Either 11px everywhere or drop tracking to `0.25em`.
- **Motion is uniform.** Everything is the same 20px/0.8s fade-up, via `Reveal`, `FadeIn` and the shared
  `fade-in-up` keyframe. Luxury motion is slower and more varied. Add:
  - an image reveal (clip-path wipe, or scale from 1.08 to 1) for `CardPhotos` and `LayeredImages`
  - a line-by-line clip reveal for display headings in `SectionHeading`
  - staggers that are not a flat `i * 100`
  Keep `prefers-reduced-motion` handling, which `Reveal` and `Hero` already respect.
- **Hero.** Ends in a copper button over a static parallax photo. Consider a thin-rule link instead, and a slow
  Ken Burns drift or a short video loop. Video only if the shoot in phase 11 produces footage.

---

## Phase 9: Boutique content

These cost copy and photos, not engineering, and they move perceived value more than any animation.

- Packaging story with real photos (the box, the wrap, the card)
- The Lucknow craft and process — where pieces are sourced, what "handpicked" actually means
- A founder's letter with a signature on `/our-story`
- A care card: a short, well-set care guide, linked from every product page
- Measurement diagrams per category (drop length, hoop diameter, chain length)
- A gift-wrap note at the product level

Most of this slots into existing components (`LayeredImages`, `SectionHeading`, `Reveal`) and the existing
`/our-story` page. The blocker is content, not code.

---

## Phase 10: Copy and trust tone

`TRUST_POINTS` in `src/lib/site.ts` is written in marketplace language — "Free shipping", "Easy returns",
"Secure checkout on Flipkart & Meesho". Reframe without claiming anything untrue:
"Complimentary delivery across India", "Gift-wrapped as standard", "Hand-finished, anti-tarnish".

Also fold in the open question already logged in `docs/premium-plan.md`: the Our Essence copy says "Each pair of
earrings" and "jewelry" while the rest of the site uses "jewellery" and now sells pendants and bracelets.

---

## Phase 11: Photography (brand decision, not a code task)

**Nothing else on this list matters as much.** Luxury sites are roughly 80% photography. Product shots pulled
from marketplace CDNs on white backgrounds read "marketplace listing", and no amount of CSS overrides that.

What is needed: one editorial campaign shoot — model, hands, movement, a warm or dark set — plus a consistent
crop, a consistent colour grade, and every product re-shot on one neutral background. Export as WebP ≤1200px
into Cloudinary, following the rules in `docs/catalog-plan.md`.

Until this happens, phases 7 and 8 are polish on top of the wrong raw material. Worth saying plainly so the
budget goes to the right place.

---

## Phase 12: Custom domain (last — domain not chosen yet)

`SITE_URL` in `src/lib/site.ts` is `https://mohakthevibe.vercel.app`. `vercel.app` sits on the Public Suffix
List, so the site accrues no domain authority of its own and none of the equity is portable. Over a long enough
horizon this is the single biggest lever on this plan — but it is deferred because the domain is still being
chosen.

When the domain is bought:
1. Change `SITE_URL` in `src/lib/site.ts`. It flows automatically to `metadataBase`, canonicals, `robots.ts`,
   `sitemap.ts` and every JSON-LD `@id` — that indirection is already in place, so this really is one line.
2. Add the domain in Vercel and keep `mohakthevibe.vercel.app` as a **301 redirect**, not a second live copy.
3. Update `.github/copilot-instructions.md` and `docs/architecture.md`, which both name the Vercel URL.
4. Re-verify in Google Search Console as a Domain property, resubmit the sitemap, and use Change of Address.
5. Update the links on Instagram, YouTube, LinkedIn, Flipkart and Meesho, and `SITE_LINKS` where relevant.
6. Move the brand email to the domain if the registrar makes it easy — `mohakthevibe@gmail.com` in
   `CONTACT.email` is a trust signal worth upgrading, and it shows in `organizationJsonLd()`.

Expect a few weeks of ranking turbulence after the move. Do it during a quiet trading period, not before a
festival season.

---

## Open questions
- [ ] Journal content source: MDX in the repo (better for long copy, needs GitHub access or copy handed over to
      be committed) vs a second sheet tab (brand can self-serve, painful for formatting)? Blocks phase 6.
- [ ] Display typeface: stay on Playfair, move to Cormorant Garamond, or buy a licence? Blocks phase 8.
- [ ] Primary CTA colour: keep copper, or midnight / ivory outline? Blocks phase 7.
- [ ] Are `TRUST_POINTS` all literally true today (free shipping on both marketplaces, returns window)? Blocks
      the `shippingDetails` and `hasMerchantReturnPolicy` markup in phase 3.
- [ ] Which domain? Blocks phase 12.
