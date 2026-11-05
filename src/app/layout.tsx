import type { Metadata } from 'next';
import './globals.css';
import { JsonLd } from "@/components/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const SITE_TITLE = 'Mohak The Vibe | Artificial Earrings, Pendants & Bracelets Online India';
const SITE_DESCRIPTION =
  'Mohak The Vibe, Lucknow: handpicked artificial earrings, pendants and bracelets in Minakari, Kundan, Korean and gold-plated styles. Gift-ready, delivered across India.';
const OG_IMAGE = { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Mohak The Vibe jewellery' };

export const metadata: Metadata = {
  // Resolves relative Open Graph image and canonical URLs on sub-pages
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved Mohak Mode before first paint, so dark-mode visitors don't see a light flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('mohak-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
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