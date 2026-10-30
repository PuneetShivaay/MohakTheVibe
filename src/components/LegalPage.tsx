import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { Eyebrow } from "./SectionHeading";

export type LegalSection = { heading: string; body: ReactNode };

// Shared layout for plain-text policy pages (terms, privacy)
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <Eyebrow className="mb-6">Legal</Eyebrow>
          <h1 className="font-headline text-display">{title}</h1>
          <p className="mt-4 text-eyebrow uppercase text-foreground/50">Last updated: {updated}</p>
          <p className="mt-8 text-foreground/70 font-light leading-relaxed">{intro}</p>
        </FadeIn>

        <div className="mt-14 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-headline text-display-sm mb-3">{s.heading}</h2>
              <div className="space-y-3 text-foreground/70 font-light leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
