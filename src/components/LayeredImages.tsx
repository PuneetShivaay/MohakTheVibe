import Image from "next/image";

// Signature "two prints" layout from the Our Essence section (BrandStory.tsx):
// a large white-framed 4:5 photo with a smaller framed square overlapping its bottom-right corner.
// The small print shows from lg up, matching BrandStory.
export function LayeredImages({
  main,
  mainAlt,
  detail,
  detailAlt = "",
  priority = false,
}: {
  main: string;
  mainAlt: string;
  detail?: string;
  detailAlt?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden aspect-[4/5] border-[8px] sm:border-[12px] border-white shadow-xl sm:shadow-2xl">
        <Image
          src={main}
          alt={mainAlt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>
      {detail && (
        <div className="absolute -bottom-8 -right-8 w-40 h-40 sm:w-48 sm:h-48 overflow-hidden border-[8px] border-white shadow-xl hidden lg:block">
          <Image src={detail} alt={detailAlt} fill sizes="192px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
