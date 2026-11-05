# Catalog Plan: Categories + Google Sheet + Cloudinary

Status: **planned, not started**. Track progress in `docs/redesign-progress.md` (section "Catalog").
Work on branch **`catalog`**; merge to `main` (auto-deploys) only after review.

## Goals
- Manage 100–150 products (earrings, pendants, bracelets) from a **Google Sheet**, photos on **Cloudinary**. No code or GitHub needed to add a product.
- Add **category pages** alongside the existing collection pages.
- **Design stays in our codebase.** The sheet and Cloudinary supply data and photos only; layout, cards, typography and animation remain our components (`ProductCard`, `CollectionTile`, `Reveal`, tokens).
- **Nothing existing breaks** (see "Safety rules").

## Decisions
| Topic | Decision |
|---|---|
| Product data | Google Sheet, published as CSV, read **at build time** (static export; no browser fetch, no server) |
| Photos | Cloudinary (free tier), one folder per category. Sheet stores the image URL |
| Categories | `earrings`, `pendants`, `bracelets` — defined in code (`src/lib/products.ts`), not in the sheet |
| Collections | Stay in code (Minakari, Kundan, Contemporary, Studs). A product has one category and one collection. Sheet values: `minakari`, `kundan`, `contemporary`, `stud`. A collection without a local `coverImageId` uses its first product's photo as the cover |
| Home page | Stays curated: products with `featured = yes` (6–8), plus category tiles |
| Updates | Scheduled rebuild every 3 hours + manual "Run workflow" button in GitHub Actions |
| Fallback | Current hardcoded products in `products.ts` if the sheet is missing, unreachable or invalid |
| Out of scope | Admin dashboard, cart/checkout, per-product pages, search |

## Sheet layout
One row per product. Header row exactly as below (lowercase). Columns can be in any order.
Starter file: `docs/catalog-template.csv` (headers + 3 example rows). In Google Sheets: File → Import → Upload → "Replace current sheet". Then replace the example rows and placeholder links (`YOUR_CLOUD_NAME`, `REPLACE_WITH_PRODUCT_LINK`) with real data.

| Column | Required | Example | Rules |
|---|---|---|---|
| `id` | yes | `ear-001` | Unique, never reuse or change (used as React key and for stable ordering) |
| `name` | yes | `Minakari Half Green Jhumka` | Title case |
| `category` | yes | `earrings` | One of `earrings`, `pendants`, `bracelets` |
| `collection` | no | `minakari` | A style slug from `collections` in `products.ts`, or empty |
| `type` | no | `hoop` | Kind of piece (stud, hoop, jhumka, chandbali, korean...). Drives the filter chips on category pages. If empty, an unknown `collection` value is used as the type |
| `price` | yes | `199` | Number only; the site adds `₹` |
| `image` | yes | `https://res.cloudinary.com/<cloud>/image/upload/...` | Cloudinary URL (recommended: resized automatically), or a Flipkart (`rukminim*.flixcart.com`) / Meesho (`images.meesho.com`) image URL. These are not resized, so use small versions (e.g. `/512/512/` in the Flipkart URL); they may change or break if the listing is removed |
| `hover_image` | no | Same host rules as `image` | Second photo, ideally on-model; shown on hover |
| `flipkart` | no | Product URL | Falls back to the Flipkart store link |
| `meesho` | no | Product URL | Falls back to the Meesho store link |
| `amazon` | no | Product URL | Shown only if present |
| `featured` | no | `yes` | `yes` = shown in Signature Pieces on the home page |
| `active` | no | `no` | `no` hides the product without deleting the row (default `yes`) |
| `sort` | no | `10` | Lower numbers first; ties ordered by `id` |

Do not put private notes in the sheet: a published CSV is readable by anyone with the link.

## Architecture
```
Google Sheet ──(published CSV, build time)──► src/lib/catalog.ts ──► pages/components
                                                  │  validate rows, skip bad ones
                                                  └─ fallback: products.ts (current data)
Cloudinary ──(image URLs + size transforms)──► ProductCard <Image>
```

- **`src/lib/catalog.ts` (new)**: `getProducts()` (async, cached once per build). Reads `CATALOG_SHEET_CSV_URL`; if unset, unreachable (10 s timeout), or fewer than 1 valid row → returns the fallback list. Logs counts and skipped rows (row number + reason), never fails the build. Same pattern as `src/lib/instagram.ts`.
- **CSV parsing**: `papaparse` (handles quotes and commas in names). Validation with `zod`, already installed.
- **`src/lib/products.ts`**: keeps types, `collections`, new `categories`, and the current `products` array renamed to `fallbackProducts`. Helpers (`getProductsByCollection`, new `getProductsByCategory`) take the product list as an argument.
- **Images**: `Product` gets `image`/`hoverImage` as URLs. Fallback products keep their ids and are resolved through `placeholder-images.json` inside `catalog.ts`, so `ProductCard` receives a URL either way. A small `cloudinaryUrl(url, width)` helper inserts `f_auto,q_auto,w_<n>` so phones get small WebP/AVIF files (Next image optimisation is off in static export).
- **`next.config.ts`**: add `res.cloudinary.com` to `images.remotePatterns`.
- **Server components only**: catalog pages and sections that read products become async server components; client parts (hover, `Reveal`) stay as they are.

## New pages and UI
- **`/shop/[category]`** (`generateStaticParams` for the 3 categories): intro (`FadeIn`), collection filter chips, product grid with `ProductCard`, "Load more" after 24 items. Metadata, canonical URL and sitemap entry per category.
  - Filtering and "Load more" are client-side over the build-time list (no fetch), so they work on static hosting.
- **Home**: new `CategoryTiles` (reusing `CollectionTile` styling) above the collections; `JewelryCatalog` shows `featured` products (falls back to the first 8 if none are marked).
- **Navigation**: "Shop" in `NAV_LINKS` with Earrings / Pendants / Bracelets; footer "Shop" column. Links from `src/lib/site.ts`.
- **`/collections/[slug]`**: unchanged layout; now lists products from all categories in that collection.
- Empty states: a category with no products shows a short note and links to the marketplaces instead of an empty grid.

## Deploy and refresh
- Hosting changed to Vercel (2026-11-05): `.github/workflows/vercel-rebuild.yml` calls a Vercel Deploy Hook every 3 hours and on "Run workflow" (secret `VERCEL_DEPLOY_HOOK_URL`); `CATALOG_SHEET_CSV_URL` is set as a Vercel environment variable. (Originally planned as a Firebase workflow.)
- Local development: optional `CATALOG_SHEET_CSV_URL` in `.env.local`; without it the site uses the fallback products.
- Each refresh rebuilds and redeploys the whole site (~3–5 min). Changes are **not instant**.

## Safety rules (nothing breaks)
1. **Fallback always**: no sheet URL, a network error, an empty or malformed sheet → the current 8 products, exactly as today.
2. **Bad rows are skipped, not fatal**: missing name/image, unknown category, image URL from a host other than Cloudinary/Flipkart/Meesho, duplicate `id` → row skipped and logged.
3. **Existing URLs keep working**: `/`, `/collections/[slug]`, `/our-story`, `/contact`, legal pages and `/#catalog` anchors.
4. **Unchanged by decision**: `BrandStory.tsx`, `ProductCard` look (single price, quiet marketplace links), "Our Essence".
5. **Each phase ends green**: `npm run typecheck`, `npm run lint`, `npm run build`, plus a check that a build with **no** sheet URL renders the same home page as today.
6. Nothing merges to `main` until reviewed on the `catalog` branch.

## Phases
| # | Phase | Output | Owner |
|---|---|---|---|
| C0 | Setup | Cloudinary account + folders; Google Sheet with the header row; 5–10 test products; sheet published as CSV | You |
| C1 | Data layer | `catalog.ts`, fallback, validation, Cloudinary helper, `remotePatterns`. No visible change | Me |
| C2 | Categories | `categories` in code, `/shop/[category]` pages, sitemap, metadata | Me (done) |
| C3 | Navigation and home | "Shop" menu, footer column, `CategoryTiles`, featured products | Me (done) |
| C4 | Large catalog UX | Collection filter chips, "Load more", empty states | Me |
| C5 | Refresh and docs | Workflow schedule + manual run, GitHub secret, "How to add a product" in `SETUP.md`, update `architecture.md` and Copilot instructions | Me (secret: you) |
| C6 | Full data and QA | Enter all 100–150 products; check every category on mobile and desktop, both themes; Lighthouse; merge | You + me |

## Open questions
- [x] Published sheet CSV URL (2026-11-03): `https://docs.google.com/spreadsheets/d/e/2PACX-1vSRG9hD02yFLOypYc9qeki_r-io5zLRKiN5WFx9R4uwo6SNwHRSSvBESCiFDDiZrevnXsZTl9xHWrFc/pub?gid=0&single=true&output=csv`. Headers verified; rows are still template placeholders. Local builds read it from `.env.local`; add it as GitHub secret `CATALOG_SHEET_CSV_URL` in phase C5.
- [ ] Cloudinary cloud name (needed for `remotePatterns`; not secret)
- [ ] Final collection list: keep Minakari / Kundan / Contemporary, or add more for pendants and bracelets?
- [ ] Spelling and URL for categories: `pendants` (recommended) vs `pendent`
- [ ] Should a product ever appear in more than one category? (Plan assumes no)
- [ ] Do the existing 8 products move into the sheet, or stay as fallback only? (Recommended: both)
