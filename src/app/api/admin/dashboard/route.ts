import { NextResponse } from 'next/server';
import { fallbackProjects } from '@/lib/fallback-data';
import { fallbackTestimonials } from '@/lib/fallback-data';

export async function GET() {
  try {
    const { db } = await import('@/lib/db');

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalLeads,
      newLeadsThisMonth,
      activeProjects,
      publishedInsights,
      totalTestimonials,
      recentLeads,
      recentProjects,
    ] = await Promise.all([
      db.lead.count(),
      db.lead.count({
        where: { createdAt: { gte: monthStart } },
      }),
      db.project.count({
        where: { status: 'published' },
      }),
      db.insight.count({
        where: { status: 'published' },
      }),
      db.testimonial.count({
        where: { status: 'published' },
      }),
      db.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          service: true,
          status: true,
          createdAt: true,
        },
      }),
      db.project.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          client: true,
          category: true,
          status: true,
        },
      }),
    ]);

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
