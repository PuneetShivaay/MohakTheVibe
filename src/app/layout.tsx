
import type {Metadata} from 'next';
import './globals.css';

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