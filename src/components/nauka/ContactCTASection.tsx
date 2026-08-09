"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { useLocale } from "@/lib/locale-context";

/**
 * ContactCTASection — Homepage CTA section.
 *
 * Simple section that directs users to /contact for the full form.
 * No duplicate form here — /contact page is the single source for
 * project intake.
 *
 * Alternates: WhatsApp direct line for quick contact.
 */

const COPY = {
  id: {
    eyebrow: "Mulai Proyek",
    heading1: "Punya proyek yang",
    headingAccent: "layak",
    heading2: "dibangun?",
    sub: "Ceritakan proyek atau ide Anda — kami siap mendengarkan dan membantu mewujudkannya.",
    ctaForm: "Kirim Brief",
    ctaWhatsApp: "WhatsApp Langsung",
    whatsappDesc: "Respon cepat di hari kerja",
    responseTime: "Kami merespons dalam 1-2 hari kerja.",
  },
  en: {
    eyebrow: "Start a Project",
    heading1: "Have a project",
    headingAccent: "worth",
    heading2: "building?",
    sub: "Tell us about your project or idea — we're ready to listen and help make it happen.",
    ctaForm: "Send Brief",
    ctaWhatsApp: "WhatsApp Direct",
    whatsappDesc: "Quick response on business days",
    responseTime: "We respond within 1-2 business days.",
  },
};

export function ContactCTASection() {
  const ref = useReveal<HTMLDivElement>();
  const { locale } = useLocale();
  const t = COPY[locale];

  return (
    <section
      id="contact"
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        background: "var(--ink)",
        color: "var(--paper)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(243, 240, 233, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 240, 233, 0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, #000 0%, transparent 80%)",
        }}
      />

      <div
        ref={ref}
        className="container-wide reveal"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "32px",
        }}
      >
        {/* Eyebrow */}
        <p
          className="eyebrow"
          style={{
            color: "var(--burnt)",
            marginBottom: "0",
          }}
        >
          <span style={{ opacity: 0.5 }}>///</span>
          {t.eyebrow}
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--paper)",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          {t.heading1}{" "}
          <span
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--burnt)",
            }}
          >
            {t.headingAccent}
          </span>{" "}
          {t.heading2}
        </h2>

        {/* Sub */}
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "1.15rem",
            color: "rgba(243, 240, 233, 0.7)",
            lineHeight: 1.55,
            margin: 0,
            maxWidth: "44ch",
          }}
        >
          {t.sub}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Link
            href="/contact"
            className="nmp-btn nmp-btn-primary"
            style={{
              background: "var(--burnt)",
              borderColor: "var(--burnt)",
              color: "#ffffff",
            }}
          >
            {t.ctaForm}
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="https://wa.me/6289662524524"
            target="_blank"
            rel="noopener noreferrer"
            className="nmp-btn nmp-btn-ghost"
            style={{
              color: "var(--paper)",
              borderColor: "rgba(243, 240, 233, 0.3)",
            }}
          >
            {t.ctaWhatsApp}
          </a>
        </div>

        {/* Response time note */}
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.78rem",
            color: "rgba(243, 240, 233, 0.4)",
            letterSpacing: "0.06em",
            margin: 0,
            marginTop: "8px",
          }}
        >
          {t.responseTime}
        </p>
      </div>
    </section>
  );
}
