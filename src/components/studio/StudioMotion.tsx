"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useAnimationControls,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      className="nm-reading-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

export function StudioMotion({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.65, ease: EASE }}
      >
        <ReadingProgress />
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

/** Server content stays visible without JavaScript. Only offscreen elements
 * are prepared for an entrance after hydration; keyboard focus reveals them. */
export function MotionReveal({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const setRef = useCallback((element: HTMLElement | null) => {
    ref.current = element;
  }, []);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  const Element = m[as];

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      reduce ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    controls.set({ opacity: 0, y: 36 });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        void controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: EASE },
        });
        observer.disconnect();
      },
      { rootMargin: "0px 0px -32px 0px", threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [controls, delay, reduce]);

  return (
    <Element
      ref={setRef}
      className={className}
      initial={false}
      animate={controls}
      onFocusCapture={() => {
        void controls.start({ opacity: 1, y: 0, transition: { duration: 0 } });
      }}
    >
      {children}
    </Element>
  );
}

export function MotionPicture({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  return (
    <div className="nm-motion-picture-frame" ref={ref}>
      <m.div className="nm-motion-picture" style={{ y: reduce ? 0 : y }}>
        {children}
      </m.div>
    </div>
  );
}
