import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(services, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Public services error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
