import { Check } from "lucide-react";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { ProjectIntake } from "@/components/studio/ProjectIntake";
import { getLocale } from "@/lib/server-locale";
import { studioContact, whatsappUrl } from "@/lib/studio-offering";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const [locale, query] = await Promise.all([getLocale(), searchParams]);
  const id = locale === "id";
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <div className="nm-container nm-contact-grid">
          <div className="nm-contact-info">
            <p className="nm-eyebrow">
              NAUKA MOTION / {id ? "MULAI PROYEK" : "START A PROJECT"}
            </p>
            <h1>
              {id ? (
                <>
                  Langkah pertama?
                  <br />
                  <span>Ceritakan idenya.</span>
                </>
              ) : (
                <>
                  The first step?
                  <br />
                  <span>Tell us your idea.</span>
                </>
              )}
            </h1>
            <p>
              {id
                ? "Anda tidak perlu datang dengan spesifikasi lengkap. Ceritakan bisnis, tujuan, dan kendalanya. Kita cari bentuk produk yang sesuai."
                : "You don't need a complete specification. Tell us about your business, goals, and challenges. We will find the right shape for your product."}
            </p>
            <div className="nm-contact-direct">
              <a
                className="nm-button nm-button-ghost"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {id ? "Ngobrol via WhatsApp" : "Chat on WhatsApp"}
              </a>
              <a href={`mailto:${studioContact.email}`}>
                {studioContact.email}
              </a>
            </div>
            <ul className="nm-check-list">
              <li>
                <Check size={17} />
                {id
                  ? "Website, aplikasi Android, dan sistem bisnis"
                  : "Websites, Android apps, and business systems"}
              </li>
              <li>
                <Check size={17} />
                {id
                  ? "Lingkup dan penawaran dibahas sebelum mulai"
                  : "Scope and proposal discussed before starting"}
              </li>
              <li>
                <Check size={17} />
                {id
                  ? "Jakarta, Indonesia · Kolaborasi remote"
                  : "Jakarta, Indonesia · Remote collaboration"}
              </li>
            </ul>
          </div>
          <ProjectIntake locale={locale} initialService={query.service} />
        </div>
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
