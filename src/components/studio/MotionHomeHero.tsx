"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Locale } from "@/lib/server-locale";
import styles from "./MotionHomeHero.module.css";

const GEAR_PATH = "M 94.61 36.84 Q 97.48 35.96 100.41 35.29 L 100.48 35.27 Q 103.4 34.6 103.77 31.62 L 106.1 12.8 Q 106.47 9.83 109.47 9.83 L 130.53 9.83 Q 133.53 9.83 133.9 12.8 L 136.23 31.62 Q 136.6 34.6 139.52 35.27 L 139.59 35.29 Q 142.52 35.96 145.39 36.84 L 145.46 36.86 Q 148.32 37.74 150.13 35.35 L 161.56 20.22 Q 163.37 17.82 165.97 19.32 L 184.2 29.85 Q 186.8 31.35 185.63 34.11 L 178.25 51.58 Q 177.08 54.34 179.27 56.39 L 179.32 56.44 Q 181.52 58.48 183.56 60.68 L 183.61 60.73 Q 185.66 62.92 188.42 61.75 L 205.89 54.37 Q 208.65 53.2 210.15 55.8 L 220.68 74.03 Q 222.18 76.63 219.78 78.44 L 204.65 89.87 Q 202.26 91.68 203.14 94.54 L 203.16 94.61 Q 204.04 97.48 204.71 100.41 L 204.73 100.48 Q 205.4 103.4 208.38 103.77 L 227.2 106.1 Q 230.17 106.47 230.17 109.47 L 230.17 130.53 Q 230.17 133.53 227.2 133.9 L 208.38 136.23 Q 205.4 136.6 204.73 139.52 L 204.71 139.59 Q 204.04 142.52 203.16 145.39 L 203.14 145.46 Q 202.26 148.32 204.65 150.13 L 219.78 161.56 Q 222.18 163.37 220.68 165.97 L 210.15 184.2 Q 208.65 186.8 205.89 185.63 L 188.42 178.25 Q 185.66 177.08 183.61 179.27 L 183.56 179.32 Q 181.52 181.52 179.32 183.56 L 179.27 183.61 Q 177.08 185.66 178.25 188.42 L 185.63 205.89 Q 186.8 208.65 184.2 210.15 L 165.97 220.68 Q 163.37 222.18 161.56 219.78 L 150.13 204.65 Q 148.32 202.26 145.46 203.14 L 145.39 203.16 Q 142.52 204.04 139.59 204.71 L 139.52 204.73 Q 136.6 205.4 136.23 208.38 L 133.9 227.2 Q 133.53 230.17 130.53 230.17 L 109.47 230.17 Q 106.47 230.17 106.1 227.2 L 103.77 208.38 Q 103.4 205.4 100.48 204.73 L 100.41 204.71 Q 97.48 204.04 94.61 203.16 L 94.54 203.14 Q 91.68 202.26 89.87 204.65 L 78.44 219.78 Q 76.63 222.18 74.03 220.68 L 55.8 210.15 Q 53.2 208.65 54.37 205.89 L 61.75 188.42 Q 62.92 185.66 60.73 183.61 L 60.68 183.56 Q 58.48 181.52 56.44 179.32 L 56.39 179.27 Q 54.34 177.08 51.58 178.25 L 34.11 185.63 Q 31.35 186.8 29.85 184.2 L 19.32 165.97 Q 17.82 163.37 20.22 161.56 L 35.35 150.13 Q 37.74 148.32 36.86 145.46 L 36.84 145.39 Q 35.96 142.52 35.29 139.59 L 35.27 139.52 Q 34.6 136.6 31.62 136.23 L 12.8 133.9 Q 9.83 133.53 9.83 130.53 L 9.83 109.47 Q 9.83 106.47 12.8 106.1 L 31.62 103.77 Q 34.6 103.4 35.27 100.48 L 35.29 100.41 Q 35.96 97.48 36.84 94.61 L 36.86 94.54 Q 37.74 91.68 35.35 89.87 L 20.22 78.44 Q 17.82 76.63 19.32 74.03 L 29.85 55.8 Q 31.35 53.2 34.11 54.37 L 51.58 61.75 Q 54.34 62.92 56.39 60.73 L 56.44 60.68 Q 58.48 58.48 60.68 56.44 L 60.73 56.39 Q 62.92 54.34 61.75 51.58 L 54.37 34.11 Q 53.2 31.35 55.8 29.85 L 74.03 19.32 Q 76.63 17.82 78.44 20.22 L 89.87 35.35 Q 91.68 37.74 94.54 36.86 Z M 120 82 A 38 38 0 1 0 120 158 A 38 38 0 1 0 120 82 Z";

const GEAR_FACE = (
  <svg viewBox="0 0 240 240" fill="none" focusable="false">
    <defs>
      <linearGradient id="nm-gear-face" x1="42" y1="28" x2="194" y2="214" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffb47d" />
        <stop offset="0.42" stopColor="#ff8850" />
        <stop offset="1" stopColor="#eb572e" />
      </linearGradient>
    </defs>
    <path d={GEAR_PATH} fill="#b43e22" fillRule="evenodd" transform="translate(0 3)" />
    <path d={GEAR_PATH} fill="url(#nm-gear-face)" fillRule="evenodd" stroke="#ffb888" strokeWidth="0.8" />
    <circle cx="120" cy="120" r="76" stroke="#ffd5ab" strokeOpacity="0.3" />
    <circle cx="120" cy="120" r="43" stroke="#b64525" strokeWidth="2" />
    <g fill="#853921" fillOpacity="0.55">
      <circle cx="120" cy="58" r="3" />
      <circle cx="173.7" cy="89" r="3" />
      <circle cx="173.7" cy="151" r="3" />
      <circle cx="120" cy="182" r="3" />
      <circle cx="66.3" cy="151" r="3" />
      <circle cx="66.3" cy="89" r="3" />
    </g>
  </svg>
);

const GEAR_HUB = (
  <svg viewBox="0 0 240 240" fill="none" focusable="false">
    <circle cx="120" cy="120" r="35" fill="#18221f" stroke="#ffb47d" strokeOpacity="0.35" />
    <circle cx="120" cy="120" r="29" stroke="#ff9565" strokeOpacity="0.3" />
    <path d="M109 132V108L131 132V108" stroke="#ffb47d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
        <span>{letter}</span>
      </span>
    </m.span>
  );
}

export function MotionHomeHero({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const pinStart = useMotionValue(0);
  const pinDistance = useMotionValue(1);
  const rawProgress = useTransform(() =>
    Math.min(1, Math.max(0, (scrollY.get() - pinStart.get()) / pinDistance.get())),
  );
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.4,
  });

  useLayoutEffect(() => {
    const hero = ref.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    // Both boxes use svh. Browser-bar expansion must not change the timeline.
    const measure = () => {
      pinStart.set(hero.getBoundingClientRect().top + window.scrollY);
      pinDistance.set(Math.max(1, hero.offsetHeight - stage.offsetHeight));
    };
    measure();
    scrollYProgress.jump(
      Math.min(1, Math.max(0, (window.scrollY - pinStart.get()) / pinDistance.get())),
    );
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [pinStart, pinDistance, scrollYProgress]);
  const brandOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.56],
    [1, 1, 0],
  );
  const naukaX = useTransform(scrollYProgress, [0.02, 0.42], ["0%", "-24%"]);
  const naukaY = useTransform(scrollYProgress, [0, 0.42], [0, -55]);
  const statementOpacity = useTransform(scrollYProgress, [0.2, 0.56], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.2, 0.62], [28, 0]);
  const statementScale = useTransform(scrollYProgress, [0.2, 0.62], [0.96, 1]);
  const accentRotate = useTransform(scrollYProgress, [0, 1], [-18, 200]);
  const accentX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const accentScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 1.4, 1.06],
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
      <div className={styles.stage} ref={stageRef}>
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
                  : { x: accentX, scale: accentScale }
              }
              aria-hidden="true"
            >
              <m.div className={styles.gearRotor} style={reduce ? undefined : { rotate: accentRotate }}>
                {GEAR_FACE}
              </m.div>
              <div className={styles.gearHub}>{GEAR_HUB}</div>
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
                  <span>NAUKA</span>
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
