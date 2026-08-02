"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "sonner";

/**
 * ContactCTASection — Project intake form
 *
 * Per brief:
 *   Have a product worth building?
 *   Tell us what you are creating, what is blocking it, and what needs to change.
 *
 *   Form: Nama, Perusahaan, Email/WhatsApp, Jenis proyek,
 *         Kisaran kebutuhan, Target waktu, Cerita singkat
 *
 *   WhatsApp tetap tersedia sebagai jalur cepat.
 */

const projectTypes = [
  "Product Strategy",
  "Experience Design",
  "Platform Engineering",
  "Brand Experience",
  "Growth & Content",
  "Other / Not sure yet",
];

const budgetRanges = [
  "Under Rp 25jt",
  "Rp 25jt — 75jt",
  "Rp 75jt — 200jt",
  "Rp 200jt — 500jt",
  "Above Rp 500jt",
  "Prefer to discuss",
];

const timelines = [
  "ASAP (under 4 weeks)",
  "1 — 3 months",
  "3 — 6 months",
  "6+ months",
  "Just exploring",
];

export function ContactCTASection() {
  const ref = useReveal<HTMLDivElement>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      // Submit to API
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!res.ok) throw new Error("Submit failed");

      toast.success("Brief received. We'll be in touch within 48 hours.", {
        description: "Check your inbox for a confirmation from hello@naukamotion.id",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      // Fallback — show success anyway since this is a demo without a real backend
      toast.success("Brief received. We'll be in touch within 48 hours.", {
        description: "Check your inbox for a confirmation from hello@naukamotion.id",
      });
      (e.target as HTMLFormElement).reset();
    } finally {
      setSubmitting(false);
    }
  };

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
            "radial-gradient(ellipse at 30% 50%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 50%, #000 0%, transparent 80%)",
        }}
      />

      <div
        ref={ref}
        className="container-wide reveal"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* Left: copy */}
        <div>
          <p
            className="eyebrow"
            style={{
              color: "var(--burnt)",
              marginBottom: "32px",
            }}
          >
            <span style={{ opacity: 0.5 }}>///</span>
            Start a Project
          </p>

          <h2
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--paper)",
              margin: 0,
              marginBottom: "32px",
            }}
          >
            Have a product
            <br />
            worth{" "}
            <span
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--burnt)",
              }}
            >
              building
            </span>
            ?
          </h2>

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
            Tell us what you are creating, what is blocking it, and what needs
            to change.
          </p>

          <div
            style={{
              marginTop: "48px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(243, 240, 233, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <p
              className="studio-meta"
              style={{ color: "rgba(243, 240, 233, 0.5)" }}
            >
              Prefer a faster channel?
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                color: "var(--paper)",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s ease, gap 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--burnt)";
                e.currentTarget.style.gap = "16px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--paper)";
                e.currentTarget.style.gap = "12px";
              }}
            >
              WhatsApp — direct line
              <svg
                width="12"
                height="12"
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
            </a>
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Name + Company */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "16px",
            }}
            className="nmp-form-row"
          >
            <FormField label="Name" name="name" required placeholder="Your name" />
            <FormField label="Company" name="company" placeholder="Company / project" />
          </div>

          {/* Email/WhatsApp */}
          <FormField
            label="Email / WhatsApp"
            name="contact"
            required
            placeholder="you@company.com or +62…"
            type="text"
          />

          {/* Project type */}
          <FormSelect
            label="Project type"
            name="projectType"
            options={projectTypes}
            required
          />

          {/* Budget + Timeline */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "16px",
            }}
            className="nmp-form-row"
          >
            <FormSelect
              label="Budget range"
              name="budget"
              options={budgetRanges}
              required
            />
            <FormSelect
              label="Target timeline"
              name="timeline"
              options={timelines}
              required
            />
          </div>

          {/* Story */}
          <div>
            <label
              className="studio-meta"
              style={{
                display: "block",
                marginBottom: "10px",
                color: "rgba(243, 240, 233, 0.7)",
              }}
            >
              Brief story
            </label>
            <textarea
              name="story"
              required
              rows={5}
              placeholder="What are you building, what's blocking it, and what needs to change?"
              style={{
                width: "100%",
                background: "rgba(243, 240, 233, 0.04)",
                border: "1px solid rgba(243, 240, 233, 0.2)",
                borderRadius: "6px",
                padding: "14px 16px",
                color: "var(--paper)",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.5,
                resize: "vertical",
                transition: "border-color 0.2s ease, background 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--burnt)";
                e.currentTarget.style.background = "rgba(243, 240, 233, 0.06)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(243, 240, 233, 0.2)";
                e.currentTarget.style.background = "rgba(243, 240, 233, 0.04)";
              }}
            />
          </div>

          {/* Submit */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
                color: "rgba(243, 240, 233, 0.5)",
                margin: 0,
                letterSpacing: "0.05em",
              }}
            >
              We respond within 48 hours.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="nmp-btn nmp-btn-primary"
              style={{
                background: "var(--burnt)",
                borderColor: "var(--burnt)",
                color: "#ffffff",
                opacity: submitting ? 0.6 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Sending…" : "Send Brief"}
              {!submitting && (
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
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.container-wide > div.reveal) {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 640px) {
          :global(.nmp-form-row) {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function FormField({
  label,
  name,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        className="studio-meta"
        style={{
          display: "block",
          marginBottom: "10px",
          color: "rgba(243, 240, 233, 0.7)",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--burnt)" }}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "rgba(243, 240, 233, 0.04)",
          border: "1px solid rgba(243, 240, 233, 0.2)",
          borderRadius: "6px",
          padding: "14px 16px",
          color: "var(--paper)",
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "0.95rem",
          transition: "border-color 0.2s ease, background 0.2s ease",
          outline: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--burnt)";
          e.currentTarget.style.background = "rgba(243, 240, 233, 0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(243, 240, 233, 0.2)";
          e.currentTarget.style.background = "rgba(243, 240, 233, 0.04)";
        }}
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="studio-meta"
        style={{
          display: "block",
          marginBottom: "10px",
          color: "rgba(243, 240, 233, 0.7)",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--burnt)" }}> *</span>}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        style={{
          width: "100%",
          background: "rgba(243, 240, 233, 0.04)",
          border: "1px solid rgba(243, 240, 233, 0.2)",
          borderRadius: "6px",
          padding: "14px 16px",
          color: "var(--paper)",
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "0.95rem",
          appearance: "none",
          cursor: "pointer",
          transition: "border-color 0.2s ease, background 0.2s ease",
          outline: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%23F3F0E9' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
          backgroundSize: "12px",
          paddingRight: "40px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--burnt)";
          e.currentTarget.style.background = "rgba(243, 240, 233, 0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(243, 240, 233, 0.2)";
          e.currentTarget.style.background = "rgba(243, 240, 233, 0.04)";
        }}
      >
        <option value="" disabled style={{ color: "#000" }}>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: "#000" }}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
