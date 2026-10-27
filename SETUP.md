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
None needed. The site is a static export with no server-side secrets. If you ever add one, put it in `.env.local` (git-ignored) and never commit real keys.

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

On Windows PowerShell, `npm run build` may fail because the script sets `NODE_ENV=production` inline. Use `$env:NODE_ENV="production"; npx next build` instead.

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
**Automatic:** every push to `main` builds and deploys to Firebase Hosting via GitHub Actions (`.github/workflows/firebase-deploy.yml`). Work on a branch until changes are ready to go live.

**Manual:** install the Firebase CLI (`npm i -g firebase-tools`), run `firebase login`, build, then `firebase deploy --only hosting`.

## Troubleshooting
- **`next` is not recognized**: run `npm install`.
- **Port 9002 in use**: stop the other process, or run `npx next dev --turbopack -p 3000`.
- **Divergent branches on pull**: `git pull origin main --rebase`.
- **Changes not showing or HMR errors**: check that the JSON files in `src/lib/` are valid, then refresh.
