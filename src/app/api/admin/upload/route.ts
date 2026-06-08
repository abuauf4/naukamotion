import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'portfolio';

    if (!file) {
      return NextResponse.json(
        { error: 'Tidak ada file yang dipilih' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipe file tidak didukung. Gunakan PNG, JPEG, WebP, atau GIF.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${timestamp}-${safeName}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(folder)
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json(
        { error: `Upload gagal: ${uploadError.message}` },
        { status: 500 }
      );
    }

    console.log('Upload success, path:', uploadData?.path);

    // Get public URL — this only works if the bucket is set to Public
    const { data: urlData } = supabaseAdmin.storage
      .from(folder)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      console.error('Failed to get public URL');
      return NextResponse.json(
        { error: 'Gagal mendapatkan URL gambar. Pastikan bucket Storage diset ke Public.' },
        { status: 500 }
      );
    }

    const publicUrl = `${urlData.publicUrl}?v=${timestamp}`;

    // Verify the image is actually accessible
    try {
      const verifyRes = await fetch(urlData.publicUrl, { method: 'HEAD' });
      if (!verifyRes.ok) {
        console.error('Image not publicly accessible. Status:', verifyRes.status);
        return NextResponse.json(
          { error: `Gambar ter-upload tapi tidak bisa diakses (status ${verifyRes.status}). Pastikan bucket "${folder}" diset ke Public di Supabase Storage.` },
          { status: 500 }
        );
      }
    } catch (verifyErr) {
      console.error('Verify fetch failed:', verifyErr);
      // Don't block the upload — just warn in logs
    }

    return NextResponse.json({
      url: publicUrl,
      path: `${folder}/${filePath}`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload gagal. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

// DELETE — remove a file from storage
export async function DELETE(request: NextRequest) {
  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json(
        { error: 'No path provided' },
        { status: 400 }
      );
    }

    // path format: "portfolio/timestamp-filename.ext"
    const parts = path.split('/');
    const bucket = parts[0];
    const filePath = parts.slice(1).join('/');

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: 'Delete failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}
