import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fallbackProjects } from '@/lib/fallback-data';

export async function GET() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('*, clientRef:clients(*)')
      .order('"order"', { ascending: true });

    if (error) throw error;

    if (projects && projects.length > 0) {
      return NextResponse.json(projects);
    }

    // DB empty — return fallback
    return NextResponse.json(fallbackProjects);
  } catch {
    // DB unavailable — return fallback
    return NextResponse.json(fallbackProjects);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .insert({
        slug: body.slug,
        title: body.title,
        client: body.client,
        category: body.category,
        description: body.description,
        approach: body.approach,
        liveUrl: body.liveUrl,
        image: body.image,
        color: body.color ?? '#0d9488',
        featured: body.featured ?? false,
        order: body.order ?? 0,
        status: body.status ?? 'published',
        clientId: body.clientId,
      })
      .select('*, clientRef:clients(*)')
      .single();

    if (error) throw error;

    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to create project:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === '23505'
    ) {
      return NextResponse.json(
        { error: 'Slug sudah digunakan. Gunakan slug yang berbeda.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Gagal membuat proyek — database tidak tersedia' },
      { status: 500 }
    );
  }
}
