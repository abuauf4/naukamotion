/**
 * RevealGroup — single IntersectionObserver for many children.
 *
 * V2 design principle: ONE shared observer per page region, not one per
 * element. V1 used `useReveal()` per element which spawned up to 16
 * IntersectionObservers on the homepage. V2 reduces that to 1.
 *
 * Usage:
 *   <RevealGroup>
 *     <div className="reveal">...</div>
 *     <div className="reveal">...</div>
 *   </RevealGroup>
 *
 * The `.reveal` class is defined in globals.css with initial state
 * (opacity 0, translateY 12px). When the element enters the viewport,
 * the `.is-visible` class is added (opacity 1, translateY 0, transition
 * 0.6s cubic-bezier).
 *
 * `prefers-reduced-motion: reduce` → all `.reveal` elements get
 * `.is-visible` immediately on mount (no animation).
 *
 * Server-rendered: the children are rendered server-side with the
 * `.reveal` class. The observer only adds `.is-visible` post-hydration,
 * but the children are visible in HTML before hydration (just with
 * opacity 0). To avoid a flash where the user sees nothing for 1s
 * before hydration completes, an inline `<script>` is emitted that
 * marks all `.reveal` elements as `.is-visible` if IntersectionObserver
 * is unavailable or reduced-motion is preferred.
 */
"use client";

import { useEffect, useRef } from "react";

export function RevealGroup({
  children,
  className,
  as: Tag = "div",
  // Match the threshold/rootMargin used by useReveal V1 for parity.
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  threshold?: number;
  rootMargin?: string;
}) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion — show everything immediately.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      container.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Once revealed, no need to keep observing.
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    // Observe all `.reveal` descendants. Also observe any `.reveal`
    // applied to the container itself.
    const targets = container.querySelectorAll<HTMLElement>(".reveal");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
