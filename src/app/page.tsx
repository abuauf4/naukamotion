/**
 * Nauka Motion — Homepage (V2.1)
 *
 * V2.1 architecture (visual-only redo of V2.0):
 *
 *   page.tsx                     SERVER  (2 light queries, no relations)
 *   ├── Header                   SERVER + small client island (mobile menu, locale)
 *   ├── Hero                     SERVER + small client island (session flag only)
 *   ├── Phase2Placeholder × 3    SERVER  (Selected Work, Studio, Contact)
 *   └── Footer                   SERVER
 *
 * V2.1 visual changes (vs V2.0):
 *   - Opening.tsx REMOVED — the hero entrance IS the opening animation.
 *     Letters appear in sequence and settle directly into their final
 *     hero positions. No separate overlay, no fade-out-then-new-hero.
 *   - Hero redesigned: massive NAUKA/MOTION grotesk + tiny serif italic
 *     accent + ONE text CTA. No eyebrow, no paragraph, no stats, no
 *     dual CTA pills. Poster composition, not landing page.
 *   - Header simplified: CTA pill removed. Only wordmark + nav links.
 *
 * Performance (unchanged from V2.0):
 *   - 2 lightweight queries (no N+1, no full relations)
 *   - 4 client components (Opening removed, so 3 fewer than V2.0)
 *   - 1 IntersectionObserver (shared via RevealGroup)
 *   - ~69 KB fonts (Instrument Sans 400+500, Fraunces italic 400)
 */
import { Header } from "@/components/nauka-v2/Header";
import { Hero } from "@/components/nauka-v2/Hero";
import { Phase2Placeholder } from "@/components/nauka-v2/Phase2Placeholder";
import { Footer } from "@/components/nauka-v2/Footer";
import { RevealGroup } from "@/components/nauka-v2/RevealGroup";
import { getCategories, getPublicProjectCountsByCategory } from "@/lib/cms";
import { getLocale, type Locale } from "@/lib/server-locale";

// V2 homepage is ISR — same as V1 for production parity.
// revalidatePath('/') from admin mutations still works.
export const revalidate = 60;

export default async function HomePage() {
  // Parallel — 2 lightweight queries, no N+1, no full relations.
  const [categories, projectCounts] = await Promise.all([
    getCategories(),
    getPublicProjectCountsByCategory(),
  ]);

  const locale: Locale = await getLocale();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <Header locale={locale} />

      <main style={{ flex: 1 }}>
        <RevealGroup>
          <Hero locale={locale} />

          {/* Phase 2 placeholders — intentional minimal sections,
              not "coming soon" stubs. Type + spacing + thin rule. */}
          <Phase2Placeholder
            label="01 — Karya Pilihan"
            heading={locale === "en" ? "Selected Work" : "Karya Pilihan"}
          />
          <Phase2Placeholder
            label="02 — Studio"
            heading={locale === "en" ? "About Nauka Motion" : "Tentang Nauka Motion"}
          />
          <Phase2Placeholder
            label="03 — Kontak"
            heading={locale === "en" ? "Start a Project" : "Mulai Proyek"}
          />
        </RevealGroup>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
