"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/lib/server-locale";
import styles from "./MotionHomeHero.module.css";

const LETTERS = Array.from("MOTION");
const OFFSETS = [
  { x: -92, y: -42, r: -8 },
  { x: -54, y: 34, r: 5 },
  { x: -18, y: -26, r: -3 },
  { x: 18, y: 30, r: 3 },
  { x: 54, y: -36, r: -5 },
  { x: 92, y: 40, r: 8 },
];

function KineticGlyph({
  letter,
  index,
  progress,
  reduceMotion,
}: {
  letter: string;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const target = OFFSETS[index];
  const x = useTransform(progress, [0.16, 0.54, 0.82], [0, target.x, target.x * 1.18]);
  const y = useTransform(progress, [0.16, 0.54, 0.82], [0, target.y, target.y * 1.28]);
  const rotate = useTransform(progress, [0.16, 0.54, 0.82], [0, target.r, target.r * 1.25]);
  const scale = useTransform(progress, [0.16, 0.54, 0.82], [1, 1.08, 1.13]);
  const opacity = useTransform(progress, [0.18, 0.56, 0.82], [1, 0.62, 0.08]);

  return (
    <motion.span
      className={styles.glyph}
      style={
        reduceMotion
          ? undefined
          : { x, y, rotate, scale, opacity }
      }
      initial={
        reduceMotion
          ? false
          : {
              y: index % 2 === 0 ? "112%" : "-112%",
              rotate: index % 2 === 0 ? -7 : 7,
              opacity: 0,
            }
      }
      animate={{ y: 0, rotate: 0, opacity: 1 }}
      transition={{
        duration: 0.85,
        delay: 0.06 + index * 0.065,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {letter}
    </motion.span>
  );
}

export function MotionHomeHero({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const brandOpacity = useTransform(scrollYProgress, [0, 0.48, 0.76], [1, 0.72, 0.08]);
  const brandY = useTransform(scrollYProgress, [0, 0.72], [0, -34]);

  const sweepY = useTransform(scrollYProgress, [0.1, 0.5], ["-34vh", "36vh"]);
  const sweepOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.42, 0.54], [0, 1, 1, 0]);
  const sweepScaleX = useTransform(scrollYProgress, [0.08, 0.28], [0.18, 1]);

  const trackAX = useTransform(scrollYProgress, [0.16, 0.78], ["-10%", "12%"]);
  const trackBX = useTransform(scrollYProgress, [0.16, 0.78], ["11%", "-13%"]);
  const trackOpacity = useTransform(scrollYProgress, [0.12, 0.3, 0.72, 0.9], [0, 0.15, 0.11, 0]);

  const manifestoOpacity = useTransform(scrollYProgress, [0.22, 0.36, 0.65, 0.76], [0, 1, 1, 0]);
  const manifestoY = useTransform(scrollYProgress, [0.22, 0.4, 0.7], [58, 0, -34]);
  const manifestoScale = useTransform(scrollYProgress, [0.22, 0.46, 0.72], [0.92, 1, 1.04]);
  const manifestoClip = useTransform(
    scrollYProgress,
    [0.22, 0.42],
    ["inset(48% 0 48% 0)", "inset(0% 0 0% 0)"],
  );

  const slashRotate = useTransform(scrollYProgress, [0.26, 0.58], [-18, 18]);
  const slashScale = useTransform(scrollYProgress, [0.26, 0.58], [0.65, 1.15]);

  const finalOpacity = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.68, 0.86], [46, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.13], [1, 0]);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.stickyStage}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />

        <div className={`nm-container ${styles.stageInner}`}>
          <div className={styles.topline}>
            <span>NAUKA MOTION / INDEPENDENT DIGITAL STUDIO</span>
            <span>DESIGN · BUILD · MOTION / 2026</span>
          </div>

          <motion.div
            className={styles.brandStage}
            style={reduceMotion ? undefined : { opacity: brandOpacity, y: brandY }}
          >
            <motion.span
              className={styles.nauka}
              initial={reduceMotion ? false : { opacity: 0, x: -22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              NAUKA
            </motion.span>

            <h1 className={styles.motionWord} aria-label="Nauka Motion">
              {LETTERS.map((letter, index) => (
                <KineticGlyph
                  key={`${letter}-${index}`}
                  letter={letter}
                  index={index}
                  progress={scrollYProgress}
                  reduceMotion={reduceMotion}
                />
              ))}
            </h1>

            <div className={styles.statementRow}>
              <span>SMALL MOVEMENT.</span>
              <span>REAL IMPACT.</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.sweep}
            style={
              reduceMotion
                ? undefined
                : { y: sweepY, opacity: sweepOpacity, scaleX: sweepScaleX }
            }
            aria-hidden="true"
          />

          <motion.div
            className={`${styles.track} ${styles.trackA}`}
            style={reduceMotion ? undefined : { x: trackAX, opacity: trackOpacity }}
            aria-hidden="true"
          >
            WEB / APP / SYSTEM / BRAND / MOTION / EXPERIENCE / WEB / APP / SYSTEM
          </motion.div>
          <motion.div
            className={`${styles.track} ${styles.trackB}`}
            style={reduceMotion ? undefined : { x: trackBX, opacity: trackOpacity }}
            aria-hidden="true"
          >
            DESIGN / INTERACTION / PERFORMANCE / PRODUCT / DIGITAL / DESIGN / INTERACTION
          </motion.div>

          <motion.div
            className={styles.manifesto}
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: manifestoOpacity,
                    y: manifestoY,
                    scale: manifestoScale,
                    clipPath: manifestoClip,
                  }
            }
          >
            <motion.span
              className={styles.slash}
              style={reduceMotion ? undefined : { rotate: slashRotate, scaleY: slashScale }}
              aria-hidden="true"
            />
            <p>DESIGN / BUILD / MOTION</p>
            <h2>
              BUILT TO BE <em>FELT.</em>
            </h2>
            <span className={styles.manifestoNote}>
              {id
                ? "Gerak bukan dekorasi. Gerak mengarahkan perhatian."
                : "Motion is not decoration. Motion directs attention."}
            </span>
          </motion.div>

          <motion.div
            className={styles.finalPanel}
            style={reduceMotion ? undefined : { opacity: finalOpacity, y: finalY }}
          >
            <div>
              <p className={styles.finalEyebrow}>NAUKA MOTION / DIGITAL EXPERIENCE</p>
              <h2>
                {id ? (
                  <>
                    Website yang punya <em>presence.</em>
                  </>
                ) : (
                  <>
                    Websites with <em>presence.</em>
                  </>
                )}
              </h2>
            </div>

            <div className={styles.finalCopy}>
              <p>
                {id
                  ? "Kami merancang website dan aplikasi dengan identitas yang kuat, interaksi yang terasa hidup, dan performa yang tetap dijaga."
                  : "We design websites and apps with a distinct identity, purposeful interaction, and performance kept in check."}
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
            <span>{id ? "SCROLL / GERAKKAN" : "SCROLL / MOVE"}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
