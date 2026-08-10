import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

// CMS source selector — default is 'static' (studio-data.ts)
import {
  getCategories,
  getCategoryBySlug as getCat,
  getProjectBySlug as getProj,
  getProjectsByCategory as getProjs,
  getAllProjectSlugs,
} from "@/lib/cms";
import type {
  StudioProject,
  StudioCategory,
  TechStory,
  CategorySlug,
} from "@/lib/studio-data";

/**
 * /work/[slug] — Dispatch berdasarkan slug.
 *
 * Jika slug cocok dengan kategori (automotive, technology-retail, dll) →
 *   render halaman kategori: list project dalam kategori tersebut.
 *
 * Jika slug cocok dengan project (geely-bsd, jasa-proteksi, dll) →
 *   render halaman case study detail.
 *
 * URL tetap pendek: /work/automotive (kategori), /work/geely-bsd (project).
 */

type Params = { params: Promise<{ slug: string }> };

// ─── ISR — required so revalidatePath() actually invalidates the Vercel CDN cache ───
//
// Without `revalidate`, this page is pure SSG (statically prerendered at build
// time). On Vercel, `revalidatePath()` invoked from admin mutations (e.g.
// ProjectMedia cover upload) does NOT invalidate the CDN edge cache for pure
// SSG routes — the cached HTML keeps being served indefinitely.
//
// Setting `revalidate = 60` makes the page ISR:
//   - Vercel serves cached HTML but revalidates at most every 60 seconds.
//   - When `revalidatePath('/work/<slug>', 'page')` is called by the upload
//     route, the next request triggers a fresh regeneration and the new
//     Cloudinary cover URL appears within ~60 seconds.
//
// This is the minimum change needed to make admin media uploads visible on
// the public portfolio without a full Vercel redeploy.
export const revalidate = 60;

export async function generateStaticParams() {
  const cats = await getCategories();
  const catSlugs = cats.map((c) => ({ slug: c.slug }));
  const projectSlugs = (await getAllProjectSlugs()).map((slug) => ({ slug }));
  return [...catSlugs, ...projectSlugs];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const cat = await getCat(slug);
  if (cat) {
    return {
      title: `${cat.title} — Kategori Proyek`,
      description: cat.description.id,
      alternates: { canonical: `/work/${cat.slug}` },
      openGraph: {
        title: `${cat.title} — Nauka Motion`,
        description: cat.description.id,
        type: "website",
      },
    };
  }

  const project = await getProj(slug);
  if (project) {
    const projectCat = await getCat(project.categorySlug);
    const title = `${project.name} — ${projectCat?.title ?? "Proyek"}`;
    const description = project.summary.id;
    return {
      title,
      description,
      openGraph: {
        title: `${project.name} — Nauka Motion`,
        description,
        type: "article",
        images: [
          {
            url: project.cover,
            width: 1200,
            height: 630,
            alt: `${project.name} — cover`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.name} — Nauka Motion`,
        description,
        images: [project.cover],
      },
      alternates: { canonical: `/work/${project.slug}` },
    };
  }

  return { title: "Tidak Ditemukan" };
}

export default async function WorkSlugPage({ params }: Params) {
  const { slug } = await params;

  const cat = await getCat(slug);
  if (cat) {
    const projects = await getProjs(cat.slug as CategorySlug);
    const allCats = await getCategories();
    return <CategoryView category={cat} projects={projects} allCategories={allCats} />;
  }

  const project = await getProj(slug);
  if (project) {
    const category = await getCat(project.categorySlug);
    const categoryProjects = await getProjs(project.categorySlug);
    return <CaseStudyView project={project} category={category ?? undefined} categoryProjects={categoryProjects} />;
  }

  notFound();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function CategoryView({
  category,
  projects,
  allCategories,
}: {
  category: StudioCategory;
  projects: StudioProject[];
  allCategories: StudioCategory[];
}) {

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1, paddingTop: "120px" }}>
        {/* Header */}
        <section style={{ paddingBottom: "60px" }}>
          <div className="container-wide">
            <div
              style={{
                marginBottom: "48px",
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Link
                href="/work"
                className="studio-meta"
                style={{
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 10L2 2M2 2H8M2 2V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(180 6 6)"
                  />
                </svg>
                Kategori
              </Link>
              <span className="studio-meta" style={{ color: "var(--ink-faint)" }}>
                /
              </span>
              <span className="studio-meta" style={{ color: "var(--ink)" }}>
                {category.title}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <span className="nmp-index">{category.index}</span>
              <span className="studio-meta" style={{ color: "var(--ink-faint)" }}>
                Kategori
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 7vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "32px",
                maxWidth: "16ch",
              }}
            >
              {category.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              {category.description.id}
            </p>
          </div>
        </section>

        {/* Project list */}
        <section style={{ paddingBottom: "120px" }}>
          <div className="container-wide">
            {projects.length === 0 ? (
              <div
                style={{
                  padding: "80px 0",
                  textAlign: "center",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <p
                  className="studio-meta"
                  style={{ color: "var(--ink-faint)", marginBottom: "16px" }}
                >
                  Belum ada proyek di kategori ini
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--ink-soft)",
                    maxWidth: "44ch",
                    margin: "0 auto",
                  }}
                >
                  Kategori ini akan diisi seiring perjalanan Nauka Motion.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "80px",
                }}
              >
                {projects.map((project, i) => (
                  <ProjectRow
                    key={project.slug}
                    project={project}
                    reversed={i % 2 === 1}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Other categories */}
        <section
          style={{
            paddingTop: "80px",
            paddingBottom: "80px",
            borderTop: "1px solid var(--line)",
            background: "var(--paper-warm)",
          }}
        >
          <div className="container-wide">
            <p
              className="eyebrow eyebrow-burnt"
              style={{ marginBottom: "24px" }}
            >
              <span style={{ opacity: 0.5 }}>///</span>
              Kategori Lain
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {allCategories
                .filter((c) => c.slug !== category.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/work/${c.slug}`}
                    className="nmp-tag"
                    style={{
                      textDecoration: "none",
                      padding: "10px 18px",
                      fontSize: "0.78rem",
                    }}
                  >
                    {c.title}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProjectRow({
  project,
  reversed,
}: {
  project: StudioProject;
  reversed: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
        gap: "60px",
        alignItems: "center",
        direction: reversed ? "rtl" : "ltr",
      }}
      className="nmp-proj-row"
    >
      <Link
        href={`/work/${project.slug}`}
        style={{
          display: "block",
          position: "relative",
          aspectRatio: "4 / 3",
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          overflow: "hidden",
          direction: "ltr",
          textDecoration: "none",
        }}
        aria-label={`${project.name} — lihat case study`}
      >
        <Image
          src={project.cover}
          alt={`${project.name} — cover`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          style={{ objectFit: "cover" }}
        />
        {project.status === "internal" && (
          <ImageBadge label="Personal Project" />
        )}
        {project.status === "development" && (
          <ImageBadge label="Dalam Pengembangan" />
        )}
      </Link>

      <div
        style={{
          direction: "ltr",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
          }}
        >
          <span className="nmp-index">{project.index}</span>
          <span className="studio-meta" style={{ color: "var(--ink-faint)" }}>
            {project.year}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {project.name}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "1.05rem",
            color: "var(--ink-soft)",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: "42ch",
          }}
        >
          {project.tagline.id}
        </p>

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="nmp-tag">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="nmp-tag">+{project.techStack.length - 4}</span>
          )}
        </div>

        <div style={{ marginTop: "12px" }}>
          <Link href={`/work/${project.slug}`} className="nmp-link-arrow">
            Lihat Case Study
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nmp-proj-row {
            grid-template-columns: minmax(0, 1fr) !important;
            direction: ltr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function CaseStudyView({
  project,
  category,
  categoryProjects,
}: {
  project: StudioProject;
  category?: StudioCategory;
  categoryProjects: StudioProject[];
}) {
  const currentIdx = categoryProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentIdx >= 0 && currentIdx < categoryProjects.length - 1
      ? categoryProjects[currentIdx + 1]
      : categoryProjects[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary.id,
    creator: {
      "@type": "Organization",
      name: "Nauka Motion",
      url: "https://motion.nauka.id",
    },
    about: project.caseStudy.sections[0]?.body[0]?.id ?? project.summary.id,
    keywords: project.techStack.join(", "),
    datePublished: project.year,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1, paddingTop: "80px" }}>
        {/* 01 — Hero */}
        <section style={{ paddingTop: "60px", paddingBottom: "60px" }}>
          <div className="container-wide">
            <div
              style={{
                marginBottom: "48px",
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/work"
                className="studio-meta"
                style={{
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 10L2 2M2 2H8M2 2V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(180 6 6)"
                  />
                </svg>
                Kategori
              </Link>
              <span className="studio-meta" style={{ color: "var(--ink-faint)" }}>
                /
              </span>
              {category && (
                <>
                  <Link
                    href={`/work/${category.slug}`}
                    className="studio-meta"
                    style={{
                      color: "var(--ink-soft)",
                      textDecoration: "none",
                    }}
                  >
                    {category.title}
                  </Link>
                  <span className="studio-meta" style={{ color: "var(--ink-faint)" }}>
                    /
                  </span>
                </>
              )}
              <span className="studio-meta" style={{ color: "var(--ink)" }}>
                {project.name}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <span className="nmp-index">{project.index}</span>
              <span className="studio-meta" style={{ color: "var(--ink-faint)" }}>
                {category?.title}
              </span>
              {project.status === "internal" && (
                <StatusBadge label="Personal Project" />
              )}
              {project.status === "development" && (
                <StatusBadge label="Dalam Pengembangan" />
              )}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "32px",
                maxWidth: "16ch",
              }}
            >
              {project.name}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.2rem, 2vw, 1.7rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              {project.tagline.id}
            </p>
          </div>
        </section>

        {/* Hero image */}
        <section style={{ paddingBottom: "80px" }}>
          <div className="container-wide">
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Image
                src={project.cover}
                alt={`${project.name} — cover`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* 02 — Overview + meta */}
        <section
          style={{
            paddingBottom: "100px",
            borderTop: "1px solid var(--line)",
            paddingTop: "80px",
          }}
        >
          <div className="container-wide">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
                gap: "80px",
                alignItems: "start",
              }}
              className="nmp-cs-overview-grid"
            >
              <div>
                <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
                  <span style={{ opacity: 0.5 }}>///</span>
                  Ringkasan
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)",
                    color: "var(--ink)",
                    lineHeight: 1.5,
                    margin: 0,
                    maxWidth: "52ch",
                  }}
                >
                  {project.summary.id}
                </p>
              </div>

              <aside
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                  padding: "32px",
                  background: "var(--paper-warm)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                }}
              >
                <MetaItem label="Klien" value={project.client} />
                <MetaItem label="Industri" value={project.industry} />
                <MetaItem label="Tahun" value={project.year} />
                <MetaItem label="Peran" value={project.role.id} />
                <div>
                  <p
                    className="studio-meta"
                    style={{
                      marginBottom: "12px",
                      color: "var(--ink-faint)",
                    }}
                  >
                    Technology
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="nmp-tag"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nmp-link-arrow"
                    style={{ marginTop: "8px" }}
                  >
                    Kunjungi Website Live
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* 03+ — Flexible case study sections */}
        <section style={{ paddingBottom: "80px" }}>
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              paddingLeft: "clamp(20px, 5vw, 80px)",
              paddingRight: "clamp(20px, 5vw, 80px)",
            }}
          >
            {project.caseStudy.sections.map((section, i) => (
              <CaseStudySectionRender
                key={i}
                index={String(i + 3).padStart(2, "0")}
                heading={section.heading.id}
                body={section.body.map((b) => b.id)}
                bullets={section.bullets?.map((b) => b.id)}
              />
            ))}
          </div>
        </section>

        {/* Technology storytelling (if techStory exists) or simple tech stack */}
        {project.caseStudy.techStory ? (
          <TechStorySection techStory={project.caseStudy.techStory} />
        ) : (
          project.techStack.length > 0 && (
            <section
              style={{
                paddingBottom: "80px",
                borderTop: "1px solid var(--line)",
                paddingTop: "80px",
                background: "var(--paper-warm)",
              }}
            >
              <div
                style={{
                  maxWidth: "860px",
                  margin: "0 auto",
                  paddingLeft: "clamp(20px, 5vw, 80px)",
                  paddingRight: "clamp(20px, 5vw, 80px)",
                }}
              >
                <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "20px" }}>
                  <span style={{ opacity: 0.5 }}>///</span>
                  Technology
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    margin: 0,
                    marginBottom: "32px",
                    lineHeight: 1.1,
                  }}
                >
                  Technology Stack
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="nmp-tag"
                      style={{ fontSize: "0.78rem", padding: "8px 16px" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )
        )}

        {/* 07 — Live Website CTA */}
        {project.liveUrl && (
          <section
            style={{
              paddingTop: "80px",
              paddingBottom: "80px",
              background: "var(--ink)",
              color: "var(--paper)",
            }}
          >
            <div className="container-wide">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "24px",
                }}
              >
                <p className="eyebrow" style={{ color: "var(--burnt)" }}>
                  <span style={{ opacity: 0.5 }}>///</span>
                  07 — Live Website
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    color: "var(--paper)",
                    margin: 0,
                    maxWidth: "16ch",
                  }}
                >
                  Kunjungi website{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "var(--burnt)",
                    }}
                  >
                    {project.name}
                  </span>
                </h2>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nmp-btn nmp-btn-primary"
                  style={{
                    background: "var(--burnt)",
                    borderColor: "var(--burnt)",
                    color: "#ffffff",
                  }}
                >
                  Buka Website
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 10L10 2M10 2H4M10 2V8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <p
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.78rem",
                    color: "var(--ink-faint)",
                    letterSpacing: "0.06em",
                    margin: 0,
                  }}
                >
                  {project.liveUrl.replace(/^https?:\/\//, "")}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 08 — Next project */}
        {nextProject && nextProject.slug !== project.slug && (
          <section
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: "80px",
              paddingBottom: "80px",
              background: "var(--bg)",
            }}
          >
            <div className="container-wide">
              <Link
                href={`/work/${nextProject.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)",
                  gap: "60px",
                  alignItems: "center",
                }}
                className="nmp-next-project"
              >
                <div>
                  <p
                    className="eyebrow eyebrow-burnt"
                    style={{ marginBottom: "20px" }}
                  >
                    <span style={{ opacity: 0.5 }}>///</span>
                    Proyek Berikutnya
                  </p>
                  <span className="nmp-index">{nextProject.index}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                      margin: "16px 0",
                      lineHeight: 1.05,
                    }}
                  >
                    {nextProject.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "1rem",
                      color: "var(--ink-soft)",
                      lineHeight: 1.5,
                      margin: 0,
                      maxWidth: "40ch",
                    }}
                  >
                    {nextProject.tagline.id}
                  </p>
                  <span
                    className="nmp-link-arrow"
                    style={{ marginTop: "24px", display: "inline-flex" }}
                  >
                    Lihat Case Study
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    background: "var(--bg-card)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={nextProject.cover}
                    alt={`${nextProject.name} cover`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            background: "var(--paper-warm)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div
            className="container-wide"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "32px",
            }}
          >
            <p className="eyebrow eyebrow-burnt">
              <span style={{ opacity: 0.5 }}>///</span>
              Punya proyek yang layak dibangun?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Mulai{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                proyek
              </span>{" "}
              bersama kami.
            </h2>
            <Link href="/#contact" className="nmp-btn nmp-btn-primary">
              Mulai Proyek
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .nmp-cs-overview-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 40px !important;
          }
          .nmp-next-project {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 32px !important;
          }
          .nmp-tech-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="studio-meta"
        style={{
          marginBottom: "8px",
          color: "var(--ink-faint)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "1rem",
          color: "var(--ink)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.62rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--burnt)",
        padding: "4px 10px",
        border: "1px solid var(--burnt)",
        borderRadius: "999px",
      }}
    >
      {label}
    </span>
  );
}

function ImageBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        padding: "5px 12px",
        background: "color-mix(in srgb, var(--ink) 88%, transparent)",
        color: "var(--paper)",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.62rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        borderRadius: "999px",
        backdropFilter: "blur(8px)",
      }}
    >
      {label}
    </span>
  );
}

function CaseStudySectionRender({
  index,
  heading,
  body,
  bullets,
}: {
  index: string;
  heading: string;
  body: string[];
  bullets?: string[];
}) {
  return (
    <article
      style={{
        paddingBottom: "80px",
        marginBottom: "80px",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.7rem",
            color: "var(--burnt)",
            letterSpacing: "0.15em",
          }}
        >
          {index}
        </span>
      </div>

      <h2
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          margin: 0,
          marginBottom: "32px",
          lineHeight: 1.1,
        }}
      >
        {heading}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {body.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1.05rem",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {bullets && bullets.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "32px 0 0 0",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "12px 32px",
          }}
          className="nmp-cs-bullets"
        >
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.92rem",
                color: "var(--ink-soft)",
                display: "flex",
                gap: "12px",
                alignItems: "baseline",
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--burnt)",
                  borderRadius: "999px",
                  flexShrink: 0,
                  marginTop: "7px",
                }}
              />
              {b}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nmp-cs-bullets {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </article>
  );
}

function TechStorySection({
  techStory,
}: {
  techStory: TechStory;
}) {
  return (
    <section
      style={{
        paddingBottom: "80px",
        borderTop: "1px solid var(--line)",
        paddingTop: "80px",
        background: "var(--paper-warm)",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 80px)",
          paddingRight: "clamp(20px, 5vw, 80px)",
        }}
      >
        <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "20px" }}>
          <span style={{ opacity: 0.5 }}>///</span>
          Technology
        </p>
        <h2
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: 0,
            marginBottom: "32px",
            lineHeight: 1.1,
          }}
        >
          Technology
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "1.05rem",
            color: "var(--ink-soft)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: "24px",
          }}
        >
          {techStory.intro.id}
        </p>

        {techStory.details.map((detail, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1.05rem",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              margin: 0,
              marginBottom: "20px",
            }}
          >
            {detail.id}
          </p>
        ))}

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "32px",
          }}
        >
          {techStory.stack.map((tech) => (
            <span
              key={tech}
              className="nmp-tag"
              style={{ fontSize: "0.78rem", padding: "8px 16px" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
