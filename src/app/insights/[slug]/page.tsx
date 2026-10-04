import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { StructuredData } from "@/components/studio/StructuredData";
import { ProjectCTA } from "@/components/studio/MarketingSections";
import { getLocale } from "@/lib/server-locale";
import { insights } from "@/lib/insights";
import {
  absoluteUrl,
  breadcrumbSchema,
  ORGANIZATION_ID,
  pageMetadata,
} from "@/lib/seo";
import { studioOrganization } from "@/lib/studio-schema";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();
  const metadata = pageMetadata({
    title: article.title.id,
    description: article.description.id,
    path: `/insights/${slug}`,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [absoluteUrl("/about")],
    },
  };
}
export default async function InsightPage({ params }: Props) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();
  const id = locale === "id";
  const path = `/insights/${slug}`;
  const date = new Intl.DateTimeFormat(id ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(article.publishedAt));
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <StructuredData
          data={[
            breadcrumbSchema([
              { name: id ? "Beranda" : "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: article.title[locale], path },
            ]),
            {
              "@context": "https://schema.org",
              "@graph": [
                studioOrganization(),
                {
                  "@type": "Article",
                  "@id": `${absoluteUrl(path)}#article`,
                  url: absoluteUrl(path),
                  mainEntityOfPage: absoluteUrl(path),
                  headline: article.title[locale],
                  description: article.description[locale],
                  datePublished: article.publishedAt,
                  inLanguage: id ? "id-ID" : "en",
                  author: { "@id": ORGANIZATION_ID },
                  publisher: { "@id": ORGANIZATION_ID },
                  image: absoluteUrl("/ogimage.webp"),
                },
              ],
            },
          ]}
        />
        <article className="nm-container">
          <nav
            className="nm-breadcrumb"
            aria-label={id ? "Jejak halaman" : "Breadcrumb"}
          >
            <Link href="/insights">Insights</Link>
            <span aria-hidden="true">/</span>
            <span>{id ? "Panduan website" : "Website guide"}</span>
          </nav>
          <header className="nm-page-intro">
            <p className="nm-eyebrow">NAUKA MOTION / INSIGHTS</p>
            <h1>{article.title[locale]}</h1>
            <p>{article.description[locale]}</p>
            <p>
              <Link href="/about" className="nm-text-link">
                Nauka Motion
              </Link>{" "}
              · <time dateTime={article.publishedAt}>{date}</time>
            </p>
          </header>
          <div className="nm-case-layout">
            <aside className="nm-case-aside">
              <p>{id ? "DALAM ARTIKEL INI" : "IN THIS ARTICLE"}</p>
              <nav
                className="nm-service-nav"
                aria-label={id ? "Daftar isi" : "Table of contents"}
              >
                {article.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`}>
                    {section.heading[locale]}
                  </a>
                ))}
              </nav>
              <Link href="/services/website" className="nm-text-link">
                {id ? "Jasa pembuatan website" : "Website development services"}
              </Link>
            </aside>
            <div className="nm-case-content">
              {article.sections.map((section) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.heading[locale]}</h2>
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p[locale]}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((b, i) => (
                        <li key={i}>{b[locale]}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              <section>
                <h2>
                  {id
                    ? "Lihat contoh sebelum menyusun brief"
                    : "Explore examples before writing your brief"}
                </h2>
                <p>
                  {id
                    ? "Bandingkan susunan informasi website organisasi Bakau Institute dan website bisnis Berkah Komputer. Pilih contoh yang dekat dengan kebutuhan Anda, lalu catat bagian yang ingin disesuaikan."
                    : "Compare the information structure of Bakau Institute's organization website and Berkah Komputer's business website. Choose a relevant reference and note what you would adapt."}
                </p>
                <ul>
                  <li>
                    <Link href="/work/bakau-institute" className="nm-text-link">
                      Bakau Institute
                    </Link>
                  </li>
                  <li>
                    <Link href="/work/berkah-komputer" className="nm-text-link">
                      Berkah Komputer
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact?service=website"
                      className="nm-text-link"
                    >
                      {id
                        ? "Kirim brief untuk membahas penawaran"
                        : "Send a brief to discuss a proposal"}
                    </Link>
                  </li>
                </ul>
              </section>
              <section>
                <h2>{id ? "Panduan terkait" : "Related guides"}</h2>
                <ul>
                  {insights
                    .filter((item) => item.slug !== slug)
                    .map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/insights/${item.slug}`}
                          className="nm-text-link"
                        >
                          {item.title[locale]}
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
              <section>
                <h2>
                  {id ? "Referensi bagian SEO" : "SEO section references"}
                </h2>
                <p>
                  {id
                    ? "Penjelasan indexing merujuk pada dokumentasi resmi Google Search Central:"
                    : "The indexing explanation refers to official Google Search Central documentation:"}
                </p>
                <ul>
                  <li>
                    <a
                      className="nm-text-link"
                      href="https://developers.google.com/search/help/crawling-index-faq"
                    >
                      Google Search crawling and indexing FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      className="nm-text-link"
                      href="https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl"
                    >
                      {id
                        ? "Meminta Google meng-crawl ulang URL"
                        : "Ask Google to recrawl URLs"}
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </article>
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
