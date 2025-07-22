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
  // La opción 'api' ha sido eliminada porque no es válida en next.config.ts
};

export default nextConfig;
