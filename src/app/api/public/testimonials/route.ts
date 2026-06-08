import { NextResponse } from 'next/server';
import { fallbackTestimonials } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { db } = await import('@/lib/db');
    const testimonials = await db.testimonial.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    });

    if (testimonials.length > 0) {
      return NextResponse.json(testimonials, {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
      });
    }

    return NextResponse.json(fallbackTestimonials.filter((t) => t.status === 'published'), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json(fallbackTestimonials.filter((t) => t.status === 'published'), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
