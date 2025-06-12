import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  // Configure image domains for VividSeats CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.vsstatic.com',
        port: '',
        pathname: '/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'a.vsstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
