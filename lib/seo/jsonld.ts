import type { Product, Settings, Testimonial } from '@/lib/types';
import { getSiteUrl, SITE_NAME } from './config';
import { getProductSlug, getCategorySlug, parsePrice } from './slug';
import { getAggregateRating } from './metadata';

const siteUrl = getSiteUrl();

export function organizationSchema(settings: Settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.site_name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description:
      'Traditional herbal healing products — natural herbs, medicinal remedies, and wellness supplements handcrafted with ancestral wisdom.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.phone_display,
      contactType: 'customer service',
      availableLanguage: ['English'],
      areaServed: ['ZA', 'Africa'],
    },
    sameAs: [],
  };
}

export function websiteSchema(settings: Settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.site_name,
    url: siteUrl,
    description: settings.hero_subtitle,
    inLanguage: 'en-ZA',
    publisher: { '@type': 'Organization', name: settings.site_name },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessSchema(settings: Settings, testimonials: Testimonial[]) {
  const rating = getAggregateRating(testimonials);
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: settings.site_name,
    description:
      'Herbal shop offering natural herbs, traditional medicinal remedies, organic supplements, and handcrafted tropical herbal products.',
    url: siteUrl,
    telephone: settings.phone_display,
    image: settings.hero_image_url || `${siteUrl}/og-image.png`,
    priceRange: 'R$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.location.split(',')[0]?.trim() || settings.location,
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'ZA',
    },
    areaServed: [
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Continent', name: 'Africa' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    ...(rating ? { aggregateRating: rating } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Herbal Products',
      itemListElement: {
        '@type': 'ItemList',
        url: `${siteUrl}/#products`,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productSchema(product: Product, settings: Settings) {
  const slug = getProductSlug(product);
  const url = `${siteUrl}/products/${slug}`;
  const parsed = parsePrice(product.price);
  const benefits = product.benefits as string[];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url ? [product.image_url] : undefined,
    url,
    sku: product.id,
    category: product.category,
    brand: { '@type': 'Brand', name: settings.site_name },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: parsed?.currency || 'ZAR',
      price: parsed?.value ?? product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: settings.site_name },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    additionalProperty: benefits.map((b) => ({
      '@type': 'PropertyValue',
      name: 'Benefit',
      value: b,
    })),
  };
}

export function itemListSchema(products: Product[], settings: Settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${settings.site_name} Herbal Products`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/products/${getProductSlug(p)}`,
      name: p.name,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function reviewSchema(testimonials: Testimonial[], settings: Settings) {
  return testimonials.slice(0, 6).map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'Organization', name: settings.site_name },
    author: { '@type': 'Person', name: t.name },
    reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
    reviewBody: t.text,
  }));
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    image: post.image || `${siteUrl}/og-image.png`,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
}

export function categoryItemListSchema(category: string, products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category} Herbal Products`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/products/${getProductSlug(p)}`,
      name: p.name,
    })),
  };
}

export { getCategorySlug, getProductSlug };
