import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: clients, error } = await supabaseAdmin
      .from('clients')
      .select('*')
      .order('"createdAt"', { ascending: false });

    if (error) throw error;
    return NextResponse.json(clients ?? []);
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: client, error } = await supabaseAdmin
      .from('clients')
      .insert({
        name: body.name,
        industry: body.industry,
        website: body.website,
        logo: body.logo,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Failed to create client:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
