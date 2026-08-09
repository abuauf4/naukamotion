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

/**
 * Nauka Motion — Homepage (v2)
 *
 * Hierarchy baru:
 *   Navbar
 *   → Hero
 *   → Stats (50+ / 10+ / 6)
 *   → Kategori Saat Ini (6 big editorial cards)
 *   → Capabilities / Yang Kami Bangun
 *   → Cara Kami Bekerja
 *   → Tentang Nauka Motion
 *   → CTA / Mulai Proyek
 *   → Footer
 *
 * Homepage TIDAK menampilkan project satu per satu.
 * Klik kategori → /work/[category] → tampil project di dalamnya.
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
        <StatsSection />
        <CategorySection />
        <CapabilitiesSection />
        <ProcessSection />
        <FounderSection />
        <ContactCTASection />
      </main>

      <Footer />
    </div>
  );
}
