import { Suspense } from "react";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { MotionHomeHero } from "@/components/studio/MotionHomeHero";
import {
  ServiceSection,
  WorkSection,
  TrustSection,
  ProcessSection,
  FaqSection,
  ProjectCTA,
} from "@/components/studio/MarketingSections";
import { getFeaturedProjects } from "@/lib/cms";
import { getLocale } from "@/lib/server-locale";
import { StructuredData } from "@/components/studio/StructuredData";
import { SITE_URL, ORGANIZATION_ID } from "@/lib/seo";
import { studioOrganization } from "@/lib/studio-schema";

export const revalidate = 60;

async function FeaturedWork({ locale }: { locale: "id" | "en" }) {
  const projects = await getFeaturedProjects();
  return <WorkSection locale={locale} projects={projects} />;
}

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@graph": [
              studioOrganization(),
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: "Nauka Motion",
                url: `${SITE_URL}/`,
                publisher: { "@id": ORGANIZATION_ID },
                inLanguage: locale === "id" ? "id-ID" : "en",
              },
            ],
          }}
        />
        <MotionHomeHero locale={locale} />
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
