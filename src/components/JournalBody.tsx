import * as React from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

const linkClass =
  "text-foreground border-b border-brand-gold/40 hover:text-brand-gold hover:border-brand-gold transition-colors";

// Maps the elements an article can use to the site's type scale and link style (there is no
// typography plugin). Internal links use next/link; everything else opens in a new tab.
const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-14 mb-5 font-headline text-display-sm first:mt-0" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => <h3 className="mt-10 mb-4 font-headline text-xl md:text-2xl" {...props} />,
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-5 text-foreground/75 font-light leading-[1.85] text-base md:text-lg" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-6 ml-5 list-disc space-y-2 text-foreground/75 font-light leading-relaxed marker:text-brand-gold" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-6 ml-5 list-decimal space-y-2 text-foreground/75 font-light leading-relaxed marker:text-brand-gold" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => <strong className="font-medium text-foreground" {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-10 border-l border-brand-gold pl-6 font-headline text-xl md:text-2xl italic leading-snug text-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-14 border-border" />,
  a: ({ href = "", children, ...rest }: React.ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...rest}>
        {children}
      </a>
    ),
  // Plain <img>: article photos have no fixed size, and the static export does not optimise images anyway
  img: ({ alt = "", ...rest }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" decoding="async" className="my-10 h-auto w-full border border-border" {...rest} />
  ),
};

// Article text is compiled at build time from our own files in content/journal/. MDX can run
// JavaScript, so only ever render files committed to this repo, never text from a visitor or a form.
export function JournalBody({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
