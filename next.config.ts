import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here uhuuyuyuuy*/
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig;
