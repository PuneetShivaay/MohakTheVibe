import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  
  // Disable unoptimized image warning for static HTML export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Product photos from the Google Sheet catalog (see docs/catalog-plan.md)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;