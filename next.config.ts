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
};

export default nextConfig;
