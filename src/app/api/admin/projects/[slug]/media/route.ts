import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/cms/db';
import { requireAdmin } from '@/lib/admin-auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const VALID_MEDIA_TYPES = ['cover', 'og', 'desktop', 'mobile', 'gallery', 'section'] as const;

type Params = { params: Promise<{ slug: string }> };

// ─── Staged error response helper ───
//
// Every failure path in POST returns this shape:
//   {
//     success: false,
//     stage: 'auth' | 'project_lookup' | 'parse_file' | 'cloudinary_config'
//          | 'cloudinary_upload' | 'database_save' | 'unknown',
//     error: '<human-readable message>',
//     cloudinaryConfigured: boolean
//   }
//
// Secrets are NEVER included. cloudinaryConfigured is the only env-derived
// signal exposed — it is a boolean derived from isCloudinaryConfigured
// (presence of CLOUDINARY_CLOUD_NAME + API_KEY + API_SECRET).
//
// On success (HTTP 201), the persisted ProjectMedia row is returned
// directly — the frontend uses the presence of `id` + 2xx status to
// mark the upload as "Tersimpan".

type Stage =
  | 'auth'
  | 'project_lookup'
  | 'parse_file'
  | 'cloudinary_config'
  | 'cloudinary_upload'
  | 'database_save'
  | 'unknown';

function stageError(
  stage: Stage,
  error: string,
  status: number,
  cloudinaryConfigured: boolean = true
) {
  return NextResponse.json(
    {
      success: false,
      stage,
      error,
      cloudinaryConfigured,
    },
    { status }
  );
}

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
//
// Staged pipeline (each stage returns stageError on failure):
//   1. auth              — verify admin JWT
//   2. project_lookup    — verify project slug exists
//   3. parse_file        — extract form fields, validate MIME/size/type
//   4. cloudinary_config — check isCloudinaryConfigured (env presence only)
//   5. cloudinary_upload — call uploadToCloudinary
//   6. database_save     — prisma.projectMedia.create
//
// On success returns the persisted ProjectMedia row (HTTP 201).
export async function POST(request: NextRequest, { params }: Params) {
  // ─── Stage 1: auth ───
  let admin;
  try {
    admin = await requireAdmin(request);
  } catch (err) {
    console.error('Auth stage error:', err);
    return stageError('auth', 'Authentication check failed', 500);
  }
  if (!admin) {
    return stageError('auth', 'Unauthorized — admin login required', 401);
  }

  const { slug } = await params;

  // ─── Stage 2: project_lookup ───
  let project;
  try {
    project = await prisma.project.findUnique({ where: { slug } });
  } catch (err) {
    console.error('Project lookup stage error:', err);
    return stageError('project_lookup', 'Database error while looking up project', 500);
  }
  if (!project) {
    return stageError('project_lookup', `Project not found: ${slug}`, 404);
  }

  // ─── Stage 3: parse_file ───
  let file: File | null;
  let type: string | null;
  let sectionId: string | null;
  let altId: string | null;
  let altEn: string | null;
  let captionId: string | null;
  let captionEn: string | null;
  try {
    const formData = await request.formData();
    file = formData.get('file') as File | null;
    type = formData.get('type') as string | null;
    sectionId = formData.get('sectionId') as string | null;
    altId = formData.get('altId') as string | null;
    altEn = formData.get('altEn') as string | null;
    captionId = formData.get('captionId') as string | null;
    captionEn = formData.get('captionEn') as string | null;
  } catch (err) {
    console.error('Form parse error:', err);
    return stageError('parse_file', 'Failed to parse multipart form data', 400);
  }

  if (!file || !type) {
    return stageError('parse_file', 'File and type are required', 400);
  }
  if (!ALLOWED_MIME.includes(file.type)) {
    return stageError(
      'parse_file',
      `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF`,
      400
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    return stageError(
      'parse_file',
      `File too large (${Math.round(file.size / 1024 / 1024)}MB). Max ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      400
    );
  }
  if (!VALID_MEDIA_TYPES.includes(type as typeof VALID_MEDIA_TYPES[number])) {
    return stageError('parse_file', `Invalid media type: ${type}`, 400);
  }

  // Section ownership invariant
  if (sectionId) {
    let section;
    try {
      section = await prisma.caseStudySection.findUnique({ where: { id: sectionId } });
    } catch (err) {
      console.error('Section lookup error:', err);
      return stageError('parse_file', 'Database error while validating sectionId', 500);
    }
    if (!section || section.projectSlug !== slug) {
      return stageError(
        'parse_file',
        'sectionId does not belong to this project',
        400
      );
    }
  }

  // ─── Stage 4: cloudinary_config ───
  // Dynamic import — avoids Cloudinary SDK init at build time.
  const {
    uploadToCloudinary,
    deleteFromCloudinary,
    buildCloudinaryFolder,
    buildPublicId,
    isCloudinaryConfigured,
  } = await import('@/lib/cloudinary');

  if (!isCloudinaryConfigured) {
    // Env vars missing. NEVER echo which vars or their values.
    return stageError(
      'cloudinary_config',
      'Cloudinary is not configured on the server. Required env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET (set in Vercel Project Settings).',
      500,
      false // cloudinaryConfigured
    );
  }

  // For cover/og: check if one already exists (replace behavior)
  const isSingleAsset = type === 'cover' || type === 'og';
  let existingMedia: { id: string; publicId: string | null } | null = null;
  if (isSingleAsset) {
    try {
      existingMedia = await prisma.projectMedia.findFirst({
        where: { projectSlug: slug, type: type as 'cover' | 'og' },
        select: { id: true, publicId: true },
      });
    } catch (err) {
      console.error('Existing media lookup error:', err);
      return stageError('database_save', 'Database error while checking existing cover/og', 500);
    }
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const folder = buildCloudinaryFolder(slug, type);
  const publicId = buildPublicId(slug, type, !isSingleAsset);

  // ─── Stage 5: cloudinary_upload ───
  let uploadResult;
  try {
    uploadResult = await uploadToCloudinary(fileBuffer, publicId, folder);
  } catch (uploadError) {
    // Log full error server-side; return generic message to client.
    // NEVER include credentials, request signature, or env-derived values.
    console.error('Cloudinary upload error:', uploadError);
    return stageError(
      'cloudinary_upload',
      'Cloudinary upload failed — the image could not be transferred to Cloudinary.',
      500,
      true // cloudinaryConfigured (config was present; upload itself failed)
    );
  }

  // Get max sortOrder for this type
  let maxOrder;
  try {
    maxOrder = await prisma.projectMedia.aggregate({
      where: {
        projectSlug: slug,
        type: type as 'cover' | 'og' | 'desktop' | 'mobile' | 'gallery' | 'section',
      },
      _max: { sortOrder: true },
    });
  } catch (err) {
    console.error('sortOrder aggregate error:', err);
    // Cleanup orphan then return error
    try {
      await deleteFromCloudinary(uploadResult.public_id);
    } catch (cleanupErr) {
      console.error('Failed to cleanup orphan after sortOrder failure:', cleanupErr);
    }
    return stageError(
      'database_save',
      'Database error while computing next sortOrder',
      500
    );
  }

  // ─── Stage 6: database_save ───
  try {
    // If replacing cover/og, delete old DB record first
    // (Cloudinary asset already overwritten by same publicId)
    if (existingMedia) {
      await prisma.projectMedia.delete({ where: { id: existingMedia.id } });
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

    // Revalidate — only after DB write succeeded (so cache reflects truth)
    revalidatePath(`/work/${slug}`, 'page');
    if (type === 'cover' || type === 'og') {
      revalidatePath('/', 'page');
      revalidatePath('/work', 'page');
      if (project?.categorySlug) {
        revalidatePath(`/work/${project.categorySlug}`, 'page');
      }
    }

    // Success — return the persisted ProjectMedia row (HTTP 201).
    // Frontend uses presence of `id` + 2xx to mark "Tersimpan".
    return NextResponse.json(media, { status: 201 });
  } catch (dbError) {
    // DB save failed after upload — clean up orphaned Cloudinary asset
    console.error('DB save error after upload:', dbError);
    try {
      await deleteFromCloudinary(uploadResult.public_id);
    } catch (cleanupErr) {
      console.error(
        'Failed to clean up orphaned Cloudinary asset:',
        uploadResult.public_id,
        cleanupErr
      );
    }
    return stageError(
      'database_save',
      'ProjectMedia could not be saved — database write failed. The uploaded Cloudinary asset was rolled back.',
      500
    );
  }
}
