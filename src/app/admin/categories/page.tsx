'use client';

import { useState, useEffect, useCallback } from 'react';

interface Category {
  slug: string;
  index: string;
  title: string;
  description: { id: string; en: string };
  accent: string;
  status: string;
  sortOrder: number;
  _count?: { projects: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(data);
    } catch {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  async function handleDelete(slug: string) {
    try {
      const res = await fetch(`/api/admin/categories/${slug}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Delete failed');
        return;
      }
      setDeleteConfirm(null);
      fetchCategories();
    } catch {
      setError('Delete failed');
    }
  }

  if (loading) return <div style={{ padding: '32px', color: 'var(--ink-faint)' }}>Loading...</div>;

  return (
    <main style={{ flex: 1, padding: '32px clamp(16px, 4vw, 40px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--ink)', margin: 0 }}>
          Categories
        </h1>
        <button
          onClick={() => setCreating(true)}
          style={{
            padding: '10px 20px',
            fontFamily: 'var(--font-body), sans-serif',
            fontWeight: 500,
            fontSize: '0.9rem',
            color: 'var(--paper)',
            background: 'var(--ink)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          + New Category
        </button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(216, 90, 42, 0.1)',
          border: '1px solid var(--burnt)',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '0.85rem',
          color: 'var(--burnt)',
        }}>
          {error}
          <button onClick={() => setError('')} style={{ float: 'right', background: 'none', border: 'none', color: 'var(--burnt)', cursor: 'pointer', fontWeight: 600 }}>×</button>
        </div>
      )}

      {/* Category list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categories.map((cat) => (
          <div key={cat.slug} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            {/* Accent dot */}
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cat.accent, flexShrink: 0 }} />

            {/* Title + slug */}
            <div style={{ flex: 1, minWidth: '180px' }}>
              <p style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '1rem', color: 'var(--ink)', margin: 0 }}>
                {cat.title}
              </p>
              <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)', margin: '4px 0 0 0' }}>
                /{cat.slug}
              </p>
            </div>

            {/* Status badge */}
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '999px',
              border: `1px solid ${cat.status === 'published' ? 'var(--ink)' : 'var(--ink-faint)'}`,
              color: cat.status === 'published' ? 'var(--ink)' : 'var(--ink-faint)',
            }}>
              {cat.status}
            </span>

            {/* Project count */}
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.7rem',
              color: 'var(--ink-soft)',
            }}>
              {cat._count?.projects ?? 0} projects
            </span>

            {/* Sort order */}
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.7rem',
              color: 'var(--ink-faint)',
            }}>
              order: {cat.sortOrder}
            </span>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setEditing(cat)}
                style={{
                  padding: '6px 12px',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.8rem',
                  color: 'var(--ink)',
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirm(cat.slug)}
                style={{
                  padding: '6px 12px',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.8rem',
                  color: 'var(--burnt)',
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit modal */}
      {(creating || editing) && (
        <CategoryForm
          category={editing}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSaved={() => { setCreating(false); setEditing(null); fetchCategories(); }}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }} onClick={() => setDeleteConfirm(null)}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '1.1rem', color: 'var(--ink)', margin: '0 0 12px 0' }}>
              Delete category?
            </h3>
            <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-soft)', margin: '0 0 24px 0' }}>
              This will permanently delete <strong>{deleteConfirm}</strong>. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-soft)', background: 'none', border: '1px solid var(--line)', borderRadius: '8px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: '#fff', background: 'var(--burnt)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function CategoryForm({ category, onClose, onSaved }: {
  category: Category | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!category;
  const [form, setForm] = useState({
    slug: category?.slug || '',
    index: category?.index || '',
    title: category?.title || '',
    descriptionId: category?.description?.id || '',
    descriptionEn: category?.description?.en || '',
    accent: category?.accent || '#D85A2A',
    status: category?.status || 'published',
    sortOrder: category?.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        index: form.index,
        title: form.title,
        description: { id: form.descriptionId, en: form.descriptionEn },
        accent: form.accent,
        status: form.status,
        sortOrder: Number(form.sortOrder),
        ...(isEdit ? {} : { slug: form.slug }),
      };

      const url = isEdit ? `/api/admin/categories/${category!.slug}` : '/api/admin/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed');
        setSaving(false);
        return;
      }

      onSaved();
    } catch {
      setError('Network error');
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: '0.9rem',
    color: 'var(--ink)',
    background: 'var(--bg)',
    border: '1px solid var(--line-strong)',
    borderRadius: '8px',
    outline: 'none',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--ink-soft)',
    marginBottom: '6px',
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px',
      overflowY: 'auto',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        margin: 'auto',
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '1.2rem', color: 'var(--ink)', margin: '0 0 24px 0' }}>
          {isEdit ? 'Edit Category' : 'New Category'}
        </h2>

        {error && (
          <div style={{ background: 'rgba(216, 90, 42, 0.1)', border: '1px solid var(--burnt)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', color: 'var(--burnt)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug {isEdit && '(permanent — cannot change)'}</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              disabled={isEdit}
              required
              placeholder="automotive"
              style={{ ...inputStyle, opacity: isEdit ? 0.5 : 1 }}
            />
          </div>

          {/* Index */}
          <div>
            <label style={labelStyle}>Index Label</label>
            <input
              type="text"
              value={form.index}
              onChange={(e) => setForm({ ...form, index: e.target.value })}
              placeholder="01"
              style={inputStyle}
            />
          </div>

          {/* Title */}
          <div>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="Automotive"
              style={inputStyle}
            />
          </div>

          {/* Description ID */}
          <div>
            <label style={labelStyle}>Description (Indonesia)</label>
            <textarea
              value={form.descriptionId}
              onChange={(e) => setForm({ ...form, descriptionId: e.target.value })}
              required
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Description EN */}
          <div>
            <label style={labelStyle}>Description (English)</label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
              required
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Accent */}
          <div>
            <label style={labelStyle}>Accent Color</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="color"
                value={form.accent}
                onChange={(e) => setForm({ ...form, accent: e.target.value })}
                style={{ width: '40px', height: '40px', border: '1px solid var(--line)', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
              />
              <input
                type="text"
                value={form.accent}
                onChange={(e) => setForm({ ...form, accent: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Status + Sort Order */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                style={inputStyle}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-soft)', background: 'none', border: '1px solid var(--line)', borderRadius: '8px', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ padding: '10px 20px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--paper)', background: saving ? 'var(--ink-faint)' : 'var(--ink)', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
