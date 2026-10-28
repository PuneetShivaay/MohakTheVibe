# Architecture – Mohak The Vibe

How the code is built, structured and deployed. For design direction see `redesign-plan.md`; for local setup see `../SETUP.md`.

## Summary
A static brand website built with Next.js and React. There is no backend, database or checkout: every page is pre-rendered to HTML at build time and served from Firebase Hosting. Buying happens on the marketplaces (Flipkart, Meesho, Amazon) or over WhatsApp/Instagram.

## Tech stack
| Area | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.5.9 | Static export (`output: 'export'`) |
| UI library | React | 19.2 | |
| Language | TypeScript | 5 | Path alias `@/*` → `src/*` |
| Styling | Tailwind CSS | 3.4 | Plus `tailwindcss-animate`; brand and redesign tokens in `tailwind.config.ts` |
| Components | shadcn/ui (Radix UI primitives) | – | Generated into `src/components/ui/` (`components.json`) |
| Animation | Framer Motion | 14.7 | Shared `Reveal` component; older sections still use Tailwind keyframes |
| Icons | lucide-react | 0.475 | Brand icons (e.g. `Instagram`) are deprecated upstream |
| Forms | react-hook-form + zod | 7 / 3 | Used by `ContactSection` |
| Carousel | embla-carousel-react | 8 | Via shadcn `carousel` |
| Fonts | Google Fonts: Playfair Display, Inter | – | Loaded with `<link>` in `src/app/layout.tsx` |
| Hosting | Firebase Hosting | – | Serves the `out/` folder |
| CI/CD | GitHub Actions | – | `.github/workflows/firebase-deploy.yml` |

Installed but unused: `firebase` (client SDK), `recharts`, `date-fns`, `react-day-picker` (its `calendar.tsx` was removed), `dotenv`, `patch-package`, and most shadcn components.

## Rendering and hosting model
- `next build` produces plain HTML/CSS/JS in `out/`. No Node server runs in production.
- `images.unoptimized: true`: `next/image` does no resizing or format conversion, so source images should be exported at web sizes (ideally WebP, under ~300 KB). `sharp` is available in `node_modules`, e.g. `hero.webp` was made with `sharp('public/images/header.png').resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 })`. Product images in `public/images/earring/` have `.webp` versions (max 1200px wide, quality 80) next to the original PNG/JPEG; `placeholder-images.json` points to the `.webp`. Convert any new photo the same way before adding it.
- Consequences of static export:
  - No API routes, server actions, ISR/`revalidate`, or runtime environment secrets.
  - Dynamic routes (e.g. `/collections/[slug]`) need `generateStaticParams`.
  - Live data (e.g. Instagram) must be fetched at build time, by a client-side widget, or by a separate service (e.g. a Firebase Cloud Function).
- `firebase.json` uses `cleanUrls` (`/our-story` serves `our-story.html`) with no catch-all rewrite, so unknown URLs get `404.html`. Hashed `/_next/static/**` files are cached for a year; images for one day, so replaced photos show up quickly.
- `apphosting.yaml` exists but is not used by the current deploy.

## Folder structure
```
src/
  app/
    layout.tsx          Root HTML, fonts, global metadata (SEO/Open Graph), Toaster
    (site)/             Route group for public pages (not part of the URL)
      layout.tsx        Shared Navbar, <main>, Footer, WhatsAppCTA
      page.tsx          Home page: composes the section components
      collections/[slug]/page.tsx   Collection page (static params, per-page metadata)
      our-story/page.tsx            Brand story page
    preview/            TEMPORARY redesign mock (noindex, outside (site) so it has its own chrome)
    globals.css         Tailwind layers, light/dark CSS variables, small utilities
  components/
    Navbar, Hero, CollectionTiles, JewelryCatalog, BrandStory,
    InstagramGrid, ContactSection, Footer, WhatsAppCTA   Page sections
    ProductCard.tsx     ProductCard, ShopFullRange, imageUrl(), quietLink (shared by home and collection pages)
    CollectionTiles.tsx CollectionTiles (home section) and CollectionTile (one linked cover tile)
    LayeredImages.tsx   Two framed prints (large 4:5 + small square overlap), the "Our Essence" look
    PromiseStrip.tsx    Handpicked · Anti-tarnish · Gift-ready · Pan-India delivery strip (BRAND_PROMISES)
    GiftBand.tsx        Midnight "gift-ready" band with logo and WhatsApp prompt
    BrandLogo.tsx       SVG logo (`compact` = mark only)
    SectionHeading.tsx  SectionHeading and Eyebrow (shared section titles)
    Reveal.tsx          Fade-and-rise on scroll (Framer Motion, respects reduced motion)
    ThemeToggle.tsx     Light/dark "Mohak Mode" switch
    AIStylist.tsx       Stub (feature removed)
    ui/                 Generated shadcn/ui components
  hooks/                use-toast, use-mobile
  lib/
    utils.ts            cn() class merge helper (knows the custom text-display*/text-eyebrow sizes)
    site.ts             WhatsApp number, Instagram and marketplace store links
    products.ts         Products, collections, getProductsByCollection(), getCollection()
    instagram.ts        Build-time Instagram feed (getInstagramPosts), null when unavailable
    placeholder-images.ts / .json   Image registry (id → URL)
  ai/                   Genkit leftovers; all files are stubs ("Feature removed")
public/
  mohak.png             Logo on dark background (Open Graph/social preview only)
  images/               Hero, marketplace logos, earring/ product photos
docs/                   blueprint, redesign plan/progress, this file
.github/                Copilot instructions, deploy workflow
```

## How pages are composed
- `src/app/(site)/layout.tsx` wraps every public page with Navbar, Footer and WhatsAppCTA. New pages go inside `(site)/`.
- `src/app/(site)/page.tsx` renders the home sections: Hero → PromiseStrip → CollectionTiles → JewelryCatalog → BrandStory → InstagramGrid → GiftBand → ContactSection.
- `src/app/(site)/our-story/page.tsx`: intro beside `LayeredImages`, `PromiseStrip`, four values, Midnight pull-quote band, "How to shop" (3 steps) with links to collections and WhatsApp. Copy is placeholder.
- `src/app/(site)/collections/[slug]/page.tsx`: one static page per entry in `collections` (`generateStaticParams`, `dynamicParams = false`, so unknown slugs 404). Sections: intro text beside `LayeredImages` (cover + another piece from the collection; single-piece collections show only the cover), the collection's products (small collections are centred), "Shop the full range", and tiles for the other collections. `generateMetadata` sets title, description, canonical and Open Graph/Twitter image per collection.
- Navigation: `Navbar` reads `NAV_LINKS` and `MARKETPLACES` from `src/lib/site.ts`. Links come from `PAGE_LINKS`: `/#collections`, `/#catalog`, `/our-story`, `/#contact`; collection tiles link to `/collections/[slug]`. The home "Our Essence" section keeps its `#brand-story` id but is no longer a nav target. The bar is transparent only at the top of `/` (`usePathname`), otherwise solid.

Sections are client components (`"use client"`) with named exports. Most could be server components; only interactive ones (Navbar scroll state, ThemeToggle, ContactSection form, carousels, `Reveal`) need the client.

## Data
- **Products and collections**: `src/lib/products.ts`. Each product has `name`, `imgId`, `collection` slug, a single `price` (no sale/compare-at price), optional `hoverImgId` (second photo for the hover crossfade) and optional per-product `links` (Flipkart/Meesho/Amazon); components fall back to the store links. Collection names are a draft, and several product names don't match their photos yet (see progress doc).
- **Server components**: `JewelryCatalog`, `ProductCard`, `CollectionTiles`, `LayeredImages` and the collection page render on the server; only the `Reveal` wrappers run on the client.
- **Contact details**: `src/lib/site.ts`: `WHATSAPP_NUMBER`, `SITE_LINKS` (Instagram, WhatsApp, marketplaces), `CONTACT` (email, location, phone, WhatsApp link with a prefilled hello). Import from there; don't hardcode links or contact details in components (only `site.ts` and the temporary preview contain them).
- **Images**: components look up `PlaceHolderImages.find(img => img.id === "...")` and must handle a missing result. Files live in `public/images/`.

## Styling and theming
- Brand colours (`brand-gold`, `brand-midnight`, `brand-ivory`, `brand-beige`, `brand-copper`) are Tailwind colours in `tailwind.config.ts`.
- Theme colours (`background`, `foreground`, `border`, …) are HSL CSS variables in `globals.css`, with a `.dark` override. Light mode is Ivory-led: Soft Ivory background, Midnight text, warm hairline borders. `--radius` is `0` (sharp corners).
- Redesign tokens in `tailwind.config.ts`:
  - Type: `text-display-xl` (hero), `text-display` (section titles), `text-display-sm` (statements, quotes), `text-eyebrow` (small uppercase labels). Headline sizes are fluid via `clamp()`.
  - Spacing: `py-section` (vertical section padding, 96–160px).
  - Width: `max-w-site` (1400px content width).
  - Easing: `ease-out-soft`.
- Dark mode: `darkMode: ['class']`. `ThemeToggle` toggles the `dark` class on `<html>` and stores the choice in `localStorage` (`mohak-theme`). Because this runs after hydration, dark-mode users may see a brief light flash on load.
- Fonts: `font-headline` (Playfair Display) for headings, `font-body` (Inter) for text.

## Integrations
| Integration | How |
|---|---|
| Flipkart / Meesho | Quiet text links on each product card and under the grid (store/search URLs until per-product links are added in `products.ts`) |
| Amazon | Planned |
| WhatsApp | `wa.me` chat (with prefilled message) and catalogue links. `WhatsAppCTA` is a small Midnight/gold button that fades in after ~60% of the first screen and is removed from tab order while hidden |
| Instagram | `InstagramGrid` ("Worn by *you*") is a server component. At build time `src/lib/instagram.ts` fetches the latest 6 posts from the Instagram Graph API if `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` are set (GitHub secrets → build env); otherwise, or on any error, it shows local photos `insta-post-1…6` linking to the profile. Remote images use a plain `<img>`. Feed only updates when the site rebuilds (daily `schedule` ready but commented out in the workflow) |
| Contact form | Validates with zod, then opens the visitor's email client (`mailto:`). No data is sent to a server |
| SEO | `metadata` in `layout.tsx` (title, description, Open Graph, Twitter card, `metadataBase` for absolute URLs); per-collection `generateMetadata` |

## Build and deploy
1. Push to `main` triggers `.github/workflows/firebase-deploy.yml`.
2. The workflow runs `npm ci` and `npm run build` (type check, lint, static export to `out/`). A type error anywhere fails the deploy.
3. `FirebaseExtended/action-hosting-deploy` publishes to the live channel of project `mohak-the-vibe`, using the `FIREBASE_SERVICE_ACCOUNT` repository secret.

Anything merged to `main` goes live immediately. Redesign work happens on the `redesign` branch. Manual deploy is also possible with `firebase deploy` (see `SETUP.md`).

## Known issues and tech debt
- **Build on `main`**: `main` still contains `src/components/ui/calendar.tsx`, which fails the type check, so `npm run build` (and likely the deploy workflow) fails there. Fixed on `redesign` by deleting the unused file.
- **`.env` is committed**: `.env` is tracked in git (and in history) and `.gitignore` only covers `.env*.local`. Its contents were not reviewed. If it holds any key, rotate that key, then `git rm --cached .env` and add `.env` to `.gitignore`. Use GitHub secrets for CI and `.env.local` for local values.
- **No ESLint config**: `next lint` opens an interactive setup prompt and `next build` skips linting. Add an `eslint.config.mjs` (Next.js "Strict") when convenient.
- **Unused image entry**: `header-brand-logo` in `placeholder-images.json` points to a missing file and is no longer used.
- **Original images in the repo**: the source PNG/JPEG files (~27 MB) are still committed next to their `.webp` versions and are no longer served by the site. Move them out of `public/` (or delete) once the WebP versions are confirmed.
- **Unused marketplace logos**: `flipkart-logo.png` and `meesho_logo.png` (and their `placeholder-images.json` entries) are no longer used after phases 2 and 4.
- **Unused code**: Genkit stubs in `src/ai/`, `AIStylist.tsx`, unused dependencies listed above, `public/images/INSTRUCTIONS.txt` lists file names that no longer match.
- **Windows build**: `npm run build` sets `NODE_ENV` inline, which fails in PowerShell (workaround in `SETUP.md`).
- **Bundle size**: Framer Motion raised home first-load JS to ~208 KB. Acceptable for now; revisit with `LazyMotion` in phase 9 if Lighthouse flags it.
- **Content hidden until JavaScript runs**: `Reveal` server-renders with `opacity: 0`, so above-the-fold text and images stay invisible until hydration (blank on slow phones, worse LCP). Phase 9: don't wrap first-screen content in `Reveal`, or start it visible.
- **Unused festive images**: `festive-item-1/3/4/5` in `placeholder-images.json` became unused when `FestiveCollections` was replaced (`festive-item-2` is the Contemporary cover).
- **Dev server and build together**: running `next build` while `next dev` is running corrupts the shared `.next` folder (dev returns 500). Restart the dev server after a build.

## Planned architecture changes
From `redesign-plan.md`:
- `sitemap.ts` and `robots.ts` (phase 9).
- Instagram live feed: code is in place; needs the Meta app, token and GitHub secrets, then enable the workflow `schedule`.
