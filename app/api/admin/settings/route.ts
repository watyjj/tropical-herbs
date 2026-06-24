import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function PUT(request: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from('settings')
    .upsert({ id: 1, ...body, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
