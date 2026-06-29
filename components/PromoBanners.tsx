'use client';

import Image from 'next/image';
import type { Banner, Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import RevealOnScroll from './RevealOnScroll';

export default function PromoBanners({ banners, settings }: { banners: Banner[]; settings: Settings }) {
  const promos = banners.filter((b) => b.type === 'promo' && b.is_active);
  if (promos.length === 0) return null;

  return (
    <section className="py-6 sm:py-8" aria-label="Promotional offers">
      <div className="container-app space-y-3 sm:space-y-4">
        {promos.map((banner) => (
          <RevealOnScroll key={banner.id}>
            <a
              href={banner.link_url || getWhatsAppUrl(settings, DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden card-surface-interactive min-h-[120px] sm:min-h-[140px]"
            >
              {banner.image_url && (
                <div className="relative h-28 sm:h-40">
                  <Image
                    src={banner.image_url}
                    alt={banner.title || 'Promotional banner'}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    unoptimized
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" aria-hidden />
                </div>
              )}
              <div className="absolute inset-0 flex items-center px-5 sm:px-10">
                <div>
                  {banner.title && (
                    <h3 className="text-white font-bold text-base sm:text-xl leading-tight">{banner.title}</h3>
                  )}
                  {banner.subtitle && <p className="text-gray-300 text-xs sm:text-sm mt-1">{banner.subtitle}</p>}
                </div>
              </div>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
