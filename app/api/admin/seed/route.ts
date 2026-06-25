import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { createSupabaseAdmin } from '@/lib/supabase';
import { DEFAULT_SETTINGS, DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS, DEFAULT_BANNERS } from '@/lib/seed-data';

export async function POST(request: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createSupabaseAdmin();

    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (productsCount && productsCount > 0) {
      return NextResponse.json({ error: 'Products already exist. Add more from the Products tab or delete existing products first.' }, { status: 400 });
    }

    await supabase.from('settings').upsert({ id: 1, ...DEFAULT_SETTINGS });
    await supabase.from('products').insert(DEFAULT_PRODUCTS);
    await supabase.from('testimonials').insert(DEFAULT_TESTIMONIALS);
    await supabase.from('banners').insert(DEFAULT_BANNERS);

    return NextResponse.json({ success: true, message: 'Database seeded with default content!' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Seed failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
