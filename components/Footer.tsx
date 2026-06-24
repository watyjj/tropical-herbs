'use client';

import { MessageCircle } from 'lucide-react';
import type { Settings, Product } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE, getProductMessage } from '@/lib/whatsapp';

export default function Footer({ settings, products }: { settings: Settings; products: Product[] }) {
  const year = new Date().getFullYear();
  const popularProducts = products.slice(0, 5);

  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="text-white font-bold text-lg">{settings.site_name}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Traditional tropical herbal healing products handcrafted with generations of ancestral knowledge.
              Natural remedies for a healthier, balanced life.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'About', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-herb-400 text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Popular Products</h4>
            <ul className="space-y-2">
              {popularProducts.map((p) => (
                <li key={p.id}>
                  <a
                    href={getWhatsAppUrl(settings, getProductMessage(p.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-herb-400 text-sm transition-colors"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">&copy; {year} {settings.site_name}. All rights reserved.</p>
          <a
            href={getWhatsAppUrl(settings, DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-whatsapp hover:text-[#20bd5a] text-sm font-medium transition-colors"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
