"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { whatsappUrl } from "@/lib/studio-offering";
import type { Locale } from "@/lib/server-locale";

const services = [
  {
    value: "website",
    id: "Website & landing page",
    en: "Website & landing page",
  },
  { value: "android", id: "Aplikasi Android", en: "Android application" },
  {
    value: "system",
    id: "Sistem bisnis / web app",
    en: "Business system / web app",
  },
  {
    value: "other",
    id: "Belum yakin, diskusikan dulu",
    en: "Not sure yet, let's discuss",
  },
];

export function ProjectIntake({
  locale,
  initialService = "",
}: {
  locale: Locale;
  initialService?: string;
}) {
  const id = locale === "id";
  const emptyForm = {
    name: "",
    contact: "",
    phone: "",
    projectType: services.some((s) => s.value === initialService)
      ? initialService
      : "",
    budget: "",
    timeline: "",
    story: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  const serviceName =
    services.find((s) => s.value === form.projectType)?.[locale] ??
    (id ? "Website atau aplikasi" : "Website or application");
  const brief = [
    id
      ? "Halo Nauka Motion, saya ingin diskusi proyek."
      : "Hello Nauka Motion, I would like to discuss a project.",
    form.name && `Nama / Name: ${form.name}`,
    form.contact && `Email: ${form.contact}`,
    form.phone && `WhatsApp: ${form.phone}`,
    `Proyek / Project: ${serviceName}`,
    form.budget && `Budget: ${form.budget}`,
    form.timeline && `Timeline: ${form.timeline}`,
    form.story && `\n${form.story}`,
  ]
    .filter(Boolean)
    .join("\n");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectType: serviceName }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.ok !== true)
        throw new Error(
          res.status === 400
            ? id
              ? "Periksa email dan isi brief minimal 20 karakter."
              : "Check your email and enter a brief of at least 20 characters."
            : id
              ? "Brief belum tersimpan. Coba lagi atau lanjutkan brief ke WhatsApp di bawah."
              : "Your brief has not been saved. Try again or continue it on WhatsApp below.",
        );
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "AbortError"
          ? err.message
          : id
            ? "Koneksi terputus. Coba lagi atau lanjutkan melalui WhatsApp."
            : "The connection was interrupted. Try again or continue on WhatsApp.",
      );
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  if (submitted)
    return (
      <div className="nm-contact-form nm-form-success" role="status">
        <CheckCircle2 size={40} strokeWidth={1.5} />
        <h2>{id ? "Brief Anda tersimpan." : "Your brief is saved."}</h2>
        <p>
          {id
            ? "Terima kasih sudah menceritakan kebutuhan Anda. Anda juga bisa melanjutkan percakapan melalui WhatsApp dengan brief yang sama."
            : "Thank you for sharing your project needs. You can also continue the conversation on WhatsApp with the same brief."}
        </p>
        <a
          className="nm-button"
          href={whatsappUrl(brief)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {id ? "Lanjutkan di WhatsApp" : "Continue on WhatsApp"}
        </a>
        <button
          type="button"
          className="nm-form-reset"
          onClick={() => {
            setSubmitted(false);
            setForm(emptyForm);
          }}
        >
          {id ? "Kirim brief lain" : "Send another brief"}
        </button>
      </div>
    );

  return (
    <form className="nm-contact-form" onSubmit={submit} aria-busy={submitting}>
      <h2>{id ? "Ceritakan proyek Anda." : "Tell us about your project."}</h2>
      <p className="nm-form-intro">
        {id
          ? "Isi singkat saja. Detailnya kita diskusikan bersama."
          : "Keep it brief. We will work through the details together."}
      </p>
      <div className="nm-form-fields">
        <div className="nm-field">
          <label htmlFor="name">{id ? "Nama" : "Name"} *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            minLength={2}
            maxLength={100}
            placeholder={id ? "Nama Anda" : "Your name"}
          />
        </div>
        <div className="nm-field">
          <label htmlFor="contact">Email *</label>
          <input
            id="contact"
            name="contact"
            type="email"
            autoComplete="email"
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            required
            maxLength={254}
            placeholder="nama@bisnis.com"
          />
        </div>
        <div className="nm-field">
          <label htmlFor="phone">
            WhatsApp <span>({id ? "opsional" : "optional"})</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            maxLength={30}
            placeholder="08…"
          />
        </div>
        <div className="nm-field">
          <label htmlFor="projectType">
            {id ? "Yang ingin dibuat" : "What would you like to build"} *
          </label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            required
          >
            <option value="">
              {id ? "Pilih kebutuhan" : "Select a service"}
            </option>
            {services.map((s) => (
              <option value={s.value} key={s.value}>
                {s[locale]}
              </option>
            ))}
          </select>
        </div>
        <div className="nm-field">
          <label htmlFor="budget">
            {id ? "Anggaran" : "Budget"}{" "}
            <span>({id ? "opsional" : "optional"})</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">{id ? "Diskusikan dulu" : "Let's discuss"}</option>
            {[
              id ? "Di bawah Rp 3 juta" : "Below IDR 3 million",
              "Rp 3–10 juta",
              "Rp 10–25 juta",
              id ? "Di atas Rp 25 juta" : "Above IDR 25 million",
            ].map((b) => (
              <option value={b} key={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="nm-field">
          <label htmlFor="timeline">
            {id ? "Target selesai" : "Target timeline"}{" "}
            <span>({id ? "opsional" : "optional"})</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
          >
            <option value="">
              {id ? "Fleksibel / belum ditentukan" : "Flexible / not decided"}
            </option>
            {(id
              ? ["Dalam 1 bulan", "1–3 bulan", "Lebih dari 3 bulan"]
              : ["Within 1 month", "1–3 months", "More than 3 months"]
            ).map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="nm-field nm-field-wide">
          <label htmlFor="story">
            {id ? "Kebutuhan atau ide Anda" : "Your needs or idea"} *
          </label>
          <textarea
            id="story"
            name="story"
            value={form.story}
            onChange={(e) => update("story", e.target.value)}
            required
            minLength={20}
            maxLength={6000}
            rows={5}
            placeholder={
              id
                ? "Bisnis Anda bergerak di bidang apa? Apa yang ingin dibantu? Fitur apa yang Anda butuhkan?"
                : "What does your business do? What problem would you like to solve? What features do you need?"
            }
          />
        </div>
      </div>
      {error && (
        <p role="alert" className="nm-form-message">
          {error}
        </p>
      )}
      <div className="nm-form-footer">
        <button type="submit" className="nm-button" disabled={submitting}>
          {submitting
            ? id
              ? "Menyimpan brief…"
              : "Saving your brief…"
            : id
              ? "Kirim brief proyek"
              : "Send project brief"}
        </button>
        <p>
          {id
            ? "Data ini digunakan untuk menindaklanjuti kebutuhan proyek Anda. "
            : "These details are used to follow up on your project needs. "}
          <Link href="/legal/privacy">
            {id ? "Kebijakan privasi" : "Privacy policy"}
          </Link>
        </p>
        <a href={whatsappUrl(brief)} target="_blank" rel="noopener noreferrer">
          {id
            ? "Atau lanjutkan brief ini ke WhatsApp"
            : "Or continue this brief on WhatsApp"}
        </a>
      </div>
      <noscript>
        <p className="nm-no-js-note">
          JavaScript diperlukan untuk mengirim form. Hubungi kami melalui tautan
          WhatsApp di halaman ini.
        </p>
      </noscript>
    </form>
  );
}
