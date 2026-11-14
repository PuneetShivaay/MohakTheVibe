LOCAL IMAGES

Most product photos now come from the Google Sheet catalogue via Cloudinary (see
docs/catalog-plan.md). This folder holds only the images that ship with the code:

  hero.webp            Home page hero
  pratibha2.webp       Team lead portrait (src/lib/team.ts)
  earring/*.webp       Fallback product photos, used when the sheet cannot be read at build time
  flipkart-logo.png    Marketplace logos, kept for future "also available on" badges
  meesho_logo.png
  header.png           Not currently used by any page

Adding a local image:
  1. Export as WebP, at most 1200px wide, and drop it in this folder.
  2. Add an entry (id, imageUrl, description, imageHint) to src/lib/placeholder-images.json.
  3. Look it up in a component with PlaceHolderImages.find(...), always with a fallback.

Team portraits go in public/images/team/ (4:5, at least 600px wide); see src/lib/team.ts.

Keep this folder small: it ships whole with every deploy. Don't commit camera-original PNG or
JPEG files alongside their WebP versions.
