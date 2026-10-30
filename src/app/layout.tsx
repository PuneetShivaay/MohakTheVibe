import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  // Resolves relative Open Graph image and canonical URLs on sub-pages
  metadataBase: new URL('https://mohak-the-vibe.web.app'),
  title: 'Mohak – The Vibe | Premium Artificial Jewelry',
  description: 'Premium artificial jewelry for the modern woman. Handpicked Minakari, Kundan and contemporary earrings, gift-ready.',
  openGraph: {
    title: 'Mohak – The Vibe | Premium Artificial Jewelry',
    description: 'Discover your vibe with our curated jewelry collections.',
    url: 'https://mohak-the-vibe.web.app',
    siteName: 'Mohak – The Vibe',
    images: [
      {
        url: 'https://mohak-the-vibe.web.app/mohak.png',
        width: 1200,
        height: 630,
        alt: 'Mohak The Vibe Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohak – The Vibe | Premium Artificial Jewelry',
    description: 'Discover your vibe with our curated jewelry collections.',
    images: ['https://mohak-the-vibe.web.app/mohak.png'],
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
      </body>
    </html>
  );
}