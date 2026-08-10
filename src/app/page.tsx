/**
 * Nauka Motion — Homepage (V2)
 *
 * V2 Phase 1 architecture:
 *
 *   page.tsx                     SERVER  (1 light count query, no relations)
 *   ├── Opening                  CLIENT  (1.2s intro, session-gated)
 *   ├── Header                   SERVER + small client island (mobile menu, locale)
 *   ├── Hero                     SERVER + small client island (motion mask)
 *   ├── Phase2Placeholder × 3    SERVER  (Selected Work, Studio, Contact)
 *   └── Footer                   SERVER
 *
 * Data:
 *   - getCategories() — 1 query (no relations)
 *   - getPublicProjectCountsByCategory() — 1 groupBy query (no relations)
 *   Total: 2 lightweight queries vs V1's 8 queries + 28 sub-queries
 *
 * Locale:
 *   - Read from cookie server-side (no hydration flash)
 *   - LocaleProvider in layout.tsx handles client-side locale switch
 */
import { Opening } from "@/components/nauka-v2/Opening";
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

  // Total project count = sum of all category counts (single source of truth)
  const totalProjects = Object.values(projectCounts).reduce(
    (sum, n) => sum + n,
    0
  );
  const totalCategories = categories.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <Opening />
      <Header locale={locale} />

      <main style={{ flex: 1 }}>
        <RevealGroup>
          <Hero
            locale={locale}
            projectCount={totalProjects}
            categoryCount={totalCategories}
          />

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
