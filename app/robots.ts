import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo/config';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/manage-x7k2p', '/api/', '/manage-x7k2p/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
