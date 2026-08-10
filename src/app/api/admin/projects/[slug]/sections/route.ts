import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { getAdminFromRequest } from '@/lib/admin-auth';

type Params = { params: Promise<{ slug: string }> };

// POST — Create section
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { slug } = await params;
    const body = await request.json();

    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    if (!body.heading?.id || !body.heading?.en) {
      return NextResponse.json({ error: 'Heading must have id and en' }, { status: 400 });
    }

    // Get max sortOrder
    const maxOrder = await prisma.caseStudySection.aggregate({
      where: { projectSlug: slug },
      _max: { sortOrder: true },
    });

    const section = await prisma.caseStudySection.create({
      data: {
        projectSlug: slug,
        sortOrder: body.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
        heading: body.heading,
        body: body.body || [],
        bullets: body.bullets || null,
      },
    });

    revalidatePath(`/work/${slug}`, 'page');

    return NextResponse.json(section, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}
