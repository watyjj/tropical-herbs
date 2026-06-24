'use client';

import Image from 'next/image';
import type { Banner, Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import RevealOnScroll from './RevealOnScroll';

export default function PromoBanners({ banners, settings }: { banners: Banner[]; settings: Settings }) {
  const promos = banners.filter((b) => b.type === 'promo' && b.is_active);
  if (promos.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {promos.map((banner) => (
          <RevealOnScroll key={banner.id}>
            <a
              href={banner.link_url || getWhatsAppUrl(settings, DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden border border-white/5 hover:border-herb-700/30 transition-all"
            >
              {banner.image_url && (
                <div className="relative h-32 sm:h-40">
                  <Image src={banner.image_url} alt={banner.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center px-6 sm:px-10">
                <div>
                  {banner.title && <h3 className="text-white font-bold text-lg sm:text-xl">{banner.title}</h3>}
                  {banner.subtitle && <p className="text-gray-300 text-sm mt-1">{banner.subtitle}</p>}
                </div>
              </div>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
