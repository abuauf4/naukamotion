import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { requireAdmin } from '@/lib/admin-auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

type Params = { params: Promise<{ slug: string }> };

// GET — list media for a project
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const media = await prisma.projectMedia.findMany({
      where: { projectSlug: slug },
      orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }],
    });
    return NextResponse.json(media);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

// POST — upload new media
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { slug } = await params;

    // Verify project exists
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string | null;
    const sectionId = formData.get('sectionId') as string | null;
    const altId = formData.get('altId') as string | null;
    const altEn = formData.get('altEn') as string | null;
    const captionId = formData.get('captionId') as string | null;
    const captionEn = formData.get('captionEn') as string | null;

    if (!file || !type) {
      return NextResponse.json({ error: 'File and type are required' }, { status: 400 });
    }

    // Validate MIME type
    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json({ error: `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF` }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `File too large. Max ${MAX_FILE_SIZE / 1024 / 1024}MB` }, { status: 400 });
    }

    // Validate media type
    const validTypes = ['cover', 'og', 'desktop', 'mobile', 'gallery', 'section'];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: `Invalid media type: ${type}` }, { status: 400 });
    }

    // Section ownership invariant: if sectionId provided, must belong to same project
    if (sectionId) {
      const section = await prisma.caseStudySection.findUnique({ where: { id: sectionId } });
      if (!section || section.projectSlug !== slug) {
        return NextResponse.json({ error: 'sectionId does not belong to this project' }, { status: 400 });
      }
    }

    // For cover/og: check if one already exists (replace behavior)
    const isSingleAsset = type === 'cover' || type === 'og';
    let existingMedia: { id: string; publicId: string | null } | null = null;
    if (isSingleAsset) {
      existingMedia = await prisma.projectMedia.findFirst({
        where: { projectSlug: slug, type: type as 'cover' | 'og' },
        select: { id: true, publicId: true },
      });
    }

    // Upload to Cloudinary (dynamic import to avoid build-time issues)
    const { uploadToCloudinary, buildCloudinaryFolder, buildPublicId } = await import('@/lib/cloudinary');
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const folder = buildCloudinaryFolder(slug, type);
    const publicId = buildPublicId(slug, type, !isSingleAsset);

    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(fileBuffer, publicId, folder);
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    // Get max sortOrder for this type
    const maxOrder = await prisma.projectMedia.aggregate({
      where: { projectSlug: slug, type: type as 'cover' | 'og' | 'desktop' | 'mobile' | 'gallery' | 'section' },
      _max: { sortOrder: true },
    });

    // Save to DB
    try {
      // If replacing cover/og, delete old DB record first (Cloudinary asset already overwritten)
      if (existingMedia) {
        await prisma.projectMedia.delete({ where: { id: existingMedia.id } });
        // Old Cloudinary asset was overwritten by same publicId — no separate delete needed
      }

      const media = await prisma.projectMedia.create({
        data: {
          projectSlug: slug,
          sectionId: sectionId || null,
          type: type as 'cover' | 'og' | 'desktop' | 'mobile' | 'gallery' | 'section',
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          width: uploadResult.width,
          height: uploadResult.height,
          format: uploadResult.format,
          bytes: uploadResult.bytes,
          alt: (altId || altEn) ? { id: altId || '', en: altEn || '' } : undefined,
          caption: (captionId || captionEn) ? { id: captionId || '', en: captionEn || '' } : undefined,
          sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
        },
      });

      // Revalidate all routes that consume project cover or media.
      // Cover/OG changes affect metadata + cards across the site.
      // Other media types only affect the project's own page.
      revalidatePath(`/work/${slug}`, 'page');
      if (type === 'cover' || type === 'og') {
        const project = await prisma.project.findUnique({
          where: { slug },
          select: { categorySlug: true },
        });
        revalidatePath('/', 'page');
        revalidatePath('/work', 'page');
        if (project?.categorySlug) {
          revalidatePath(`/work/${project.categorySlug}`, 'page');
        }
      }

      return NextResponse.json(media, { status: 201 });
    } catch (dbError) {
      // DB save failed after upload — clean up orphaned Cloudinary asset
      console.error('DB save error after upload:', dbError);
      try {
        const { deleteFromCloudinary } = await import('@/lib/cloudinary');
        await deleteFromCloudinary(uploadResult.public_id);
      } catch {
        // Log but don't block error response
        console.error('Failed to clean up orphaned Cloudinary asset:', uploadResult.public_id);
      }
      return NextResponse.json({ error: 'Failed to save media metadata' }, { status: 500 });
    }
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
