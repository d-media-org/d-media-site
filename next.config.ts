import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doncv5yem7gbmqbm.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
