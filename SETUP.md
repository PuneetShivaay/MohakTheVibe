# Local Setup Guide

How to clone and run **Mohak – The Vibe** on your machine.

## Prerequisites
- [Node.js](https://nodejs.org/) 20 or newer (includes npm). Check with `node -v`.
- [Git](https://git-scm.com/). Check with `git --version`.

## 1. Clone
```bash
git clone https://github.com/PuneetShivaay/MohakTheVibe.git
cd MohakTheVibe
```

## 2. Install dependencies
```bash
npm install
```
This step is required. Without it, `npm run dev` fails with `'next' is not recognized as an internal or external command`.

## 3. Environment variables
Optional, read only at build time. Put them in `.env.local` (git-ignored), never in `.env` or any committed file:
```
CATALOG_SHEET_CSV_URL=...      # published Google Sheet CSV (product catalog)
GOOGLE_SITE_VERIFICATION=...   # Search Console "HTML tag" content value (SEO, optional)
INSTAGRAM_ACCESS_TOKEN=...     # live Instagram feed
INSTAGRAM_USER_ID=...
```
Without `CATALOG_SHEET_CSV_URL` the site uses the built-in sample products; without the Instagram values it shows local photos. In CI they come from GitHub repository secrets (see "Product catalog" below and `docs/redesign-plan.md`, Instagram feed). Restart `npm run dev` after changing `.env.local` or the sheet.

## 4. Run the dev server
```bash
npm run dev
```
Open http://localhost:9002.

## Other commands
| Command | Purpose |
|---|---|
| `npm run build` | Production build (static files in `out/`) |
| `npx serve out` | Preview the production build locally (`npm run start` does not work with static export) |
| `npm run lint` | Lint the code |
| `npm run typecheck` | TypeScript check |

`npm run build` works on Windows, macOS and Linux (`next build` runs in production mode by default). If the build fails on `/404` with `Cannot find module ... [turbopack]_runtime.js`, delete the `.next` folder (left over from `npm run dev`) and build again.

## Project layout
- `src/app/(site)/`: public pages and their shared layout (`page.tsx` is the home page; the folder name doesn't appear in URLs)
- `src/app/preview/`: temporary redesign mock at http://localhost:9002/preview
- `src/components/`: sections (Hero, JewelryCatalog, and so on); `BrandLogo.tsx` is the SVG logo
- `src/lib/placeholder-images.json`: image URLs and ids
- `src/lib/products.ts`: product and collection data; `src/lib/site.ts`: WhatsApp and marketplace links
- `public/images/`: local images (see `INSTRUCTIONS.txt` there)
- `docs/`: architecture, blueprint, redesign plan and progress

Full tech stack and structure: [docs/architecture.md](docs/architecture.md).

## Deploy
**Automatic:** the site is hosted on Vercel (https://mohakthevibe.vercel.app). Every push to `main` builds and deploys it; other branches get preview URLs. Work on a branch until changes are ready to go live.

**Vercel settings:** Project → Settings → Environment Variables: add `CATALOG_SHEET_CSV_URL` (and the optional Instagram values) for Production and Preview. Vercel does not read `.env.local`.

## Product catalog (Google Sheet)
Products live in the Google Sheet "Mohak Catalog" (published as CSV). Details: `docs/catalog-plan.md`.

**One-time setup:** (1) In Vercel add the `CATALOG_SHEET_CSV_URL` environment variable (the published CSV link: Sheet → File → Share → Publish to web → the sheet tab → CSV). Without it the live site shows only the built-in sample products. (2) For automatic sheet refresh: Vercel → Settings → Git → Deploy Hooks → create a hook for `main`; then in GitHub → Settings → Secrets and variables → Actions add a secret `VERCEL_DEPLOY_HOOK_URL` with that URL. The workflow `.github/workflows/vercel-rebuild.yml` then rebuilds every 3 hours.

**Add or change a product**
1. Add a row (or edit one) in the sheet. Required: `id` (unique, never reuse), `name`, `category` (earrings / pendants / bracelets), `price` (number), `image`.
2. Optional: `collection` (minakari, kundan, contemporary, stud), `type` (stud, hoop, jhumka, chandbali, korean...), `hover_image`, `flipkart`, `meesho`, `amazon` (product links), `featured` (yes = home "Signature Pieces"), `active` (no = hide), `sort` (lower first).
3. Images: Cloudinary URL (best, resized automatically) or a Flipkart/Meesho image URL (not resized; prefer small versions). Other hosts are skipped.
4. No need to re-publish: Google updates the CSV itself (can take a few minutes).
5. Go live: wait for the automatic rebuild (every 3 hours), run it now from GitHub → Actions → "Rebuild site (Vercel)" → Run workflow, or press Redeploy in Vercel (about 1–3 minutes).

Rows with problems are skipped, not fatal. See the Actions run log for lines like `Catalog: skipped sheet row 12 (...)`. If the sheet is unreachable the build keeps working with the built-in products.

## Troubleshooting
- **`next` is not recognized**: run `npm install`.
- **Port 9002 in use**: stop the other process, or run `npx next dev --turbopack -p 3000`.
- **Divergent branches on pull**: `git pull origin main --rebase`.
- **Changes not showing or HMR errors**: check that the JSON files in `src/lib/` are valid, then refresh.
