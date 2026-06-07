import { Header } from '@/components/nauka/Header';
import { HeroSection } from '@/components/nauka/HeroSection';
import { CaseStudySection } from '@/components/nauka/CaseStudySection';
import { PhilosophySection } from '@/components/nauka/PhilosophySection';
import { TrustBarSection } from '@/components/nauka/TrustBarSection';
import { TestimonialSection } from '@/components/nauka/TestimonialSection';
import { CTASection } from '@/components/nauka/CTASection';
import { Footer } from '@/components/nauka/Footer';

/**
 * Nauka Motion — Homepage (Redesign)
 *
 * Section flow: Hero → Karya Pilihan → Cara Berpikir → Yang Kami Bangun → Testimonial → CTA/Contact
 * Design: Tenang, percaya diri, work-first
 */

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
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
