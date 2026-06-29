'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User, MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import { navigateToSection } from '@/lib/navigation';

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'products', label: 'Shop', icon: ShoppingBag },
  { id: 'about', label: 'About', icon: User },
] as const;

function BottomNavContent({
  settings,
  active,
  onSectionTap,
}: {
  settings: Settings;
  active: string;
  onSectionTap: (id: string) => void;
}) {
  const waUrl = getWhatsAppUrl(settings, DEFAULT_MESSAGE);

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <div className="flex items-stretch justify-around px-1 pt-1 pb-1">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id || (id === 'about' && ['about', 'testimonials'].includes(active));
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSectionTap(id)}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] rounded-xl transition-colors touch-manipulation bg-transparent border-0 ${
                isActive ? 'text-herb-400' : 'text-gray-500 active:text-gray-300'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] text-whatsapp touch-manipulation"
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

export default function MobileBottomNav({ settings }: { settings: Settings }) {
  const pathname = usePathname();
  const [active, setActive] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (pathname !== '/') return;

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
  }, [pathname]);

  const handleSectionTap = useCallback(
    (id: string) => {
      navigateToSection(id, pathname);
    },
    [pathname]
  );

  if (!mounted) return null;

  return createPortal(
    <BottomNavContent
      settings={settings}
      active={active}
      onSectionTap={handleSectionTap}
    />,
    document.body
  );
}
