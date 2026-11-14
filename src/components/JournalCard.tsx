import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/images";
import { formatPostDate, type Post } from "@/lib/journal";
import { getCategory } from "@/lib/products";

// Article teaser for the journal index and the "keep reading" row: cover photo (when there is one),
// category, title, one-line description and date.
export function JournalCard({ post }: { post: Post }) {
  const category = getCategory(post.category);

  return (
    <article className="group">
      <Link href={`/journal/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted border border-brand-gold/15">
          {post.image && (
            <Image
              src={cloudinaryUrl(post.image, 900)}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform [transition-duration:1200ms] ease-out-soft can-hover:group-hover:scale-105"
            />
          )}
        </div>
        <div className="pt-6">
          <p className="text-eyebrow uppercase text-brand-gold mb-3">{category?.name ?? "Journal"}</p>
          <h3 className="font-headline text-xl md:text-2xl leading-snug transition-colors group-hover:text-brand-gold">
            {post.title}
          </h3>
          <p className="mt-3 text-sm text-foreground/70 font-light leading-relaxed">{post.description}</p>
          <p className="mt-4 text-eyebrow uppercase text-foreground/60">
            {formatPostDate(post.date)} · {post.readingMinutes} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
