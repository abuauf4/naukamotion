import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';
import { fallbackServices } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: services, error } = await supabasePublic
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('"order"', { ascending: true });

    if (error) throw error;

    if (services && services.length > 0) {
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
