import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aoueesah.pythonanywhere.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'aoueesah.pythonanywhere.com',
        pathname: '/api/media-cors/**',
      },
    ],
  },};

export default nextConfig;
