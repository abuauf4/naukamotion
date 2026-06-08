import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fallbackProjects } from '@/lib/fallback-data';
import { fallbackTestimonials } from '@/lib/fallback-data';

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

    const totalLeads = totalLeadsResult.count ?? 0;
    const newLeadsThisMonth = newLeadsThisMonthResult.count ?? 0;
    const activeProjects = activeProjectsResult.count ?? 0;
    const publishedInsights = publishedInsightsResult.count ?? 0;
    const totalTestimonials = totalTestimonialsResult.count ?? 0;
    const recentLeads = recentLeadsResult.data ?? [];
    const recentProjects = recentProjectsResult.data ?? [];

    // If DB has data, return it
    if (activeProjects > 0 || totalLeads > 0) {
      return NextResponse.json({
        totalLeads,
        newLeadsThisMonth,
        activeProjects,
        publishedInsights,
        totalTestimonials,
        recentLeads,
        recentProjects,
      });
    }
  } catch {
    // DB unavailable — fall through to fallback
  }

  // Fallback data — from hardcoded portfolio
  return NextResponse.json({
    totalLeads: 0,
    newLeadsThisMonth: 0,
    activeProjects: fallbackProjects.filter((p) => p.status === 'published').length,
    publishedInsights: 0,
    totalTestimonials: fallbackTestimonials.filter((t) => t.status === 'published').length,
    recentLeads: [],
    recentProjects: fallbackProjects.slice(0, 5).map((p) => ({
      id: p.id,
      title: p.title,
      client: p.client,
      category: p.category,
      status: p.status,
    })),
  });
}
