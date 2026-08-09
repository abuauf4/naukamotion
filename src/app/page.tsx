import { Header } from "@/components/nauka/Header";
import { HeroSection } from "@/components/nauka/HeroSection";
import { StatsSection } from "@/components/nauka/StatsSection";
import { CategorySection } from "@/components/nauka/CategorySection";
import { CapabilitiesSection } from "@/components/nauka/CapabilitiesSection";
import { ProcessSection } from "@/components/nauka/ProcessSection";
import { FounderSection } from "@/components/nauka/FounderSection";
import { ContactCTASection } from "@/components/nauka/ContactCTASection";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

// CMS source selector — default is 'static' (studio-data.ts)
// Set CMS_DATA_SOURCE=database to read from Neon
import { getCategories, getProjectsByCategory } from "@/lib/cms";
import type { CategorySlug } from "@/lib/studio-data";

/**
 * Nauka Motion — Homepage (v2)
 *
 * Server component fetches portfolio data from CMS source selector,
 * passes serializable props to client components.
 */
export default async function HomePage() {
  // Fetch categories from CMS (static or database depending on CMS_DATA_SOURCE)
  const categories = await getCategories();

  // Fetch project counts per category
  const projectCounts: Record<string, number> = {};
  for (const cat of categories) {
    const projects = await getProjectsByCategory(cat.slug as CategorySlug);
    projectCounts[cat.slug] = projects.length;
  }

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

      <main style={{ flex: 1, paddingTop: "0" }}>
        <HeroSection />
        <StatsSection />
        <CategorySection
          categories={categories}
          projectCounts={projectCounts}
        />
        <CapabilitiesSection />
        <ProcessSection />
        <FounderSection />
        <ContactCTASection />
      </main>

      <Footer />
    </div>
  );
}
