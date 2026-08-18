"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { useRef } from "react";
import type { FeaturedProject } from "@/lib/cms";

export function FeaturedWorkSection({ projects, locale }: { projects: FeaturedProject[]; locale: "id" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.35 });
  const topX = useTransform(progress, [0, 0.5, 1], ["12%", "0%", "-11%"]);
  const bottomX = useTransform(progress, [0, 0.5, 1], ["-10%", "0%", "12%"]);
  const topRotate = useTransform(progress, [0, 0.5, 1], [-1.6, -0.3, 1.1]);
  const bottomRotate = useTransform(progress, [0, 0.5, 1], [1.5, 0.2, -1.1]);
  const copy = locale === "en"
    ? { label: "01 — Selected work", viewAll: "View all work" }
    : { label: "01 — Karya pilihan", viewAll: "Lihat semua karya" };
  const frames = projects.slice(0, 2);

  return (
    <section ref={ref} id="karya" className="nauka-featured-section nauka-film-reel">
      <div className="container-wide nauka-film-shell">
        <div className="nauka-film-header">
          <p className="nauka-section-label">{copy.label}</p>
          <Link href="/work" className="nauka-text-link">{copy.viewAll} <span aria-hidden="true">↗</span></Link>
        </div>
        <h2 className="nauka-film-title">SMALL MOVEMENT.<br />REAL IMPACT.</h2>
        <div className="nauka-film-stage" aria-label={locale === "en" ? "Selected work preview" : "Preview karya pilihan"}>
          {frames.map((project, index) => (
            <motion.div
              key={project.slug}
              className={`nauka-film-frame nauka-film-frame-${index + 1}`}
              style={{ x: index === 0 ? topX : bottomX, rotate: index === 0 ? topRotate : bottomRotate } as MotionStyle}
            >
              <Link href={`/work/${project.slug}`} className="nauka-film-link" aria-label={locale === "en" ? "View selected work" : "Lihat karya pilihan"}>
                <div className="nauka-film-image-wrap">
                  <Image
                    src={project.cover}
                    alt={locale === "en" ? "Selected website preview" : "Preview website karya pilihan"}
                    fill
                    sizes="(max-width: 767px) 150vw, 82vw"
                    className="nauka-film-image"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="nauka-film-footer"><span>NAUKA MOTION / REEL 01</span></div>
      </div>
    </section>
  );
}
