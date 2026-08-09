'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login gagal');
        setLoading(false);
        return;
      }

      const from = searchParams.get('from') || '/admin';
      router.push(from);
      router.refresh();
    } catch {
      setError('Koneksi gagal. Coba lagi.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontWeight: 600,
            fontSize: '1.5rem',
            color: 'var(--ink)',
          }}>
            NAUKA{' '}
            <span style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--burnt)',
            }}>
              motion
            </span>
          </span>
          <p style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.7rem',
            color: 'var(--ink-faint)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}>
            Admin CMS
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--line)',
          borderRadius: '12px',
          padding: '32px 24px',
        }}>
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
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: '8px',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '0.95rem',
                color: 'var(--ink)',
                background: 'var(--bg)',
                border: '1px solid var(--line-strong)',
                borderRadius: '8px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: '8px',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '0.95rem',
                color: 'var(--ink)',
                background: 'var(--bg)',
                border: '1px solid var(--line-strong)',
                borderRadius: '8px',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: 'var(--paper)',
              background: loading ? 'var(--ink-faint)' : 'var(--ink)',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {loading ? 'Memuat...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
