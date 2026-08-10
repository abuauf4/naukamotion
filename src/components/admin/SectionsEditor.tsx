'use client';

import { useState, useCallback } from 'react';

interface Section {
  id: string;
  sortOrder: number;
  heading: { id: string; en: string };
  body: Array<{ id: string; en: string }>;
  bullets: Array<{ id: string; en: string }> | null;
}

export function SectionsEditor({
  projectSlug,
  initialSections,
}: {
  projectSlug: string;
  initialSections: Section[];
}) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/admin/projects/${projectSlug}`);
    if (res.ok) {
      const data = await res.json();
      setSections(data.sections || []);
    }
  }, [projectSlug]);

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const idx = sections.findIndex(s => s.id === id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sections.length) return;

    const current = sections[idx];
    const swap = sections[swapIdx];

    // Swap sortOrder
    await Promise.all([
      fetch(`/api/admin/sections/${current.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: swap.sortOrder }),
      }),
      fetch(`/api/admin/sections/${swap.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: current.sortOrder }),
      }),
    ]);
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this section?')) return;
    await fetch(`/api/admin/sections/${id}`, { method: 'DELETE' });
    refresh();
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', fontFamily: 'var(--font-body), sans-serif',
    fontSize: '0.85rem', color: 'var(--ink)', background: 'var(--bg)',
    border: '1px solid var(--line-strong)', borderRadius: '6px', outline: 'none',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem',
    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '4px',
  };

  return (
    <div>
      {error && <div style={{ background: 'rgba(216,90,42,0.1)', border: '1px solid var(--burnt)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--burnt)' }}>{error}</div>}

      {/* Section list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {sections.map((section, idx) => (
          <div key={section.id} style={{
            background: 'var(--bg-card)', border: '1px solid var(--line)',
            borderRadius: '10px', padding: '16px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', color: 'var(--ink-faint)' }}>
                #{idx + 1}
              </span>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--ink)', margin: 0 }}>
                  {section.heading.id || '(empty)'}
                </p>
                <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', color: 'var(--ink-faint)', margin: '2px 0 0 0' }}>
                  {section.body.length} paragraphs · {section.bullets?.length ?? 0} bullets
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleReorder(section.id, 'up')} disabled={idx === 0} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1, color: 'var(--ink-soft)' }}>↑</button>
                <button onClick={() => handleReorder(section.id, 'down')} disabled={idx === sections.length - 1} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: idx === sections.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === sections.length - 1 ? 0.4 : 1, color: 'var(--ink-soft)' }}>↓</button>
                <button onClick={() => setEditingId(editingId === section.id ? null : section.id)} style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer', color: 'var(--ink)' }}>
                  {editingId === section.id ? 'Close' : 'Edit'}
                </button>
                <button onClick={() => handleDelete(section.id)} style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer', color: 'var(--burnt)' }}>Delete</button>
              </div>
            </div>

            {/* Inline editor */}
            {editingId === section.id && (
              <SectionForm
                section={section}
                projectSlug={projectSlug}
                onSaved={() => { setEditingId(null); refresh(); }}
                onCancel={() => setEditingId(null)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Add new section */}
      {creating ? (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--burnt)', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.95rem', color: 'var(--ink)', margin: '0 0 16px 0' }}>New Section</h3>
          <SectionForm
            section={null}
            projectSlug={projectSlug}
            onSaved={() => { setCreating(false); refresh(); }}
            onCancel={() => setCreating(false)}
          />
        </div>
      ) : (
        <button onClick={() => setCreating(true)} style={{
          padding: '10px 20px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500,
          fontSize: '0.9rem', color: 'var(--paper)', background: 'var(--ink)',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
        }}>+ Add Section</button>
      )}
    </div>
  );
}

function SectionForm({
  section,
  projectSlug,
  onSaved,
  onCancel,
}: {
  section: Section | null;
  projectSlug: string;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [heading, setHeading] = useState(section?.heading || { id: '', en: '' });
  const [body, setBody] = useState<Array<{ id: string; en: string }>>(section?.body || [{ id: '', en: '' }]);
  const [hasBullets, setHasBullets] = useState(!!section?.bullets);
  const [bullets, setBullets] = useState<Array<{ id: string; en: string }>>(section?.bullets || [{ id: '', en: '' }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', fontFamily: 'var(--font-body), sans-serif',
    fontSize: '0.85rem', color: 'var(--ink)', background: 'var(--bg)',
    border: '1px solid var(--line-strong)', borderRadius: '6px', outline: 'none', marginBottom: '6px',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem',
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '4px', display: 'block',
  };

  async function handleSave() {
    setSaving(true);
    setError('');

    // Filter out empty paragraphs
    const cleanBody = body.filter(p => p.id.trim() || p.en.trim());
    const cleanBullets = hasBullets ? bullets.filter(b => b.id.trim() || b.en.trim()) : null;

    const payload = {
      heading,
      body: cleanBody,
      bullets: cleanBullets && cleanBullets.length > 0 ? cleanBullets : null,
    };

    try {
      const url = section
        ? `/api/admin/sections/${section.id}`
        : `/api/admin/projects/${projectSlug}/sections`;
      const method = section ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
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

  return (
    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
      {error && <div style={{ color: 'var(--burnt)', fontSize: '0.8rem', marginBottom: '12px' }}>{error}</div>}

      {/* Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>Heading (ID)</label>
          <input type="text" value={heading.id} onChange={(e) => setHeading({ ...heading, id: e.target.value })} placeholder="Masalah" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Heading (EN)</label>
          <input type="text" value={heading.en} onChange={(e) => setHeading({ ...heading, en: e.target.value })} placeholder="Problem" style={inputStyle} />
        </div>
      </div>

      {/* Body paragraphs */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={labelStyle}>Body Paragraphs</label>
          <button onClick={() => setBody([...body, { id: '', en: '' }])} style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer', color: 'var(--ink-soft)' }}>+ Paragraph</button>
        </div>
        {body.map((para, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
            <textarea value={para.id} onChange={(e) => { const b = [...body]; b[i] = { ...b[i], id: e.target.value }; setBody(b); }} placeholder="Paragraf ID..." rows={2} style={{ ...inputStyle, marginBottom: 0, resize: 'vertical' }} />
            <textarea value={para.en} onChange={(e) => { const b = [...body]; b[i] = { ...b[i], en: e.target.value }; setBody(b); }} placeholder="Paragraph EN..." rows={2} style={{ ...inputStyle, marginBottom: 0, resize: 'vertical' }} />
            <button onClick={() => setBody(body.filter((_, idx) => idx !== i))} disabled={body.length <= 1} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: body.length <= 1 ? 'not-allowed' : 'pointer', color: 'var(--burnt)', opacity: body.length <= 1 ? 0.4 : 1 }}>×</button>
          </div>
        ))}
      </div>

      {/* Bullets */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={hasBullets} onChange={(e) => setHasBullets(e.target.checked)} style={{ cursor: 'pointer' }} />
            Bullets (optional)
          </label>
          {hasBullets && (
            <button onClick={() => setBullets([...bullets, { id: '', en: '' }])} style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer', color: 'var(--ink-soft)' }}>+ Bullet</button>
          )}
        </div>
        {hasBullets && bullets.map((bullet, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
            <input type="text" value={bullet.id} onChange={(e) => { const b = [...bullets]; b[i] = { ...b[i], id: e.target.value }; setBullets(b); }} placeholder="Bullet ID..." style={{ ...inputStyle, marginBottom: 0 }} />
            <input type="text" value={bullet.en} onChange={(e) => { const b = [...bullets]; b[i] = { ...b[i], en: e.target.value }; setBullets(b); }} placeholder="Bullet EN..." style={{ ...inputStyle, marginBottom: 0 }} />
            <button onClick={() => setBullets(bullets.filter((_, idx) => idx !== i))} disabled={bullets.length <= 1} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: bullets.length <= 1 ? 'not-allowed' : 'pointer', color: 'var(--burnt)', opacity: bullets.length <= 1 ? 0.4 : 1 }}>×</button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{ padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', color: 'var(--ink-soft)', background: 'none', border: '1px solid var(--line)', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
        <button onClick={handleSave} disabled={saving} style={{ padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.85rem', color: 'var(--paper)', background: saving ? 'var(--ink-faint)' : 'var(--ink)', border: 'none', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer' }}>{saving ? 'Saving...' : 'Save Section'}</button>
      </div>
    </div>
  );
}
