import Link from "next/link";
import type { StudioCategory } from "@/lib/cms";

export function StudioSection({ locale }: { locale: "id" | "en" }) {
  const copy = locale === "en"
    ? { label: "03 — Studio", heading: "Digital work with a point of view.", body: "Nauka Motion is an independent studio building websites, digital products, and business systems for people with something worth moving.", contact: "Start a conversation" }
    : { label: "03 — Studio", heading: "Karya digital dengan sudut pandang.", body: "Nauka Motion adalah studio independen yang membangun website, produk digital, dan sistem bisnis untuk mereka yang punya sesuatu yang layak digerakkan.", contact: "Mulai percakapan" };
  const capabilities = locale === "en" ? ["Websites", "Digital products", "Business systems", "Creative development"] : ["Website", "Produk digital", "Sistem bisnis", "Creative development"];

  return (
    <section id="studio" className="nauka-studio-section">
      <div className="container-wide">
        <div className="nauka-section-intro nauka-studio-intro">
          <p className="nauka-section-label">{copy.label}</p>
          <h2>{copy.heading}</h2>
          <p className="nauka-studio-body">{copy.body}</p>
        </div>
        <div className="nauka-capability-list" aria-label="Capabilities">
          {capabilities.map((item, index) => (
            <div className="nauka-capability-row" key={item}>
              <span>0{index + 1}</span><strong>{item}</strong><span aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
        <Link href="/contact" className="nauka-text-link">{copy.contact} <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

export function CategoryIndexSection({ categories, counts, locale }: { categories: StudioCategory[]; counts: Record<string, number>; locale: "id" | "en" }) {
  return (
    <section className="nauka-category-section">
      <div className="container-wide">
        <div className="nauka-section-intro nauka-category-heading">
          <p className="nauka-section-label">04 — {locale === "en" ? "Fields of work" : "Bidang kerja"}</p>
          <h2>{locale === "en" ? "Different problems. Same attention." : "Masalah berbeda. Perhatian yang sama."}</h2>
        </div>
        <div className="nauka-category-list">
          {categories.map((category) => (
            <Link href={`/work/${category.slug}`} className="nauka-category-row" key={category.slug} style={{ "--category-accent": category.accent } as React.CSSProperties}>
              <span>{category.index}</span><strong>{category.title}</strong><em>{counts[category.slug] ?? 0} {locale === "en" ? "projects" : "karya"}</em><span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ locale }: { locale: "id" | "en" }) {
  return (
    <section id="kontak" className="nauka-contact-section">
      <div className="container-wide">
        <p className="nauka-section-label">05 — {locale === "en" ? "Contact" : "Kontak"}</p>
        <h2>{locale === "en" ? "Have something worth moving?" : "Punya sesuatu yang layak digerakkan?"}</h2>
        <Link href="/contact" className="nauka-contact-link">{locale === "en" ? "Start a project" : "Mulai proyek"} <span aria-hidden="true">↘</span></Link>
      </div>
    </section>
  );
}
