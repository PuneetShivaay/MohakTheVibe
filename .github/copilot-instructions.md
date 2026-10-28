# Copilot Instructions – Mohak The Vibe

Next.js 15 (App Router, React 19, TypeScript, Tailwind, shadcn/ui) jewelry brand site. Original spec in `docs/blueprint.md`; the active redesign (concept, decisions, phases) is in `docs/redesign-plan.md` and takes precedence. Log progress in `docs/redesign-progress.md`. Tech stack, structure and deploy details: `docs/architecture.md`.

**Static export** (`output: 'export'`): no API routes, server actions, `revalidate`/ISR or runtime secrets. Dynamic routes need `generateStaticParams`. `next/image` is unoptimized.

## Architecture
- Public pages live in the `src/app/(site)/` route group; its `layout.tsx` adds Navbar, Footer and WhatsAppCTA. `(site)/page.tsx` is the home page: Hero → CollectionTiles → JewelryCatalog → BrandStory → InstagramGrid → ContactSection. `(site)/collections/[slug]/page.tsx` renders one static page per collection in `products.ts`.
- Reuse `ProductCard`, `CollectionTile` and `LayeredImages` (the two framed prints from "Our Essence") rather than restyling. Don't change `BrandStory.tsx`; it is kept as is by decision.
- Hybrid multipage (see redesign plan): `/`, `/collections/[slug]`, `/our-story`, all inside `(site)/`, each exporting its own `metadata`. No per-product pages for now.
- Data: products and collections in `src/lib/products.ts`; WhatsApp number, Instagram/marketplace links and navigation in `src/lib/site.ts` (`SITE_LINKS`, `MARKETPLACES`, `NAV_LINKS`). Never hardcode these in components.
- `src/components/*.tsx` are feature sections (named exports, mostly `"use client"`). For new sections use `Reveal` (Framer Motion scroll animation), `SectionHeading`/`Eyebrow`, and the tokens `text-display*`, `text-eyebrow`, `py-section`, `max-w-site`. `src/components/ui/` is generated shadcn/ui (see `components.json`) – prefer reusing over editing.
- `src/app/preview/` is a temporary, noindex design mock of the approved redesign. Use it as the visual reference; don't link to it, and delete it once the redesign ships.
- Logo: `BrandLogo.tsx` (SVG). Use `<BrandLogo compact />` for the navbar mark. `public/mohak.png` is for Open Graph only (dark background).
- No cart/checkout: products redirect to Flipkart/Meesho or open WhatsApp/Instagram DMs (see `JewelryCatalog.tsx`, `Footer.tsx`, `WhatsAppCTA.tsx`), using links from `src/lib/site.ts`.
- Images: components look up entries by `id` via `PlaceHolderImages.find(...)` from `src/lib/placeholder-images.ts` (data in `placeholder-images.json`, under the `placeholderImages` key). Add new images to the JSON, and local files under `public/images/` (see `INSTRUCTIONS.txt` there). Always use optional chaining/fallbacks since lookups may miss.
- AI Vibe Stylist is **removed**: every file in `src/ai/` is a `// Feature removed` stub, Genkit is not installed, and `AIStylist.tsx` returns `null`.

## Conventions
- Import via `@/` alias. Style with Tailwind and brand tokens like `text-brand-gold` (defined in `tailwind.config.ts`/`globals.css`); palette: Midnight `121212`, Gold `C9A14A`, Ivory `FAF7F2`, Copper `B76E48`, Champagne `E8DCC8` (hex). Fonts: Playfair Display (headings), Inter (body).
- Dark/light "Mohak Mode" is handled via `ThemeToggle.tsx`; keep styles working in both modes.
- Use `cn()` from `src/lib/utils.ts` for class merging; toasts via `src/hooks/use-toast.ts`. If you add a custom Tailwind `fontSize`, register it in `utils.ts` (`extendTailwindMerge`) or `cn()` will drop it next to a colour class.
- Product cards: single price only (no sale/strikethrough), marketplace links as quiet text. New product photos go in `public/images/earring/` as WebP (≤1200px wide).

## Workflows
- `npm run dev` (Turbopack, port **9002**), `npm run build`, `npm run lint`, `npm run typecheck`.
- Every push to `main` auto-deploys to Firebase Hosting (`.github/workflows/firebase-deploy.yml` builds to `out/`). Use a branch for unfinished work. `apphosting.yaml` is not used.
