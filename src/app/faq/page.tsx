import type { Metadata } from "next";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { FaqSection, ProjectCTA } from "@/components/studio/MarketingSections";
import { getLocale } from "@/lib/server-locale";
export const metadata: Metadata = {
  title: "Pertanyaan tentang Website & Aplikasi",
  description:
    "Jawaban tentang biaya, jadwal, aplikasi offline, pengelolaan konten, dan dukungan proyek Nauka Motion.",
  alternates: { canonical: "/faq" },
};
export default async function FAQPage() {
  const locale = await getLocale();
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <FaqSection locale={locale} full />
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
