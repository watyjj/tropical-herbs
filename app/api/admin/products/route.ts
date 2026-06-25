import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { createSupabaseAdmin } from '@/lib/supabase';
import { formatDbError } from '@/lib/api-utils';

async function requireAdmin() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

function handleDbError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Database error';
  if (message.includes('fetch failed')) {
    return NextResponse.json(
      {
        error: 'Cannot connect to Supabase database.',
        hint: 'Go to Vercel → Settings → Environment Variables. Verify NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. Use Legacy keys from Supabase. Then Redeploy.',
      },
      { status: 500 }
    );
  }
  if (message.includes('Missing environment') || message.includes('Invalid Supabase') || message.includes('Wrong key')) {
    return NextResponse.json({ error: message }, { status: 500 });
  }
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.from('products').select('*').order('sort_order');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return handleDbError(error);
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.from('products').insert(body).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return handleDbError(error);
  }
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return handleDbError(error);
  }
}

export async function DELETE(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleDbError(error);
  }
}

export const dynamic = 'force-dynamic';
