import { createClient, SupabaseClient } from '@supabase/supabase-js';

function cleanEnv(value: string | undefined): string {
  return (value || '').trim().replace(/^["']|["']$/g, '');
}

export function getSupabaseConfig() {
  const url = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, '');
  const anonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const serviceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return { url, anonKey, serviceKey };
}

export function validateSupabaseConfig(requireService = true) {
  const { url, anonKey, serviceKey } = getSupabaseConfig();
  const missing: string[] = [];

  if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!anonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (requireService && !serviceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}. Add them in Vercel → Settings → Environment Variables, then Redeploy.`);
  }

  if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
    throw new Error(`Invalid Supabase URL: "${url}". It must look like https://YOUR-PROJECT-ID.supabase.co`);
  }

  if (requireService && serviceKey.startsWith('sb_publishable_')) {
    throw new Error('Wrong key in SUPABASE_SERVICE_ROLE_KEY. Use the service_role secret key from Supabase → API Keys → Legacy tab, not the publishable key.');
  }

  if (requireService && serviceKey.length < 100 && !serviceKey.startsWith('eyJ') && !serviceKey.startsWith('sb_secret_')) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY looks too short or invalid. Copy the full service_role key from Supabase.');
  }

  return { url, anonKey, serviceKey };
}

export function createSupabaseAdmin(): SupabaseClient {
  const { url, serviceKey } = validateSupabaseConfig(true);
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createSupabaseBrowser(): SupabaseClient {
  const { url, anonKey } = validateSupabaseConfig(false);
  return createClient(url, anonKey);
}

export async function testSupabaseConnection(): Promise<{ ok: boolean; message: string; details?: string }> {
  try {
    const { url } = validateSupabaseConfig(true);
    const supabase = createSupabaseAdmin();

    const { error } = await supabase.from('settings').select('id').limit(1);

    if (error) {
      if (error.message.includes('relation') || error.code === '42P01') {
        return {
          ok: false,
          message: 'Database tables not found. Run supabase/schema.sql in Supabase SQL Editor.',
          details: error.message,
        };
      }
      return { ok: false, message: 'Supabase query failed', details: error.message };
    }

    return { ok: true, message: `Connected to ${url}` };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    if (msg.includes('fetch failed')) {
      return {
        ok: false,
        message: 'Cannot reach Supabase. Check URL is correct, project is not paused, and keys are from the Legacy tab.',
        details: msg,
      };
    }
    return { ok: false, message: msg };
  }
}
