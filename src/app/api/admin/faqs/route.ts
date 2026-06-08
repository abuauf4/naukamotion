import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: faqs, error } = await supabaseAdmin
      .from('faqs')
      .select('*')
      .order('"order"', { ascending: true });

    if (error) throw error;
    return NextResponse.json(faqs ?? []);
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: faq, error } = await supabaseAdmin
      .from('faqs')
      .insert({
        question: body.question,
        answer: body.answer,
        category: body.category ?? 'general',
        order: body.order ?? 0,
        status: body.status ?? 'published',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('Failed to create FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
