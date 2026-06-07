import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(testimonials, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Public testimonials error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
