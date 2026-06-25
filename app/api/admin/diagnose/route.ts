import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseConfig, testSupabaseConnection } from '@/lib/supabase';

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const config = getSupabaseConfig();
  const test = await testSupabaseConnection();

  return NextResponse.json({
    connected: test.ok,
    message: test.message,
    details: test.details,
    envCheck: {
      hasUrl: Boolean(config.url),
      hasAnonKey: Boolean(config.anonKey),
      hasServiceKey: Boolean(config.serviceKey),
      urlPreview: config.url ? `${config.url.slice(0, 30)}...` : 'MISSING',
      serviceKeyType: config.serviceKey.startsWith('eyJ')
        ? 'legacy JWT (good)'
        : config.serviceKey.startsWith('sb_secret_')
          ? 'new secret key'
          : config.serviceKey.startsWith('sb_publishable_')
            ? 'WRONG - this is publishable key'
            : config.serviceKey
              ? 'unknown format'
              : 'MISSING',
    },
  });
}

export const dynamic = 'force-dynamic';
