"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function MotionSignalSection({ locale }: { locale: "id" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.25 });
  const xOne = useTransform(progress, [0, 1], ["-18%", "8%"]);
  const xTwo = useTransform(progress, [0, 1], ["10%", "-16%"]);
  const rotate = useTransform(progress, [0, 1], [-8, 8]);
  const reverseRotate = useTransform(progress, [0, 1], [8, -8]);
  const scale = useTransform(progress, [0, 0.55, 1], [0.82, 1.08, 0.9]);
  const copy = locale === "en"
    ? { label: "02 — The Nauka signal", small: "One shift can change the whole system.", end: "Built to move." }
    : { label: "02 — Sinyal Nauka", small: "Satu pergeseran bisa mengubah seluruh sistem.", end: "Dibuat untuk bergerak." };

  return (
    <section ref={ref} className="nauka-signal" aria-label={copy.label}>
      <div className="nauka-signal-grid" aria-hidden="true" />
      <div className="nauka-signal-content container-wide">
        <p className="nauka-signal-label">{copy.label}</p>
        <p className="nauka-signal-small">{copy.small}</p>
        <div className="nauka-signal-words" aria-hidden="true">
          <motion.span style={{ x: xOne, rotate, scale }} className="nauka-signal-word nauka-signal-word-a">MOVE</motion.span>
          <motion.span style={{ x: xTwo, scale }} className="nauka-signal-word nauka-signal-word-b">MOTION</motion.span>
          <motion.span style={{ x: xOne, rotate: reverseRotate, scale }} className="nauka-signal-word nauka-signal-word-c">IMPACT</motion.span>
        </div>
        <p className="nauka-signal-end">{copy.end} <span>↘</span></p>
      </div>
    </section>
  );
}
