import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: insight, error } = await supabaseAdmin
      .from('insights')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !insight) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(insight);
  } catch (error) {
    console.error('Failed to fetch insight:', error);
    return NextResponse.json({ error: 'Failed to fetch insight' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check existence first
    const { data: existing, error: findError } = await supabaseAdmin
      .from('insights')
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Build update object
    const updateData: Record<string, unknown> = {};
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.body !== undefined) updateData.body = body.body;
    if (body.topic !== undefined) updateData.topic = body.topic;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.thumbnail !== undefined) updateData.thumbnail = body.thumbnail;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.publishedAt !== undefined) {
      updateData.publishedAt = body.publishedAt || null;
    }

    const { data: insight, error } = await supabaseAdmin
      .from('insights')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(insight);
  } catch (error) {
    console.error('Failed to update insight:', error);
    return NextResponse.json({ error: 'Failed to update insight' }, { status: 500 });
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
      .from('insights')
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('insights')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete insight:', error);
    return NextResponse.json({ error: 'Failed to delete insight' }, { status: 500 });
  }
}
