import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { createSupabaseAdmin } from '@/lib/supabase';

async function requireAdmin() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from('testimonials').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from('testimonials').update(updates).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });

  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
