import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = { params: Promise<{ id: string }> };

// PUT — update media (alt, caption, sortOrder)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.projectMedia.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updateData: Record<string, unknown> = {};
    if (body.alt !== undefined) updateData.alt = body.alt;
    if (body.caption !== undefined) updateData.caption = body.caption;
    if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
    if (body.sectionId !== undefined) {
      // Validate section ownership if sectionId provided
      if (body.sectionId) {
        const section = await prisma.caseStudySection.findUnique({ where: { id: body.sectionId } });
        if (!section || section.projectSlug !== existing.projectSlug) {
          return NextResponse.json({ error: 'sectionId does not belong to this project' }, { status: 400 });
        }
      }
      updateData.sectionId = body.sectionId || null;
    }

    const updated = await prisma.projectMedia.update({
      where: { id },
      data: updateData,
    });

    revalidatePath(`/work/${existing.projectSlug}`, 'page');

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE — delete media (DB + Cloudinary)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.projectMedia.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Delete from Cloudinary first (if publicId exists)
    if (existing.publicId) {
      try {
        const { deleteFromCloudinary } = await import("@/lib/cloudinary"); await deleteFromCloudinary(existing.publicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
        // If Cloudinary delete fails, still delete DB record but report error
        await prisma.projectMedia.delete({ where: { id } });
        revalidatePath(`/work/${existing.projectSlug}`, 'page');
        return NextResponse.json({
          success: true,
          warning: 'Cloudinary asset deletion failed. DB record removed. Orphaned asset may remain in Cloudinary.',
        });
      }
    }

    // Delete from DB
    await prisma.projectMedia.delete({ where: { id } });

    revalidatePath(`/work/${existing.projectSlug}`, 'page');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
