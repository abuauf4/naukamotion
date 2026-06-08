import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';
import { fallbackProjects } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: projects, error } = await supabasePublic
      .from('projects')
      .select('id, slug, client, category, title, description, approach, "liveUrl", image, color, featured, "order", "updatedAt"')
      .eq('status', 'published')
      .order('"order"', { ascending: true });

    if (error) throw error;

    if (projects && projects.length > 0) {
      const enriched = projects.map((p) => {
        let imageUrl = p.image || null;
        if (imageUrl) {
          // Remove existing ?v= or &v= from upload cache-buster to avoid double ?v=
          const cleanUrl = imageUrl.split('?')[0];
          imageUrl = `${cleanUrl}?v=${new Date(p.updatedAt).getTime()}`;
        }
        return { ...p, image: imageUrl };
      });
      return NextResponse.json(enriched, {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
      });
    }

    // DB empty — return fallback
    return NextResponse.json(fallbackProjects.filter((p) => p.status === 'published'), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    // DB unavailable — return fallback
    return NextResponse.json(fallbackProjects.filter((p) => p.status === 'published'), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
