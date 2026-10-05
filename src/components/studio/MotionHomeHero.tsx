"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Layers3 } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import type { Locale } from "@/lib/server-locale";
import styles from "./MotionHomeHero.module.css";

function KineticLetter({
  children,
  x,
  y,
  depth,
  disabled,
}: {
  children: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  disabled: boolean;
}) {
  const tx = useTransform(x, [-1, 1], [-depth, depth]);
  const ty = useTransform(y, [-1, 1], [-depth * 0.45, depth * 0.45]);

  return (
    <motion.span
      aria-hidden="true"
      className={styles.letter}
      style={disabled ? undefined : { x: tx, y: ty }}
    >
      {children}
    </motion.span>
  );
}

export function MotionHomeHero({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.45 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const showcaseY = useTransform(scrollYProgress, [0, 1], [0, -62]);
  const showcaseScale = useTransform(scrollYProgress, [0, 0.85], [1, 1.025]);
  const wordSpacing = useTransform(scrollYProgress, [0, 0.8], ["0em", "0.075em"]);

  const browserX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const browserY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const phoneX = useTransform(smoothX, [-1, 1], [12, -12]);
  const phoneY = useTransform(smoothY, [-1, 1], [7, -7]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div className={`nm-container ${styles.grid}`}>
        <motion.div
          className={styles.copy}
          style={reduceMotion ? undefined : { y: copyY }}
        >
          <p className="nm-eyebrow">
            <span className="nm-tiny-mark" />
            INDEPENDENT DIGITAL STUDIO
          </p>

          <h1 className={styles.wordmark} aria-label="Nauka Motion">
            <span className={styles.nauka}>NAUKA</span>
            <motion.span
              className={styles.motionWord}
              style={reduceMotion ? undefined : { letterSpacing: wordSpacing }}
              aria-hidden="true"
            >
              {Array.from("MOTION").map((letter, index) => (
                <KineticLetter
                  key={`${letter}-${index}`}
                  x={smoothX}
                  y={smoothY}
                  depth={2.5 + index * 1.25}
                  disabled={reduceMotion}
                >
                  {letter}
                </KineticLetter>
              ))}
            </motion.span>
          </h1>

          <p className={styles.kicker}>SMALL MOVEMENT. REAL IMPACT.</p>
          <p className={styles.description}>
            {id
              ? "Website dan aplikasi yang dirancang dengan detail, dibangun untuk bisnis nyata, dan dibuat terasa hidup tanpa mengorbankan kecepatan."
              : "Websites and apps designed with care, built for real businesses, and made to feel alive without sacrificing speed."}
          </p>

          <div className={styles.actions}>
            <Link className="nm-button" href="/contact">
              {id ? "Diskusikan ide Anda" : "Let's discuss your idea"}
            </Link>
            <Link className="nm-button nm-button-ghost" href="#karya">
              {id ? "Lihat karya" : "Explore the work"}
            </Link>
          </div>

          <div className={styles.reassurance}>
            <span>
              <Check size={15} />
              {id ? "Motion ringan" : "Lightweight motion"}
            </span>
            <span>
              <Check size={15} />
              {id ? "Mobile tetap cepat" : "Fast on mobile"}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={styles.showcase}
          style={
            reduceMotion
              ? undefined
              : { y: showcaseY, scale: showcaseScale }
          }
          aria-label={id ? "Preview karya Nauka Motion" : "Nauka Motion project previews"}
        >
          <div className={styles.gridLines} aria-hidden="true" />
          <div className={styles.showcaseMeta}>
            <span>DESIGN / BUILD / MOTION</span>
            <span>NAUKA / 2026</span>
          </div>

          <motion.div
            className={styles.browser}
            style={
              reduceMotion
                ? undefined
                : { x: browserX, y: browserY, rotate: -4.2 }
            }
          >
            <div className={styles.browserBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>JAECOO MAM Fatmawati</span>
              <Layers3 size={13} />
            </div>
            <div className={styles.browserImage}>
              <Image
                src="/showcase/jaecoo-fatmawati.webp"
                alt={
                  id
                    ? "Tampilan website JAECOO MAM Fatmawati"
                    : "JAECOO MAM Fatmawati website preview"
                }
                fill
                sizes="(max-width: 767px) 90vw, 43vw"
                priority
              />
            </div>
            <div className={styles.browserCaption}>
              <span>WEB EXPERIENCE</span>
              <span>{id ? "DESAIN + PENGEMBANGAN" : "DESIGN + DEVELOPMENT"}</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.phone}
            style={
              reduceMotion
                ? undefined
                : { x: phoneX, y: phoneY, rotate: 6 }
            }
          >
            <Image
              src="/showcase/nacash-household.webp"
              alt={id ? "Tampilan NaCash Household" : "NaCash Household preview"}
              width={739}
              height={1536}
              sizes="(max-width: 767px) 27vw, 14vw"
              priority
            />
            <span>NaCash Household</span>
          </motion.div>

          <div className={styles.orbitNote}>
            <span className={styles.orbitDot} aria-hidden="true" />
            <span>{id ? "GERAK KECIL / FOKUS BESAR" : "SMALL MOTION / CLEAR FOCUS"}</span>
          </div>
        </motion.div>
      </div>

      <div className={`nm-container ${styles.baseline}`}>
        <span>{id ? "Motion yang punya tujuan." : "Motion with a purpose."}</span>
        <span>{id ? "RINGAN / RESPONSIF / TERARAH" : "LIGHT / RESPONSIVE / INTENTIONAL"}</span>
      </div>
    </section>
  );
}
