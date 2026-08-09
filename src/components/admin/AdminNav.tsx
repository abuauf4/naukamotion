'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Projects', href: '/admin/projects', icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
  { label: 'Categories', href: '/admin/categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
];

const FUTURE_ITEMS = [
  { label: 'Media', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Articles', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { label: 'Testimonials', icon: 'M8 12h8M8 8h8m-8 8h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z' },
  { label: 'Leads', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

export function AdminNav({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="admin-mobile-bar" style={{
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg-card)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 600, fontSize: '1rem', color: 'var(--ink)' }}>
          NAUKA <span style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--burnt)' }}>motion</span>
        </span>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" style={{ background: 'none', border: '1px solid var(--line-strong)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: 'var(--ink)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="admin-mobile-dropdown" style={{ display: 'none', background: 'var(--bg-card)', borderBottom: '1px solid var(--line)', padding: '12px 16px' }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.95rem', color: isActive(item.href) ? 'var(--burnt)' : 'var(--ink-soft)', textDecoration: 'none', borderRadius: '8px', marginBottom: '4px', background: isActive(item.href) ? 'rgba(216, 90, 42, 0.08)' : 'transparent' }}>
              {item.label}
            </Link>
          ))}
          <div style={{ height: '1px', background: 'var(--line)', margin: '12px 0' }} />
          <div style={{ padding: '8px 12px', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)' }}>{adminName}</div>
          <button onClick={handleLogout} style={{ display: 'block', width: '100%', padding: '10px 12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.95rem', color: 'var(--burnt)', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>Logout</button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="admin-sidebar" style={{ width: '240px', flexShrink: 0, borderRight: '1px solid var(--line)', background: 'var(--bg-card)', padding: '24px 16px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ marginBottom: '32px', padding: '0 8px' }}>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 600, fontSize: '1.1rem', color: 'var(--ink)' }}>
            NAUKA <span style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--burnt)' }}>motion</span>
          </span>
          <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', color: 'var(--ink-faint)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>Admin CMS</p>
        </div>
        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', fontWeight: isActive(item.href) ? 500 : 400, color: isActive(item.href) ? 'var(--burnt)' : 'var(--ink-soft)', textDecoration: 'none', borderRadius: '8px', marginBottom: '4px', background: isActive(item.href) ? 'rgba(216, 90, 42, 0.08)' : 'transparent' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
              {item.label}
            </Link>
          ))}
          <div style={{ height: '1px', background: 'var(--line)', margin: '16px 0' }} />
          <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 12px', marginBottom: '8px' }}>Coming Soon</p>
          {FUTURE_ITEMS.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-faint)', borderRadius: '8px', marginBottom: '4px', opacity: 0.5 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
          <div style={{ padding: '8px 12px', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)' }}>{adminName}</div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--burnt)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-mobile-bar { display: flex !important; }
          .admin-mobile-dropdown { display: block !important; }
        }
      `}</style>
    </>
  );
}
