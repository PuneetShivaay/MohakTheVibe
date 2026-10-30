import { cn } from "@/lib/utils";

// Brand promises shown as a quiet trust strip (see redesign plan, "Trust signals")
export const BRAND_PROMISES = ["Handpicked", "Anti-tarnish", "Gift-ready", "Pan-India delivery"] as const;

export function PromiseStrip({ className }: { className?: string }) {
  return (
    <section aria-label="Our promises" className={cn("border-y border-brand-gold/20", className)}>
      <ul className="max-w-site mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {BRAND_PROMISES.map((promise) => (
          <li key={promise} className="flex items-center justify-center gap-3 text-eyebrow uppercase text-foreground/70">
            <span aria-hidden className="w-1 h-1 rotate-45 bg-brand-gold" />
            {promise}
          </li>
        ))}
      </ul>
    </section>
  );
}
