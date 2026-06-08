import { NextResponse } from 'next/server';
import { fallbackProjects } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { db } = await import('@/lib/db');
    const projects = await db.project.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        slug: true,
        client: true,
        category: true,
        title: true,
        description: true,
        approach: true,
        liveUrl: true,
        image: true,
        color: true,
        featured: true,
        order: true,
        updatedAt: true,
      },
    });

    if (projects.length > 0) {
      const enriched = projects.map((p) => ({
        ...p,
        image: p.image
          ? `${p.image}?v=${new Date(p.updatedAt).getTime()}`
          : null,
      }));
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
