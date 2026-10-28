import Image from "next/image";
import { Instagram, Play } from "lucide-react";
import { getInstagramPosts } from "@/lib/instagram";
import { SITE_LINKS } from "@/lib/site";
import { imageUrl } from "./ProductCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FALLBACK_IDS = ["insta-post-1", "insta-post-2", "insta-post-3", "insta-post-4", "insta-post-5", "insta-post-6"];

type Tile = { key: string; src: string; href: string; alt: string; remote: boolean; isVideo: boolean };

// Live posts when the build has Instagram credentials, otherwise local photos linking to the profile
async function getTiles(): Promise<Tile[]> {
  const posts = await getInstagramPosts(6);
  if (posts) {
    return posts.map((post) => ({
      key: post.id,
      src: post.imageUrl,
      href: post.permalink,
      alt: post.caption ? post.caption.slice(0, 120) : "Instagram post by @mohakthevibe",
      remote: true,
      isVideo: post.mediaType === "VIDEO",
    }));
  }
  return FALLBACK_IDS.flatMap((id, i) => {
    const src = imageUrl(id);
    return src
      ? [{ key: id, src, href: SITE_LINKS.instagram, alt: `Mohak earrings on Instagram, photo ${i + 1}`, remote: false, isVideo: false }]
      : [];
  });
}

export async function InstagramGrid() {
  const tiles = await getTiles();

  return (
    <section id="instagram" className="py-section">
      <Reveal className="px-6 mb-12 md:mb-16">
        <SectionHeading
          eyebrow="@mohakthevibe"
          title={
            <>
              Worn by <em>you</em>
            </>
          }
          description="Tag @mohakthevibe in your photos to be featured."
        />
      </Reveal>

      <ul className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {tiles.map((tile) => (
          <li key={tile.key}>
            <a
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tile.isVideo ? "Reel" : "Post"} on Instagram (opens in a new tab)`}
              className="group relative block aspect-square overflow-hidden bg-muted"
            >
              {tile.remote ? (
                // Instagram CDN URL fetched at build time; plain img since images are unoptimized anyway
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
              ) : (
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 768px) 17vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
              )}
              {tile.isVideo && (
                <Play aria-hidden className="absolute top-3 right-3 w-4 h-4 text-white drop-shadow" fill="currentColor" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                <Instagram aria-hidden className="w-5 h-5 text-white opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.25} />
              </div>
            </a>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12 text-center px-6">
        <a
          href={SITE_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          Follow us on Instagram
        </a>
      </Reveal>
    </section>
  );
}
