import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Type errors now block the build — keeps the codebase honest.
  // All previous TS errors have been resolved (Stage 7 + 8 cleanup).
  typescript: {
    ignoreBuildErrors: false,
  },
  // Strict mode helps catch issues early in development.
  reactStrictMode: true,
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
