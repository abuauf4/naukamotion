import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Globe2,
  Smartphone,
  PanelsTopLeft,
  Code2,
  Layers3,
  MessagesSquare,
  ShieldCheck,
  Plus,
} from "lucide-react";
import {
  offerings,
  deliverySteps,
  salesFaqs,
  whatsappUrl,
  projectBriefUrl,
} from "@/lib/studio-offering";
import type { Locale } from "@/lib/server-locale";
import type { FeaturedProject } from "@/lib/cms";

export function HomeHero({ locale }: { locale: Locale }) {
  const id = locale === "id";
  return (
    <section className="nm-hero">
      <div className="nm-container nm-hero-grid">
        <div className="nm-hero-copy">
          <p className="nm-eyebrow">
            <span className="nm-tiny-mark" />
            INDEPENDENT DIGITAL STUDIO
          </p>
          <h1>
            {id ? (
              <>
                Website & aplikasi.
                <br />
                <span>Dibangun untuk</span>
                <br />
                bisnis Anda<span className="nm-orange">.</span>
              </>
            ) : (
              <>
                Websites & apps.
                <br />
                <span>Built around</span>
                <br />
                your business<span className="nm-orange">.</span>
              </>
            )}
          </h1>
          <p className="nm-hero-description">
            {id
              ? "Dari website yang memperkenalkan bisnis hingga aplikasi yang merapikan operasional. Kami bantu dari ide, desain, sampai siap digunakan."
              : "From a website that introduces your business to an app that simplifies daily work. We help you from idea and design through delivery."}
          </p>
          <div className="nm-hero-buttons">
            <Link className="nm-button" href="/contact">
              {id ? "Diskusikan ide Anda" : "Let's discuss your idea"}
            </Link>
            <Link className="nm-button nm-button-ghost" href="#karya">
              {id ? "Lihat karya" : "Explore the work"}
            </Link>
          </div>
          <div className="nm-hero-reassurance">
            <span>
              <Check size={15} />
              {id ? "Lingkup & biaya jelas" : "Clear scope & costs"}
            </span>
            <span>
              <Check size={15} />
              {id ? "Progres bisa ditinjau" : "Reviewable progress"}
            </span>
          </div>
        </div>
        <div
          className="nm-hero-showcase"
          aria-label={
            id ? "Preview karya Nauka Motion" : "Nauka Motion project previews"
          }
        >
          <div className="nm-showcase-top">
            <span>DESIGN. BUILD. SHIP.</span>
            <span>NAUKA / 2026</span>
          </div>
          <div className="nm-browser-preview">
            <div className="nm-browser-bar">
              <span className="nm-browser-dots">
                <i />
                <i />
                <i />
              </span>
              <span>JAECOO MAM Fatmawati</span>
              <Layers3 size={13} />
            </div>
            <div className="nm-browser-image">
              <Image
                src="/showcase/jaecoo-fatmawati.webp"
                alt={
                  id
                    ? "Tampilan website JAECOO MAM Fatmawati dengan showcase J8"
                    : "JAECOO MAM Fatmawati website showcasing the J8"
                }
                fill
                sizes="(max-width: 767px) 90vw, 43vw"
                priority
                unoptimized
              />
            </div>
            <div className="nm-browser-caption">
              <span>{id ? "WEBSITE & WEB APP" : "WEBSITES & WEB APPS"}</span>
              <span>
                {id ? "Desain + pengembangan" : "Design + development"}
              </span>
            </div>
          </div>
          <Link
            href="/work/nacash"
            className="nm-phone-preview"
            aria-label={
              id ? "Lihat produk NaCash Household" : "Explore NaCash Household"
            }
          >
            <Image
              src="/showcase/nacash-household.webp"
              alt={
                id
                  ? "Tampilan NaCash Household: dana aman, ringkasan bulanan, dan menu keuangan"
                  : "NaCash Household: available funds, monthly overview, and finance tools"
              }
              width={739}
              height={1536}
              priority
              unoptimized
            />
            <span className="nm-phone-caption">NaCash Household</span>
          </Link>
          <div className="nm-build-note">
            <Code2 size={18} />
            <div>
              <strong>
                {id
                  ? "Satu ide. Banyak kemungkinan."
                  : "One idea. Many possibilities."}
              </strong>
              <span>Web · Android · Business systems</span>
            </div>
          </div>
          <span className="nm-showcase-index">01 / DIGITAL EXPERIENCES</span>
        </div>
      </div>
      <div className="nm-container nm-hero-baseline">
        <span>
          {id
            ? "Desain yang dipikirkan. Teknologi yang diterapkan."
            : "Thoughtful design. Applied technology."}
        </span>
        <span>
          JAKARTA, ID /{" "}
          {id ? "BEKERJA LINTAS INDUSTRI" : "WORKING ACROSS INDUSTRIES"}
        </span>
      </div>
    </section>
  );
}

export function ServiceSection({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const id = locale === "id";
  const icons = [Globe2, Smartphone, PanelsTopLeft];
  return (
    <section id="layanan" className="nm-section nm-light">
      <div className="nm-container">
        <div className="nm-section-heading">
          <div>
            <p className="nm-eyebrow">
              01 / {id ? "YANG KAMI BANGUN" : "WHAT WE BUILD"}
            </p>
            <h2>
              {id ? (
                <>
                  Kebutuhan berbeda.
                  <br />
                  <span>Solusi yang tepat.</span>
                </>
              ) : (
                <>
                  Different needs.
                  <br />
                  <span>The right solution.</span>
                </>
              )}
            </h2>
          </div>
          <p>
            {id
              ? "Mulai dari kebutuhan Anda. Kita pilih bentuk produk dan fitur yang benar-benar membantu bisnis."
              : "Start with your needs. Together, we choose the product and features that will help your business."}
          </p>
        </div>
        <div className="nm-service-grid">
          {offerings.map((service, i) => {
            const Icon = icons[i];
            return (
              <article key={service.id} className="nm-service-card">
                <div className="nm-service-top">
                  <span>{service.number}</span>
                  <Icon size={27} strokeWidth={1.5} />
                </div>
                <p className="nm-service-type">{service.short[locale]}</p>
                <h3>{service.title[locale]}</h3>
                <p>{service.description[locale]}</p>
                <div className="nm-service-examples">
                  {service.examples[locale]}
                </div>
                {full && (
                  <ul className="nm-check-list">
                    {service.includes[locale].map((item) => (
                      <li key={item}>
                        <Check size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/contact?service=${service.id}`}
                  className="nm-service-link"
                >
                  {id ? "Bahas kebutuhan ini" : "Discuss this service"}
                  <Plus size={17} />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="nm-services-note">
          <span>
            {id
              ? "Belum yakin harus mulai dari mana? Kita petakan bersama."
              : "Not sure where to begin? Let's work it out together."}
          </span>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            {id ? "Konsultasi via WhatsApp" : "Talk on WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}

export function WorkSection({
  locale,
  projects,
}: {
  locale: Locale;
  projects: FeaturedProject[];
}) {
  const id = locale === "id";
  return (
    <section id="karya" className="nm-section">
      <div className="nm-container">
        <div className="nm-section-heading">
          <div>
            <p className="nm-eyebrow">
              02 / {id ? "KARYA PILIHAN" : "SELECTED WORK"}
            </p>
            <h2>
              {id ? (
                <>
                  Dari kebutuhan,
                  <br />
                  <span>menjadi karya.</span>
                </>
              ) : (
                <>
                  From a real need,
                  <br />
                  <span>to a finished product.</span>
                </>
              )}
            </h2>
          </div>
          <div>
            <p>
              {id
                ? "Jelajahi pendekatan desain dan sistem yang kami bangun di berbagai bidang."
                : "Explore the design approaches and systems we have built across different fields."}
            </p>
            <Link href="/work" className="nm-text-link">
              {id ? "Lihat semua portofolio" : "View the full portfolio"}
            </Link>
          </div>
        </div>
        <div className="nm-work-grid">
          <Link className="nm-work-card nm-work-product" href="/work/nacash">
            <div className="nm-work-visual nm-app-visual">
              <div className="nm-app-wordmark">
                <span>PRODUK NAUKA</span>
                <strong>
                  NaCash<span>by Nauka</span>
                </strong>
                <p>
                  {id
                    ? "Dibuat untuk aktivitas sehari-hari."
                    : "Built for everyday work."}
                </p>
              </div>
              <Image
                src="/showcase/nacash-dashboard.webp"
                alt="Antarmuka aplikasi NaCash Fashion"
                width={390}
                height={844}
                sizes="200px"
                unoptimized
              />
            </div>
            <div className="nm-work-caption">
              <div>
                <span>
                  {id
                    ? "Produk internal · Android"
                    : "In-house product · Android"}
                </span>
                <h3>NaCash</h3>
                <p>
                  {id
                    ? "Kasir, stok, dan pencatatan keuangan."
                    : "Point of sale, inventory, and finance tracking."}
                </p>
              </div>
              <span className="nm-project-number">01</span>
            </div>
          </Link>
          {projects.slice(0, 3).map((project, i) => (
            <Link
              href={`/work/${project.slug}`}
              className="nm-work-card"
              key={project.slug}
            >
              <div className="nm-work-visual">
                <Image
                  src={project.cover}
                  alt={`Preview proyek ${project.name}`}
                  fill
                  sizes="(max-width: 767px) 92vw, 44vw"
                  unoptimized
                />
              </div>
              <div className="nm-work-caption">
                <div>
                  <span>{project.categoryTitle}</span>
                  <h3>{project.name}</h3>
                  <p>{project.tagline[locale]}</p>
                </div>
                <span className="nm-project-number">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const items = [
    {
      Icon: Layers3,
      title: id ? "Fitur punya tujuan." : "Features with a purpose.",
      body: id
        ? "Kita bahas alur pengguna dan kebutuhan bisnis sebelum menentukan fitur."
        : "We discuss user flows and business needs before deciding on features.",
    },
    {
      Icon: MessagesSquare,
      title: id ? "Komunikasi langsung." : "Direct communication.",
      body: id
        ? "Diskusikan keputusan desain, tinjau progres, dan sampaikan masukan selama pengerjaan."
        : "Discuss design decisions, review progress, and provide feedback during development.",
    },
    {
      Icon: ShieldCheck,
      title: id ? "Serah terima jelas." : "A clear handover.",
      body: id
        ? "Lingkup, akses, panduan, dan dukungan setelah selesai dibahas sejak awal."
        : "Scope, access, guides, and support after delivery are discussed from the start.",
    },
  ];
  return (
    <section id="studio" className="nm-section nm-trust-section">
      <div className="nm-container nm-trust-grid">
        <div>
          <p className="nm-eyebrow">
            03 / {id ? "CARA KAMI BERPIKIR" : "HOW WE THINK"}
          </p>
          <h2>
            {id ? (
              <>
                Bagus dilihat.
                <br />
                <span>Nyaman dipakai.</span>
              </>
            ) : (
              <>
                Good to look at.
                <br />
                <span>Better to use.</span>
              </>
            )}
          </h2>
          <p className="nm-section-intro">
            {id
              ? "Nauka Motion adalah studio independen yang dipimpin Abu Aufa. Kami mendesain dan membangun produk dengan memperhatikan detail tampilan serta cara produk digunakan."
              : "Nauka Motion is an independent studio led by Abu Aufa. We design and build products with care for visual detail and the way people use them."}
          </p>
          <Link href="/about" className="nm-text-link">
            {id ? "Kenal lebih dekat" : "Meet the studio"}
          </Link>
        </div>
        <div className="nm-trust-list">
          {items.map(({ Icon, title, body }) => (
            <div className="nm-trust-item" key={title}>
              <Icon size={23} strokeWidth={1.5} />
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ locale }: { locale: Locale }) {
  const id = locale === "id";
  return (
    <section id="proses" className="nm-section nm-process-section">
      <div className="nm-container">
        <div className="nm-section-heading">
          <div>
            <p className="nm-eyebrow">
              04 / {id ? "PROSES KERJA" : "THE PROCESS"}
            </p>
            <h2>
              {id ? (
                <>
                  Anda tahu
                  <br />
                  <span>apa langkah berikutnya.</span>
                </>
              ) : (
                <>
                  Know what
                  <br />
                  <span>comes next.</span>
                </>
              )}
            </h2>
          </div>
          <p>
            {id
              ? "Dari percakapan pertama sampai produk digunakan, setiap tahap punya hasil yang bisa Anda tinjau."
              : "From the first conversation to delivery, every stage has an outcome you can review."}
          </p>
        </div>
        <ol className="nm-process-grid">
          {deliverySteps.map((step) => (
            <li key={step.number}>
              <span className="nm-step-number">{step.number}</span>
              <h3>{step.title[locale]}</h3>
              <p>{step.description[locale]}</p>
              <span className="nm-step-result">{step.result[locale]}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FaqSection({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const id = locale === "id";
  return (
    <section id="faq" className="nm-section">
      <div className="nm-container nm-faq-grid">
        <div>
          <p className="nm-eyebrow">{full ? "FAQ" : "05 / FAQ"}</p>
          <h2>
            {id ? (
              <>
                Sebelum
                <br />
                <span>kita mulai.</span>
              </>
            ) : (
              <>
                Before
                <br />
                <span>we begin.</span>
              </>
            )}
          </h2>
          <p className="nm-section-intro">
            {id
              ? "Beberapa hal yang mungkin ingin Anda tanyakan."
              : "A few things you might be wondering about."}
          </p>
          <a
            className="nm-text-link"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {id ? "Tanya langsung" : "Ask us directly"}
          </a>
        </div>
        <div className="nm-faq-list">
          {(full ? salesFaqs : salesFaqs.slice(0, 4)).map((faq) => (
            <details key={faq.question.id}>
              <summary>
                {faq.question[locale]}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{faq.answer[locale]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCTA({ locale }: { locale: Locale }) {
  const id = locale === "id";
  return (
    <section id="kontak" className="nm-cta-section">
      <div className="nm-container nm-cta-inner">
        <div>
          <p className="nm-eyebrow">
            {id ? "MULAI DARI SATU PERCAKAPAN" : "START WITH A CONVERSATION"}
          </p>
          <h2>
            {id ? (
              <>
                Ada ide?
                <br />
                Kita buat jadi nyata<span>.</span>
              </>
            ) : (
              <>
                Have an idea?
                <br />
                Let's bring it to life<span>.</span>
              </>
            )}
          </h2>
          <p>
            {id
              ? "Ceritakan apa yang ingin Anda bangun. Kita bahas kebutuhan, kemungkinan, dan langkah awalnya."
              : "Tell us what you want to build. We'll discuss your needs, possibilities, and the first step."}
          </p>
        </div>
        <div className="nm-cta-actions">
          <Link href="/contact" className="nm-button nm-button-dark">
            {id ? "Ceritakan proyek Anda" : "Tell us about your project"}
          </Link>
          <a
            href={projectBriefUrl(
              id ? "website atau aplikasi" : "a website or application",
              locale,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {id ? "Atau ngobrol via WhatsApp" : "Or chat on WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}
