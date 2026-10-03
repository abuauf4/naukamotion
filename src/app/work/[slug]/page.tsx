import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { ProjectCTA } from "@/components/studio/MarketingSections";
import { ProjectCard } from "@/components/studio/ProjectCard";
import {
  getCategories,
  getCategoryBySlug,
  getProjectBySlug,
  getProjectsByCategory,
  getAllProjectSlugs,
} from "@/lib/cms";
import { getLocale } from "@/lib/server-locale";

export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  const [categories, slugs] = await Promise.all([
    getCategories(),
    getAllProjectSlugs(),
  ]);
  return [
    ...categories.map((c) => ({ slug: c.slug })),
    ...slugs.map((slug) => ({ slug })),
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (category)
    return {
      title: `${category.title} — Portofolio`,
      description: category.description.id,
      alternates: { canonical: `/work/${slug}` },
    };
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proyek tidak ditemukan" };
  return {
    title: project.name,
    description: project.summary.id,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.name} — Nauka Motion`,
      description: project.summary.id,
      images: [{ url: project.cover, alt: `Preview ${project.name}` }],
    },
  };
}
export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const [category, locale] = await Promise.all([
    getCategoryBySlug(slug),
    getLocale(),
  ]);
  const id = locale === "id";
  if (category) {
    const [projects, categories] = await Promise.all([
      getProjectsByCategory(category.slug),
      getCategories(),
    ]);
    return (
      <div className="nm-page">
        <StudioHeader />
        <main id="main-content" className="nm-subpage">
          <div className="nm-container">
            <div className="nm-page-intro">
              <div className="nm-breadcrumb">
                <Link href="/work">{id ? "Portofolio" : "Portfolio"}</Link>
                <span>/</span>
                <span>{category.title}</span>
              </div>
              <p className="nm-eyebrow">
                {id ? "KATEGORI KARYA" : "PROJECT CATEGORY"}
              </p>
              <h1>
                {category.title}
                <span className="nm-orange">.</span>
              </h1>
              <p>{category.description[locale]}</p>
            </div>
            <nav className="nm-work-filters" aria-label="Portfolio categories">
              <Link href="/work">{id ? "Semua karya" : "All work"}</Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/work/${c.slug}`}
                  aria-current={c.slug === slug ? "page" : undefined}
                >
                  {c.title}
                </Link>
              ))}
            </nav>
            <div className="nm-work-grid nm-project-grid">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
            {projects.length === 0 && (
              <p className="nm-empty">
                {id
                  ? "Karya pada kategori ini akan ditampilkan saat siap dipublikasikan."
                  : "Work in this category will be shown when ready for publication."}
              </p>
            )}
          </div>
          <ProjectCTA locale={locale} />
        </main>
        <StudioFooter locale={locale} />
      </div>
    );
  }
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const projectCategory = await getCategoryBySlug(project.categorySlug);
  const status =
    project.status === "internal"
      ? id
        ? "Produk internal"
        : "In-house product"
      : project.status === "development"
        ? id
          ? "Dalam pengembangan"
          : "In development"
        : id
          ? "Proyek bisnis"
          : "Business project";
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <div className="nm-container">
          <div className="nm-page-intro">
            <div className="nm-breadcrumb">
              <Link href="/work">{id ? "Portofolio" : "Portfolio"}</Link>
              <span>/</span>
              <Link href={`/work/${project.categorySlug}`}>
                {projectCategory?.title ?? project.industry}
              </Link>
            </div>
            <p className="nm-eyebrow">
              {status.toUpperCase()} / {project.year}
            </p>
            <h1>
              {project.name}
              <span className="nm-orange">.</span>
            </h1>
            <p>{project.summary[locale]}</p>
            <dl className="nm-project-meta">
              <div>
                <dt>{id ? "Bidang" : "Industry"}</dt>
                <dd>{project.industry}</dd>
              </div>
              <div>
                <dt>{id ? "Peran" : "Our role"}</dt>
                <dd>{project.role[locale]}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{status}</dd>
              </div>
            </dl>
          </div>
          <div className="nm-project-cover">
            <Image
              src={project.cover}
              alt={`Preview ${project.name}`}
              fill
              sizes="(max-width: 640px) 92vw, 90vw"
              priority
              unoptimized
            />
          </div>
          <div className="nm-case-layout">
            <aside className="nm-case-aside">
              <p>{id ? "TEKNOLOGI & PRODUK" : "TECHNOLOGY & PRODUCT"}</p>
              <div className="nm-tech-tags">
                {project.techStack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nm-button nm-button-ghost"
                >
                  {id ? "Buka produk" : "Open the product"}
                </a>
              )}
              <Link href="/contact" className="nm-text-link">
                {id
                  ? "Diskusikan kebutuhan serupa"
                  : "Discuss a similar project"}
              </Link>
            </aside>
            <div className="nm-case-content">
              {project.caseStudy.sections.map((s, i) => (
                <section key={i}>
                  <h2>{s.heading[locale]}</h2>
                  {s.body.map((p, j) => (
                    <p key={j}>{p[locale]}</p>
                  ))}
                  {s.bullets && (
                    <ul>
                      {s.bullets.map((b, j) => (
                        <li key={j}>{b[locale]}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              {project.caseStudy.techStory && (
                <section>
                  <h2>{id ? "Pilihan teknologi" : "Technology choices"}</h2>
                  <p>{project.caseStudy.techStory.intro[locale]}</p>
                  {project.caseStudy.techStory.details.map((d, i) => (
                    <p key={i}>{d[locale]}</p>
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
