export const SITE_NAME = 'Tropical Herbs';

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://tropical-herbs-uw5g.vercel.app';
}

export const DEFAULT_OG_IMAGE = '/og-image.svg';

export const SEO_KEYWORDS = [
  'natural herbs',
  'traditional herbs',
  'organic herbs',
  'medicinal herbs',
  'herbal medicine',
  'health supplements',
  'natural remedies',
  'buy herbs online',
  'healthy living',
  'natural wellness',
  'herbal shop near me',
  'tropical herbs',
  'herbal products South Africa',
  'traditional healing',
];

export const LOCAL_KEYWORDS = [
  'herbal shop near me',
  'natural herbs South Africa',
  'traditional herbs Africa',
  'buy herbs online',
  'herbal medicine',
];
