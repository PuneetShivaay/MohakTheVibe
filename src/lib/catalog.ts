// Build-time product catalog (static export: this runs during `next build`, never in the browser).
// Reads the published Google Sheet CSV from CATALOG_SHEET_CSV_URL. Bad rows are skipped and logged;
// if the variable is unset, the request fails, or no row is valid, the fallback list in products.ts
// is used. It never throws, so the sheet can never break a build. See docs/catalog-plan.md.
import Papa from "papaparse";
import { z } from "zod";
import { PlaceHolderImages } from "./placeholder-images";
import { cloudinaryUrl, isAllowedImage } from "./images";
import { categories, collections, fallbackProducts, type Product } from "./products";

const CATEGORY_SLUGS = categories.map((c) => c.slug) as [Product["category"], ...Product["category"][]];
const COLLECTION_SLUGS = new Set(collections.map((c) => c.slug));
const TYPE_COLLECTIONS = new Set(collections.filter((c) => c.isType).map((c) => c.slug));

// --- Images -------------------------------------------------------------------------------------

const imageById = (id?: string) => (id ? PlaceHolderImages.find((img) => img.id === id)?.imageUrl : undefined);

// cloudinaryUrl lives in images.ts (client-safe); re-exported so existing imports keep working
export { cloudinaryUrl };

// --- Sheet rows ---------------------------------------------------------------------------------

// Template placeholders (e.g. YOUR_CLOUD_NAME, REPLACE_WITH_PRODUCT_LINK) count as empty
const isPlaceholder = (value: string) => /YOUR_|REPLACE_WITH/i.test(value);
const cell = z
  .string()
  .optional()
  .transform((v) => (v ?? "").trim());
const optionalUrl = cell.transform((v) => (v && !isPlaceholder(v) && /^https:\/\//.test(v) ? v : undefined));
const yesNo = (fallback: boolean) =>
  cell.transform((v) => (v ? ["yes", "y", "true", "1"].includes(v.toLowerCase()) : fallback));

const rowSchema = z.object({
  // Part of the product page URL (/product/<id>), so letters, digits, - and _ only
  id: cell.pipe(
    z
      .string()
      .min(1, "missing id")
      .regex(/^[A-Za-z0-9_-]+$/, "id may only contain letters, digits, - and _")
  ),
  name: cell.pipe(z.string().min(1, "missing name")),
  description: cell,
  category: cell.transform((v) => v.toLowerCase()).pipe(z.enum(CATEGORY_SLUGS, { message: "unknown category" })),
  collection: cell.transform((v) => v.toLowerCase()),
  // Optional: what kind of piece it is (stud, hoop, jhumka...); drives the filter chips on category pages
  type: cell.transform((v) => v.toLowerCase().replace(/\s+/g, "-")),
  price: cell
    .transform((v) => Number(v.replace(/[₹,\s]/g, "")))
    .pipe(z.number({ message: "price is not a number" }).positive("price must be above 0")),
  main_image: cell.refine(
    (v) => isAllowedImage(v) && !isPlaceholder(v),
    "main_image must be a Cloudinary, Flipkart or Meesho URL"
  ),
  hover_image: optionalUrl,
  flipkart: optionalUrl,
  meesho: optionalUrl,
  amazon: optionalUrl,
  featured: yesNo(false),
  active: yesNo(true),
  sort: cell.transform((v) => (v && Number.isFinite(Number(v)) ? Number(v) : Number.MAX_SAFE_INTEGER)),
});

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Extra gallery photos: every column named image2, image3, ... (any number), in number order, empty cells skipped
const EXTRA_IMAGE_COLUMN = /^image(\d+)$/;
const extraImageCells = (raw: Record<string, string>) =>
  Object.keys(raw)
    .flatMap((key) => {
      const match = EXTRA_IMAGE_COLUMN.exec(key);
      return match ? [{ n: Number(match[1]), value: (raw[key] ?? "").trim() }] : [];
    })
    .sort((a, b) => a.n - b.n)
    .map((c) => c.value)
    .filter((v) => v && !isPlaceholder(v));

// Exported for testing; pages use getProducts()
export function parseSheet(csv: string): Product[] {
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  const seen = new Set<string>();
  const rows: { product: Product; sort: number }[] = [];
  let skipped = 0;

  data.forEach((raw, i) => {
    const rowNumber = i + 2; // header is row 1
    // Rows with neither id nor name are treated as empty (e.g. only dropdown defaults filled in)
    if (!raw.id?.trim() && !raw.name?.trim()) return;
    const result = rowSchema.safeParse(raw);
    if (!result.success) {
      skipped++;
      const reasons = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
      console.warn(`Catalog: skipped sheet row ${rowNumber} (${reasons})`);
      return;
    }
    const r = result.data;
    if (!r.active) return;
    if (seen.has(r.id)) {
      skipped++;
      console.warn(`Catalog: skipped sheet row ${rowNumber} (duplicate id "${r.id}")`);
      return;
    }
    seen.add(r.id);

    let collection: string | undefined = r.collection || undefined;
    let type: string | undefined = r.type || undefined;
    if (collection && !COLLECTION_SLUGS.has(collection)) {
      // Older sheets put types (hoop, jhumka...) in the collection column: use them as the type
      type ??= collection;
      collection = undefined;
    }
    // Collections like hoop or jhumka are also a kind of piece: use them as the type for the filter chips
    if (!type && collection && TYPE_COLLECTIONS.has(collection)) type = collection;

    const extras = extraImageCells(raw);
    const moreImages = extras.filter((v) => /^https:\/\//.test(v) && isAllowedImage(v));
    if (moreImages.length < extras.length) {
      console.warn(
        `Catalog: row ${rowNumber} ("${r.id}") ignored ${extras.length - moreImages.length} image2/image3... link(s) not on Cloudinary, Flipkart or Meesho`
      );
    }

    rows.push({
      sort: r.sort,
      product: {
        id: r.id,
        name: r.name,
        category: r.category,
        collection,
        type,
        price: formatPrice(r.price),
        image: r.main_image,
        hoverImage: r.hover_image && isAllowedImage(r.hover_image) ? r.hover_image : undefined,
        moreImages: moreImages.length > 0 ? moreImages : undefined,
        description: r.description || undefined,
        links: { flipkart: r.flipkart, meesho: r.meesho, amazon: r.amazon },
        featured: r.featured,
      },
    });
  });

  rows.sort((a, b) => a.sort - b.sort || a.product.id.localeCompare(b.product.id));
  console.info(`Catalog: ${rows.length} products from the sheet, ${skipped} rows skipped`);
  return rows.map((r) => r.product);
}

// --- Fallback -----------------------------------------------------------------------------------

function fallback(): Product[] {
  return fallbackProducts.flatMap(({ imgId, hoverImgId, ...rest }) => {
    const image = imageById(imgId);
    return image ? [{ ...rest, image, hoverImage: imageById(hoverImgId) }] : [];
  });
}

// --- Public API ---------------------------------------------------------------------------------

async function loadProducts(): Promise<Product[]> {
  const url = process.env.CATALOG_SHEET_CSV_URL;
  if (!url) return fallback();

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000), cache: "force-cache" });
    if (!res.ok) {
      console.warn(`Catalog: sheet unavailable (HTTP ${res.status}); using fallback products.`);
      return fallback();
    }
    const products = parseSheet(await res.text());
    if (products.length === 0) {
      console.warn("Catalog: no valid products in the sheet; using fallback products.");
      return fallback();
    }
    return products;
  } catch {
    console.warn("Catalog: sheet request failed; using fallback products.");
    return fallback();
  }
}

// One fetch per build worker; every page and section shares the same list
let cached: Promise<Product[]> | undefined;

export function getProducts(): Promise<Product[]> {
  cached ??= loadProducts();
  return cached;
}
