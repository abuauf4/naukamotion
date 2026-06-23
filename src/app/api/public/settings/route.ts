import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Default settings — used when DB is empty/unavailable
const defaultSettings: Record<string, string> = {
  site_name: 'Nauka Motion',
  tagline: 'Small Movement. Real Impact.',
  headline: 'Membangun Produk Digital Dengan Arah Yang Jelas',
  subtitle: 'Dari website bisnis, sistem operasional, hingga pengalaman digital yang membantu bisnis bertumbuh.',
  whatsapp: '6289662524542',
  email: 'naukamotion@gmail.com',
  founder: 'Abu Aufa',
  stats_projects: '6',
  stats_services: '6',
  stats_industries: '4',
  seo_title: 'Nauka Motion — Small Movement. Real Impact.',
  seo_description: 'Studio digital yang membangun produk dengan arah jelas. Website, sistem, dan pengalaman digital yang menciptakan dampak nyata.',
};

export async function GET() {
  try {
    const { data: settings, error } = await supabasePublic
      .from('settings')
      .select('key, value');

    if (error) throw error;

    // Convert array to key-value object
    const settingsMap: Record<string, string> = { ...defaultSettings };
    if (settings && settings.length > 0) {
      for (const setting of settings) {
        settingsMap[setting.key] = setting.value;
      }
    }

    return NextResponse.json(settingsMap, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    // DB unavailable — return defaults
    return NextResponse.json(defaultSettings, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
