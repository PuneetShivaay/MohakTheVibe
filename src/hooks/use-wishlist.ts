"use client";

import * as React from "react";

// Wishlist: product ids saved in this browser (no account or backend). Every component using the hook
// stays in sync, including other open tabs (via the `storage` event).
const STORAGE_KEY = "mohak-wishlist";
const CHANGE_EVENT = "mohak-wishlist-change";
const EMPTY: string[] = [];

// useSyncExternalStore needs the same array back while storage is unchanged
let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

function read(): string[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedIds;
  cachedRaw = raw;
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    cachedIds = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : EMPTY;
  } catch {
    cachedIds = EMPTY;
  }
  return cachedIds;
}

function write(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Private mode or storage full: the wishlist simply doesn't persist
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

export function useWishlist() {
  // Empty on the server and during hydration, then the saved list
  const ids = React.useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggle = React.useCallback((id: string) => {
    const current = read();
    write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }, []);

  return { ids, has: (id: string) => ids.includes(id), toggle };
}
