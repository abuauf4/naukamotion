import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
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

    // Add cache-bust param to image URLs
    const enriched = projects.map((p) => ({
      ...p,
      image: p.image
        ? `${p.image}?v=${new Date(p.updatedAt).getTime()}`
        : null,
    }));

    return NextResponse.json(enriched, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Public projects error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
