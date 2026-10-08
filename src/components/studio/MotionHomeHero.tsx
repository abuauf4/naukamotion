"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Locale } from "@/lib/server-locale";
import styles from "./MotionHomeHero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

function Glyph({
  letter,
  index,
  progress,
  reduce,
}: {
  letter: string;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(
    progress,
    [0.06, 0.48],
    ["0%", `${(index - 2.5) * 27}%`],
  );
  const y = useTransform(
    progress,
    [0.06, 0.48],
    ["0%", `${index % 2 === 0 ? -38 : 38}%`],
  );
  const rotate = useTransform(
    progress,
    [0.06, 0.48],
    [0, index % 2 === 0 ? -12 : 12],
  );
  return (
    <m.span
      className={styles.glyph}
      style={reduce ? undefined : { x, y, rotate }}
    >
      <span className={styles.glyphMask}>
        <m.span
          initial={false}
          animate={reduce ? { y: 0 } : { y: ["108%", "0%"] }}
          transition={{
            duration: 0.95,
            delay: 0.09 + index * 0.055,
            ease: EASE,
          }}
        >
          {letter}
        </m.span>
      </span>
    </m.span>
  );
}

export function MotionHomeHero({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const brandOpacity = useTransform(
    scrollYProgress,
    [0, 0.23, 0.43],
    [1, 0.7, 0],
  );
  const naukaX = useTransform(scrollYProgress, [0.02, 0.42], ["0%", "-24%"]);
  const naukaY = useTransform(scrollYProgress, [0, 0.42], [0, -55]);
  const statementOpacity = useTransform(scrollYProgress, [0.34, 0.58], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.34, 0.7], [75, 0]);
  const statementScale = useTransform(scrollYProgress, [0.34, 0.7], [0.88, 1]);
  const accentRotate = useTransform(scrollYProgress, [0, 1], [-24, 160]);
  const accentX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const accentScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 1.65, 1.1],
  );
  const trackX = useTransform(scrollYProgress, [0, 1], ["8%", "-15%"]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <section
      ref={ref}
      className={styles.hero}
      aria-label={
        id
          ? "Nauka Motion, studio website dan aplikasi"
          : "Nauka Motion, websites and apps studio"
      }
    >
      <div className={styles.stage}>
        <div className={`nm-container ${styles.inner}`}>
          <div className={styles.topline}>
            <span>INDEPENDENT DIGITAL STUDIO</span>
            <span>JAKARTA, ID · EST. 2026</span>
          </div>

          <div className={styles.canvas}>
            <m.div
              className={styles.accent}
              style={
                reduce
                  ? undefined
                  : { rotate: accentRotate, x: accentX, scale: accentScale }
              }
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
            </m.div>
            <m.div
              className={styles.brand}
              style={reduce ? undefined : { opacity: brandOpacity }}
            >
              <h1
                aria-label={
                  id
                    ? "Nauka Motion — jasa pembuatan website dan aplikasi"
                    : "Nauka Motion — website and app development"
                }
              >
                <m.span
                  className={styles.nauka}
                  style={reduce ? undefined : { x: naukaX, y: naukaY }}
                  aria-hidden="true"
                >
                  <m.span
                    initial={false}
                    animate={reduce ? { y: 0 } : { y: ["108%", "0%"] }}
                    transition={{ duration: 1, ease: EASE }}
                  >
                    NAUKA
                  </m.span>
                </m.span>
                <span className={styles.motion} aria-hidden="true">
                  {Array.from("MOTION").map((letter, index) => (
                    <Glyph
                      key={index}
                      {...{ letter, index, progress: scrollYProgress, reduce }}
                    />
                  ))}
                </span>
              </h1>
              <div className={styles.motto}>
                <span>SMALL MOVEMENT.</span>
                <span>REAL IMPACT.</span>
              </div>
            </m.div>

            <m.div
              className={styles.statement}
              style={
                reduce
                  ? undefined
                  : {
                      opacity: statementOpacity,
                      y: statementY,
                      scale: statementScale,
                    }
              }
              aria-hidden="true"
            >
              <p>DESIGN / BUILD / EXPERIENCE</p>
              <span>BUILT TO</span>
              <span>
                BE <em>FELT.</em>
              </span>
            </m.div>
          </div>

          <div className={styles.bottom}>
            <p>
              {id ? (
                <>
                  Website & aplikasi dengan
                  <br />
                  <strong>identitas yang terasa.</strong>
                </>
              ) : (
                <>
                  Websites & apps with
                  <br />
                  <strong>an identity you can feel.</strong>
                </>
              )}
            </p>
            <div className={styles.actions}>
              <Link href="/contact" className="nm-button">
                {id ? "Diskusi proyek" : "Let's talk"}
              </Link>
              <Link href="#karya" className={styles.workLink}>
                {id ? "Jelajahi karya" : "Explore our work"}
                <span className={styles.linkLine} aria-hidden="true" />
              </Link>
            </div>
            <span className={styles.scrollNote}>
              {id ? "SCROLL UNTUK MERASAKAN" : "SCROLL TO FEEL"}
              <span aria-hidden="true" />
            </span>
          </div>
        </div>
        <m.div
          className={styles.backgroundType}
          style={reduce ? undefined : { x: trackX }}
          aria-hidden="true"
        >
          DESIGN THAT MOVES YOU.
        </m.div>
        <m.div
          className={styles.progress}
          style={{ scaleX: reduce ? 1 : lineScale }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
