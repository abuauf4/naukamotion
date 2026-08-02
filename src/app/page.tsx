import { Header } from "@/components/nauka/Header";
import { HeroSection } from "@/components/nauka/HeroSection";
import { SelectedWorkSection } from "@/components/nauka/SelectedWorkSection";
import { StudioManifestSection } from "@/components/nauka/StudioManifestSection";
import { CapabilitiesSection } from "@/components/nauka/CapabilitiesSection";
import { ServicesSection } from "@/components/nauka/ServicesSection";
import { ProcessSection } from "@/components/nauka/ProcessSection";
import { InsightsSection } from "@/components/nauka/InsightsSection";
import { FounderSection } from "@/components/nauka/FounderSection";
import { ContactCTASection } from "@/components/nauka/ContactCTASection";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

/**
 * Nauka Motion — Independent Digital Product & Creative Technology Studio
 *
 * Homepage section flow (per brand brief):
 *   Navbar
 *   → Hero + Studio Reel
 *   → Selected Work (6 large case study rows)
 *   → Studio Statement (manifesto + motion principle)
 *   → Capabilities (proof strip + domains marquee)
 *   → Services (5 horizontal accordion modules)
 *   → Process (Discover → Define → Design → Develop → Evolve)
 *   → Insights (journal preview)
 *   → Founder / Studio
 *   → Start a Project CTA
 *   → Footer
 */

export default function HomePage() {
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
        <SelectedWorkSection />
        <StudioManifestSection />
        <CapabilitiesSection />
        <ServicesSection />
        <ProcessSection />
        <InsightsSection />
        <FounderSection />
        <ContactCTASection />
      </main>

      <Footer />
    </div>
  );
}
