import { getSiteData, getFallbackData } from '@/lib/data';
import { getSiteUrl } from '@/lib/seo/config';
import { getProductSlug, getCategorySlug, getUniqueCategories } from '@/lib/seo/slug';
import { getAllBlogSlugs } from '@/lib/seo/blog-posts';
import type { SiteData } from '@/lib/types';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function safeDate(value?: string | null): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapUrls(data: SiteData): SitemapUrl[] {
  const siteUrl = getSiteUrl();
  const now = new Date().toISOString();

  const urls: SitemapUrl[] = [
    { loc: siteUrl, lastmod: now, changefreq: 'daily', priority: '1.0' },
    { loc: `${siteUrl}/faq`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${siteUrl}/blog`, lastmod: now, changefreq: 'weekly', priority: '0.85' },
    { loc: `${siteUrl}/categories`, lastmod: now, changefreq: 'weekly', priority: '0.85' },
    { loc: `${siteUrl}/products`, lastmod: now, changefreq: 'daily', priority: '0.9' },
  ];

  for (const p of data.products) {
    if (p.is_active === false || !p.name?.trim()) continue;
    const slug = getProductSlug(p);
    if (!slug) continue;
    urls.push({
      loc: `${siteUrl}/products/${slug}`,
      lastmod: safeDate(p.created_at).toISOString(),
      changefreq: 'weekly',
      priority: '0.9',
    });
  }

  for (const cat of getUniqueCategories(data.products)) {
    if (!cat?.trim()) continue;
    const slug = getCategorySlug(cat);
    if (!slug) continue;
    urls.push({
      loc: `${siteUrl}/categories/${slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  for (const slug of getAllBlogSlugs()) {
    if (!slug) continue;
    urls.push({
      loc: `${siteUrl}/blog/${slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.75',
    });
  }

  const seen = new Set<string>();
  return urls.filter((entry) => {
    if (!entry.loc.startsWith('http') || seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

export function buildSitemapXml(urls: SitemapUrl[]): string {
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
    <changefreq>${escapeXml(u.changefreq)}</changefreq>
    <priority>${escapeXml(u.priority)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export async function getSitemapXml(): Promise<string> {
  try {
    const data = await getSiteData();
    return buildSitemapXml(buildSitemapUrls(data));
  } catch {
    return buildSitemapXml(buildSitemapUrls(getFallbackData()));
  }
}

export function getMinimalSitemapXml(): string {
  const siteUrl = getSiteUrl();
  const now = new Date().toISOString();
  return buildSitemapXml([
    { loc: siteUrl, lastmod: now, changefreq: 'daily', priority: '1.0' },
    { loc: `${siteUrl}/products`, lastmod: now, changefreq: 'daily', priority: '0.9' },
  ]);
}
