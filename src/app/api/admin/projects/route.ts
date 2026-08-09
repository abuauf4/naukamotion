import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { getAdminFromRequest } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const visibility = searchParams.get('visibility');

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category) where.categorySlug = category;
    if (status) where.status = status;
    if (type) where.type = type;
    if (visibility) where.visibility = visibility;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: { category: true, _count: { select: { sections: true, technologies: true } } },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    // Validate required fields
    if (!body.slug || !body.name || !body.categorySlug) {
      return NextResponse.json({ error: 'slug, name, categorySlug required' }, { status: 400 });
    }
    if (!body.tagline?.id || !body.tagline?.en) {
      return NextResponse.json({ error: 'tagline must have id and en' }, { status: 400 });
    }
    if (!body.summary?.id || !body.summary?.en) {
      return NextResponse.json({ error: 'summary must have id and en' }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({ where: { slug: body.slug } });
    if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });

    // Check category exists
    const cat = await prisma.category.findUnique({ where: { slug: body.categorySlug } });
    if (!cat) return NextResponse.json({ error: 'Category not found' }, { status: 400 });

    // Validate nextProjectSlug if provided
    if (body.nextProjectSlug === body.slug) {
      return NextResponse.json({ error: 'Project cannot point to itself as next' }, { status: 400 });
    }
    if (body.nextProjectSlug) {
      const nextProj = await prisma.project.findUnique({ where: { slug: body.nextProjectSlug } });
      if (!nextProj) return NextResponse.json({ error: 'nextProjectSlug not found' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        slug: body.slug,
        index: body.index || '00',
        name: body.name,
        categorySlug: body.categorySlug,
        tagline: body.tagline,
        summary: body.summary,
        year: body.year || new Date().getFullYear().toString(),
        client: body.client || '',
        industry: body.industry || '',
        cover: body.cover || '/portfolio/placeholder.png',
        accent: body.accent || '#D85A2A',
        liveUrl: body.liveUrl || null,
        status: body.status || 'published',
        type: body.type || 'client',
        visibility: body.visibility || 'public',
        sortOrder: body.sortOrder ?? 0,
        featured: body.featured ?? false,
        techStack: body.techStack || [],
        role: body.role || { id: '', en: '' },
        techIntro: body.techIntro || null,
        nextProjectSlug: body.nextProjectSlug || null,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/work', 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
