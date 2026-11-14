import * as React from "react";
import Link from "next/link";

const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

// Renders text with [label](/path) markers as internal links, so editorial copy kept in data files
// (category pages, later the journal) can link to other pages without becoming JSX.
export function InlineLinks({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <Link
        key={start}
        href={match[2]}
        className="text-foreground border-b border-brand-gold/40 hover:text-brand-gold hover:border-brand-gold transition-colors"
      >
        {match[1]}
      </Link>
    );
    last = start + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
