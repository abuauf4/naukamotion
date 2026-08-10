/**
 * Admin Auth — Server-side utilities
 *
 * Provides functions for verifying admin sessions in API routes
 * and server components. Uses JWT (jose) for stateless sessions.
 */

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_STRING = process.env.JWT_SECRET;

if (!SECRET_STRING) {
  throw new Error('JWT_SECRET environment variable is required');
}

const secret = new TextEncoder().encode(SECRET_STRING);

export interface AdminSession {
  adminId: string;
  username: string;
  name: string;
}

export async function createAdminToken(payload: AdminSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      adminId: payload.adminId as string,
      username: payload.username as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

/**
 * Get admin session from request cookies.
 * Returns null if not authenticated.
 * Use in API route handlers.
 */
export async function getAdminFromRequest(request: Request): Promise<AdminSession | null> {
  const cookieHeader = request.headers.get('cookie') || '';
  const token = parseCookie(cookieHeader, 'nauka-admin-token');
  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Verify same-origin / CSRF protection for mutation requests.
 * Checks that the Origin or Referer header matches the expected site origin.
 * This prevents cross-site request forgery even with SameSite=lax cookies
 * (which allow top-level GET navigations from cross-origin).
 *
 * For mutation methods (POST, PUT, DELETE, PATCH), the browser sends
 * an Origin header. We verify it matches our known site URL.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');

  // In production, verify against known site URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${host}`;
  const allowedOrigins = [siteUrl];

  // Also allow localhost in development
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push(`http://${host}`);
    allowedOrigins.push(`http://localhost:3000`);
    allowedOrigins.push(`http://localhost:3001`);
  }

  // Check Origin header (preferred for CSRF)
  if (origin) {
    return allowedOrigins.some(allowed => origin === allowed);
  }

  // Fallback: check Referer header
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return allowedOrigins.some(allowed => {
        const allowedUrl = new URL(allowed);
        return refererUrl.origin === allowedUrl.origin;
      });
    } catch {
      return false;
    }
  }

  // If neither Origin nor Referer present, reject in production
  // (browsers always send these for cross-origin requests)
  return process.env.NODE_ENV !== 'production';
}

/**
 * Require admin authentication AND same-origin for mutation requests.
 * Returns admin session or throws an appropriate error Response.
 */
export async function requireAdmin(request: Request): Promise<AdminSession> {
  // Check same-origin first (CSRF protection)
  if (!isSameOrigin(request)) {
    throw new Response(JSON.stringify({ error: 'Forbidden: cross-origin request' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const admin = await getAdminFromRequest(request);
  if (!admin) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return admin;
}

/**
 * Get admin session in server components (using next/headers cookies).
 * Returns null if not authenticated.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('nauka-admin-token')?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

function parseCookie(header: string, name: string): string | undefined {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1];
}
