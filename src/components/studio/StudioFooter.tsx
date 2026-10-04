import Link from "next/link";
import Image from "next/image";
import { studioContact, whatsappUrl } from "@/lib/studio-offering";
import type { Locale } from "@/lib/server-locale";

export function StudioFooter({ locale = "id" }: { locale?: Locale }) {
  const id = locale === "id";
  return (
    <footer className="nm-footer">
      <div className="nm-container">
        <div className="nm-footer-top">
          <div className="nm-footer-brand">
            <Link href="/" className="nm-logo">
              <Image
                src="/logo-navbar-transparent.png"
                alt="Nauka Motion"
                width={768}
                height={265}
                sizes="185px"
              />
            </Link>
            <p>
              {id
                ? "Website, aplikasi, dan sistem digital yang dibuat untuk kebutuhan bisnis Anda."
                : "Websites, applications, and digital systems built around your business."}
            </p>
            <span>
              Jakarta, Indonesia ·{" "}
              {id ? "Bekerja secara remote" : "Working remotely"}
            </span>
          </div>
          <div className="nm-footer-column">
            <span>{id ? "Jelajahi" : "Explore"}</span>
            <Link href="/work">{id ? "Portofolio" : "Portfolio"}</Link>
            <Link href="/services">{id ? "Layanan" : "Services"}</Link>
            <Link href="/about">
              {id ? "Tentang studio" : "About the studio"}
            </Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/insights">
              {id ? "Panduan & artikel" : "Guides & insights"}
            </Link>
          </div>
          <div className="nm-footer-column">
            <span>{id ? "Mulai percakapan" : "Start a conversation"}</span>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${studioContact.email}`}>{studioContact.email}</a>
            <a
              href={studioContact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <Link href="/contact">
              {id ? "Kirim brief proyek" : "Send a project brief"}
            </Link>
          </div>
        </div>
        <div className="nm-footer-bottom">
          <span>© {new Date().getFullYear()} Nauka Motion</span>
          <span className="nm-footer-motto">SMALL MOVEMENT. REAL IMPACT.</span>
          <div>
            <Link href="/legal/privacy">{id ? "Privasi" : "Privacy"}</Link>
            <Link href="/legal/terms">{id ? "Ketentuan" : "Terms"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
