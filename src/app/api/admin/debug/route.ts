import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const diagnostics: Record<string, unknown> = {};

  // 1. Check env vars
  diagnostics.envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING';
  diagnostics.envAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 20) + '...)' : 'MISSING';
  diagnostics.envServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET (' + process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 20) + '...)' : 'MISSING';

  // 2. Test basic query (no order)
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('id, slug, title')
      .limit(3);

    diagnostics.basicQuery = { data, error: error ? { message: error.message, code: error.code, details: error.details } : null };
  } catch (e) {
    diagnostics.basicQuery = { error: e instanceof Error ? e.message : String(e) };
  }

  // 3. Test with order
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('id, slug, title')
      .order('order', { ascending: true })
      .limit(3);

    diagnostics.orderedQuery = { data, error: error ? { message: error.message, code: error.code, details: error.details } : null };
  } catch (e) {
    diagnostics.orderedQuery = { error: e instanceof Error ? e.message : String(e) };
  }

  // 4. Test services table
  try {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('id, slug, title')
      .limit(3);

    diagnostics.servicesQuery = { data, error: error ? { message: error.message, code: error.code } : null };
  } catch (e) {
    diagnostics.servicesQuery = { error: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
