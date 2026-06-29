import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Natural Herbs & Traditional Healing`,
    short_name: SITE_NAME,
    description: 'Premium natural herbs and traditional herbal products. Order via WhatsApp.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f0a',
    theme_color: '#0a0f0a',
    orientation: 'portrait-primary',
    categories: ['health', 'shopping', 'lifestyle'],
    lang: 'en-ZA',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
