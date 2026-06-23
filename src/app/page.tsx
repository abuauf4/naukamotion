import { Header } from '@/components/nauka/Header';
import { HeroSection } from '@/components/nauka/HeroSection';
import { FeaturedProjectsSection } from '@/components/nauka/FeaturedProjectsSection';
import { TechStackSection } from '@/components/nauka/TechStackSection';
import { VenturesSection } from '@/components/nauka/VenturesSection';
import { ArchiveSection } from '@/components/nauka/ArchiveSection';
import { CTASection } from '@/components/nauka/CTASection';
import { Footer } from '@/components/nauka/Footer';
import { ScrollProgress } from '@/components/nauka/ScrollProgress';

/**
 * Abu Aufa — Personal Portfolio Homepage
 *
 * Section flow:
 *   Hero (name + title + stats + tech marquee)
 *   → Featured Projects (6 across industries)
 *   → Tech Stack (grid)
 *   → Ventures (6 businesses)
 *   → Archive (other projects)
 *   → Contact CTA
 */

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1 }}>
        <HeroSection />
        <FeaturedProjectsSection />
        <TechStackSection />
        <VenturesSection />
        <ArchiveSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
