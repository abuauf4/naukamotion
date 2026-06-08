import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: settings, error } = await supabaseAdmin
      .from('settings')
      .select('*');

    if (error) throw error;

    // Convert array to key-value object
    const settingsMap: Record<string, string> = {};
    if (settings) {
      for (const setting of settings) {
        settingsMap[setting.key] = setting.value;
      }
    }
    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    // Body expects array of { key, value }
    const items: Array<{ key: string; value: string }> = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Request body must be an array of { key, value } objects' },
        { status: 400 }
      );
    }

    // Upsert each setting
    const results = await Promise.all(
      items.map((item) =>
        supabaseAdmin
          .from('settings')
          .upsert({ key: item.key, value: item.value }, { onConflict: 'key' })
          .select()
      )
    );

    // Collect all upserted rows
    const allResults = results.flatMap((r) => r.data ?? []);

    return NextResponse.json(allResults);
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
