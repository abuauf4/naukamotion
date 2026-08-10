import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// JWT secret — NO hardcoded fallback. Must be set in env.
const SECRET_STRING = process.env.JWT_SECRET;
if (!SECRET_STRING && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}
const secret = new TextEncoder().encode(SECRET_STRING || 'dev-only-secret-not-for-production');

async function isValidToken(token: string): Promise<boolean> {
  if (!SECRET_STRING) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// Next.js 16: proxy.ts replaces middleware.ts
// https://nextjs.org/docs/messages/middleware-to-proxy
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /api/admin/* routes — return 401 if not authenticated
  if (pathname.startsWith('/api/admin/')) {
    // Allow auth route (login/logout)
    if (pathname === '/api/admin/auth') {
      return NextResponse.next();
    }

    const token = request.cookies.get('nauka-admin-token')?.value;

    if (!token || !(await isValidToken(token))) {
      return NextResponse.json(
        { error: 'Tidak terautentikasi. Silakan login kembali.' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // Protect /admin/* page routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('nauka-admin-token')?.value;

    // Allow access to /admin/login
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to dashboard
      if (token && await isValidToken(token)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Check for auth cookie
    if (!token || !(await isValidToken(token))) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
