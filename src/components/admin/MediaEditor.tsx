// Cloudinary Media CMS
'use client';

import { useState, useCallback, useRef } from 'react';

interface MediaItem {
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
}

interface Section {
  id: string;
  heading: { id: string; en: string };
  sortOrder: number;
}

// Staged error shape returned by POST /api/admin/projects/<slug>/media
// when any stage of the upload pipeline fails.
//
// `stage` identifies which step failed:
//   auth | project_lookup | parse_file | cloudinary_config
//   | cloudinary_upload | database_save | unknown
//
// `cloudinaryConfigured` is the ONLY env-derived signal — boolean only.
// Secrets (API key, secret, DATABASE_URL, JWT_SECRET) are NEVER exposed
// by the API.
interface UploadError {
  stage: string;
  error: string;
  cloudinaryConfigured: boolean;
}

// Human-readable labels for each pipeline stage, used in the error box
// so the admin knows which step failed without reading server logs.
const STAGE_LABELS: Record<string, string> = {
  auth: 'Auth',
  project_lookup: 'Project Lookup',
  parse_file: 'File Validation',
  cloudinary_config: 'Cloudinary Config',
  cloudinary_upload: 'Cloudinary Upload',
  database_save: 'Database Save',
  unknown: 'Unknown',
};

const MEDIA_GROUPS = [
  { type: 'cover', label: 'Cover', single: true },
  { type: 'og', label: 'OG Image', single: true },
  { type: 'desktop', label: 'Desktop Screenshots', single: false },
  { type: 'mobile', label: 'Mobile Screenshots', single: false },
  { type: 'gallery', label: 'Gallery', single: false },
  { type: 'section', label: 'Section Media', single: false },
];

export function MediaEditor({
  projectSlug,
  initialMedia,
  sections,
}: {
  projectSlug: string;
  initialMedia: MediaItem[];
  sections: Section[];
}) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  // error can be a plain string (delete/reorder failures) or a structured
  // UploadError (upload pipeline failures from POST /media).
  const [error, setError] = useState<string | UploadError | null>(null);

  // Helper: set a structured upload error
  const setUploadError = useCallback((err: UploadError | null) => {
    setError(err);
  }, []);

  // Helper: set a plain string error (for delete/reorder)
  const setStringError = useCallback((msg: string) => {
    setError(msg || null);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/projects/${projectSlug}/media`);
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch {}
  }, [projectSlug]);

  function getMediaByType(type: string): MediaItem[] {
    return media.filter((m) => m.type === type).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const item = media.find((m) => m.id === id);
    if (!item) return;
    const siblings = getMediaByType(item.type);
    const idx = siblings.findIndex((m) => m.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= siblings.length) return;

    const current = siblings[idx];
    const swap = siblings[swapIdx];

    await Promise.all([
      fetch(`/api/admin/media/${current.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: swap.sortOrder }),
      }),
      fetch(`/api/admin/media/${swap.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: current.sortOrder }),
      }),
    ]);
    refresh();
  }

  async function handleDelete(id: string, publicId: string | null) {
    if (!confirm('Delete this media? This will remove it from Cloudinary and the database.')) return;
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setStringError(data.error || 'Delete failed');
        return;
      }
      const result = await res.json();
      if (result.warning) {
        setStringError(result.warning);
        setTimeout(() => setStringError(''), 5000);
      }
      refresh();
    } catch {
      setStringError('Delete failed');
    }
  }

  return (
    <div>
      {error && (
        <div style={{
          background: 'rgba(216,90,42,0.1)', border: '1px solid var(--burnt)',
          borderRadius: '8px', padding: '12px 16px', marginBottom: '16px',
          fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', color: 'var(--burnt)',
        }}>
          {typeof error === 'string' ? (
            <span>{error}</span>
          ) : (
            <div>
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '6px',
                opacity: 0.85,
              }}>
                Upload failed at stage: {STAGE_LABELS[error.stage] || error.stage}
                {!error.cloudinaryConfigured && (
                  <span style={{ marginLeft: '8px', fontWeight: 600 }}>
                    · Cloudinary NOT configured
                  </span>
                )}
              </div>
              <div>{error.error}</div>
              {!error.cloudinaryConfigured && (
                <div style={{
                  marginTop: '6px',
                  fontSize: '0.75rem',
                  opacity: 0.85,
                }}>
                  Server env vars missing. Set CLOUDINARY_CLOUD_NAME,
                  CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Vercel
                  Project Settings.
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setError(null)}
            style={{
              float: 'right', background: 'none', border: 'none',
              color: 'var(--burnt)', cursor: 'pointer', fontWeight: 600,
            }}
          >×</button>
        </div>
      )}

      {MEDIA_GROUPS.map((group) => {
        const items = getMediaByType(group.type);
        return (
          <div key={group.type} style={{
            background: 'var(--bg-card)', border: '1px solid var(--line)',
            borderRadius: '10px', padding: '20px', marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{
                fontFamily: 'var(--font-body), sans-serif', fontWeight: 500,
                fontSize: '0.95rem', color: 'var(--ink)', margin: 0,
              }}>
                {group.label}
                {group.single && items.length > 0 && (
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', color: 'var(--ink-faint)', marginLeft: '8px' }}>
                    (replace existing)
                  </span>
                )}
              </h3>
            </div>

            {/* Existing media */}
            {items.map((item, idx) => (
              <div key={item.id} style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap',
                padding: '12px 0', borderBottom: '1px solid var(--line)',
              }}>
                {/* Preview */}
                <div style={{ position: 'relative', width: '80px', height: '60px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--line)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.alt?.en || item.alt?.id || 'media'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', color: 'var(--ink-faint)', margin: 0 }}>
                    {item.format?.toUpperCase()} · {item.width}×{item.height} · {item.bytes ? Math.round(item.bytes / 1024) : 0}KB
                  </p>
                  {item.alt?.id && <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.8rem', color: 'var(--ink-soft)', margin: '4px 0 0 0' }}>Alt: {item.alt.id}</p>}
                  {group.type === 'section' && item.sectionId && (
                    <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', color: 'var(--burnt)', margin: '4px 0 0 0' }}>
                      Section: {sections.find(s => s.id === item.sectionId)?.heading.id.substring(0, 30) || 'unknown'}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {!group.single && (
                    <>
                      <button onClick={() => handleReorder(item.id, 'up')} disabled={idx === 0} style={btnStyle(idx === 0)}>↑</button>
                      <button onClick={() => handleReorder(item.id, 'down')} disabled={idx === items.length - 1} style={btnStyle(idx === items.length - 1)}>↓</button>
                    </>
                  )}
                  <button onClick={() => setEditingId(editingId === item.id ? null : item.id)} style={btnStyle(false)}>Edit</button>
                  <button onClick={() => handleDelete(item.id, item.publicId)} style={{ ...btnStyle(false), color: 'var(--burnt)' }}>Del</button>
                </div>

                {/* Inline edit form */}
                {editingId === item.id && (
                  <AltCaptionForm
                    media={item}
                    sections={sections}
                    onSaved={() => { setEditingId(null); refresh(); }}
                    onCancel={() => setEditingId(null)}
                  />
                )}
              </div>
            ))}

            {/* Upload button */}
            <div style={{ marginTop: '12px' }}>
              {group.single && items.length > 0 ? (
                <UploadButton
                  projectSlug={projectSlug}
                  type={group.type}
                  sections={sections}
                  label="Replace"
                  onUploaded={refresh}
                  onError={setUploadError}
                />
              ) : (
                <UploadButton
                  projectSlug={projectSlug}
                  type={group.type}
                  sections={sections}
                  label="+ Add Image"
                  onUploaded={refresh}
                  onError={setUploadError}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: '4px 10px', fontSize: '0.75rem',
    background: 'var(--bg-soft)', border: '1px solid var(--line)',
    borderRadius: '4px', cursor: disabled ? 'not-allowed' : 'pointer',
    color: 'var(--ink-soft)', opacity: disabled ? 0.4 : 1,
  };
}

function UploadButton({
  projectSlug,
  type,
  sections,
  label,
  onUploaded,
  onError,
}: {
  projectSlug: string;
  type: string;
  sections: Section[];
  label: string;
  onUploaded: () => void;
  // onError now receives a structured UploadError OR null (to clear).
  // String-only errors from the legacy path are wrapped client-side.
  onError: (err: UploadError | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [sectionId, setSectionId] = useState('');
  const [altId, setAltId] = useState('');
  const [altEn, setAltEn] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const needsSection = type === 'section';

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    // Clear any prior error when a new file is picked
    onError(null);
    setSaved(false);
  }

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      onError({
        stage: 'parse_file',
        error: 'Please select a file',
        cloudinaryConfigured: true,
      });
      return;
    }
    if (needsSection && !sectionId) {
      onError({
        stage: 'parse_file',
        error: 'Please select a section for section media',
        cloudinaryConfigured: true,
      });
      return;
    }

    setUploading(true);
    onError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      if (sectionId) formData.append('sectionId', sectionId);
      if (altId) formData.append('altId', altId);
      if (altEn) formData.append('altEn', altEn);

      const res = await fetch(`/api/admin/projects/${projectSlug}/media`, {
        method: 'POST',
        body: formData,
      });

      // Parse JSON regardless of status — both success and failure return JSON
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Failure — extract structured error if API returned one,
        // otherwise synthesize an unknown-stage error from data.error
        const uploadErr: UploadError = {
          stage: data.stage || 'unknown',
          error: data.error || `Upload failed (HTTP ${res.status})`,
          cloudinaryConfigured:
            typeof data.cloudinaryConfigured === 'boolean'
              ? data.cloudinaryConfigured
              : true,
        };
        onError(uploadErr);
        setUploading(false);
        return;
      }

      // Success — API returned the persisted ProjectMedia row.
      // Show "Tersimpan" briefly, then refresh parent list + reset form.
      // The presence of `data.id` confirms the row was persisted to Neon.
      if (!data.id) {
        // Defensive: response was 2xx but no persisted row was returned.
        onError({
          stage: 'unknown',
          error: 'Upload reported success but no persisted media row was returned',
          cloudinaryConfigured: true,
        });
        setUploading(false);
        return;
      }

      setUploading(false);
      setSaved(true);
      // Brief "Tersimpan" flash, then reset local state and refresh parent
      setTimeout(() => {
        setPreview(null);
        setSectionId('');
        setAltId('');
        setAltEn('');
        if (fileRef.current) fileRef.current.value = '';
        setSaved(false);
        onUploaded();
      }, 1200);
    } catch {
      onError({
        stage: 'unknown',
        error: 'Network error during upload — could not reach the server',
        cloudinaryConfigured: true,
      });
      setUploading(false);
    }
  }

  return (
    <div style={{
      padding: '12px', background: 'var(--bg)', borderRadius: '8px',
      border: '1px dashed var(--line-strong)',
    }}>
      {/* Section selector for section media */}
      {needsSection && (
        <div style={{ marginBottom: '12px' }}>
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px', fontSize: '0.85rem',
              background: 'var(--bg-card)', border: '1px solid var(--line-strong)',
              borderRadius: '6px', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
            }}
          >
            <option value="">Select section...</option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>{s.heading.id.substring(0, 50)}</option>
            ))}
          </select>
        </div>
      )}

      {/* File picker */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          disabled={uploading}
          style={{ fontSize: '0.8rem', flex: 1, minWidth: '120px' }}
        />
        {preview && (
          <div style={{
            position: 'relative',
            width: '60px',
            height: '45px',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid var(--line)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* Status badge overlay — only shown when preview exists */}
            {!uploading && !saved && (
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                background: 'rgba(216,90,42,0.85)',
                color: 'var(--paper)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '1px 4px',
                textAlign: 'center',
              }}>
                Belum tersimpan
              </span>
            )}
            {saved && (
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                background: 'rgba(13,148,136,0.9)',
                color: 'var(--paper)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '1px 4px',
                textAlign: 'center',
              }}>
                Tersimpan ✓
              </span>
            )}
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={uploading || !preview || saved}
          style={{
            padding: '8px 16px', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500,
            fontSize: '0.85rem', color: 'var(--paper)',
            background: uploading || saved ? 'var(--ink-faint)' : 'var(--ink)',
            border: 'none', borderRadius: '6px',
            cursor: uploading || !preview || saved ? 'not-allowed' : 'pointer',
            opacity: !preview ? 0.5 : 1,
          }}
        >
          {uploading ? 'Mengunggah...' : saved ? 'Tersimpan ✓' : label}
        </button>
      </div>

      {/* Alt text fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginTop: '12px' }}>
        <input type="text" value={altId} onChange={(e) => setAltId(e.target.value)} placeholder="Alt text (ID) — optional" style={inputStyle} />
        <input type="text" value={altEn} onChange={(e) => setAltEn(e.target.value)} placeholder="Alt text (EN) — optional" style={inputStyle} />
      </div>
    </div>
  );
}

function AltCaptionForm({
  media,
  sections,
  onSaved,
  onCancel,
}: {
  media: MediaItem;
  sections: Section[];
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [altId, setAltId] = useState(media.alt?.id || '');
  const [altEn, setAltEn] = useState(media.alt?.en || '');
  const [captionId, setCaptionId] = useState(media.caption?.id || '');
  const [captionEn, setCaptionEn] = useState(media.caption?.en || '');
  const [sectionId, setSectionId] = useState(media.sectionId || '');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const update: Record<string, unknown> = {
        alt: (altId || altEn) ? { id: altId, en: altEn } : undefined,
        caption: (captionId || captionEn) ? { id: captionId, en: captionEn } : undefined,
      };
      if (media.type === 'section') {
        update.sectionId = sectionId || null;
      }

      await fetch(`/api/admin/media/${media.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      });
      onSaved();
    } catch {
      setSaving(false);
    }
  }

  return (
    <div style={{ width: '100%', padding: '12px 0 0 0', borderTop: '1px solid var(--line)', marginTop: '8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
        {media.type === 'section' && (
          <select value={sectionId} onChange={(e) => setSectionId(e.target.value)} style={inputStyle}>
            <option value="">No section</option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>{s.heading.id.substring(0, 50)}</option>
            ))}
          </select>
        )}
        <input type="text" value={altId} onChange={(e) => setAltId(e.target.value)} placeholder="Alt (ID)" style={inputStyle} />
        <input type="text" value={altEn} onChange={(e) => setAltEn(e.target.value)} placeholder="Alt (EN)" style={inputStyle} />
        <input type="text" value={captionId} onChange={(e) => setCaptionId(e.target.value)} placeholder="Caption (ID) — optional" style={inputStyle} />
        <input type="text" value={captionEn} onChange={(e) => setCaptionEn(e.target.value)} placeholder="Caption (EN) — optional" style={inputStyle} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
        <button onClick={onCancel} style={btnStyle(false)}>Cancel</button>
        <button onClick={handleSave} disabled={saving} style={{ ...btnStyle(false), background: 'var(--ink)', color: 'var(--paper)', fontWeight: 500 }}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', fontFamily: 'var(--font-body), sans-serif',
  fontSize: '0.85rem', color: 'var(--ink)', background: 'var(--bg-card)',
  border: '1px solid var(--line-strong)', borderRadius: '6px', outline: 'none',
  boxSizing: 'border-box',
};
