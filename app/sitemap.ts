import type { MetadataRoute } from 'next';
import { getSiteData, getFallbackData } from '@/lib/data';
import { getSiteUrl } from '@/lib/seo/config';
import { getProductSlug, getCategorySlug, getUniqueCategories } from '@/lib/seo/slug';
import { getAllBlogSlugs } from '@/lib/seo/blog-posts';
import type { SiteData } from '@/lib/types';

export const revalidate = 3600;

function safeDate(value?: string | null): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function buildSitemapEntries(data: SiteData): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ];

  const productPages: MetadataRoute.Sitemap = data.products
    .filter((p) => p.is_active !== false && p.name?.trim())
    .map((p) => {
      const slug = getProductSlug(p);
      if (!slug) return null;
      return {
        url: `${siteUrl}/products/${slug}`,
        lastModified: safeDate(p.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const categoryPages: MetadataRoute.Sitemap = getUniqueCategories(data.products)
    .filter((cat) => cat?.trim())
    .map((cat) => {
      const slug = getCategorySlug(cat);
      if (!slug) return null;
      return {
        url: `${siteUrl}/categories/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs()
    .filter(Boolean)
    .map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));

  const seen = new Set<string>();
  return [...staticPages, ...productPages, ...categoryPages, ...blogPages].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return entry.url.startsWith('http');
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await getSiteData();
    return buildSitemapEntries(data);
  } catch {
    return buildSitemapEntries(getFallbackData());
  }
}
