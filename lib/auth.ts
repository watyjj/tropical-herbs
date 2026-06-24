import crypto from 'crypto';
import { cookies } from 'next/headers';
import { createSupabaseAdmin } from './supabase';
import type { SiteData, Settings } from './types';
import { DEFAULT_SETTINGS } from './seed-data';

const SESSION_COOKIE = 'admin_session';

export function getAdminToken(): string {
  const password = process.env.ADMIN_PASSWORD || '';
  const secret = process.env.ADMIN_SECRET || 'tropical-herbs-secret';
  return crypto.createHash('sha256').update(`${password}:${secret}`).digest('hex');
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return Boolean(token && token === getAdminToken());
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export async function fetchSiteData(): Promise<SiteData> {
  const supabase = createSupabaseAdmin();

  const [settingsRes, productsRes, bannersRes, testimonialsRes] = await Promise.all([
    supabase.from('settings').select('*').eq('id', 1).single(),
    supabase.from('products').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('banners').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order'),
  ]);

  const settings: Settings = settingsRes.data || { id: 1, ...DEFAULT_SETTINGS };

  return {
    settings,
    products: productsRes.data || [],
    banners: bannersRes.data || [],
    testimonials: testimonialsRes.data || [],
  };
}

export async function fetchAdminSiteData(): Promise<SiteData> {
  const supabase = createSupabaseAdmin();

  const [settingsRes, productsRes, bannersRes, testimonialsRes] = await Promise.all([
    supabase.from('settings').select('*').eq('id', 1).single(),
    supabase.from('products').select('*').order('sort_order'),
    supabase.from('banners').select('*').order('sort_order'),
    supabase.from('testimonials').select('*').order('sort_order'),
  ]);

  return {
    settings: settingsRes.data || { id: 1, ...DEFAULT_SETTINGS },
    products: productsRes.data || [],
    banners: bannersRes.data || [],
    testimonials: testimonialsRes.data || [],
  };
}
