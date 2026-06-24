import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, fetchAdminSiteData } from '@/lib/auth';

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await fetchAdminSiteData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
