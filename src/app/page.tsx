import { Header } from '@/components/nauka/Header';
import { HeroSection } from '@/components/nauka/HeroSection';
import { CaseStudySection } from '@/components/nauka/CaseStudySection';
import { PhilosophySection } from '@/components/nauka/PhilosophySection';
import { TrustBarSection } from '@/components/nauka/TrustBarSection';
import { TestimonialSection } from '@/components/nauka/TestimonialSection';
import { CTASection } from '@/components/nauka/CTASection';
import { Footer } from '@/components/nauka/Footer';
import { ScrollProgress } from '@/components/nauka/ScrollProgress';

/**
 * Nauka Motion — Homepage (Developer Theme)
 *
 * Section flow:
 *   Hero → Karya Pilihan → Cara Berpikir → Yang Kami Bangun → Testimoni → CTA
 *
 * Design: Clash Display 700 + Instrument Serif italic accent + Inter body
 * Palette: GitHub-inspired light + dark theme toggle
 * Motion: line-mask reveal on headlines, fade-up on body, stagger on lists
 */

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1 }}>
        <HeroSection />
        <CaseStudySection />
        <PhilosophySection />
        <TrustBarSection />
        <TestimonialSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
