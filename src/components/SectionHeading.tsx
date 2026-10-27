import * as React from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-eyebrow uppercase text-brand-gold", className)}>{children}</p>;
}

// Standard section title: small gold label above a large Playfair heading
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto" : "text-left", "max-w-3xl", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Heading className="font-headline text-display text-foreground">{title}</Heading>
      {description && (
        <p className={cn("mt-6 text-foreground/70 font-light leading-relaxed", align === "center" && "mx-auto", "max-w-xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
