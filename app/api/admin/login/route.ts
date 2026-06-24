import { NextRequest, NextResponse } from 'next/server';
import { getAdminToken, getSessionCookieName } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = getAdminToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(getSessionCookieName());
  return response;
}
