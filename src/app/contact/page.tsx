"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

const projectTypes = [
  "Website Development",
  "Web Application",
  "Business System",
  "E-Commerce & Catalog",
  "UI/UX & Product Design",
  "SEO & Digital Growth",
  "Lainnya / Belum yakin",
];

const budgetRanges = [
  "Rp 5 – 15 Juta",
  "Rp 15 – 30 Juta",
  "Rp 30 – 50 Juta",
  "Rp 50 – 100 Juta",
  "Rp 100 Juta+",
  "Belum ditentukan",
];

const timelines = [
  "ASAP (under 4 weeks)",
  "1 – 3 months",
  "3 – 6 months",
  "Belum pasti",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    projectType: "",
    budget: "",
    timeline: "",
    story: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: string) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || "Failed to submit");
        }

        setIsSubmitted(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const handleReset = useCallback(() => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      contact: "",
      projectType: "",
      budget: "",
      timeline: "",
      story: "",
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1, paddingTop: "120px" }} id="contact">
        {/* Hero */}
        <section style={{ paddingBottom: "60px" }}>
          <div className="container-wide">
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Kontak
            </p>
            <h1
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "32px",
                maxWidth: "16ch",
              }}
            >
              Mulai{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                proyek
              </span>{" "}
              bersama kami
            </h1>
            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              Ceritakan proyek atau ide Anda — kami siap mendengarkan dan
              membantu mewujudkannya.
            </p>
          </div>
        </section>

        {/* Contact methods + form */}
        <section style={{ paddingBottom: "120px" }}>
          <div className="container-wide">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
                gap: "60px",
                alignItems: "start",
              }}
              className="nmp-contact-grid"
            >
              {/* Contact methods */}
              <aside
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <ContactMethod
                  label="WhatsApp"
                  value="0896 6252 4542"
                  href="https://wa.me/6289662524542"
                  description="Respon cepat di hari kerja"
                />
                <ContactMethod
                  label="Email"
                  value="naukamotion@gmail.com"
                  href="mailto:naukamotion@gmail.com"
                  description="Detail proyek dalam satu email"
                />
                <ContactMethod
                  label="Lokasi"
                  value="Jakarta, Indonesia"
                  href={null}
                  description="Bisa meeting online atau tatap muka"
                />
              </aside>

              {/* Form */}
              <div
                style={{
                  padding: "40px clamp(24px, 3vw, 40px)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                }}
              >
                {isSubmitted ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                      textAlign: "center",
                      padding: "40px 0",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "999px",
                        background: "var(--burnt)",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
                          fontWeight: 500,
                          fontSize: "1.5rem",
                          color: "var(--ink)",
                          margin: 0,
                          marginBottom: "8px",
                        }}
                      >
                        Brief Anda telah diterima
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
                          fontSize: "0.95rem",
                          color: "var(--ink-soft)",
                          lineHeight: 1.55,
                          margin: 0,
                          maxWidth: "40ch",
                        }}
                      >
                        Kami akan menghubungi Anda dalam 1-2 hari kerja. Untuk
                        respons cepat, hubungi via WhatsApp.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="nmp-btn nmp-btn-ghost"
                      style={{ margin: "0 auto" }}
                    >
                      Kirim brief lain
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <Field label="Nama" required>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange("name")}
                        placeholder="Nama lengkap"
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Email / WhatsApp" required>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={handleChange("contact")}
                        placeholder="email@anda.com atau 08xx"
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Jenis Proyek" required>
                      <select
                        required
                        value={formData.projectType}
                        onChange={handleChange("projectType")}
                        style={inputStyle}
                      >
                        <option value="">Pilih jenis proyek</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "minmax(0, 1fr) minmax(0, 1fr)",
                        gap: "16px",
                      }}
                    >
                      <Field label="Budget">
                        <select
                          value={formData.budget}
                          onChange={handleChange("budget")}
                          style={inputStyle}
                        >
                          <option value="">Pilih range</option>
                          {budgetRanges.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Timeline">
                        <select
                          value={formData.timeline}
                          onChange={handleChange("timeline")}
                          style={inputStyle}
                        >
                          <option value="">Pilih timeline</option>
                          {timelines.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field label="Cerita Singkat" required>
                      <textarea
                        required
                        value={formData.story}
                        onChange={handleChange("story")}
                        placeholder="Ceritakan proyek Anda, tujuan, dan apa yang ingin dicapai."
                        rows={5}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </Field>

                    {error && (
                      <p
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
                          fontSize: "0.9rem",
                          color: "var(--burnt)",
                          margin: 0,
                        }}
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="nmp-btn nmp-btn-primary"
                      style={{
                        opacity: isSubmitting ? 0.6 : 1,
                        cursor: isSubmitting ? "wait" : "pointer",
                      }}
                    >
                      {isSubmitting ? "Mengirim..." : "Kirim Brief"}
                      {!isSubmitting && (
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
                  </form>
                )}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 1024px) {
              .nmp-contact-grid {
                grid-template-columns: minmax(0, 1fr) !important;
                gap: 40px !important;
              }
            }
          `}</style>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  fontFamily: "var(--font-body), sans-serif",
  fontSize: "0.95rem",
  color: "var(--ink)",
  background: "var(--bg)",
  border: "1px solid var(--line-strong)",
  borderRadius: "6px",
  outline: "none",
  transition: "border-color 0.2s ease",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-soft)",
          fontWeight: 500,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--burnt)" }}> *</span>}
      </span>
      {children}
    </label>
  );
}

function ContactMethod({
  label,
  value,
  href,
  description,
}: {
  label: string;
  value: string;
  href: string | null;
  description: string;
}) {
  const content = (
    <>
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          display: "block",
          marginBottom: "8px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "var(--ink)",
          display: "block",
          marginBottom: "6px",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "0.88rem",
          color: "var(--ink-soft)",
          lineHeight: 1.5,
          display: "block",
        }}
      >
        {description}
      </span>
    </>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        display: "block",
        padding: "24px",
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "border-color 0.2s ease, background 0.2s ease",
      }}
      className="nmp-contact-method"
    >
      {content}
    </a>
  ) : (
    <div
      style={{
        padding: "24px",
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
      }}
    >
      {content}
    </div>
  );
}
