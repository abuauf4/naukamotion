import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fallbackTestimonials } from '@/lib/fallback-data';

export async function GET() {
  try {
    const { data: testimonials, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('"order"', { ascending: true });

    if (error) throw error;

    if (testimonials && testimonials.length > 0) {
      return NextResponse.json(testimonials);
    }

    return NextResponse.json(fallbackTestimonials);
  } catch {
    return NextResponse.json(fallbackTestimonials);
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
