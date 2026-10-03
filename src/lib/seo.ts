import type { Metadata } from "next";

export const SITE_URL = "https://motion.nauka.id";
export const SITE_NAME = "Nauka Motion";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function metaDescription(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  const shortened = clean.slice(0, 157).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}

/** Set every page's social metadata explicitly: nested fields don't merge. */
export function pageMetadata({
  title,
  description,
  path,
  image = "/ogimage.webp",
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
}): Metadata {
  const summary = metaDescription(description);
  const url = absoluteUrl(path);
  const socialTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description: summary,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description: summary,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "id_ID",
      images: [{ url: absoluteUrl(image), alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: summary,
      images: [absoluteUrl(image)],
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// User-edited CMS text must never close the script element.
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
