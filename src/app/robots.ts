import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // One group keeps restrictions consistent for Googlebot, Bingbot and others.
    rules: {
      userAgent: "*",
      // Let crawlers read the login page's noindex. Private pages still require auth.
      allow: ["/", "/admin/login"],
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
