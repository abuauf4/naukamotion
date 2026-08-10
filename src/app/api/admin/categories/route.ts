import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { projects: true } } },
    });
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    const body = await request.json();
    const { slug, index, title, description, accent, status, sortOrder } = body;

    if (!slug || !title || !description || !accent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!description.id || !description.en) {
      return NextResponse.json({ error: 'Description must have id and en' }, { status: 400 });
    }

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const category = await prisma.category.create({
      data: {
        slug,
        index: index || '00',
        title,
        description,
        accent,
        status: status || 'published',
        sortOrder: sortOrder ?? 0,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/work', 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
