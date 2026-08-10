import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = { params: Promise<{ slug: string }> };

// POST — Create technology
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);

    const { slug } = await params;
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: 'Technology name required' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const maxOrder = await prisma.projectTechnology.aggregate({
      where: { projectSlug: slug },
      _max: { sortOrder: true },
    });

    const tech = await prisma.projectTechnology.create({
      data: {
        projectSlug: slug,
        name: body.name,
        description: body.description || { id: '', en: '' },
        sortOrder: body.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    revalidatePath(`/work/${slug}`, 'page');

    return NextResponse.json(tech, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create technology' }, { status: 500 });
  }
}
