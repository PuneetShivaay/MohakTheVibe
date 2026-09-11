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
    ],
  },
};

export default nextConfig;