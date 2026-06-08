'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Footer — Nauka Motion Redesign
 * - Clean, confident, minimal
 * - "Cara Berpikir" instead of "Tentang"
 * - WhatsApp and email fetched from settings API
 * - Dark background with texture
 */

const footerNavSections = [
  {
    title: 'Layanan',
    links: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Business System', href: '/services/business-system-development' },
      { label: 'CMS Platform', href: '/services/cms-platform' },
      { label: 'Semua Layanan', href: '/services' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Cara Berpikir', href: '/about' },
      { label: 'Karya', href: '/work' },
      { label: 'Wawasan', href: '/insights' },
      { label: 'Kontak', href: '/contact' },
    ],
  },
  {
    title: 'Lainnya',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Kebijakan Privasi', href: '/legal/privacy' },
      { label: 'Syarat & Ketentuan', href: '/legal/terms' },
    ],
  },
];

interface SiteSettings {
  site_name?: string;
  whatsapp?: string;
  email?: string;
  founder?: string;
}

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch('/api/public/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings(data);
        }
      })
      .catch(() => {});
  }, []);

  const siteName = settings.site_name || 'Nauka Motion';
  const whatsappNumber = settings.whatsapp || '6281234567890';
  const emailAddress = settings.email || 'hello@naukamotion.id';
  const founder = settings.founder || 'Abu Aufa';

  return (
    <footer className="bg-texture-deep text-white">
      <div className="container-wide py-12 sm:py-16 lg:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 mb-10 sm:mb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block mb-4 sm:mb-5">
              <span className="text-h3 font-heading text-white tracking-tight">
                {siteName}
              </span>
            </Link>
            <p className="text-body-sm text-white/50 leading-relaxed max-w-[280px] mb-4 sm:mb-5">
              Produk digital yang menciptakan dampak nyata, bukan sekadar tampilan indah.
            </p>

            {/* Contact options in brand column */}
            <div className="flex flex-col gap-2.5 mb-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-[#25D366]/80 hover:text-[#25D366] transition-colors duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat via WhatsApp
              </a>
              <a
                href={`mailto:${emailAddress}`}
                className="text-body-sm text-white/50 hover:text-white/80 transition-colors duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {emailAddress}
              </a>
            </div>

            <p className="text-caption text-white/30">
              Didirikan oleh {founder}
            </p>
          </div>

          {/* Navigation columns */}
          <div className="sm:col-span-2 lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              {footerNavSections.map((section) => (
                <div key={section.title} className={section.title === 'Lainnya' ? 'col-span-2 sm:col-span-1' : ''}>
                  <h4 className="text-caption font-medium text-white/30 uppercase tracking-[0.15em] mb-4 sm:mb-5">
                    {section.title}
                  </h4>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-body-sm text-white/60 hover:text-white transition-colors duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-caption text-white/30">
            &copy; 2026 {siteName}. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="text-caption text-white/30 hover:text-white/50 transition-colors duration-300">
              Privasi
            </Link>
            <Link href="/legal/terms" className="text-caption text-white/30 hover:text-white/50 transition-colors duration-300">
              Syarat
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
