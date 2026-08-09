import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase clients.
 *
 * Env vars are OPTIONAL — when not configured (e.g. local dev, CI, build),
 * the exports are `null` and API routes that depend on them fall back to
 * their hardcoded fallback data. This prevents the build from crashing
 * on `createClient('', '')`.
 *
 * When env vars ARE set (production), the admin and public clients are
 * created as expected.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseServiceKey && supabaseAnonKey;

// Admin-side client with service role (bypasses RLS).
// `null` when env vars are not set — callers must handle gracefully.
export const supabaseAdmin: SupabaseClient | null = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Public client (respects RLS) — for read-only access.
// `null` when env vars are not set — callers must handle gracefully.
export const supabasePublic: SupabaseClient | null = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
