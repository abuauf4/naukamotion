import { describe, expect, it } from "bun:test";
import { pageMetadata, metaDescription, serializeJsonLd } from "./seo";
import { buildSitemap } from "./sitemap";

describe("public SEO", () => {
  it("uses the project URL, title and image in canonical, Open Graph and Twitter", () => {
    const metadata = pageMetadata({
      title: "Bakau Institute",
      description: "Website NGO.",
      path: "/work/bakau-institute",
      image: "https://res.cloudinary.com/demo/image/upload/cover.webp",
    });
    expect(metadata.alternates?.canonical).toBe(
      "https://motion.nauka.id/work/bakau-institute",
    );
    expect(metadata.openGraph).toMatchObject({
      url: "https://motion.nauka.id/work/bakau-institute",
      title: "Bakau Institute — Nauka Motion",
      siteName: "Nauka Motion",
      type: "website",
    });
    expect(metadata.twitter).toMatchObject({
      title: "Bakau Institute — Nauka Motion",
      images: ["https://res.cloudinary.com/demo/image/upload/cover.webp"],
    });
  });

  it("overrides both generic and Googlebot indexing for empty pages", () => {
    expect(
      pageMetadata({
        title: "Kosong",
        description: "Belum ada konten.",
        path: "/insights",
        index: false,
      }).robots,
    ).toMatchObject({ index: false, googleBot: { index: false } });
  });

  it("normalizes long CMS descriptions without changing the visible story", () => {
    const input =
      "Website bilingual   organisasi. " +
      "Informasi program dan kemitraan. ".repeat(10);
    const output = metaDescription(input);
    expect(output.length).toBeLessThanOrEqual(160);
    expect(output).not.toContain("  ");
    expect(output.endsWith("…")).toBe(true);
    expect(metaDescription("  Ringkasan pendek.  ")).toBe("Ringkasan pendek.");
  });

  it("escapes script-closing CMS content and preserves its JSON value", () => {
    const input = {
      name: '</script><script>alert("x")</script>',
      note: "< & >",
    };
    const output = serializeJsonLd(input);
    expect(output).not.toContain("</script>");
    expect(JSON.parse(output)).toEqual(input);
  });

  it("deduplicates routes, excludes empty categories and emits no guessed lastmod", () => {
    const entries = buildSitemap(
      [{ slug: "ngo" }, { slug: "empty" }],
      [
        { slug: "bakau-institute", categorySlug: "ngo" },
        { slug: "nacash", categorySlug: "ngo" },
      ],
      ["website", "android", "sistem-bisnis"],
    );
    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain("https://motion.nauka.id/work/bakau-institute");
    expect(urls).toContain("https://motion.nauka.id/work/ngo");
    expect(urls).toContain("https://motion.nauka.id/services/website");
    expect(urls).not.toContain("https://motion.nauka.id/work/empty");
    expect(urls).not.toContain("https://motion.nauka.id/insights");
    expect(urls.filter((url) => url.endsWith("/work/nacash"))).toHaveLength(1);
    expect(entries.every((entry) => !entry.lastModified)).toBe(true);
  });
});
