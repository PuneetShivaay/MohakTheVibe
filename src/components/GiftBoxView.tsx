"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Minus, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGiftBox } from "@/hooks/use-gift-box";
import { cloudinaryUrl } from "@/lib/images";
import { formatINR, priceValue, productPath, type Product } from "@/lib/products";
import { BULK_HINT_FROM, GIFTING_LINK, SITE_LINKS, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SeeAllCategories } from "./SeeAllCategories";

const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Festival", "Thank you", "Corporate gift", "Just because", "Other"];
const MESSAGE_MAX = 200;

const fieldLabel = "block mb-2 text-eyebrow uppercase text-brand-gold";
const fieldInput = "rounded-none border-border bg-background focus-visible:ring-brand-gold";
const stepButton =
  "inline-flex h-9 w-9 items-center justify-center border border-border hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-40 disabled:pointer-events-none";

type Line = { product: Product; qty: number; total: number };
type Details = { from: string; occasion: string; message: string; deliverBy: string };

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// The order as a plain WhatsApp message: one piece per line with price, quantity and link, then the details.
// The address is deliberately not collected on the site; we ask for it in the chat.
function giftMessage(lines: Line[], count: number, total: number, d: Details) {
  const pieces = lines.map(
    (l, i) =>
      `${i + 1}. ${l.product.name} – ${l.product.price} × ${l.qty} = ${formatINR(l.total)}\n${SITE_URL}${productPath(l.product.id)}`
  );
  const details = [
    d.occasion && `Occasion: ${d.occasion}`,
    d.message.trim() && `Gift message: "${d.message.trim()}"`,
    d.from.trim() && `From: ${d.from.trim()}`,
    d.deliverBy && `Choose Delivery Date: ${formatDate(d.deliverBy)}`,
  ].filter(Boolean);
  return [
    "Hi Mohak, I'd like to send a gift.",
    pieces.join("\n\n"),
    `Total: ${count} ${count === 1 ? "piece" : "pieces"}, ${formatINR(total)} (before delivery)` +
      (count >= BULK_HINT_FROM ? "\nThis is a bulk order, please share your bulk price." : ""),
    details.join("\n"),
    "Please gift-wrap it and send it without any price on the parcel. I'll share the delivery address here.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

// The gift box, the order details and the WhatsApp button: a clean checkout, no suggestions (those are on
// /gifting). Ids in the box that are no longer in the catalogue are skipped, not deleted (a build that fell
// back to default products must not wipe anyone's box).
export function GiftBoxView({ products }: { products: Product[] }) {
  const box = useGiftBox();
  // The box is only known in the browser; render a placeholder until then to avoid an "empty" flash
  const [ready, setReady] = React.useState(false);
  const [today, setToday] = React.useState("");
  React.useEffect(() => {
    setReady(true);
    const now = new Date();
    setToday(new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10));
  }, []);

  const [details, setDetails] = React.useState<Details>({ from: "", occasion: "", message: "", deliverBy: "" });
  const set = (key: keyof Details) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setDetails((d) => ({ ...d, [key]: e.target.value }));

  const lines: Line[] = box.items.flatMap((item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? [{ product, qty: item.qty, total: priceValue(product.price) * item.qty }] : [];
  });
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.total, 0);
  const whatsappHref = `${SITE_LINKS.whatsappChat}?text=${encodeURIComponent(giftMessage(lines, count, total, details))}`;

  return (
    <div className="grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-16 items-start">
      {/* Left: the box */}
      <div>
        <h2 className="font-headline text-display-sm">
          Your gift <em>box</em>
        </h2>

        {!ready ? (
          <div className="mt-8 min-h-[12rem]" />
        ) : lines.length === 0 ? (
          <p className="mt-6 max-w-md text-foreground/70 font-light leading-relaxed">
            Your gift box is empty. Tap “Send as a gift” on any product page, or choose pieces from{" "}
            <Link href={GIFTING_LINK.href} className="underline underline-offset-4 hover:text-brand-gold">
              the gifting page
            </Link>
            . New to gifting? <Link href={GIFTING_LINK.href} className="underline underline-offset-4 hover:text-brand-gold">See how it works</Link>.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {lines.map((l) => (
              <li key={l.product.id} className="flex items-center gap-4 sm:gap-6 py-5">
                <Link
                  href={productPath(l.product.id)}
                  className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted border border-border"
                  tabIndex={-1}
                  aria-hidden
                >
                  <Image src={cloudinaryUrl(l.product.image, 200)} alt="" fill sizes="64px" className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={productPath(l.product.id)}
                    className="font-headline text-base md:text-lg leading-snug hover:text-brand-gold transition-colors"
                  >
                    {l.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-foreground/60">{l.product.price} each</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => box.setQty(l.product.id, l.qty - 1)}
                      disabled={l.qty <= 1}
                      aria-label={`One fewer ${l.product.name}`}
                      className={stepButton}
                    >
                      <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => box.setQty(l.product.id, l.qty + 1)}
                      aria-label={`One more ${l.product.name}`}
                      className={stepButton}
                    >
                      <Plus aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 self-stretch justify-between">
                  <button
                    type="button"
                    onClick={() => box.remove(l.product.id)}
                    aria-label={`Remove ${l.product.name} from the gift box`}
                    className="p-1 text-foreground/50 hover:text-brand-copper transition-colors"
                  >
                    <X aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <p className="text-sm tabular-nums">{formatINR(l.total)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* One quiet way back to the shop; the suggestions live on /gifting, so this page stays a checkout */}
        {ready && <SeeAllCategories className="mt-8" label="Add more pieces" />}
      </div>

      {/* Right: details and the WhatsApp button; stays in view on large screens */}
      <div className="lg:sticky lg:top-28 border border-border bg-background p-6 sm:p-8">
        <h2 className="font-headline text-2xl">Gift details</h2>

        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-foreground/70">Pieces</dt>
            <dd className="tabular-nums">{ready ? count : "–"}</dd>
          </div>
          <div className="flex justify-between font-medium">
            <dt>Total</dt>
            <dd className="tabular-nums">{ready ? formatINR(total) : "–"}</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-foreground/60">Delivery charge confirmed on WhatsApp.</p>
        <p className="mt-4 text-sm text-foreground/70 font-light">
          {ready && count >= BULK_HINT_FROM
            ? "That's a bulk order: we'll share our bulk price on WhatsApp."
            : "Ordering several pieces? Ask us for our bulk price in the same chat."}
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="gift-from" className={fieldLabel}>
              From
            </label>
            <Input id="gift-from" value={details.from} onChange={set("from")} placeholder="Your name" autoComplete="name" className={fieldInput} />
          </div>
          <div>
            <label htmlFor="gift-occasion" className={fieldLabel}>
              Occasion
            </label>
            <select
              id="gift-occasion"
              value={details.occasion}
              onChange={set("occasion")}
              className={cn(
                "flex h-10 w-full border px-3 py-2 text-base md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                fieldInput,
                !details.occasion && "text-muted-foreground"
              )}
            >
              <option value="">Choose (optional)</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gift-message" className={fieldLabel}>
              Gift message
            </label>
            <Textarea
              id="gift-message"
              value={details.message}
              onChange={set("message")}
              maxLength={MESSAGE_MAX}
              placeholder="A few words for the person receiving it (optional)"
              className={`${fieldInput} min-h-[96px] resize-none`}
            />
            <p className="mt-1 text-right text-xs text-foreground/50 tabular-nums">
              {details.message.length}/{MESSAGE_MAX}
            </p>
          </div>
          <div>
            <label htmlFor="gift-date" className={fieldLabel}>
              Select Delivery date
            </label>
            <Input
              id="gift-date"
              type="date"
              min={today || undefined}
              value={details.deliverBy}
              onChange={set("deliverBy")}
              className={fieldInput}
            />
          </div>
        </div>

        {lines.length > 0 ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center gap-3 bg-cta hover:bg-cta/90 text-cta-foreground text-eyebrow uppercase px-6 py-4 transition-colors"
          >
            <MessageCircle aria-hidden className="h-4 w-4" strokeWidth={1.5} />
            Send gift order on WhatsApp
          </a>
        ) : (
          <p className="mt-8 border border-dashed border-border px-6 py-4 text-center text-eyebrow uppercase text-foreground/50">
            Add a piece to send your order
          </p>
        )}
        <p className="mt-4 text-xs text-foreground/60 leading-relaxed">
          We reply with the delivery charge and a UPI payment request. Share the delivery address in the chat. Your gift
          box is saved in this browser only.
        </p>
      </div>
    </div>
  );
}
