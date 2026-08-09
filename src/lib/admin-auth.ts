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
 * Require admin authentication in API route.
 * Returns admin session or throws a 401 Response.
 */
export async function requireAdmin(request: Request): Promise<AdminSession> {
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
