'use client';

import { useEffect, useState } from 'react';
import { Home, ShoppingBag, User, MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';

const items = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'products', label: 'Shop', href: '#products', icon: ShoppingBag },
  { id: 'about', label: 'About', href: '#about', icon: User },
] as const;

export default function MobileBottomNav({ settings }: { settings: Settings }) {
  const [active, setActive] = useState('home');
  const waUrl = getWhatsAppUrl(settings, DEFAULT_MESSAGE);

  useEffect(() => {
    const sections = ['home', 'products', 'about', 'testimonials', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/[0.06] glass-nav pb-[max(0.25rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around px-1 pt-1">
        {items.map(({ id, label, href, icon: Icon }) => {
          const isActive = active === id || (id === 'about' && ['about', 'testimonials'].includes(active));
          return (
            <a
              key={id}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] rounded-xl transition-colors ${
                isActive ? 'text-herb-400' : 'text-gray-500 hover:text-gray-300'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden />
              <span className="text-[10px] font-medium">{label}</span>
            </a>
          );
        })}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] text-whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp text-white shadow-glow-whatsapp">
            <MessageCircle size={18} aria-hidden />
          </span>
          <span className="text-[10px] font-semibold">Chat</span>
        </a>
      </div>
    </nav>
  );
}
