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
  // The two planes share one focal area, like a small editorial reel.
  // Keep travel restrained so the images feel carried by the scroll, not dragged.
  const topX = useTransform(progress, [0, 0.5, 1], ["16vw", "0vw", "-18vw"]);
  const bottomX = useTransform(progress, [0, 0.5, 1], ["-16vw", "0vw", "18vw"]);
  const topRotate = useTransform(progress, [0, 0.5, 1], [-2.2, -0.2, 1.5]);
  const bottomRotate = useTransform(progress, [0, 0.5, 1], [1.9, 0.2, -1.4]);
  const topY = useTransform(progress, [0, 0.5, 1], ["-1.5%", "2%", "5%"]);
  const bottomY = useTransform(progress, [0, 0.5, 1], ["7%", "3%", "-2%"]);
  const topTilt = useTransform(progress, [0, 0.5, 1], [-3.5, 0, 2.5]);
  const bottomTilt = useTransform(progress, [0, 0.5, 1], [2.5, 0, -3.5]);
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
              style={{
                x: index === 0 ? topX : bottomX,
                y: index === 0 ? topY : bottomY,
                rotate: index === 0 ? topRotate : bottomRotate,
                rotateY: index === 0 ? topTilt : bottomTilt,
              } as MotionStyle}
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
