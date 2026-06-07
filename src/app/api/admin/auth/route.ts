import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createAdminToken } from '@/lib/auth';

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

    // Find admin by username
    const admin = await db.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Direct password comparison
    if (admin.password !== password) {
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
