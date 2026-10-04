import Link from "next/link";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { StructuredData } from "@/components/studio/StructuredData";
import { ProjectCTA } from "@/components/studio/MarketingSections";
import { getLocale } from "@/lib/server-locale";
import { insights } from "@/lib/insights";

export const metadata = pageMetadata({
  title: "Panduan Website & Aplikasi untuk Bisnis",
  description:
    "Panduan dari Nauka Motion untuk merencanakan website dan aplikasi: kebutuhan, biaya, fitur, serta persiapan proyek sebelum memilih jasa pengembangan.",
  path: "/insights",
  index: insights.length > 0,
});
export default async function InsightsPage() {
  const locale = await getLocale();
  const id = locale === "id";
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <StructuredData
          data={breadcrumbSchema([
            { name: id ? "Beranda" : "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ])}
        />
        <div className="nm-container">
          <div className="nm-page-intro">
            <p className="nm-eyebrow">NAUKA MOTION / INSIGHTS</p>
            <h1>
              {id
                ? "Sebelum mulai, pahami kebutuhannya."
                : "Understand your needs before you build."}
            </h1>
            <p>
              {id
                ? "Panduan untuk menyiapkan brief, memahami pilihan fitur, dan membahas biaya pengembangan website atau aplikasi dengan lebih jelas."
                : "Guides to preparing a brief, understanding feature choices, and discussing website or application development costs clearly."}
            </p>
          </div>
          <div className="nm-case-layout">
            <aside className="nm-case-aside">
              <p>{id ? "DARI TIM NAUKA MOTION" : "FROM NAUKA MOTION"}</p>
              <p>
                {id
                  ? "Mulai dari pertanyaan yang muncul saat merencanakan proyek digital."
                  : "Start with questions that arise when planning a digital project."}
              </p>
              <Link href="/services" className="nm-text-link">
                {id ? "Jelajahi layanan" : "Explore services"}
              </Link>
            </aside>
            <div className="nm-case-content">
              {insights.map((article) => (
                <section key={article.slug}>
                  <p className="nm-eyebrow">
                    {id ? "PERENCANAAN WEBSITE" : "WEBSITE PLANNING"}
                  </p>
                  <h2>
                    <Link href={`/insights/${article.slug}`}>
                      {article.title[locale]}
                    </Link>
                  </h2>
                  <p>{article.description[locale]}</p>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="nm-text-link"
                  >
                    {id ? "Baca panduan" : "Read the guide"}
                  </Link>
                </section>
              ))}
            </div>
          </div>
        </div>
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
