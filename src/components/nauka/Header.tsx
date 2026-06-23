'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';

/**
 * Header — Nauka Motion (Developer Theme)
 *
 * - Logo image only (no wordmark)
 * - Theme toggle button
 * - Desktop nav with underline hover
 * - "Mulai Proyek" pill CTA
 * - Mobile hamburger menu
 */

const navItems = [
  { label: 'Karya', href: '/work' },
  { label: 'Cara Berpikir', href: '/about' },
  { label: 'Layanan', href: '/services' },
  { label: 'Wawasan', href: '/insights' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggle, mounted } = useTheme();

  // Only homepage hero overlaps navbar (transparent hero behind frosted glass).
  // All other pages get body padding-top so content starts below navbar.
  const isHome = pathname === '/';

  useEffect(() => {
    if (isHome) {
      document.body.classList.add('home-page');
      document.body.classList.remove('inner-page');
    } else {
      document.body.classList.add('inner-page');
      document.body.classList.remove('home-page');
    }
    return () => {
      document.body.classList.remove('home-page', 'inner-page');
    };
  }, [isHome]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`nauka-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <Link href="/" className="nauka-logo" aria-label="Nauka Motion">
          <Image
            src="/nauka-motion.webp"
            alt="Nauka Motion"
            width={120}
            height={34}
            className="nauka-logo-img"
            priority
          />
        </Link>

        <nav className="nauka-nav" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                style={isActive ? { color: 'var(--ink)' } : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <Link href="/contact" className="nauka-header-cta">
            Mulai Proyek
            <svg className="nauka-header-cta-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <button
            className="nauka-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="nauka-mobile-nav" aria-label="Mobile Navigation">
          <div className="container-wide">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={isActive ? { color: 'var(--accent)' } : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="nauka-header-cta"
              style={{ marginTop: '16px', display: 'inline-flex' }}
              onClick={() => setMobileOpen(false)}
            >
              Mulai Proyek
              <svg className="nauka-header-cta-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
