import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey || serviceKey === 'placeholder') {
      console.error('Supabase not configured:', {
        url: supabaseUrl ? 'SET' : 'MISSING',
        key: serviceKey ? (serviceKey === 'placeholder' ? 'PLACEHOLDER' : 'SET') : 'MISSING',
      });
      return NextResponse.json(
        { error: 'Supabase belum dikonfigurasi. Set NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di environment variables.' },
        { status: 500 }
      );
    }

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
    const filename = `${folder}/${timestamp}-${safeName}`;

    // Upload to Supabase Storage via REST API
    const arrayBuffer = await file.arrayBuffer();

    const uploadRes = await fetch(
      `${supabaseUrl}/storage/v1/object/${folder}/${timestamp}-${safeName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': file.type,
          'x-upsert': 'true',
        },
        body: arrayBuffer,
      }
    );

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error('Supabase upload error:', uploadRes.status, errText);
      return NextResponse.json(
        { error: `Upload gagal: ${uploadRes.status}` },
        { status: 500 }
      );
    }

    // Return public URL with cache-bust
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${filename}`;
    const cacheBustUrl = `${publicUrl}?v=${timestamp}`;

    return NextResponse.json({
      url: cacheBustUrl,
      path: filename,
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const { path } = await request.json();

    if (!path) {
      return NextResponse.json(
        { error: 'No path provided' },
        { status: 400 }
      );
    }

    const deleteRes = await fetch(
      `${supabaseUrl}/storage/v1/object/${path}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    );

    if (!deleteRes.ok) {
      const err = await deleteRes.text();
      console.error('Supabase delete error:', err);
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
