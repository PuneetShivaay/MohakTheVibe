import Link from "next/link";
import { PAGE_LINKS } from "@/lib/site";
import { LayeredImages } from "./LayeredImages";
import { imageUrl } from "./ProductCard";
import { Eyebrow } from "./SectionHeading";

// "Our Essence": layout and copy kept as decided in the redesign; colours and type follow the theme tokens
export function BrandStory() {
  const lifestyleImg = imageUrl("brand-story-lifestyle");
  const detailImg = imageUrl("brand-story-detail");

  return (
    <section id="brand-story" className="py-section px-6 md:px-12 bg-card overflow-hidden">
      <div className="max-w-site mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
        <div className="relative lg:mr-8 lg:mb-8">
          <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-32 h-32 sm:w-40 sm:h-40 border border-brand-gold/20 rounded-full animate-float" />
          {lifestyleImg && (
            <LayeredImages
              main={lifestyleImg}
              mainAlt="Mohak earrings, styled"
              detail={detailImg}
              detailAlt="Close-up of Mohak earrings"
            />
          )}
        </div>

        <div className="space-y-6 sm:space-y-8 md:pl-8">
          <div>
            <Eyebrow className="mb-4">Our Essence</Eyebrow>
            <h2 className="font-headline text-display">
              Wear Your Vibe, <br />
              <em className="text-brand-gold">Own the Room.</em>
            </h2>
          </div>

          <p className="text-foreground/70 font-light leading-relaxed">
            At Mohak – The Vibe, we believe jewelry is more than an accessory—it&apos;s an extension of your persona. Born
            from the desire to merge boutique elegance with contemporary styles, our brand is a celebration of feminine
            luxury.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-6 sm:py-8 border-y border-brand-gold/10">
            <div>
              <h3 className="font-headline text-xl mb-2">Curated Craft</h3>
              <p className="text-sm text-foreground/60 font-light">
                Each pair of earrings is hand-selected to meet our stringent standards of &apos;Mohak Aesthetics&apos;.
              </p>
            </div>
            <div>
              <h3 className="font-headline text-xl mb-2">Boutique Service</h3>
              <p className="text-sm text-foreground/60 font-light">
                We prioritize personal connection over automated checkouts.
              </p>
            </div>
          </div>

          <div>
            <p className="font-headline text-xl sm:text-2xl italic">
              &ldquo;Femininity isn&apos;t just a trait, it&apos;s a celebration. We&apos;re here to provide the crown.&rdquo;
            </p>
            <p className="mt-4 text-eyebrow uppercase text-brand-gold">— The Mohak – The Vibe Collective</p>
          </div>

          <Link
            href={PAGE_LINKS.story}
            className="inline-block text-eyebrow uppercase border-b border-foreground/30 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
          >
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
