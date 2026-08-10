import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { _count: { select: { projects: true } } },
    });
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);

    const { slug } = await params;
    const body = await request.json();
    const { index, title, description, accent, status, sortOrder } = body;

    // Slug is permanent — do NOT allow changing it
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updated = await prisma.category.update({
      where: { slug },
      data: {
        ...(index !== undefined && { index }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(accent !== undefined && { accent }),
        ...(status !== undefined && { status }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/work', 'page');
    revalidatePath(`/work/${slug}`, 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);

    const { slug } = await params;

    // Prevent delete if category has projects
    const projectCount = await prisma.project.count({ where: { categorySlug: slug } });
    if (projectCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${projectCount} projects still belong to this category. Move or delete them first.` },
        { status: 409 }
      );
    }

    await prisma.category.delete({ where: { slug } });

    revalidatePath('/', 'layout');
    revalidatePath('/work', 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
