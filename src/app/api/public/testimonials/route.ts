import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/public/testimonials
 *
 * Returns testimonials from Supabase (if configured & populated).
 *
 * NOTE: Fallback hardcoded testimonials have been REMOVED — they were
 * fabricated and the studio policy is "no testimonial is better than
 * fake testimonial". Populate real testimonials via the admin panel
 * if/when you have verifiable client quotes.
 *
 * When no testimonials are available, returns an empty array (200 OK),
 * not an error.
 */
export async function GET() {
  try {
    const { data: testimonials, error } = await supabasePublic
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('"order"', { ascending: true });

    if (error) throw error;

    return NextResponse.json(testimonials ?? [], {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    // DB unavailable — return empty array (no fabricated fallback)
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
