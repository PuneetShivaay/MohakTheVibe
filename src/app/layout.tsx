import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { JsonLd } from "@/components/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import {
  OG_IMAGE,
  organizationJsonLd,
  SITE_DESCRIPTION,
  SITE_TITLE,
  TITLE_TEMPLATE,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

// Self-hosted files in ./fonts (variable-weight, latin subset, downloaded from Google Fonts): no
// render-blocking request to fonts.googleapis.com, no flash of unstyled text, and the build needs no
// network. (next/font/google failed to build behind a proxy, so don't switch back.) Exposed as CSS
// variables that tailwind.config.ts reads.
const inter = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '300 600',
  style: 'normal',
  variable: '--font-body',
  display: 'swap',
});
const playfair = localFont({
  src: [
    { path: './fonts/playfair-display-latin.woff2', weight: '400 700', style: 'normal' },
    { path: './fonts/playfair-display-latin-italic.woff2', weight: '400 700', style: 'italic' },
  ],
  variable: '--font-headline',
  display: 'swap',
});

export const metadata: Metadata = {
  // Resolves relative Open Graph image and canonical URLs on sub-pages
  metadataBase: new URL(SITE_URL),
  // Pages set a bare title ("Our Story") and the template adds the brand suffix
  title: { default: SITE_TITLE, template: TITLE_TEMPLATE },
  description: SITE_DESCRIPTION,
  applicationName: 'Mohak The Vibe',
  keywords: [
    'Mohak The Vibe', 'mohakthevibe', 'Mohak jewellery', 'artificial earrings online', 'jhumka earrings',
    'minakari earrings', 'kundan pendant', 'korean earrings', 'gold plated hoop earrings', 'bracelets for women',
    'artificial jewellery Lucknow',
  ],
  // Set GOOGLE_SITE_VERIFICATION (the content value of Search Console's HTML tag) in the build environment
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Mohak The Vibe',
    images: [OG_IMAGE],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved Mohak Mode before first paint, so dark-mode visitors don't see a light flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('mohak-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="font-body antialiased selection:bg-brand-gold/30">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-background focus:px-4 focus:py-3 focus:text-eyebrow focus:uppercase focus:outline focus:outline-brand-gold"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}