'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SectionsEditor } from '@/components/admin/SectionsEditor';
import { TechnologiesEditor } from '@/components/admin/TechnologiesEditor';
import { MediaEditor } from '@/components/admin/MediaEditor';

interface ProjectData {
  slug: string;
  index: string;
  name: string;
  categorySlug: string;
  tagline: { id: string; en: string };
  summary: { id: string; en: string };
  year: string;
  client: string;
  industry: string;
  cover: string;
  accent: string;
  liveUrl: string | null;
  status: string;
  type: string;
  visibility: string;
  sortOrder: number;
  featured: boolean;
  techStack: string[];
  role: { id: string; en: string };
  techIntro: { id: string; en: string } | null;
  nextProjectSlug: string | null;
  _count?: { sections: number; technologies: number };
  sections?: Array<{
    id: string;
    sortOrder: number;
    heading: { id: string; en: string };
    body: Array<{ id: string; en: string }>;
    bullets: Array<{ id: string; en: string }> | null;
  }>;
  technologies?: Array<{
    id: string;
    name: string;
    description: { id: string; en: string };
    sortOrder: number;
  }>;
  media?: Array<{
    id: string;
    type: string;
    url: string;
    publicId: string | null;
    width: number | null;
    height: number | null;
    format: string | null;
    bytes: number | null;
    alt: { id: string; en: string } | null;
    caption: { id: string; en: string } | null;
    sortOrder: number;
    sectionId: string | null;
  }>;
}

interface Category { slug: string; title: string; }
interface SimpleProject { slug: string; name: string; }

export default function AdminProjectEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const isNew = slug === 'new';

  const [activeTab, setActiveTab] = useState<'overview' | 'story' | 'technology' | 'media'>('overview');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabStripRef = useRef<HTMLDivElement | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProjects, setAllProjects] = useState<SimpleProject[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [form, setForm] = useState<ProjectData>({
    slug: '', index: '', name: '', categorySlug: '',
    tagline: { id: '', en: '' }, summary: { id: '', en: '' },
    year: new Date().getFullYear().toString(), client: '', industry: '',
    cover: '/portfolio/placeholder.png', accent: '#D85A2A', liveUrl: null,
    status: 'published', type: 'client', visibility: 'public',
    sortOrder: 0, featured: false, techStack: [], role: { id: '', en: '' },
    techIntro: null, nextProjectSlug: null,
  });

  useEffect(() => {
    fetch('/api/admin/categories').then(r => r.json()).then(data => {
      setCategories(data.map((c: Category) => ({ slug: c.slug, title: c.title })));
    }).catch(() => {});

    fetch('/api/admin/projects').then(r => r.json()).then(data => {
      setAllProjects(data.map((p: SimpleProject) => ({ slug: p.slug, name: p.name })));
    }).catch(() => {});

    if (!isNew) {
      fetch(`/api/admin/projects/${slug}`)
        .then(r => r.json())
        .then(data => { setProject(data); setForm(data); setLoading(false); })
        .catch(() => { setLoading(false); setError('Failed to load project'); });
    }
  }, [slug, isNew]);

  async function handleSave() {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const body = isNew ? form : (() => {
        const update: Record<string, unknown> = {};
        for (const key of Object.keys(form) as Array<keyof ProjectData>) {
          const oldVal = project?.[key];
          const newVal = form[key];
          if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
            update[key] = newVal;
          }
        }
        return update;
      })();

      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed');
        setSaving(false);
        return;
      }

      const saved = await res.json();
      setSuccess('Saved successfully');
      if (isNew) {
        router.push(`/admin/projects/${saved.slug}`);
      } else {
        setProject(saved);
      }
    } catch {
      setError('Network error');
    }
    setSaving(false);
  }

  if (loading) return <div style={{ padding: '32px', color: 'var(--ink-faint)' }}>Loading...</div>;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', fontFamily: 'var(--font-body), sans-serif',
    fontSize: '0.9rem', color: 'var(--ink)', background: 'var(--bg)',
    border: '1px solid var(--line-strong)', borderRadius: '8px', outline: 'none',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem',
    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '6px',
  };

  const update = (field: keyof ProjectData, value: unknown) => setForm({ ...form, [field]: value });

  function selectTab(tab: 'overview' | 'story' | 'technology' | 'media') {
    setActiveTab(tab);
    // Scroll active tab into view on mobile (no-op on desktop where strip is wider than tabs)
    requestAnimationFrame(() => {
      const el = tabRefs.current[tab];
      const strip = tabStripRef.current;
      if (!el || !strip) return;
      const elLeft = el.offsetLeft;
      const elRight = elLeft + el.offsetWidth;
      const viewLeft = strip.scrollLeft;
      const viewRight = viewLeft + strip.clientWidth;
      if (elLeft < viewLeft) {
        strip.scrollTo({ left: elLeft - 8, behavior: 'smooth' });
      } else if (elRight > viewRight) {
        strip.scrollTo({ left: elRight - strip.clientWidth + 8, behavior: 'smooth' });
      }
    });
  }

  return (
    <main style={{ flex: 1, padding: '32px clamp(16px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <button onClick={() => router.push('/admin/projects')} style={{ background: 'none', border: 'none', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)', cursor: 'pointer', marginBottom: '8px' }}>← Back to Projects</button>
          <h1 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: 'var(--ink)', margin: 0 }}>
            {isNew ? 'New Project' : form.name || slug}
          </h1>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ padding: '10px 24px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--paper)', background: saving ? 'var(--ink-faint)' : 'var(--ink)', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {error && <div style={{ background: 'rgba(216,90,42,0.1)', border: '1px solid var(--burnt)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', color: 'var(--burnt)' }}>{error}</div>}
      {success && <div style={{ background: 'rgba(13,148,136,0.1)', border: '1px solid var(--ink-soft)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{success}</div>}

      {/* Tabs — horizontally scrollable on mobile, full row on desktop */}
      <div
        ref={tabStripRef}
        className="admin-tab-strip"
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--line)',
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x proximity',
          scrollbarWidth: 'none', // Firefox — hide scrollbar
          msOverflowStyle: 'none', // IE/Edge — hide scrollbar
          // Allow tabs to be wider than the strip without parent clipping
          maxWidth: '100%',
          position: 'relative',
        }}
      >
        {(['overview', 'story', 'technology', 'media'] as const).map(tab => (
          <button
            key={tab}
            ref={(el) => { tabRefs.current[tab] = el; }}
            onClick={() => selectTab(tab)}
            className={activeTab === tab ? 'admin-tab active' : 'admin-tab'}
            style={{
              padding: '10px 20px',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab ? 500 : 400,
              color: activeTab === tab ? 'var(--burnt)' : 'var(--ink-soft)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--burnt)' : '2px solid transparent',
              cursor: 'pointer',
              textTransform: 'capitalize',
              marginBottom: '-1px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >{tab}</button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === 'overview' && (
        <div className="admin-form-grid">
          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug {!isNew && '(permanent)'}</label>
            <input type="text" value={form.slug} onChange={(e) => update('slug', e.target.value)} disabled={!isNew} required style={{ ...inputStyle, opacity: isNew ? 1 : 0.5 }} />
          </div>
          {/* Index */}
          <div>
            <label style={labelStyle}>Index</label>
            <input type="text" value={form.index} onChange={(e) => update('index', e.target.value)} placeholder="01" style={inputStyle} />
          </div>
          {/* Name */}
          <div>
            <label style={labelStyle}>Name</label>
            <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required style={inputStyle} />
          </div>
          {/* Category */}
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.categorySlug} onChange={(e) => update('categorySlug', e.target.value)} required style={inputStyle}>
              <option value="">Select...</option>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </div>
          {/* Year */}
          <div>
            <label style={labelStyle}>Year</label>
            <input type="text" value={form.year} onChange={(e) => update('year', e.target.value)} style={inputStyle} />
          </div>
          {/* Client */}
          <div>
            <label style={labelStyle}>Client</label>
            <input type="text" value={form.client} onChange={(e) => update('client', e.target.value)} style={inputStyle} />
          </div>
          {/* Industry */}
          <div>
            <label style={labelStyle}>Industry</label>
            <input type="text" value={form.industry} onChange={(e) => update('industry', e.target.value)} style={inputStyle} />
          </div>
          {/* Live URL */}
          <div>
            <label style={labelStyle}>Live URL (optional)</label>
            <input type="text" value={form.liveUrl ?? ''} onChange={(e) => update('liveUrl', e.target.value || null)} placeholder="https://..." style={inputStyle} />
          </div>
          {/* Accent */}
          <div>
            <label style={labelStyle}>Accent Color</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="color" value={form.accent} onChange={(e) => update('accent', e.target.value)} style={{ width: '40px', height: '40px', border: '1px solid var(--line)', borderRadius: '8px', cursor: 'pointer', background: 'none' }} />
              <input type="text" value={form.accent} onChange={(e) => update('accent', e.target.value)} style={inputStyle} />
            </div>
          </div>
          {/* Status */}
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)} style={inputStyle}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="development">Development</option>
            </select>
          </div>
          {/* Type */}
          <div>
            <label style={labelStyle}>Type</label>
            <select value={form.type} onChange={(e) => update('type', e.target.value)} style={inputStyle}>
              <option value="client">Client</option>
              <option value="personal">Personal</option>
              <option value="collaboration">Collaboration</option>
              <option value="internal">Internal</option>
            </select>
          </div>
          {/* Visibility */}
          <div>
            <label style={labelStyle}>Visibility</label>
            <select value={form.visibility} onChange={(e) => update('visibility', e.target.value)} style={inputStyle}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          {/* Sort Order */}
          <div>
            <label style={labelStyle}>Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => update('sortOrder', Number(e.target.value))} style={inputStyle} />
          </div>
          {/* Featured */}
          <div>
            <label style={labelStyle}>Featured</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 0' }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>Show as featured</span>
            </label>
          </div>
          {/* Next Project */}
          <div>
            <label style={labelStyle}>Next Project</label>
            <select value={form.nextProjectSlug ?? ''} onChange={(e) => update('nextProjectSlug', e.target.value || null)} style={inputStyle}>
              <option value="">None</option>
              {allProjects.filter(p => p.slug !== slug).map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            </select>
          </div>
          {/* Tagline ID */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Tagline (Indonesia)</label>
            <textarea value={form.tagline.id} onChange={(e) => update('tagline', { ...form.tagline, id: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          {/* Tagline EN */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Tagline (English)</label>
            <textarea value={form.tagline.en} onChange={(e) => update('tagline', { ...form.tagline, en: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          {/* Summary ID */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Summary (Indonesia)</label>
            <textarea value={form.summary.id} onChange={(e) => update('summary', { ...form.summary, id: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          {/* Summary EN */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Summary (English)</label>
            <textarea value={form.summary.en} onChange={(e) => update('summary', { ...form.summary, en: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          {/* Role ID */}
          <div>
            <label style={labelStyle}>Role (Indonesia)</label>
            <input type="text" value={form.role.id} onChange={(e) => update('role', { ...form.role, id: e.target.value })} style={inputStyle} />
          </div>
          {/* Role EN */}
          <div>
            <label style={labelStyle}>Role (English)</label>
            <input type="text" value={form.role.en} onChange={(e) => update('role', { ...form.role, en: e.target.value })} style={inputStyle} />
          </div>
        </div>
      )}

      {/* Story tab — Sections editor */}
      {activeTab === 'story' && (
        <div>
          {isNew ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--ink-faint)' }}>
              <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.95rem' }}>Save the project first, then add case study sections.</p>
            </div>
          ) : (
            <SectionsEditor
              projectSlug={slug}
              initialSections={project?.sections ?? []}
            />
          )}
        </div>
      )}

      {/* Technology tab — Technologies editor */}
      {activeTab === 'technology' && (
        <div>
          {isNew ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--ink-faint)' }}>
              <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.95rem' }}>Save the project first, then add technologies.</p>
            </div>
          ) : (
            <TechnologiesEditor
              projectSlug={slug}
              initialTechnologies={project?.technologies ?? []}
              initialTechIntro={project?.techIntro ?? null}
            />
          )}
        </div>
      )}

      {/* Media tab — Media editor */}
      {activeTab === 'media' && (
        <div>
          {isNew ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--ink-faint)' }}>
              <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.95rem' }}>Save the project first, then upload media.</p>
            </div>
          ) : (
            <MediaEditor
              projectSlug={slug}
              initialMedia={project?.media ?? []}
              sections={project?.sections ?? []}
            />
          )}
        </div>
      )}
      <style>{`
        .admin-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 769px) {
          .admin-form-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }
        }
        /* Hide scrollbar on WebKit/Chromium for the admin tab strip */
        .admin-tab-strip::-webkit-scrollbar {
          display: none;
        }
        /* On desktop the 4 tabs fit comfortably; no overflow needed.
           On mobile the strip scrolls horizontally without clipping. */
      `}</style>
    </main>
  );
}
