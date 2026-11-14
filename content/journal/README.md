# Journal articles

Each article is one `.mdx` file in this folder. Commit it and the site rebuilds with the new article.
Plan: `docs/seo-premium-plan.md`, phase 6.

## Add an article

1. Copy `_template.mdx` to a new file named after the article, for example `stop-jewellery-turning-black.mdx`.
   The name becomes the page address (`/journal/stop-jewellery-turning-black`), so use only lower-case letters,
   digits and single dashes, and never rename it once it is published (links and Google results would break).
2. Fill in the block at the top (between the two `---` lines), then write the article under it.
3. Put photos in `public/images/journal/` as WebP, at most 1600px wide, and refer to them as
   `/images/journal/photo-name.webp`.
4. Remove the `draft: true` line (or set it to `false`) when it is ready, and commit.

## The block at the top

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Becomes the page title and the heading. The site adds " \| Mohak The Vibe" (18 characters) in search results, and Google cuts titles at about 60, so keep the title itself under about 42 characters. Put it in quotes if it contains a colon |
| `description` | yes | One or two sentences, under about 155 characters. Shown in search results and on the card |
| `date` | yes | `2026-12-01`. A future date **schedules** the article: it goes live on the first rebuild on or after that day (the site rebuilds every 3 hours) |
| `updated` | no | Same format. Set it when you change an article in a meaningful way |
| `category` | no | `earrings`, `pendants` or `bracelets`. Adds a "Shop ..." button under the article |
| `image` | no | Cover photo: `/images/journal/...` or a Cloudinary URL. Shown at the top and in social previews |
| `author` | no | Defaults to "Mohak The Vibe" |
| `draft` | no | `true` keeps the article off the site while you write |

## What you can use in the text

Headings (`##`, `###`), paragraphs, **bold**, bullet and numbered lists, quotes (`>`), images, links and a
divider (`---`). Link to other pages on the site with a path starting `/` (`[earrings](/shop/earrings)`); these
are good for search, so link to a category or collection in most articles.

## Rules that protect the site

- **Write only what is true.** Material, finish and delivery claims must match what customers actually get.
- A file with a mistake in its top block (missing title, bad date, unknown category) is skipped and a warning
  appears in the build log. It never breaks the site, but it will not appear until fixed.
- Files starting with `_` and this README are never published.
- MDX can run code. Only commit text written by your own team; never paste in anything from an outside source
  you have not read.
- The Journal link in the menu and footer appears automatically once the first article is published.
