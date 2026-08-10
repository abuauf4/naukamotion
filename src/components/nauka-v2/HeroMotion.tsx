/**
 * HeroMotion — minimal client island.
 *
 * V2.1 design: the entrance animation is PURE CSS keyframes (defined in
 * globals.css). This component does NOT drive the animation. Its only
 * job is to set the sessionStorage flag after mount, so that internal
 * navigation skips the animation on subsequent visits.
 *
 * The `is-skipped` class itself is added by an inline script in
 * layout.tsx BEFORE first paint — so there is no flash of the intro
 * state on internal navigation. This component just ensures the flag
 * is written so the next navigation triggers the skip.
 *
 * On first visit:
 *   1. Layout script checks sessionStorage → empty → no is-skipped class
 *   2. Browser paints → CSS animation plays (letters reveal in sequence)
 *   3. React hydrates → HeroMotion mounts → useEffect sets sessionStorage flag
 *   4. Animation completes (~1.2s total)
 *
 * On internal navigation (e.g. /work → /):
 *   1. Layout script checks sessionStorage → has flag → adds is-skipped class
 *   2. CSS disables animation, content visible immediately
 *   3. HeroMotion mounts → re-sets the flag (already set, no-op)
 *
 * Reduced-motion: CSS @media (prefers-reduced-motion: reduce) disables
 * all entrance animations regardless of is-skipped class.
 */
"use client";

import { useEffect, type ReactNode } from "react";

export function HeroMotion({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Mark the hero animation as "played" so the next page load in this
    // tab session adds the is-skipped class via the layout bootstrap script.
    try {
      sessionStorage.setItem("nauka-hero-played", "1");
    } catch {
      // sessionStorage unavailable (e.g. private mode) — animation will
      // replay on every navigation. Acceptable degradation.
    }
  }, []);

  return <>{children}</>;
}
