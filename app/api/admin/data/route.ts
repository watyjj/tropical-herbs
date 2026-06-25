import { NextResponse } from 'next/server';
import { verifyAdminSession, fetchAdminSiteData } from '@/lib/auth';

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized — log out and log in again with your ADMIN_PASSWORD' }, { status: 401 });
  }

  try {
    const data = await fetchAdminSiteData();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch data';
    return NextResponse.json(
      {
        error: message,
        hint: 'Check SUPABASE_SERVICE_ROLE_KEY in Vercel matches your Supabase Legacy service_role key, then Redeploy.',
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
