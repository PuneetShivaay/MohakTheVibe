import * as React from "react";
import { cn } from "@/lib/utils";

// CSS-only entrance for first-screen content. Unlike Reveal, it does not wait for JavaScript,
// so text and images are visible as soon as the HTML paints. Skipped for reduced motion.
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("motion-safe:animate-reveal", className)} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
