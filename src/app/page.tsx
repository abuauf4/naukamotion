import { Header } from "@/components/nauka-v2/Header";
import { Hero } from "@/components/nauka-v2/Hero";
import { FeaturedWorkSection } from "@/components/nauka-v2/FeaturedWorkSection";
import { MotionSignalSection } from "@/components/nauka-v2/MotionSignalSection";
import {
  CategoryIndexSection,
  ContactSection,
  StudioSection,
} from "@/components/nauka-v2/StudioSections";
import { Footer } from "@/components/nauka-v2/Footer";
import { RevealGroup } from "@/components/nauka-v2/RevealGroup";
import {
  getCategories,
  getFeaturedProjects,
  getPublicProjectCountsByCategory,
} from "@/lib/cms";
import { getLocale, type Locale } from "@/lib/server-locale";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, projectCounts, featuredProjects] = await Promise.all([
    getCategories(),
    getPublicProjectCountsByCategory(),
    getFeaturedProjects(),
  ]);
  const locale: Locale = await getLocale();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <Header locale={locale} />
      <main style={{ flex: 1 }}>
        <RevealGroup>
          <Hero locale={locale} />
          <FeaturedWorkSection projects={featuredProjects} locale={locale} />
          <MotionSignalSection locale={locale} />
          <StudioSection locale={locale} />
          <CategoryIndexSection categories={categories} counts={projectCounts} locale={locale} />
          <ContactSection locale={locale} />
        </RevealGroup>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
