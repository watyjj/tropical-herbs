'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Settings, Product } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import { getProductSlug } from '@/lib/seo/slug';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer({ settings, products }: { settings: Settings; products: Product[] }) {
  const year = new Date().getFullYear();
  const popularProducts = products.slice(0, 5);

  return (
    <footer className="border-t border-white/[0.06] pt-12 sm:pt-16 pb-8 pb-mobile-nav lg:pb-8" role="contentinfo">
      <div className="container-app">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 mb-10 sm:mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl" aria-hidden>
                🌿
              </span>
              <span className="text-white font-bold text-lg">{settings.site_name}</span>
            </div>
            <p className="text-body text-sm">
              Traditional tropical herbal healing — natural herbs, medicinal remedies, and organic wellness products.
              Serving {settings.location} and customers across South Africa. Buy herbs online via WhatsApp.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h2>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-herb-400 text-sm transition-colors inline-flex min-h-[44px] items-center py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Popular Herbs</h2>
            <ul className="space-y-1">
              {popularProducts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${getProductSlug(p)}`}
                    className="text-gray-500 hover:text-herb-400 text-sm transition-colors inline-flex min-h-[44px] items-center py-1"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Order</h2>
            <a
              href={getWhatsAppUrl(settings, DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary gap-2 text-sm px-5 py-3 w-full sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden />
              WhatsApp Order
            </a>
            <p className="text-gray-600 text-xs mt-3">{settings.phone_display}</p>
            <p className="text-gray-600 text-xs">{settings.location}</p>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm text-center sm:text-left">
            &copy; {year} {settings.site_name}. Natural herbs &amp; traditional healing.
          </p>
          <a
            href={getWhatsAppUrl(settings, DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-whatsapp hover:text-[#20bd5a] text-sm font-medium transition-colors min-h-[44px] px-2"
          >
            <MessageCircle size={18} aria-hidden />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
