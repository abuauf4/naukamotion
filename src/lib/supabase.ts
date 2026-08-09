import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase clients.
 *
 * Env vars are OPTIONAL — when not configured (e.g. local dev, CI, build),
 * the clients are stubs that throw on use. Existing try/catch in API routes
 * handles this gracefully (falls back to fallback-data or empty arrays).
 *
 * Type signature is always `SupabaseClient` (never null) so callers don't
 * need null checks — the try/catch pattern is sufficient.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseServiceKey && supabaseAnonKey;

/**
 * Create a stub client that throws on any method call.
 * Used when env vars are not set — callers must wrap in try/catch.
 */
function createStubClient(label: string): SupabaseClient {
  const handler: ProxyHandler<SupabaseClient> = {
    get() {
      throw new Error(
        `${label}: Supabase env vars not configured. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY.`
      );
    },
  };
  return new Proxy({} as SupabaseClient, handler);
}

// Admin-side client with service role (bypasses RLS).
// Stub when env vars are not set — callers must handle via try/catch.
export const supabaseAdmin: SupabaseClient = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : createStubClient('supabaseAdmin');

// Public client (respects RLS) — for read-only access.
// Stub when env vars are not set — callers must handle via try/catch.
export const supabasePublic: SupabaseClient = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createStubClient('supabasePublic');
