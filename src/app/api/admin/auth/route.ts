import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from '@/lib/auth';

// Admin credentials from env (fallback if DB is not available)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Bagas';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '122333';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Try database first
    let admin: { id: string; username: string; name: string } | null = null;

    try {
      const { db } = await import('@/lib/db');
      const dbAdmin = await db.admin.findUnique({ where: { username } });

      if (dbAdmin && dbAdmin.password === password) {
        admin = { id: dbAdmin.id, username: dbAdmin.username, name: dbAdmin.name };
      }
    } catch {
      // DB not available — fall through to env-based auth
    }

    // Fallback: env-based admin credentials
    if (!admin && username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      admin = { id: 'env-admin-1', username: ADMIN_USERNAME, name: 'Abu Aufa' };
    }

    if (!admin) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createAdminToken({
      adminId: admin.id,
      username: admin.username,
      name: admin.name,
    });

    // Set HttpOnly cookie and return success
    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, name: admin.name, username: admin.username },
    });

    response.cookies.set('nauka-admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

// DELETE — Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('nauka-admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
