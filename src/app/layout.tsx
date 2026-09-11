import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Mohak – The Vibe | Premium Artificial Jewelry',
  description: 'Premium artificial jewelry for the modern woman. Boutique collections and AI-powered vibe styling.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-brand-gold/30">
        {children}
        <Toaster />
      </body>
    </html>
  );
}