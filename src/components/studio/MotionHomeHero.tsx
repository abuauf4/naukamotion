"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/lib/server-locale";
import styles from "./MotionHomeHero.module.css";

const letters = Array.from("MOTION");

export function MotionHomeHero({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 — keep the wordmark dominant, then let it recede.
  const titleY = useTransform(scrollYProgress, [0, 0.28, 0.62], [0, -10, -86]);
  const titleScale = useTransform(scrollYProgress, [0, 0.34, 0.62], [1, 1.025, 1.08]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.32, 0.62], [1, 1, 0.12]);

  // Phase 2 — a thin orange signal sweeps across before any project appears.
  const signalScaleX = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);
  const signalOpacity = useTransform(scrollYProgress, [0.06, 0.2, 0.38], [0, 1, 0]);

  // Phase 3 — reveal the work from a horizontal slit instead of throwing a card on top.
  const projectOpacity = useTransform(scrollYProgress, [0.18, 0.24], [0, 1]);
  const projectClip = useTransform(
    scrollYProgress,
    [0.18, 0.34, 0.62],
    [
      "inset(49% 10% 49% 10% round 28px)",
      "inset(28% 6% 28% 6% round 24px)",
      "inset(0% 0% 0% 0% round 14px)",
    ],
  );
  const projectScale = useTransform(scrollYProgress, [0.18, 0.62], [1.08, 1]);
  const projectY = useTransform(scrollYProgress, [0.18, 0.62], [18, 0]);
  const imageScale = useTransform(scrollYProgress, [0.18, 0.64], [1.12, 1]);

  // Phase 4 — details only arrive after the visual has settled.
  const chromeOpacity = useTransform(scrollYProgress, [0.48, 0.64], [0, 1]);
  const detailOpacity = useTransform(scrollYProgress, [0.64, 0.82], [0, 1]);
  const detailY = useTransform(scrollYProgress, [0.64, 0.84], [28, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.stickyStage}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />

        <div className={`nm-container ${styles.stageInner}`}>
          <div className={styles.topline}>
            <span>NAUKA MOTION / DIGITAL STUDIO</span>
            <span>JAKARTA · ID / 2026</span>
          </div>

          <motion.div
            className={styles.titleBlock}
            style={
              reduceMotion
                ? undefined
                : { y: titleY, scale: titleScale, opacity: titleOpacity }
            }
          >
            <motion.span
              className={styles.nauka}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              NAUKA
            </motion.span>

            <h1 className={styles.motionWord} aria-label="Nauka Motion">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.72,
                    delay: reduceMotion ? 0 : 0.04 + index * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <div className={styles.statementRow}>
              <p>SMALL MOVEMENT.</p>
              <p>REAL IMPACT.</p>
            </div>
          </motion.div>

          <motion.div
            className={styles.signalLine}
            style={
              reduceMotion
                ? undefined
                : { scaleX: signalScaleX, opacity: signalOpacity }
            }
            aria-hidden="true"
          />

          <motion.article
            className={styles.projectShell}
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: projectOpacity,
                    clipPath: projectClip,
                    scale: projectScale,
                    y: projectY,
                  }
            }
            aria-label={id ? "Karya pilihan JAECOO MAM Fatmawati" : "Selected work JAECOO MAM Fatmawati"}
          >
            <motion.div
              className={styles.projectImage}
              style={reduceMotion ? undefined : { scale: imageScale }}
            >
              <Image
                src="/showcase/jaecoo-fatmawati.webp"
                alt={
                  id
                    ? "Preview website JAECOO MAM Fatmawati"
                    : "JAECOO MAM Fatmawati website preview"
                }
                fill
                sizes="(max-width: 767px) 94vw, 86vw"
                priority
              />
            </motion.div>

            <div className={styles.imageShade} />

            <motion.div
              className={styles.projectChrome}
              style={reduceMotion ? undefined : { opacity: chromeOpacity }}
            >
              <span>SELECTED WORK / 01</span>
              <span>JAECOO MAM FATMAWATI</span>
              <span>WEB EXPERIENCE</span>
            </motion.div>

            <motion.div
              className={styles.projectDetail}
              style={
                reduceMotion
                  ? undefined
                  : { opacity: detailOpacity, y: detailY }
              }
            >
              <div className={styles.projectNumber}>01</div>
              <div className={styles.detailText}>
                <p>INDEPENDENT DIGITAL STUDIO</p>
                <h2>
                  {id ? (
                    <>
                      Website yang tidak cuma <em>dilihat.</em>
                    </>
                  ) : (
                    <>
                      Websites that are not only <em>seen.</em>
                    </>
                  )}
                </h2>
              </div>
              <div className={styles.detailActions}>
                <p>
                  {id
                    ? "Identitas yang kuat. Interaksi yang hidup. Performa tetap dijaga."
                    : "Distinct identity. Purposeful interaction. Performance kept in check."}
                </p>
                <div className={styles.actions}>
                  <Link className="nm-button" href="/contact">
                    {id ? "Mulai proyek" : "Start a project"}
                    <ArrowUpRight size={17} />
                  </Link>
                  <Link className="nm-button nm-button-ghost" href="#karya">
                    {id ? "Lihat karya" : "Explore work"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.article>

          <motion.div
            className={styles.scrollHint}
            style={reduceMotion ? undefined : { opacity: scrollHintOpacity }}
          >
            <ArrowDown size={15} />
            <span>{id ? "SCROLL UNTUK MEMBUKA" : "SCROLL TO REVEAL"}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
