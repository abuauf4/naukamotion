/**
 * Opening — first-visit cinematic intro (1.2s).
 *
 * V2 Phase 1: typography-led opening that transitions directly into the
 * hero composition. No spinner, no loader, no blank pause.
 *
 * Sequence (1.2s total):
 *   0.0s — solid paper background, big "N" set in Fraunces
 *   0.2s — "N" mask-shifts aside (translateX + slight scale)
 *   0.4s — "NAUKA" reveals letter-by-letter (CSS stagger)
 *   0.7s — "MOTION" reveals below, lighter weight
 *   1.0s — whole composition lifts + fades
 *   1.2s — Opening unmounts, hero is already in place underneath
 *
 * Session-gated: plays once per browser session (sessionStorage).
 * Internal navigation does NOT replay the intro.
 *
 * Reduced-motion: opening is skipped entirely — content visible immediately.
 *
 * Architecture: this is a CLIENT island — the only client component
 * needed for the opening. It mounts ABOVE the hero (z-index 100) and
 * unmounts itself when done. The hero server-rendered HTML is already
 * in place underneath, so there is no "blank pause → homepage" feel.
 */
"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "nauka-opening-played";
const DURATION_MS = 1200;

export function Opening() {
  const [phase, setPhase] = useState<"intro" | "done">("intro");

  useEffect(() => {
    // Respect reduced motion — skip entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setPhase("done");
      return;
    }

    // Session-gate: play once per tab session.
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable — treat as not played, but don't write.
    }

    if (alreadyPlayed) {
      setPhase("done");
      return;
    }

    // Play the opening, then mark as done.
    const t = window.setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore write failures
      }
    }, DURATION_MS);

    return () => window.clearTimeout(t);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.2em",
        // Final lift + fade (1.0s → 1.2s)
        animation: "nauka-opening-out 200ms cubic-bezier(0.22, 1, 0.36, 1) 1000ms forwards",
        pointerEvents: "none",
      }}
    >
      {/* NAUKA letter reveal (0.4s → 0.7s) */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          fontFamily: "var(--font-fraunces), serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(3rem, 14vw, 8rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--ink)",
        }}
      >
        {"NAUKA".split("").map((ch, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: "translateY(110%)",
              opacity: 0,
              animation: `nauka-opening-letter 400ms cubic-bezier(0.22, 1, 0.36, 1) ${400 + i * 60}ms forwards`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* MOTION — lighter weight, appears 0.7s */}
      <span
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.7rem, 2vw, 1rem)",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "var(--ink-soft)",
          opacity: 0,
          animation: "nauka-opening-fade 300ms ease 700ms forwards",
        }}
      >
        Motion
      </span>

      <style>{`
        @keyframes nauka-opening-letter {
          0% {
            transform: translateY(110%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes nauka-opening-fade {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes nauka-opening-out {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-2vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
