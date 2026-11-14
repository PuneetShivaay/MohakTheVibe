// Build-time journal (static export: this runs during `next build`, never in the browser).
// Articles are .mdx files in content/journal/, one per article; see content/journal/README.md.
// Like the sheet catalog, it never throws: a file with bad front matter is skipped and logged, so a
// typo in one article can never break the build.
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { isAllowedImage } from "./images";
import { categories } from "./products";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");
const CATEGORY_SLUGS = categories.map((c) => c.slug) as [string, ...string[]];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const frontMatterSchema = z.object({
  title: z.string().trim().min(1, "missing title"),
  // Used as the meta description and the card text: one or two sentences
  description: z.string().trim().min(1, "missing description"),
  date: z.string().regex(DATE, "date must look like 2026-11-20"),
  updated: z.string().regex(DATE, "updated must look like 2026-11-20").optional(),
  // Shopping category the article leads to ("Shop earrings" at the end of the article)
  category: z.enum(CATEGORY_SLUGS, { message: "unknown category" }).optional(),
  // Cover photo: a /images/... file in public/ or a Cloudinary, Flipkart or Meesho URL
  image: z
    .string()
    .trim()
    .refine((v) => v.startsWith("/images/") || isAllowedImage(v), "image must be under /images/ or a Cloudinary, Flipkart or Meesho URL")
    .optional(),
  author: z.string().trim().min(1).optional(),
  // `draft: true` keeps an article out of the site while it is being written
  draft: z.boolean().optional(),
});

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category?: (typeof CATEGORY_SLUGS)[number];
  image?: string;
  author: string;
  body: string;
  readingMinutes: number;
};

// Minimal front matter: a leading block between two `---` lines of `key: value` pairs. Values may be
// wrapped in single or double quotes; `true` / `false` become booleans. No nesting, no lists.
export function parseFrontMatter(source: string): { data: Record<string, string | boolean>; body: string } {
  const text = source.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) return { data: {}, body: text };
  const data: Record<string, string | boolean> = {};
  for (const line of match[1].split("\n")) {
    const pair = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line.trim());
    if (!pair) continue;
    const raw = pair[2].trim().replace(/^(["'])([\s\S]*)\1$/, "$2");
    data[pair[1]] = raw === "true" ? true : raw === "false" ? false : raw;
  }
  return { data, body: text.slice(match[0].length) };
}

const readingMinutes = (body: string) => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200));

// Today as YYYY-MM-DD in India, so an article dated "today" goes live on the first build of that day
const todayIST = () => new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);

function loadPosts(): Post[] {
  let files: string[];
  try {
    files = fs.readdirSync(JOURNAL_DIR);
  } catch {
    return []; // no content/journal folder yet
  }

  const today = todayIST();
  const posts: Post[] = [];

  for (const file of files) {
    // Files starting with "_" (the template) and anything that is not .mdx are not articles
    if (!file.endsWith(".mdx") || file.startsWith("_")) continue;
    const slug = file.slice(0, -".mdx".length);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      console.warn(`Journal: skipped "${file}" (file name may only use lower-case letters, digits and single dashes)`);
      continue;
    }
    try {
      const { data, body } = parseFrontMatter(fs.readFileSync(path.join(JOURNAL_DIR, file), "utf8"));
      const parsed = frontMatterSchema.safeParse(data);
      if (!parsed.success) {
        const reasons = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
        console.warn(`Journal: skipped "${file}" (${reasons})`);
        continue;
      }
      const fm = parsed.data;
      if (fm.draft) continue;
      // A future date schedules the article: it appears on the first rebuild on or after that day
      if (fm.date > today) continue;
      if (body.trim().length === 0) {
        console.warn(`Journal: skipped "${file}" (no text after the front matter)`);
        continue;
      }
      posts.push({
        slug,
        title: fm.title,
        description: fm.description,
        date: fm.date,
        updated: fm.updated,
        category: fm.category,
        image: fm.image,
        author: fm.author ?? "Mohak The Vibe",
        body,
        readingMinutes: readingMinutes(body),
      });
    } catch {
      console.warn(`Journal: skipped "${file}" (could not be read)`);
    }
  }

  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  console.info(`Journal: ${posts.length} article${posts.length === 1 ? "" : "s"}`);
  return posts;
}

let cached: Post[] | undefined;

export function getPosts(): Post[] {
  cached ??= loadPosts();
  return cached;
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

// The journal link only appears in the navigation once there is something to read
export const hasJournal = () => getPosts().length > 0;

// "20 November 2026" for display, from the YYYY-MM-DD front matter date
export const formatPostDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
