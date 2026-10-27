# Copilot Instructions – Mohak The Vibe

Next.js 15 (App Router, React 19, TypeScript, Tailwind, shadcn/ui) jewelry brand site. Original spec in `docs/blueprint.md`; the active redesign (concept, decisions, phases) is in `docs/redesign-plan.md` and takes precedence. Log progress in `docs/redesign-progress.md`. Tech stack, structure and deploy details: `docs/architecture.md`.

**Static export** (`output: 'export'`): no API routes, server actions, `revalidate`/ISR or runtime secrets. Dynamic routes need `generateStaticParams`. `next/image` is unoptimized.

## Architecture
- Currently single-page: `src/app/page.tsx` composes the site from section components in fixed order: Navbar → Hero → FestiveCollections → JewelryCatalog → BrandStory → InstagramGrid → ContactSection → Footer → WhatsAppCTA.
- Moving to hybrid multipage (see redesign plan): `/`, `/collections/[slug]`, `/our-story`. No per-product pages for now. Shared Navbar/Footer/WhatsAppCTA go in `src/app/layout.tsx`; product/collection data in `src/lib/products.ts`; each route exports its own `metadata`.
- `src/components/*.tsx` are feature sections (named exports, mostly `"use client"`). Animations are currently Tailwind/CSS; Framer Motion is planned but not yet installed. `src/components/ui/` is generated shadcn/ui (see `components.json`) – prefer reusing over editing.
- `src/app/preview/` is a temporary, noindex design mock of the approved redesign. Use it as the visual reference; don't link to it, and delete it once the redesign ships.
- Logo: `BrandLogo.tsx` (SVG). Use `<BrandLogo compact />` for the navbar mark. `public/mohak.png` is for Open Graph only (dark background).
- No cart/checkout: products redirect to Flipkart/Meesho or open WhatsApp/Instagram DMs (see `JewelryCatalog.tsx`, `Footer.tsx`, `WhatsAppCTA.tsx`). WhatsApp number `916388498674` is hardcoded in several components; keep them consistent.
- Images: components look up entries by `id` via `PlaceHolderImages.find(...)` from `src/lib/placeholder-images.ts` (data in `placeholder-images.json`, under the `placeholderImages` key). Add new images to the JSON, and local files under `public/images/` (see `INSTRUCTIONS.txt` there). Always use optional chaining/fallbacks since lookups may miss.
- AI Vibe Stylist is **removed**: every file in `src/ai/` is a `// Feature removed` stub, Genkit is not installed, and `AIStylist.tsx` returns `null`.

## Conventions
- Import via `@/` alias. Style with Tailwind and brand tokens like `text-brand-gold` (defined in `tailwind.config.ts`/`globals.css`); palette: Midnight `121212`, Gold `C9A14A`, Ivory `FAF7F2`, Copper `B76E48`, Champagne `E8DCC8` (hex). Fonts: Playfair Display (headings), Inter (body).
- Dark/light "Mohak Mode" is handled via `ThemeToggle.tsx`; keep styles working in both modes.
- Use `cn()` from `src/lib/utils.ts` for class merging; toasts via `src/hooks/use-toast.ts`.

## Workflows
- `npm run dev` (Turbopack, port **9002**), `npm run build`, `npm run lint`, `npm run typecheck`.
- Every push to `main` auto-deploys to Firebase Hosting (`.github/workflows/firebase-deploy.yml` builds to `out/`). Use a branch for unfinished work. `apphosting.yaml` is not used.
