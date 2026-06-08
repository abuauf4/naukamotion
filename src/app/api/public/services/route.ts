import { NextResponse } from 'next/server';
import { fallbackServices } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { db } = await import('@/lib/db');
    const services = await db.service.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    });

    if (services.length > 0) {
      return NextResponse.json(services, {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
      });
    }

    return NextResponse.json(fallbackServices.filter((s) => s.status === 'published'), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json(fallbackServices.filter((s) => s.status === 'published'), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
