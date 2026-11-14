"use client";

import * as React from "react";

// Gift box: pieces and quantities for a gift order, saved in this browser (no account or backend), the same
// way as the wishlist. Every component using the hook stays in sync, including other open tabs.
// The order itself is sent to us on WhatsApp from /gifting; see docs/gifting-plan.md.
export type GiftItem = { id: string; qty: number };

const STORAGE_KEY = "mohak-gift-box";
const CHANGE_EVENT = "mohak-gift-box-change";
const MAX_QTY = 999;
const EMPTY: GiftItem[] = [];

// useSyncExternalStore needs the same array back while storage is unchanged
let cachedRaw: string | null = null;
let cachedItems: GiftItem[] = EMPTY;

const clampQty = (qty: number) => Math.min(MAX_QTY, Math.max(0, Math.floor(qty) || 0));

function read(): GiftItem[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedItems;
  cachedRaw = raw;
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    cachedItems = Array.isArray(parsed)
      ? parsed.flatMap((x) =>
          x && typeof x.id === "string" && clampQty(x.qty) > 0 ? [{ id: x.id, qty: clampQty(x.qty) }] : []
        )
      : EMPTY;
  } catch {
    cachedItems = EMPTY;
  }
  return cachedItems;
}

function write(items: GiftItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Private mode or storage full: the gift box simply doesn't persist
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Set one piece's quantity; 0 removes it. New pieces go to the end, so the box keeps the order they were added.
function setQty(id: string, qty: number) {
  const next = clampQty(qty);
  const current = read();
  const exists = current.some((item) => item.id === id);
  if (next === 0) write(current.filter((item) => item.id !== id));
  else if (exists) write(current.map((item) => (item.id === id ? { id, qty: next } : item)));
  else write([...current, { id, qty: next }]);
}

export function useGiftBox() {
  // Empty on the server and during hydration, then the saved box
  const items = React.useSyncExternalStore(subscribe, read, () => EMPTY);

  const qtyOf = React.useCallback((id: string) => items.find((item) => item.id === id)?.qty ?? 0, [items]);
  const add = React.useCallback((id: string) => setQty(id, (read().find((i) => i.id === id)?.qty ?? 0) + 1), []);
  const remove = React.useCallback((id: string) => setQty(id, 0), []);
  const clear = React.useCallback(() => write([]), []);

  return {
    items,
    // Total pieces (sum of quantities), for the navbar count
    count: items.reduce((sum, item) => sum + item.qty, 0),
    qtyOf,
    add,
    setQty,
    remove,
    clear,
  };
}
