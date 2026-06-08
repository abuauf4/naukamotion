import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: insights, error } = await supabaseAdmin
      .from('insights')
      .select('*')
      .order('"createdAt"', { ascending: false });

    if (error) throw error;
    return NextResponse.json(insights ?? []);
  } catch (error) {
    console.error('Failed to fetch insights:', error);
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: insight, error } = await supabaseAdmin
      .from('insights')
      .insert({
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt,
        body: body.body,
        topic: body.topic,
        author: body.author ?? 'Abu Aufa',
        thumbnail: body.thumbnail,
        status: body.status ?? 'draft',
        publishedAt: body.publishedAt ?? null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(insight, { status: 201 });
  } catch (error) {
    console.error('Failed to create insight:', error);
    return NextResponse.json({ error: 'Failed to create insight' }, { status: 500 });
  }
}
