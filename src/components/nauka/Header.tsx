'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Header — Nauka Motion Redesign
 * - "Nauka Motion" wordmark
 * - Transparent → solid with blur
 * - Clean navigation with active state
 * - CTA: "Mulai Proyek"
 * - Mobile: animated slide-down menu
 */

const navItems = [
  { label: 'Cara Berpikir', href: '/about' },
  { label: 'Layanan', href: '/services' },
  { label: 'Karya', href: '/work' },
  { label: 'Wawasan', href: '/insights' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? 'nauka-header-solid' : 'nauka-header-transparent'
      }`}
    >
      <div className="container-wide relative">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Subtle bottom separator */}
          <div className={`absolute bottom-0 left-[5%] right-[5%] h-px transition-colors duration-400 ${
            scrolled ? 'bg-white/10' : 'bg-white/[0.06]'
          }`} />
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-h4 font-heading nauka-logo-text tracking-tight">
              Nauka Motion
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-body-sm font-medium nauka-nav-link transition-colors duration-300 relative',
                    isActive && scrolled && 'text-[var(--nauka-accent)]',
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--nauka-accent)] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              asChild
              className="magnetic-button bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-lg px-6 py-2.5 text-body-sm font-medium"
            >
              <Link href="/contact">Mulai Proyek</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 -mr-2 nauka-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden nauka-mobile-nav pb-8 pt-2" aria-label="Mobile Navigation">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-body py-3 px-2 rounded-lg transition-colors duration-200',
                      isActive && 'text-[var(--nauka-accent)]',
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-4 pt-4">
                <Button
                  asChild
                  className="w-full bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-lg py-3 text-body-sm font-medium"
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Mulai Proyek
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
