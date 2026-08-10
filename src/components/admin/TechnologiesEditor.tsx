'use client';

import { useState, useCallback } from 'react';

interface Technology {
  id: string;
  name: string;
  description: { id: string; en: string };
  sortOrder: number;
}

interface TechIntro {
  id: string;
  en: string;
}

export function TechnologiesEditor({
  projectSlug,
  initialTechnologies,
  initialTechIntro,
}: {
  projectSlug: string;
  initialTechnologies: Technology[];
  initialTechIntro: TechIntro | null;
}) {
  const [technologies, setTechnologies] = useState<Technology[]>(initialTechnologies);
  const [techIntro, setTechIntro] = useState<TechIntro>(initialTechIntro || { id: '', en: '' });
  const [hasTechIntro, setHasTechIntro] = useState(!!initialTechIntro);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [savingIntro, setSavingIntro] = useState(false);
  const [error, setError] = useState('');
  const [introSaved, setIntroSaved] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/admin/projects/${projectSlug}`);
    if (res.ok) {
      const data = await res.json();
      setTechnologies(data.technologies || []);
    }
  }, [projectSlug]);

  async function saveTechIntro() {
    setSavingIntro(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/projects/${projectSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          techIntro: hasTechIntro ? techIntro : null,
        }),
      });
      if (!res.ok) {
        setError('Failed to save tech intro');
        setSavingIntro(false);
        return;
      }
      setIntroSaved(true);
      setTimeout(() => setIntroSaved(false), 2000);
    } catch {
      setError('Network error');
    }
    setSavingIntro(false);
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const idx = technologies.findIndex(t => t.id === id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= technologies.length) return;

    const current = technologies[idx];
    const swap = technologies[swapIdx];

    await Promise.all([
      fetch(`/api/admin/technologies/${current.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: swap.sortOrder }),
      }),
      fetch(`/api/admin/technologies/${swap.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: current.sortOrder }),
      }),
    ]);
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this technology?')) return;
    await fetch(`/api/admin/technologies/${id}`, { method: 'DELETE' });
    refresh();
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', fontFamily: 'var(--font-body), sans-serif',
    fontSize: '0.85rem', color: 'var(--ink)', background: 'var(--bg)',
    border: '1px solid var(--line-strong)', borderRadius: '6px', outline: 'none', marginBottom: '6px',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem',
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '4px', display: 'block',
  };

  return (
    <div>
      {error && <div style={{ background: 'rgba(216,90,42,0.1)', border: '1px solid var(--burnt)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--burnt)' }}>{error}</div>}

      {/* Tech Intro */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.95rem', color: 'var(--ink)', margin: 0 }}>Tech Intro</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={hasTechIntro} onChange={(e) => setHasTechIntro(e.target.checked)} style={{ cursor: 'pointer' }} />
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>Enable</span>
          </label>
        </div>
        {hasTechIntro && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>Intro (Indonesia)</label>
                <textarea value={techIntro.id} onChange={(e) => setTechIntro({ ...techIntro, id: e.target.value })} rows={3} style={{ ...inputStyle, marginBottom: 0, resize: 'vertical' }} placeholder="Paragraf pembuka untuk section teknologi..." />
              </div>
              <div>
                <label style={labelStyle}>Intro (English)</label>
                <textarea value={techIntro.en} onChange={(e) => setTechIntro({ ...techIntro, en: e.target.value })} rows={3} style={{ ...inputStyle, marginBottom: 0, resize: 'vertical' }} placeholder="Opening paragraph for technology section..." />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={saveTechIntro} disabled={savingIntro} style={{ padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.85rem', color: 'var(--paper)', background: savingIntro ? 'var(--ink-faint)' : 'var(--ink)', border: 'none', borderRadius: '6px', cursor: savingIntro ? 'not-allowed' : 'pointer' }}>
                {savingIntro ? 'Saving...' : 'Save Intro'}
              </button>
              {introSaved && <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>✓ Saved</span>}
            </div>
          </>
        )}
        {!hasTechIntro && (
          <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
            No tech intro. Enable to add an opening paragraph for the technology section.
          </p>
        )}
      </div>

      {/* Technology list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {technologies.map((tech, idx) => (
          <div key={tech.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', color: 'var(--ink-faint)' }}>#{idx + 1}</span>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--ink)', margin: 0 }}>{tech.name}</p>
                <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', color: 'var(--ink-faint)', margin: '2px 0 0 0' }}>
                  {tech.description.id || tech.description.en ? 'has description' : 'no description'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleReorder(tech.id, 'up')} disabled={idx === 0} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1, color: 'var(--ink-soft)' }}>↑</button>
                <button onClick={() => handleReorder(tech.id, 'down')} disabled={idx === technologies.length - 1} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: idx === technologies.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === technologies.length - 1 ? 0.4 : 1, color: 'var(--ink-soft)' }}>↓</button>
                <button onClick={() => setEditingId(editingId === tech.id ? null : tech.id)} style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer', color: 'var(--ink)' }}>
                  {editingId === tech.id ? 'Close' : 'Edit'}
                </button>
                <button onClick={() => handleDelete(tech.id)} style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer', color: 'var(--burnt)' }}>Delete</button>
              </div>
            </div>

            {editingId === tech.id && (
              <TechForm technology={tech} projectSlug={projectSlug} onSaved={() => { setEditingId(null); refresh(); }} onCancel={() => setEditingId(null)} />
            )}
          </div>
        ))}
      </div>

      {/* Add new technology */}
      {creating ? (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--burnt)', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.95rem', color: 'var(--ink)', margin: '0 0 16px 0' }}>New Technology</h3>
          <TechForm technology={null} projectSlug={projectSlug} onSaved={() => { setCreating(false); refresh(); }} onCancel={() => setCreating(false)} />
        </div>
      ) : (
        <button onClick={() => setCreating(true)} style={{ padding: '10px 20px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--paper)', background: 'var(--ink)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>+ Add Technology</button>
      )}
    </div>
  );
}

function TechForm({
  technology,
  projectSlug,
  onSaved,
  onCancel,
}: {
  technology: Technology | null;
  projectSlug: string;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(technology?.name || '');
  const [descId, setDescId] = useState(technology?.description?.id || '');
  const [descEn, setDescEn] = useState(technology?.description?.en || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const url = technology
        ? `/api/admin/technologies/${technology.id}`
        : `/api/admin/projects/${projectSlug}/technologies`;
      const method = technology ? 'PUT' : 'POST';
      const payload = { name, description: { id: descId, en: descEn } };

      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const data = await res.json(); setError(data.error || 'Save failed'); setSaving(false); return; }
      onSaved();
    } catch { setError('Network error'); }
    setSaving(false);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', fontFamily: 'var(--font-body), sans-serif',
    fontSize: '0.85rem', color: 'var(--ink)', background: 'var(--bg)',
    border: '1px solid var(--line-strong)', borderRadius: '6px', outline: 'none', marginBottom: '6px',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem',
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '4px', display: 'block',
  };

  return (
    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
      {error && <div style={{ color: 'var(--burnt)', fontSize: '0.8rem', marginBottom: '12px' }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={labelStyle}>Technology Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Next.js" required style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Description (Indonesia)</label>
            <textarea value={descId} onChange={(e) => setDescId(e.target.value)} rows={3} placeholder="Alasan penggunaan (biarkan kosong jika tidak ada)..." style={{ ...inputStyle, marginBottom: 0, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>Description (English)</label>
            <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} rows={3} placeholder="Reason for use (leave empty if none)..." style={{ ...inputStyle, marginBottom: 0, resize: 'vertical' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{ padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', color: 'var(--ink-soft)', background: 'none', border: '1px solid var(--line)', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
        <button onClick={handleSave} disabled={saving || !name} style={{ padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.85rem', color: 'var(--paper)', background: saving ? 'var(--ink-faint)' : 'var(--ink)', border: 'none', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  );
}
