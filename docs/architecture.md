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
| Styling | Tailwind CSS | 3.4 | Plus `tailwindcss-animate`; brand tokens in `tailwind.config.ts` |
| Components | shadcn/ui (Radix UI primitives) | – | Generated into `src/components/ui/` (`components.json`) |
| Icons | lucide-react | 0.475 | Brand icons (e.g. `Instagram`) are deprecated upstream |
| Forms | react-hook-form + zod | 7 / 3 | Used by `ContactSection` |
| Carousel | embla-carousel-react | 8 | Via shadcn `carousel` |
| Fonts | Google Fonts: Playfair Display, Inter | – | Loaded with `<link>` in `src/app/layout.tsx` |
| Hosting | Firebase Hosting | – | Serves the `out/` folder |
| CI/CD | GitHub Actions | – | `.github/workflows/firebase-deploy.yml` |
| Animation | CSS / Tailwind keyframes | – | Framer Motion planned (phase 1), not installed |

Installed but unused: `firebase` (client SDK), `recharts`, `date-fns`, `react-day-picker`, `dotenv`, `patch-package`, and most shadcn components.

## Rendering and hosting model
- `next build` produces plain HTML/CSS/JS in `out/`. No Node server runs in production.
- `images.unoptimized: true`: `next/image` does no resizing or format conversion, so source images should be exported at web sizes (ideally WebP, under ~300 KB).
- Consequences of static export:
  - No API routes, server actions, ISR/`revalidate`, or runtime environment secrets.
  - Dynamic routes (e.g. `/collections/[slug]`) need `generateStaticParams`.
  - Live data (e.g. Instagram) must be fetched at build time, by a client-side widget, or by a separate service (e.g. a Firebase Cloud Function).
- `firebase.json` rewrites every path to `/index.html` (single-page setup) and caches static assets for a year. This must change when more pages are added (see Known issues).
- `apphosting.yaml` exists but is not used by the current deploy.

## Folder structure
```
src/
  app/
    layout.tsx        Root HTML, fonts, global metadata (SEO/Open Graph), Toaster
    page.tsx          Home page: composes the section components
    globals.css       Tailwind layers, light/dark CSS variables, small utilities
    preview/          TEMPORARY redesign mock (noindex); delete after redesign
  components/
    Navbar, Hero, FestiveCollections, JewelryCatalog, BrandStory,
    InstagramGrid, ContactSection, Footer, WhatsAppCTA   Page sections
    BrandLogo.tsx     SVG logo (`compact` = mark only)
    ThemeToggle.tsx   Light/dark "Mohak Mode" switch
    AIStylist.tsx     Stub (feature removed)
    ui/               Generated shadcn/ui components
  hooks/              use-toast, use-mobile
  lib/
    utils.ts          cn() class merge helper
    placeholder-images.ts / .json   Image registry (id → URL)
  ai/                 Genkit leftovers; all files are stubs ("Feature removed")
public/
  mohak.png           Logo on dark background (Open Graph/social preview only)
  images/             Hero, marketplace logos, earring/ product photos
docs/                 blueprint, redesign plan/progress, this file
.github/              Copilot instructions, deploy workflow
```

## How the page is composed
`src/app/page.tsx` renders sections in order: Navbar → Hero → FestiveCollections → JewelryCatalog → BrandStory → InstagramGrid → ContactSection → Footer → WhatsAppCTA. Navigation uses in-page anchors (`#catalog`, `#festive`, `#brand-story`).

Sections are client components (`"use client"`) with named exports. Most could be server components; only interactive ones (Navbar scroll state, ThemeToggle, ContactSection form, carousels) need the client.

## Data
- **Products**: hardcoded array in `JewelryCatalog.tsx` (name, price, image id). Planned to move to `src/lib/products.ts`.
- **Images**: components look up `PlaceHolderImages.find(img => img.id === "...")` and must handle a missing result. Files live in `public/images/`.
- **Contact details**: WhatsApp number and marketplace URLs are hardcoded in several components (Navbar, JewelryCatalog, Footer, WhatsAppCTA). Keep them consistent; planned to centralise.

## Styling and theming
- Brand colours (`brand-gold`, `brand-midnight`, `brand-ivory`, `brand-beige`, `brand-copper`) are Tailwind colours in `tailwind.config.ts`.
- Theme colours (`background`, `foreground`, `border`, …) are HSL CSS variables in `globals.css`, with a `.dark` override. `--radius` is `0` (sharp corners).
- Dark mode: `darkMode: ['class']`. `ThemeToggle` toggles the `dark` class on `<html>` and stores the choice in `localStorage` (`mohak-theme`). Because this runs after hydration, dark-mode users may see a brief light flash on load.
- Fonts: `font-headline` (Playfair Display) for headings, `font-body` (Inter) for text.

## Integrations
| Integration | How |
|---|---|
| Flipkart / Meesho | External links (currently store/search URLs, not per-product) |
| Amazon | Planned |
| WhatsApp | `wa.me` chat and catalogue links; floating `WhatsAppCTA` |
| Instagram | Profile link; grid uses local placeholder images (live feed planned, phase 7) |
| Contact form | Validates with zod, then opens the visitor's email client (`mailto:`). No data is sent to a server |
| SEO | `metadata` export in `layout.tsx` (title, description, Open Graph, Twitter card) |

## Build and deploy
1. Push to `main` triggers `.github/workflows/firebase-deploy.yml`.
2. The workflow runs `npm ci` and `npm run build` (static export to `out/`).
3. `FirebaseExtended/action-hosting-deploy` publishes to the live channel of project `mohak-the-vibe`, using the `FIREBASE_SERVICE_ACCOUNT` repository secret.

Anything merged to `main` goes live immediately. Use a branch for unfinished work. Manual deploy is also possible with `firebase deploy` (see `SETUP.md`).

## Known issues and tech debt
- **Single-page rewrite**: the `"source": "**" → /index.html` rewrite in `firebase.json` will serve the home page for unknown URLs and hide real 404s. For multipage, remove it and add `"cleanUrls": true` so `/our-story` maps to `our-story.html`.
- **Missing navbar logo**: Navbar looks up `/images/logo.png`, which does not exist, so it shows text. Plan: use `<BrandLogo compact />`.
- **Placeholder UI**: catalog arrows and pagination dots do nothing.
- **Unused code**: Genkit stubs in `src/ai/`, `AIStylist.tsx`, unused dependencies listed above, `public/images/INSTRUCTIONS.txt` lists file names that no longer match.
- **Type errors**: `src/components/ui/calendar.tsx` fails `npm run typecheck` (react-day-picker v9 API change). Unused, so it can be fixed or deleted.
- **Windows build**: `npm run build` sets `NODE_ENV` inline, which fails in PowerShell (workaround in `SETUP.md`).

## Planned architecture changes
From `redesign-plan.md`:
- Routes: `/`, `/collections/[slug]` (via `generateStaticParams`), `/our-story`, with per-page `metadata` and `sitemap.ts`.
- Shared Navbar/Footer/WhatsAppCTA move into `layout.tsx`.
- Product and collection data move to `src/lib/products.ts`.
- Framer Motion for reveal animations.
- Instagram feed: must respect static export (build-time fetch with scheduled rebuild, client widget, or a Cloud Function).
