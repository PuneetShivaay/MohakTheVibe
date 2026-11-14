import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cloudinaryUrl } from "@/lib/images";
import { formatPostDate, getPost, getPosts } from "@/lib/journal";
import { getCategory } from "@/lib/products";
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, socialMeta } from "@/lib/seo";
import { FadeIn } from "@/components/FadeIn";
import { JournalBody } from "@/components/JournalBody";
import { JournalCard } from "@/components/JournalCard";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";

type Params = { params: Promise<{ slug: string }> };

// Static export: one HTML page per published article, unknown slugs 404
export const dynamicParams = false;

// Static export refuses a dynamic route that generates no pages ("missing generateStaticParams"), and
// the journal starts with no published articles. So with none, one placeholder page is generated; it
// shows the empty state and is noindex. It disappears by itself once the first article is published.
const PLACEHOLDER_SLUG = "no-articles-yet";

export function generateStaticParams() {
  const posts = getPosts();
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

// Cover photo as an absolute URL for social cards and structured data
const coverUrl = (image?: string) =>
  image ? (image.startsWith("/") ? absoluteUrl(image) : cloudinaryUrl(image, 1200)) : undefined;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return { title: "The Journal", robots: { index: false, follow: true } };
  const path = `/journal/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    ...socialMeta({
      title: post.title,
      description: post.description,
      path,
      image: coverUrl(post.image),
      article: { publishedTime: post.date, modifiedTime: post.updated },
    }),
  };
}

export default async function JournalPostPage({ params }: Params) {
  const slug = (await params).slug;
  const post = getPost(slug);
  if (!post) {
    // The placeholder page (see generateStaticParams); any other unknown slug is a real 404
    if (slug !== PLACEHOLDER_SLUG || getPosts().length > 0) notFound();
    return (
      <section className="pt-28 md:pt-36 pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Journal"
            title={
              <>
                Coming <em>soon</em>
              </>
            }
            description="The first articles are on their way."
          />
          <Link href="/journal" className="tap-area mt-10 inline-block text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
            Back to the journal
          </Link>
        </div>
      </section>
    );
  }

  const category = getCategory(post.category);
  const more = getPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(post, coverUrl(post.image))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ])}
      />

      <article>
        <header className="pt-28 md:pt-36 px-6 md:px-12">
          <FadeIn className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8 text-eyebrow uppercase text-foreground/60">
              <Link href="/" className="tap-area hover:text-brand-gold transition-colors">
                Home
              </Link>
              <span className="mx-3 text-brand-gold">/</span>
              <Link href="/journal" className="tap-area hover:text-brand-gold transition-colors">
                Journal
              </Link>
            </nav>
            {category && <Eyebrow className="mb-4">{category.name}</Eyebrow>}
            <h1 className="font-headline text-display">{post.title}</h1>
            <p className="mt-6 text-lg text-foreground/70 font-light leading-relaxed">{post.description}</p>
            <p className="mt-6 text-eyebrow uppercase text-foreground/60">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
            </p>
          </FadeIn>

          {post.image && (
            <FadeIn delay={150} className="max-w-5xl mx-auto mt-12 md:mt-16">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted border border-border">
                <Image src={cloudinaryUrl(post.image, 1600)} alt="" fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
              </div>
            </FadeIn>
          )}
        </header>

        <div className="px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <JournalBody source={post.body} />

            {category && (
              <div className="mt-16 pt-10 border-t border-border text-center">
                <Link
                  href={`/shop/${category.slug}`}
                  className="inline-block text-eyebrow uppercase px-8 py-4 border border-brand-gold/50 hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  Shop {category.name.toLowerCase()}
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="py-section px-6 md:px-12 bg-card">
          <div className="max-w-site mx-auto">
            <Reveal className="mb-12 md:mb-16">
              <SectionHeading align="left" eyebrow="Keep reading" title={<>More from the <em>journal</em></>} />
            </Reveal>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <JournalCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
