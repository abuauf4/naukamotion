'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';

/**
 * Header — Abu Aufa Personal Portfolio
 *
 * - Wordmark: "Abu Aufa." (Clash Display, dot accent)
 * - Theme toggle
 * - Desktop nav: Karya, Ventures, Stack, Arsip
 * - "Kontak" pill CTA
 * - Mobile hamburger
 */

const navItems = [
  { label: 'Pillars', href: '/#pillars' },
  { label: 'Karya', href: '/#projects' },
  { label: 'Proses', href: '/#process' },
  { label: 'Kontak', href: '/#contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggle, mounted } = useTheme();

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`nauka-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <Link href="/" className="wordmark" aria-label="Abu Aufa — home">
          Abu Aufa<span className="wordmark-dot">.</span>
        </Link>

        <nav className="nauka-nav" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
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

          <Link href="/#contact" className="nauka-header-cta">
            Kontak
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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
