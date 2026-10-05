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

  const titleY = useTransform(scrollYProgress, [0, 0.58], [0, -88]);
  const titleScale = useTransform(scrollYProgress, [0, 0.58], [1, 1.12]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.36, 0.68],
    [1, 1, 0.11],
  );

  const projectY = useTransform(scrollYProgress, [0, 0.16, 0.72], [150, 120, -12]);
  const projectScale = useTransform(scrollYProgress, [0, 0.12, 0.72], [0.66, 0.72, 1.08]);
  const projectRotate = useTransform(scrollYProgress, [0, 0.68], [-5, 0]);
  const projectOpacity = useTransform(scrollYProgress, [0, 0.12, 0.3], [0, 0.75, 1]);
  const projectRadius = useTransform(scrollYProgress, [0.12, 0.72], [34, 10]);

  const railScale = useTransform(scrollYProgress, [0, 0.72], [0.12, 1]);
  const indexX = useTransform(scrollYProgress, [0, 0.72], [-24, 0]);
  const detailOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const detailY = useTransform(scrollYProgress, [0.5, 0.78], [44, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

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
                  initial={reduceMotion ? false : { y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.72,
                    delay: reduceMotion ? 0 : 0.05 + index * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className={styles.motionRail}
              style={reduceMotion ? undefined : { scaleX: railScale }}
            >
              <span />
            </motion.div>

            <div className={styles.statementRow}>
              <p>SMALL MOVEMENT.</p>
              <p>REAL IMPACT.</p>
            </div>
          </motion.div>

          <motion.div
            className={styles.projectShell}
            style={
              reduceMotion
                ? undefined
                : {
                    y: projectY,
                    scale: projectScale,
                    rotate: projectRotate,
                    opacity: projectOpacity,
                    borderRadius: projectRadius,
                  }
            }
          >
            <div className={styles.projectChrome}>
              <span>SELECTED WORK / 01</span>
              <span>JAECOO MAM FATMAWATI</span>
              <span>WEB EXPERIENCE</span>
            </div>
            <div className={styles.projectImage}>
              <Image
                src="/showcase/jaecoo-fatmawati.webp"
                alt={
                  id
                    ? "Preview website JAECOO MAM Fatmawati"
                    : "JAECOO MAM Fatmawati website preview"
                }
                fill
                sizes="(max-width: 767px) 94vw, 72vw"
                priority
              />
              <div className={styles.imageShade} />
              <motion.div
                className={styles.projectIndex}
                style={reduceMotion ? undefined : { x: indexX }}
              >
                <span>01</span>
                <small>DESIGN / BUILD / MOTION</small>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={styles.detailPanel}
            style={
              reduceMotion
                ? undefined
                : { opacity: detailOpacity, y: detailY }
            }
          >
            <div>
              <p className={styles.eyebrow}>INDEPENDENT DIGITAL STUDIO</p>
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
            <div className={styles.detailCopy}>
              <p>
                {id
                  ? "Kami merancang website dan aplikasi dengan identitas visual yang kuat, interaksi yang terasa hidup, dan performa yang tetap dijaga."
                  : "We design websites and apps with a distinct visual identity, purposeful interaction, and performance kept in check."}
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

          <motion.div
            className={styles.scrollHint}
            style={reduceMotion ? undefined : { opacity: scrollHintOpacity }}
          >
            <ArrowDown size={15} />
            <span>{id ? "SCROLL UNTUK MELIHAT" : "SCROLL TO REVEAL"}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
