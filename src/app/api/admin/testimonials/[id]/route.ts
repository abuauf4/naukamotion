import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check existence first
    const { data: existing, error: findError } = await supabaseAdmin
      .from('testimonials')
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Build update object
    const updateData: Record<string, unknown> = {};
    if (body.quote !== undefined) updateData.quote = body.quote;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.role !== undefined) updateData.role = body.role;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.projectId !== undefined) updateData.projectId = body.projectId;

    const { data: testimonial, error } = await supabaseAdmin
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check existence first
    const { data: existing, error: findError } = await supabaseAdmin
      .from('testimonials')
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
