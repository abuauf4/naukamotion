import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        category: true,
        sections: { orderBy: { sortOrder: 'asc' } },
        technologies: { orderBy: { sortOrder: 'asc' } },
        media: { orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }] },
      },
    });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);

    const { slug } = await params;
    const body = await request.json();

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Validate nextProjectSlug
    if (body.nextProjectSlug === slug) {
      return NextResponse.json({ error: 'Project cannot point to itself as next' }, { status: 400 });
    }
    if (body.nextProjectSlug) {
      const nextProj = await prisma.project.findUnique({ where: { slug: body.nextProjectSlug } });
      if (!nextProj) return NextResponse.json({ error: 'nextProjectSlug not found' }, { status: 400 });
    }

    // Validate category if changing
    if (body.categorySlug && body.categorySlug !== existing.categorySlug) {
      const cat = await prisma.category.findUnique({ where: { slug: body.categorySlug } });
      if (!cat) return NextResponse.json({ error: 'Category not found' }, { status: 400 });
    }

    // Build update data — only update provided fields
    const updateData: Record<string, unknown> = {};
    const allowedFields = [
      'index', 'name', 'categorySlug', 'tagline', 'summary', 'year', 'client',
      'industry', 'cover', 'accent', 'liveUrl', 'status', 'type', 'visibility',
      'sortOrder', 'featured', 'techStack', 'role', 'techIntro', 'nextProjectSlug',
    ];
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field] === null ? null : body[field];
      }
    }

    const updated = await prisma.project.update({
      where: { slug },
      data: updateData,
    });

    // Revalidate affected paths
    revalidatePath('/', 'layout');
    revalidatePath('/work', 'page');
    revalidatePath(`/work/${slug}`, 'page');
    if (existing.categorySlug) revalidatePath(`/work/${existing.categorySlug}`, 'page');
    if (body.categorySlug && body.categorySlug !== existing.categorySlug) {
      revalidatePath(`/work/${body.categorySlug}`, 'page');
    }
    revalidatePath('/sitemap.xml');

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);

    const { slug } = await params;
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.project.delete({ where: { slug } });

    revalidatePath('/', 'layout');
    revalidatePath('/work', 'page');
    revalidatePath(`/work/${existing.categorySlug}`, 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
