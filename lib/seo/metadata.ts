import type { Metadata } from 'next';
import type { Product, Settings, Testimonial } from '@/lib/types';
import { getSiteUrl, SITE_NAME, DEFAULT_OG_IMAGE, SEO_KEYWORDS } from './config';
import { getProductSlug, getCategorySlug } from './slug';

const siteUrl = getSiteUrl();

function ogImage(url?: string) {
  const img = url || DEFAULT_OG_IMAGE;
  return img.startsWith('http') ? img : `${siteUrl}${img}`;
}

export function buildHomeMetadata(settings: Settings): Metadata {
  const title = `${settings.site_name} | Natural Herbs & Traditional Herbal Products`;
  const description =
    `Shop premium natural herbs and traditional herbal remedies at ${settings.site_name}. ` +
    `Handcrafted medicinal herbs for detox, immunity, wellness & more. ` +
    `Order online via WhatsApp — nationwide delivery from ${settings.location}.`;

  return {
    title,
    description,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical: siteUrl,
      languages: { 'en-ZA': siteUrl, en: siteUrl, 'x-default': siteUrl },
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: settings.site_name,
      locale: 'en_ZA',
      type: 'website',
      images: [{ url: ogImage(settings.hero_image_url), width: 1200, height: 630, alt: settings.site_name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage(settings.hero_image_url)],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function buildProductMetadata(product: Product, settings: Settings): Metadata {
  const slug = getProductSlug(product);
  const url = `${siteUrl}/products/${slug}`;
  const title = `${product.name} — ${product.category} | Buy Online | ${SITE_NAME}`;
  const description =
    `${product.description} Benefits: ${(product.benefits as string[]).slice(0, 3).join(', ')}. ` +
    `Price ${product.price}. Order ${product.name} via WhatsApp — natural herbal remedy from ${settings.location}.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: url, languages: { 'en-ZA': url, en: url, 'x-default': url } },
    openGraph: {
      title,
      description: description.slice(0, 200),
      url,
      type: 'website',
      images: product.image_url
        ? [{ url: product.image_url, width: 800, height: 800, alt: `${product.name} — ${product.category} herbal product` }]
        : [{ url: ogImage(), width: 1200, height: 630, alt: product.name }],
    },
    twitter: { card: 'summary_large_image', title, description: description.slice(0, 200), images: [product.image_url || ogImage()] },
  };
}

export function buildCategoryMetadata(category: string, settings: Settings, count: number): Metadata {
  const slug = getCategorySlug(category);
  const url = `${siteUrl}/categories/${slug}`;
  const title = `${category} Herbs & Products | ${SITE_NAME}`;
  const description =
    `Browse ${count} natural ${category.toLowerCase()} herbal products at ${settings.site_name}. ` +
    `Traditional medicinal herbs handcrafted for wellness. Buy herbs online — WhatsApp ordering & delivery across South Africa.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', images: [{ url: ogImage(), width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function buildBlogIndexMetadata(): Metadata {
  const url = `${siteUrl}/blog`;
  const title = `Herbal Wellness Blog | Natural Remedies & Traditional Healing | ${SITE_NAME}`;
  const description =
    'Expert guides on natural herbs, traditional medicine, moringa benefits, immune support, and herbal wellness. Educational content from Tropical Herbs.';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function buildBlogPostMetadata(post: { title: string; description: string; slug: string; image?: string }): Metadata {
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [{ url: ogImage() }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export function buildFaqMetadata(settings: Settings): Metadata {
  const url = `${siteUrl}/faq`;
  const title = `Herbal Products FAQ | Ordering, Delivery & Natural Remedies | ${SITE_NAME}`;
  const description =
    `Frequently asked questions about ${settings.site_name} natural herbs, traditional remedies, WhatsApp ordering, delivery, and safe herbal use.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary', title, description },
  };
}

export function buildAdminMetadata(): Metadata {
  return {
    title: 'Admin',
    robots: { index: false, follow: false },
  };
}

export function getAggregateRating(testimonials: Testimonial[]) {
  if (testimonials.length === 0) return null;
  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;
  return {
    '@type': 'AggregateRating' as const,
    ratingValue: avg.toFixed(1),
    reviewCount: testimonials.length,
    bestRating: '5',
    worstRating: '1',
  };
}
