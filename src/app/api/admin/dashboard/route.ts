import { NextResponse } from 'next/server';

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

    return NextResponse.json({
      totalLeads,
      newLeadsThisMonth,
      activeProjects,
      publishedInsights,
      totalTestimonials,
      recentLeads,
      recentProjects,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    // Return empty dashboard data instead of crashing
    return NextResponse.json({
      totalLeads: 0,
      newLeadsThisMonth: 0,
      activeProjects: 0,
      publishedInsights: 0,
      totalTestimonials: 0,
      recentLeads: [],
      recentProjects: [],
    });
  }
}
