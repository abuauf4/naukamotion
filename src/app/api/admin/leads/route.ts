import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: leads, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('"createdAt"', { ascending: false });

    if (error) throw error;
    return NextResponse.json(leads ?? []);
  } catch {
    // DB unavailable — return empty (leads only come from form submissions)
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        message: body.message,
        status: body.status ?? 'new',
        notes: body.notes,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Failed to create lead:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan lead — database tidak tersedia' },
      { status: 500 }
    );
  }
}
