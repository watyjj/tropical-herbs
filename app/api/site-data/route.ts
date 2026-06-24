import { NextResponse } from 'next/server';
import { fetchSiteData } from '@/lib/auth';
import { DEFAULT_SETTINGS, DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS, DEFAULT_BANNERS } from '@/lib/seed-data';
import type { SiteData } from '@/lib/types';

function getFallbackData(): SiteData {
  return {
    settings: { id: 1, ...DEFAULT_SETTINGS },
    products: DEFAULT_PRODUCTS.map((p, i) => ({ ...p, id: `fallback-${i}` })),
    banners: DEFAULT_BANNERS.map((b, i) => ({ ...b, id: `fallback-${i}` })),
    testimonials: DEFAULT_TESTIMONIALS.map((t, i) => ({ ...t, id: `fallback-${i}` })),
  };
}

export async function GET() {
  try {
    const data = await fetchSiteData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(getFallbackData());
  }
}

export const revalidate = 60;
