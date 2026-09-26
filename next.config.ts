import type { NextConfig } from "next";
// https://api.abcz.workers.dev/api/fitlog
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
