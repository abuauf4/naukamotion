import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: insights, error } = await supabasePublic
      .from('insights')
      .select('id, slug, title, excerpt, topic, author, thumbnail, "publishedAt"')
      .eq('status', 'published')
      .order('"publishedAt"', { ascending: false })
      .limit(3);

    if (error) throw error;

    return NextResponse.json(insights ?? [], {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    // No fallback for insights — return empty
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
