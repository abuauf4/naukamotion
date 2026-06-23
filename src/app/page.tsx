import { Header } from '@/components/nauka/Header';
import { HeroSection } from '@/components/nauka/HeroSection';
import { CapabilityPillarsSection } from '@/components/nauka/CapabilityPillarsSection';
import { FeaturedProjectsSection } from '@/components/nauka/FeaturedProjectsSection';
import { ProcessSection } from '@/components/nauka/ProcessSection';
import { CTASection } from '@/components/nauka/CTASection';
import { Footer } from '@/components/nauka/Footer';
import { ScrollProgress } from '@/components/nauka/ScrollProgress';

/**
 * Abu Aufa — Personal Portfolio v2 (Ink & Code concept)
 *
 * Section flow:
 *   Hero (morph ink→code animation)
 *   → Capability Pillars (5 strength categories)
 *   → Featured Work (11 projects grouped by industry)
 *   → Process (5-step workflow)
 *   → Contact CTA
 */

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1 }}>
        <HeroSection />
        <CapabilityPillarsSection />
        <FeaturedProjectsSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
