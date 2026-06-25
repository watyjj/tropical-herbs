export function formatDbError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('Missing Supabase environment variables')) {
    return 'Database not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel env vars, then redeploy.';
  }

  if (message.includes('fetch failed') || message.includes('ENOTFOUND') || message.includes('ECONNREFUSED')) {
    return 'Cannot connect to Supabase. Check URL and service_role key, then redeploy.';
  }

  return message;
}
