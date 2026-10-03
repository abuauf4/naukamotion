import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 0,
  },
};

export default nextConfig;
