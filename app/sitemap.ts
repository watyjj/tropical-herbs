import type { MetadataRoute } from 'next';
import { getSiteData } from '@/lib/data';
import { getSiteUrl } from '@/lib/seo/config';
import { getProductSlug, getCategorySlug, getUniqueCategories } from '@/lib/seo/slug';
import { getAllBlogSlugs } from '@/lib/seo/blog-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const data = await getSiteData();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ];

  const productPages: MetadataRoute.Sitemap = data.products.map((p) => ({
    url: `${siteUrl}/products/${getProductSlug(p)}`,
    lastModified: p.created_at ? new Date(p.created_at) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = getUniqueCategories(data.products).map((cat) => ({
    url: `${siteUrl}/categories/${getCategorySlug(cat)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...blogPages];
}
