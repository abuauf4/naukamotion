import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [
      totalLeadsResult,
      newLeadsThisMonthResult,
      activeProjectsResult,
      publishedInsightsResult,
      totalTestimonialsResult,
      recentLeadsResult,
      recentProjectsResult,
    ] = await Promise.all([
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).gte('"createdAt"', monthStart),
      supabaseAdmin.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabaseAdmin.from('insights').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabaseAdmin.from('testimonials').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabaseAdmin.from('leads').select('id, name, service, status, "createdAt"').order('"createdAt"', { ascending: false }).limit(5),
      supabaseAdmin.from('projects').select('id, title, client, category, status').order('"createdAt"', { ascending: false }).limit(5),
    ]);

    return NextResponse.json({
      totalLeads: totalLeadsResult.count ?? 0,
      newLeadsThisMonth: newLeadsThisMonthResult.count ?? 0,
      activeProjects: activeProjectsResult.count ?? 0,
      publishedInsights: publishedInsightsResult.count ?? 0,
      totalTestimonials: totalTestimonialsResult.count ?? 0,
      recentLeads: recentLeadsResult.data ?? [],
      recentProjects: recentProjectsResult.data ?? [],
    });
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return NextResponse.json(
      { error: 'Gagal memuat data dashboard' },
      { status: 500 }
    );
  }
}
