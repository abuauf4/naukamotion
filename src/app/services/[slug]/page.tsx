import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { ProjectCTA } from "@/components/studio/MarketingSections";
import { StructuredData } from "@/components/studio/StructuredData";
import { getLocale } from "@/lib/server-locale";
import { servicePages } from "@/lib/service-pages";
import {
  absoluteUrl,
  breadcrumbSchema,
  ORGANIZATION_ID,
  pageMetadata,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata({
    title: service.title.id,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();
  const id = locale === "id";
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <StructuredData
          data={[
            breadcrumbSchema([
              { name: "Beranda", path: "/" },
              { name: "Layanan", path: "/services" },
              { name: service.title[locale], path: `/services/${slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${absoluteUrl(`/services/${slug}`)}#service`,
              name: service.title[locale],
              description: service.intro[locale],
              url: absoluteUrl(`/services/${slug}`),
              provider: {
                "@type": "Organization",
                "@id": ORGANIZATION_ID,
                name: "Nauka Motion",
                url: absoluteUrl("/"),
              },
              areaServed: { "@type": "Country", name: "Indonesia" },
            },
          ]}
        />
        <div className="nm-container">
          <nav
            className="nm-breadcrumb"
            aria-label={id ? "Jejak halaman" : "Breadcrumb"}
          >
            <Link href="/services">{id ? "Layanan" : "Services"}</Link>
            <span aria-hidden="true">/</span>
            <span>{service.title[locale]}</span>
          </nav>
          <div className="nm-page-intro">
            <p className="nm-eyebrow">
              NAUKA MOTION / {id ? "LAYANAN" : "SERVICES"}
            </p>
            <h1>
              {service.title[locale]}
              <span className="nm-orange">.</span>
            </h1>
            <p>{service.intro[locale]}</p>
            <Link
              href={`/contact?service=${service.serviceId}`}
              className="nm-button"
            >
              {id ? "Bahas kebutuhan Anda" : "Discuss your needs"}
            </Link>
          </div>
          <div className="nm-case-layout">
            <aside className="nm-case-aside">
              <p>{id ? "JELAJAHI LAYANAN" : "EXPLORE SERVICES"}</p>
              <nav
                className="nm-service-nav"
                aria-label={id ? "Layanan lainnya" : "Other services"}
              >
                {servicePages.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    aria-current={item.slug === slug ? "page" : undefined}
                  >
                    {item.title[locale]}
                  </Link>
                ))}
              </nav>
              <Link href={service.examplePath} className="nm-text-link">
                {service.exampleLabel[locale]}
              </Link>
            </aside>
            <div className="nm-case-content">
              {service.sections.map((section) => (
                <section key={section.heading.id}>
                  <h2>{section.heading[locale]}</h2>
                  <p>{section.body[locale]}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
