import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles output automatically — standalone is for custom servers
  // typescript: {
  //   ignoreBuildErrors: false,
  // },
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    minimumCacheTTL: 0,
  },
};

export default nextConfig;
