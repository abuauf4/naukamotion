import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { getAdminFromRequest } from '@/lib/admin-auth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.caseStudySection.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updateData: Record<string, unknown> = {};
    if (body.heading !== undefined) updateData.heading = body.heading;
    if (body.body !== undefined) updateData.body = body.body;
    if (body.bullets !== undefined) updateData.bullets = body.bullets;
    if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;

    const updated = await prisma.caseStudySection.update({
      where: { id },
      data: updateData,
    });

    revalidatePath(`/work/${existing.projectSlug}`, 'page');

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.caseStudySection.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.caseStudySection.delete({ where: { id } });

    revalidatePath(`/work/${existing.projectSlug}`, 'page');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
