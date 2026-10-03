import { Suspense } from "react";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import {
  HomeHero,
  ServiceSection,
  WorkSection,
  TrustSection,
  ProcessSection,
  FaqSection,
  ProjectCTA,
} from "@/components/studio/MarketingSections";
import { getFeaturedProjects } from "@/lib/cms";
import { getLocale } from "@/lib/server-locale";
import { studioContact } from "@/lib/studio-offering";

export const revalidate = 60;

async function FeaturedWork({ locale }: { locale: "id" | "en" }) {
  const projects = await getFeaturedProjects();
  return <WorkSection locale={locale} projects={projects} />;
}

export default async function HomePage() {
  const locale = await getLocale();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nauka Motion",
    url: "https://motion.nauka.id",
    description:
      "Jasa pembuatan website, aplikasi Android, dan sistem bisnis oleh Nauka Motion.",
    email: studioContact.email,
    telephone: `+${studioContact.phone}`,
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsAbout: [
      "Website development",
      "Android applications",
      "Business systems",
      "UI/UX design",
    ],
    sameAs: [studioContact.instagram],
  };

  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <HomeHero locale={locale} />
        <ServiceSection locale={locale} />
        <Suspense
          fallback={
            <section
              className="nm-section"
              aria-busy="true"
              aria-label={locale === "id" ? "Memuat karya" : "Loading work"}
            >
              <div className="nm-container" style={{ minHeight: 640 }} />
            </section>
          }
        >
          <FeaturedWork locale={locale} />
        </Suspense>
        <TrustSection locale={locale} />
        <ProcessSection locale={locale} />
        <FaqSection locale={locale} />
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
