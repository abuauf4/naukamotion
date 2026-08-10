'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Project {
  slug: string;
  name: string;
  index: string;
  categorySlug: string;
  category: { title: string };
  year: string;
  status: string;
  type: string;
  visibility: string;
  liveUrl: string | null;
  sortOrder: number;
  _count?: { sections: number; technologies: number };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterVisibility, setFilterVisibility] = useState('');
  const [categories, setCategories] = useState<{ slug: string; title: string }[]>([]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filterCategory) params.set('category', filterCategory);
    if (filterStatus) params.set('status', filterStatus);
    if (filterType) params.set('type', filterType);
    if (filterVisibility) params.set('visibility', filterVisibility);
    try {
      const res = await fetch(`/api/admin/projects?${params}`);
      const data = await res.json();
      setProjects(data);
    } catch { setProjects([]); }
    setLoading(false);
  }, [search, filterCategory, filterStatus, filterType, filterVisibility]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  useEffect(() => {
    fetch('/api/admin/categories').then(r => r.json()).then(data => {
      setCategories(data.map((c: { slug: string; title: string }) => ({ slug: c.slug, title: c.title })));
    }).catch(() => {});
  }, []);

  const selectStyle: React.CSSProperties = {
    padding: '8px 12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem',
    color: 'var(--ink)', background: 'var(--bg)', border: '1px solid var(--line-strong)',
    borderRadius: '8px', outline: 'none', cursor: 'pointer',
  };

  return (
    <main style={{ flex: 1, padding: '32px clamp(16px, 4vw, 40px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--ink)', margin: 0 }}>Projects</h1>
        <Link href="/admin/projects/new" style={{ padding: '10px 20px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--paper)', background: 'var(--ink)', border: 'none', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none' }}>+ New Project</Link>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="admin-filter-input" />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="admin-filter-select">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="admin-filter-select">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="development">Development</option>
          <option value="draft">Draft</option>
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="admin-filter-select">
          <option value="">All Types</option>
          <option value="client">Client</option>
          <option value="personal">Personal</option>
          <option value="collaboration">Collaboration</option>
          <option value="internal">Internal</option>
        </select>
        <select value={filterVisibility} onChange={(e) => setFilterVisibility(e.target.value)} className="admin-filter-select">
          <option value="">All Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ color: 'var(--ink-faint)' }}>Loading...</div>
      ) : projects.length === 0 ? (
        <div style={{ color: 'var(--ink-faint)' }}>No projects found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {projects.map(p => (
            <Link key={p.slug} href={`/admin/projects/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: '10px',
                padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
                transition: 'border-color 0.15s ease', cursor: 'pointer',
              }} className="admin-project-row">
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)' }}>{p.index}</span>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <p style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.95rem', color: 'var(--ink)', margin: 0 }}>{p.name}</p>
                  <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', color: 'var(--ink-faint)', margin: '2px 0 0 0' }}>{p.category?.title} · {p.year}</p>
                </div>
                <Badge label={p.status} color={p.status === 'published' ? 'var(--ink)' : p.status === 'development' ? 'var(--burnt)' : 'var(--ink-faint)'} />
                <Badge label={p.type} color="var(--ink-soft)" />
                <Badge label={p.visibility} color={p.visibility === 'public' ? 'var(--ink-soft)' : 'var(--burnt)'} />
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', color: p.liveUrl ? 'var(--ink-soft)' : 'var(--ink-faint)' }}>
                  {p.liveUrl ? '🌐 live' : 'no URL'}
                </span>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', color: 'var(--ink-faint)' }}>
                  {p._count?.sections ?? 0}S · {p._count?.technologies ?? 0}T
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <style>{`
        .admin-filters {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          margin-bottom: 20px;
        }
        .admin-filter-input, .admin-filter-select {
          width: 100%;
          padding: 8px 12px;
          font-family: var(--font-body), sans-serif;
          font-size: 0.85rem;
          color: var(--ink);
          background: var(--bg);
          border: 1px solid var(--line-strong);
          border-radius: 8px;
          outline: none;
          box-sizing: border-box;
        }
        .admin-filter-select { cursor: pointer; }
        @media (min-width: 769px) {
          .admin-filters {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          .admin-filter-input { flex: 1; min-width: 150px; }
        }
        .admin-project-row:hover { border-color: var(--burnt) !important; }
      `}</style>
    </main>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', letterSpacing: '0.08em',
      textTransform: 'uppercase', padding: '3px 8px', borderRadius: '999px',
      border: `1px solid ${color}`, color,
    }}>{label}</span>
  );
}
