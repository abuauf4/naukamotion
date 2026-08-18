"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { useRef } from "react";
import type { FeaturedProject } from "@/lib/cms";

function FilmFrame({ project, index, progress, locale }: {
  project: FeaturedProject;
  index: number;
  progress: MotionValue<number>;
  locale: "id" | "en";
}) {
  const start = index / 3;
  const enter = start + 0.07;
  const exit = Math.min(1, start + 0.38);
  const opacity = useTransform(progress, [start, enter, exit, Math.min(1, exit + 0.08)], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, enter, exit], [0.82, 1, 1.08]);
  const y = useTransform(progress, [start, enter, exit], [70, 0, -70]);
  const rotate = useTransform(progress, [start, enter, exit], [index % 2 ? 4 : -4, 0, index % 2 ? -3 : 3]);

  return (
    <motion.div
      className={`nauka-film-frame nauka-film-frame-${index + 1}`}
      style={{ opacity, scale, y, rotate, "--project-accent": project.accent } as MotionStyle}
    >
      <Link href={`/work/${project.slug}`} className="nauka-film-link">
        <div className="nauka-film-image-wrap">
          <Image src={project.cover} alt={project.name} fill sizes="(max-width: 767px) 92vw, 68vw" className="nauka-film-image" />
          <span className="nauka-film-corner">{project.index} / {project.year}</span>
          <span className="nauka-film-arrow" aria-hidden="true">↗</span>
          <span className="nauka-film-name">{project.name}</span>
        </div>
        <div className="nauka-film-caption">
          <span>{project.categoryTitle}</span>
          <p>{project.tagline[locale]}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function MobilePreviewStack({ projects, progress, locale }: {
  projects: FeaturedProject[];
  progress: MotionValue<number>;
  locale: "id" | "en";
}) {
  const topX = useTransform(progress, [0, 0.55, 1], ["-5%", "-1%", "-8%"]);
  const bottomX = useTransform(progress, [0, 0.55, 1], ["5%", "1%", "8%"]);
  const topRotate = useTransform(progress, [0, 0.5, 1], [2.5, 0, -2]);
  const bottomRotate = useTransform(progress, [0, 0.5, 1], [-2, 0, 2.5]);

  return (
    <div className="nauka-mobile-preview" aria-label={locale === "en" ? "Project previews" : "Preview project"}>
      {projects.slice(0, 2).map((project, index) => (
        <motion.div
          key={project.slug}
          className={`nauka-mobile-preview-frame nauka-mobile-preview-frame-${index + 1}`}
          style={{ x: index === 0 ? topX : bottomX, rotateY: index === 0 ? topRotate : bottomRotate, "--project-accent": project.accent } as MotionStyle}
        >
          <Link href={`/work/${project.slug}`} className="nauka-mobile-preview-link">
            <div className="nauka-mobile-preview-image">
              <Image src={project.cover} alt={project.name} fill sizes="68vw" />
              <span>{project.name}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function FeaturedWorkSection({ projects, locale }: { projects: FeaturedProject[]; locale: "id" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.3 });
  const copy = locale === "en"
    ? { label: "01 — Selected work", heading: "Things we helped move.", viewAll: "View all work", scroll: "Scroll through the work" }
    : { label: "01 — Karya pilihan", heading: "SMALL MOVEMENT. REAL IMPACT.", viewAll: "Lihat semua karya", scroll: "Scroll untuk melihat karya" };

  return (
    <section ref={ref} id="karya" className="nauka-featured-section nauka-film-reel">
      <div className="nauka-film-sticky">
        <div className="container-wide nauka-film-shell">
          <div className="nauka-film-header">
            <p className="nauka-section-label">{copy.label}</p>
            <span className="nauka-film-scroll-label">{copy.scroll} ↓</span>
            <Link href="/work" className="nauka-text-link">{copy.viewAll} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="nauka-film-title-wrap">
            <h2 className="nauka-film-title">{copy.heading}</h2>
            <span className="nauka-film-counter">01 — 0{Math.min(projects.length, 3)}</span>
          </div>
          {projects.length > 0 && !projects[0].isPreview ? (
            <div className="nauka-film-stage">
              <div className="nauka-film-axis" aria-hidden="true" />
              {projects.slice(0, 3).map((project, index) => (
                <FilmFrame key={project.slug} project={project} index={index} progress={progress} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="nauka-empty-featured">
              <p>{locale === "en" ? "Projects we have made." : "Project yg telah dibuat"}</p>
              <MobilePreviewStack projects={projects} progress={progress} locale={locale} />
            </div>
          )}
          <div className="nauka-film-footer"><span>NAUKA MOTION / REEL 01</span><span>03 — {locale === "en" ? "Selected frames" : "Frame pilihan"}</span></div>
        </div>
      </div>
    </section>
  );
}
