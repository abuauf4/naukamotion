import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: services, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('"order"', { ascending: true });

    if (error) throw error;
    return NextResponse.json(services ?? []);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: service, error } = await supabaseAdmin
      .from('services')
      .insert({
        slug: body.slug,
        title: body.title,
        summary: body.summary,
        icon: body.icon,
        order: body.order ?? 0,
        status: body.status ?? 'published',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(service, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to create service:', error);
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
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
