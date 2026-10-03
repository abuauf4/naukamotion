import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import {
  TrustSection,
  ProcessSection,
  ProjectCTA,
} from "@/components/studio/MarketingSections";
import { getLocale } from "@/lib/server-locale";

export const metadata = pageMetadata({
  title: "Tentang Studio & Abu Aufa",
  description:
    "Nauka Motion, studio digital independen yang dipimpin Abu Aufa di Jakarta. Mengembangkan website, aplikasi Android, dan sistem bisnis, termasuk ekosistem NaCash.",
  path: "/about",
});
export default async function AboutPage() {
  const locale = await getLocale();
  const id = locale === "id";
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <div className="nm-container">
          <div className="nm-page-intro">
            <p className="nm-eyebrow">
              NAUKA MOTION / {id ? "TENTANG STUDIO" : "ABOUT THE STUDIO"}
            </p>
            <h1>
              {id ? (
                <>
                  Ide yang dipikirkan.
                  <br />
                  <span>Produk yang dikerjakan.</span>
                </>
              ) : (
                <>
                  Considered ideas.
                  <br />
                  <span>Carefully built products.</span>
                </>
              )}
            </h1>
            <p>
              {id
                ? "Studio independen untuk desain dan pengembangan website, aplikasi, serta sistem bisnis. Berbasis di Jakarta dan terbuka untuk bekerja secara remote."
                : "An independent studio for the design and development of websites, applications, and business systems. Based in Jakarta and open to remote collaboration."}
            </p>
          </div>
          <div className="nm-about-statement">
            <div>
              <p className="nm-eyebrow">
                {id ? "DI BALIK NAUKA MOTION" : "BEHIND NAUKA MOTION"}
              </p>
              <h2>Abu Aufa</h2>
              <Link href="/contact" className="nm-text-link">
                {id ? "Mulai percakapan" : "Start a conversation"}
              </Link>
            </div>
            <div>
              <p>
                {id
                  ? "Nauka Motion dibangun dan dipimpin oleh Abu Aufa. Pekerjaan kami mencakup website pemasaran, katalog produk, sistem inventory, dan aplikasi operasional."
                  : "Nauka Motion was founded and is led by Abu Aufa. Our work includes marketing websites, product catalogs, inventory systems, and operational applications."}
              </p>
              <p>
                {id
                  ? "Di samping proyek untuk bisnis, kami mengembangkan produk sendiri melalui Nauka. Salah satunya NaCash: ekosistem aplikasi kasir dan pencatatan keuangan yang dibuat untuk kebutuhan sehari-hari."
                  : "Alongside business projects, we develop our own products through Nauka. One example is NaCash: an ecosystem of point-of-sale and finance-tracking applications built for everyday needs."}
              </p>
              <Link href="/work/nacash" className="nm-text-link">
                {id ? "Kenali produk NaCash" : "Explore NaCash"}
              </Link>
            </div>
          </div>
        </div>
        <TrustSection locale={locale} />
        <ProcessSection locale={locale} />
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
