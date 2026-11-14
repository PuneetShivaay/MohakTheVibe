import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/journal";
import { breadcrumbJsonLd, socialMeta } from "@/lib/seo";
import { FadeIn } from "@/components/FadeIn";
import { JournalCard } from "@/components/JournalCard";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const title = "The Journal";
const description =
  "Jewellery notes from Mohak The Vibe, Lucknow: how to choose, style and care for earrings, pendants and bracelets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/journal" },
  ...socialMeta({ title, description, path: "/journal" }),
  // Until the first article is published there is nothing worth indexing
  robots: getPosts().length === 0 ? { index: false, follow: true } : undefined,
};

export default function JournalPage() {
  const posts = getPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <FadeIn>
            <SectionHeading
              as="h1"
              align="left"
              eyebrow="Journal"
              title={
                <>
                  Notes on <em>jewellery</em>
                </>
              }
              description="How to choose it, style it and look after it."
            />
          </FadeIn>

          {posts.length > 0 ? (
            <div className="mt-14 md:mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 100}>
                  <JournalCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-14 max-w-md text-foreground/70 font-light leading-relaxed">
              The first articles are on their way. Meanwhile, browse the{" "}
              <Link href="/shop/earrings" className="text-foreground border-b border-brand-gold/40 hover:text-brand-gold transition-colors">
                earrings
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
