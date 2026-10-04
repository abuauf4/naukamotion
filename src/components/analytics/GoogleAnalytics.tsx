"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  initializeAnalytics,
  isPublicAnalyticsPath,
  trackWhatsappClick,
} from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    initializeAnalytics();
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      try {
        const url = new URL(link.href);
        if (url.protocol === "https:" && url.hostname === "wa.me") {
          trackWhatsappClick();
        }
      } catch {
        /* Ignore non-URL link targets. */
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // Admin pages do not load the tag on a direct visit. Contact events also check
  // the actual hostname/path, so preview builds and local tests send no events.
  if (!isPublicAnalyticsPath(pathname)) return null;
  return (
    <Script
      id="nauka-ga4-loader"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
