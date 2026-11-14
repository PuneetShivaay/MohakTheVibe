# Gifting Plan

A page and a gift box for sending jewellery to someone as a gift, single pieces or in bulk, wrapped by us and
delivered by courier **with no price on the parcel**. Branch **`gifting`** (built on `seo-premium`, which it reuses
for the `cta` button colour and the nav helpers). Same constraints as the rest of the site: static export, no
backend, nothing stored on a server. Log progress in `docs/redesign-progress.md`.

## Why it exists
Marketplace parcels follow Flipkart's and Meesho's packaging and invoice rules, which we don't control, and a
custom multi-piece box can't be ordered there. Ordering direct on WhatsApp gives the buyer three things the
marketplaces don't: **no price on the parcel, our gift wrap, and any mix of pieces in any quantity.**

## Decisions (agreed with the user)
| Topic | Decision |
|---|---|
| Audience | Anyone gifting anyone. Generic copy ("Gift your loved ones"), no boy/girl split |
| Prices | Shown on the site so the buyer knows the cost. **Never on the parcel or in the box** |
| Ordering | Gift box on the site, then the order goes to us on **WhatsApp** (no cart, no checkout) |
| Payment | **UPI only**, after we confirm the order on WhatsApp |
| Delivery | Courier, **all over India**. Charge and timing confirmed on WhatsApp |
| Quantity | Minimum one piece. Bulk orders get a discount, **quoted on WhatsApp** (no numbers on the page until decided) |
| Address | Collected on WhatsApp, **not** in the website form (short form, no personal data on the site) |
| Navigation | "Gifting" in the navbar and the footer. A parent/sub-menu may come later |
| Marketplaces | Still offered for single pieces; the page says plainly that their packaging and invoice rules apply |
| Gift wrap photos | None yet. Copy says only "gift-wrapped"; no ribbon/box details nobody can see. Photos slot in later |

## How it works for the buyer
1. On any product page (and optionally cards), **"Send as a gift"** adds the piece to the **gift box**.
2. On **`/gifting`** they see the box: pieces, quantity steppers, line totals and a total.
3. A short form: their name, occasion, gift-card message, optional deliver-by date.
4. **"Send gift order on WhatsApp"** opens WhatsApp with everything written out: pieces, quantities, prices, total,
   occasion, message, date, and the line "Please deliver without any price on the parcel".
5. We reply on WhatsApp with delivery charge, any bulk discount and a UPI request; they share the address there.

## What gets built
- `src/hooks/use-gift-box.ts`: `{ id, qty }[]` in `localStorage` (`mohak-gift-box`), synced across components and
  tabs, same pattern as `use-wishlist.ts`. Ids missing from the current catalogue are skipped, not deleted.
- `GiftButton` ("Send as a gift" / "In your gift box") on the product page next to the wishlist button.
- `/gifting` page (`src/app/(site)/gifting/page.tsx`) with a client `GiftBoxView`:
  hero, how-it-works, the box, the form, the WhatsApp button, a bulk line, a "prefer a marketplace?" note, FAQ.
- Gift count badge on the navbar link, like the wishlist heart.
- `JOURNAL_LINK`-style `GIFTING_LINK` in `site.ts`; navbar and footer show it. The navbar is tight at laptop widths,
  so check 1024–1280px and shorten a label if needed.
- SEO: title/description aimed at "jewellery gifts online India", "return gifts for wedding", "bulk gifts";
  sitemap entry; `socialMeta()`; breadcrumb JSON-LD. The journal's gift guide links to `/gifting`.
- FAQ (with no promises we can't keep): no price on the parcel, gift wrap, UPI payment, delivery across India,
  bulk pricing, changing or cancelling an order. Delivery times and charges: "confirmed on WhatsApp".

## Copy rules
- Only true statements. "Gift-wrapped", "No price on the parcel", "Delivered by courier across India",
  "Pay by UPI once we confirm". No delivery-day promises, no discount percentages, no wrap details.
- WhatsApp message is plain text, readable on a phone, one piece per line.

## Before going live (not code)
- [ ] **Terms & Privacy:** both say all purchases happen on Flipkart and Meesho. Add a direct gift orders section
      (payment by UPI, delivery, returns/exchanges for gifts, cancellations). I draft, the brand reviews.
- [ ] **GST invoice:** ask the CA how to issue the invoice to the buyer (for example by email or WhatsApp) instead
      of in the parcel.
- [ ] **Return rule for gifts** (damaged in transit at least).
- [ ] **Bulk pricing:** decide whether to publish tiers later; until then "ask on WhatsApp".
- [ ] **Gift wrap photos** for the page and the product-page line.
- [ ] Privacy page also still says the site is hosted on Firebase; it is on Vercel.

## Status
- [x] Plan agreed
- [ ] 1. Gift box hook + "Send as a gift" button + navbar/footer link and badge
- [ ] 2. `/gifting` page: box, form, WhatsApp message, FAQ, SEO
- [ ] 3. Policy section drafts (Terms, Privacy) for review
