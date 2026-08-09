"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { studioCategories, getProjectsByCategory } from "@/lib/studio-data";
import { useLocale, pickLocal } from "@/lib/locale-context";

const COPY = {
  id: {
    eyebrow: "Kategori Saat Ini",
    heading: "Industri dan jenis proyek yang telah kami",
    headingAccent: "kerjakan",
    sub: "Beberapa industri dan jenis proyek yang telah kami kerjakan sejauh ini. Kategori ini akan terus berkembang seiring perjalanan Nauka Motion.",
    projectCount: "proyek",
    soonLabel: "segera",
    viewProjects: "Lihat proyek",
  },
  en: {
    eyebrow: "Current Categories",
    heading: "Industries and project types we have",
    headingAccent: "worked on",
    sub: "Several industries and project types we have worked on so far. These categories will continue to grow as Nauka Motion progresses.",
    projectCount: "projects",
    soonLabel: "soon",
    viewProjects: "View projects",
  },
};

/**
 * CategorySection — 6 big editorial cards.
 *
 * Menggantikan konsep "Selected Work — 06".
 * Homepage tidak menampilkan project satu per satu,
 * melainkan kategori yang sudah dikerjakan Nauka Motion.
 * Klik kategori → /work/[category] → tampil project di dalamnya.
 */
export function CategorySection() {
  const headerRef = useReveal<HTMLDivElement>();
  const { locale } = useLocale();
  const t = COPY[locale];

  return (
    <section
      id="kategori"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div
          ref={headerRef}
          className="reveal"
          style={{
            marginBottom: "80px",
            maxWidth: "60ch",
          }}
        >
          <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "20px" }}>
            <span style={{ opacity: 0.5 }}>///</span>
            {t.eyebrow}
          </p>
          <h2 className="studio-h2" style={{ marginBottom: "24px" }}>
            {t.heading}{" "}
            <span
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--burnt)",
              }}
            >
              {t.headingAccent}
            </span>
            .
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1.1rem",
              color: "var(--ink-soft)",
              lineHeight: 1.55,
              maxWidth: "48ch",
            }}
          >
            {t.sub}
          </p>
        </div>

        {/* Category cards — big editorial */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "0",
            borderTop: "1px solid var(--line)",
            borderLeft: "1px solid var(--line)",
          }}
          className="nmp-category-grid"
        >
          {studioCategories.map((cat) => {
            const count = getProjectsByCategory(cat.slug).length;
            return (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                index={cat.index}
                title={cat.title}
                description={pickLocal(cat.description, locale)}
                count={count}
                accent={cat.accent}
                projectCountLabel={t.projectCount}
                soonLabel={t.soonLabel}
                viewProjectsLabel={t.viewProjects}
              />
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.nmp-category-grid) {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function CategoryCard({
  slug,
  index,
  title,
  description,
  count,
  accent,
  projectCountLabel,
  soonLabel,
  viewProjectsLabel,
}: {
  slug: string;
  index: string;
  title: string;
  description: string;
  count: number;
  accent: string;
  projectCountLabel: string;
  soonLabel: string;
  viewProjectsLabel: string;
}) {
  const ref = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/work/${slug}`}
      className="reveal nmp-cat-card"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        padding: "40px clamp(24px, 4vw, 48px)",
        borderBottom: "1px solid var(--line)",
        borderRight: "1px solid var(--line)",
        minHeight: "280px",
        position: "relative",
        background: "var(--bg)",
        transition: "background 0.3s ease",
      }}
    >
      {/* Top: index + count */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "32px",
        }}
      >
        <span className="nmp-index">{index}</span>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.7rem",
            color: "var(--ink-faint)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {count > 0 ? `${String(count).padStart(2, "0")} ${projectCountLabel}` : soonLabel}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--ink)",
          margin: 0,
          marginBottom: "20px",
          transition: "color 0.25s ease",
        }}
        className="nmp-cat-title"
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "1rem",
          color: "var(--ink-soft)",
          lineHeight: 1.55,
          margin: 0,
          maxWidth: "36ch",
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Arrow */}
      <div
        style={{
          marginTop: "32px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--ink-faint)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          transition: "color 0.25s ease, gap 0.25s ease",
        }}
        className="nmp-cat-arrow"
      >
        {viewProjectsLabel}
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 10L10 2M10 2H4M10 2V8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Accent stripe on hover */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "0%",
          background: accent,
          transition: "height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="nmp-cat-stripe"
      />

      <style jsx>{`
        a:hover {
          background: var(--paper-warm) !important;
        }
        a:hover :global(.nmp-cat-title) {
          color: var(--burnt) !important;
        }
        a:hover :global(.nmp-cat-arrow) {
          color: var(--burnt) !important;
          gap: 12px !important;
        }
        a:hover :global(.nmp-cat-stripe) {
          height: 100% !important;
        }
      `}</style>
    </Link>
  );
}
