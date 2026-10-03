import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { ProjectCTA } from "@/components/studio/MarketingSections";
import { ProjectCard } from "@/components/studio/ProjectCard";
import { getCategories, getPublicProjects } from "@/lib/cms";
import { getLocale } from "@/lib/server-locale";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Portofolio Website & Aplikasi",
  description:
    "Jelajahi website, aplikasi, dan sistem yang dibangun Nauka Motion untuk otomotif, retail, asuransi, serta produk internal NaCash.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const [categories, projects, locale] = await Promise.all([
    getCategories(),
    getPublicProjects(),
    getLocale(),
  ]);
  const id = locale === "id";
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <div className="nm-container">
          <div className="nm-page-intro">
            <p className="nm-eyebrow">
              NAUKA MOTION / {id ? "PORTOFOLIO" : "PORTFOLIO"}
            </p>
            <h1>
              {id ? (
                <>
                  Beragam kebutuhan.
                  <br />
                  <span>Karya dengan tujuan.</span>
                </>
              ) : (
                <>
                  Different needs.
                  <br />
                  <span>Work with a purpose.</span>
                </>
              )}
            </h1>
            <p>
              {id
                ? "Website untuk bisnis, sistem untuk operasional, dan produk yang kami kembangkan sendiri. Buka setiap proyek untuk melihat cerita serta pendekatannya."
                : "Business websites, operational systems, and products we develop in-house. Explore each project to see its story and approach."}
            </p>
          </div>
          <nav
            className="nm-work-filters"
            aria-label={id ? "Kategori portofolio" : "Portfolio categories"}
          >
            <Link href="/work" aria-current="page">
              {id ? "Semua karya" : "All work"}
            </Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/work/${c.slug}`}>
                {c.title}
              </Link>
            ))}
          </nav>
          <div className="nm-work-grid nm-project-grid">
            <Link className="nm-work-card" href="/work/nacash">
              <div className="nm-work-visual nm-app-visual">
                <div className="nm-app-wordmark">
                  <span>PRODUK NAUKA</span>
                  <strong>
                    NaCash<span>by Nauka</span>
                  </strong>
                  <p>
                    {id
                      ? "Kasir & keuangan dalam satu ekosistem."
                      : "Point of sale & finance in one ecosystem."}
                  </p>
                </div>
                <Image
                  src="/showcase/nacash-dashboard.webp"
                  alt="Antarmuka NaCash Fashion"
                  width={390}
                  height={844}
                />
              </div>
              <div className="nm-work-caption">
                <div>
                  <span>
                    {id
                      ? "Produk internal · Android"
                      : "In-house product · Android"}
                  </span>
                  <h3>NaCash</h3>
                  <p>
                    {id
                      ? "Kasir, stok, dan pencatatan keuangan."
                      : "Point of sale, inventory, and finance tracking."}
                  </p>
                </div>
                <span className="nm-project-number">N</span>
              </div>
            </Link>
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} />
            ))}
          </div>
        </div>
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
