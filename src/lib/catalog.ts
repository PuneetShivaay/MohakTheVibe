// Build-time product catalog (static export: this runs during `next build`, never in the browser).
// Reads the published Google Sheet CSV from CATALOG_SHEET_CSV_URL. Bad rows are skipped and logged;
// if the variable is unset, the request fails, or no row is valid, the fallback list in products.ts
// is used. It never throws, so the sheet can never break a build. See docs/catalog-plan.md.
import Papa from "papaparse";
import { z } from "zod";
import { PlaceHolderImages } from "./placeholder-images";
import { categories, collections, fallbackProducts, type Product } from "./products";

const CATEGORY_SLUGS = categories.map((c) => c.slug) as [Product["category"], ...Product["category"][]];
const COLLECTION_SLUGS = new Set(collections.map((c) => c.slug));

// --- Images -------------------------------------------------------------------------------------

const imageById = (id?: string) => (id ? PlaceHolderImages.find((img) => img.id === id)?.imageUrl : undefined);

const isCloudinaryUrl = (url: string) => /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url);

// Marketplace CDNs that host the same product photos (Flipkart: rukminim1/2.flixcart.com, Meesho)
const isMarketplaceImage = (url: string) =>
  /^https:\/\/(rukminim\d*\.flixcart\.com|images\.meesho\.com)\//.test(url);

const isAllowedImage = (url: string) => isCloudinaryUrl(url) || isMarketplaceImage(url);
// Adds automatic format/quality and a width cap to Cloudinary URLs (Next image optimisation is
// off in static export). Other URLs are returned unchanged.
export function cloudinaryUrl(url: string, width = 800) {
  if (!isCloudinaryUrl(url)) return url;
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

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
  id: cell.pipe(z.string().min(1, "missing id")),
  name: cell.pipe(z.string().min(1, "missing name")),
  category: cell.transform((v) => v.toLowerCase()).pipe(z.enum(CATEGORY_SLUGS, { message: "unknown category" })),
  collection: cell.transform((v) => v.toLowerCase()),
  price: cell
    .transform((v) => Number(v.replace(/[₹,\s]/g, "")))
    .pipe(z.number({ message: "price is not a number" }).positive("price must be above 0")),
  image: cell.refine((v) => isAllowedImage(v) && !isPlaceholder(v), "image must be a Cloudinary, Flipkart or Meesho URL"),
  hover_image: optionalUrl,
  flipkart: optionalUrl,
  meesho: optionalUrl,
  amazon: optionalUrl,
  featured: yesNo(false),
  active: yesNo(true),
  sort: cell.transform((v) => (v && Number.isFinite(Number(v)) ? Number(v) : Number.MAX_SAFE_INTEGER)),
});

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

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
    if (collection && !COLLECTION_SLUGS.has(collection)) {
      console.warn(`Catalog: row ${rowNumber} has unknown collection "${collection}"; shown without a collection`);
      collection = undefined;
    }

    rows.push({
      sort: r.sort,
      product: {
        id: r.id,
        name: r.name,
        category: r.category,
        collection,
        price: formatPrice(r.price),
        image: r.image,
        hoverImage: r.hover_image && isAllowedImage(r.hover_image) ? r.hover_image : undefined,
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
