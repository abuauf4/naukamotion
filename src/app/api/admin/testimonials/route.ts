import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: testimonials, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('"order"', { ascending: true });

    if (error) throw error;

    return NextResponse.json(testimonials ?? []);
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return NextResponse.json(
      { error: 'Gagal memuat data testimonial dari database' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: testimonial, error } = await supabaseAdmin
      .from('testimonials')
      .insert({
        quote: body.quote,
        author: body.author,
        role: body.role,
        company: body.company,
        featured: body.featured ?? false,
        order: body.order ?? 0,
        status: body.status ?? 'published',
        projectId: body.projectId,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    return NextResponse.json(
      { error: 'Gagal membuat testimonial — database tidak tersedia' },
      { status: 500 }
    );
  }
}
