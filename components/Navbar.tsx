'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import { sectionHref, scrollToSection } from '@/lib/navigation';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'about', label: 'About' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ settings }: { settings: Settings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

    const sections = navLinks.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0.1, 0.3] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/' || typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const timer = setTimeout(() => scrollToSection(hash), 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  const handleMobileNav = useCallback(
    (id: string) => {
      if (pathname === '/') {
        scrollToSection(id);
        closeMobileMenu();
      } else {
        closeMobileMenu();
        window.location.href = `/#${id}`;
      }
    },
    [pathname, closeMobileMenu]
  );

  const handleDesktopNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (pathname === '/') {
        e.preventDefault();
        scrollToSection(id);
      }
    },
    [pathname]
  );

  const waUrl = getWhatsAppUrl(settings, DEFAULT_MESSAGE);

  const mobileMenuPortal =
    mounted && mobileOpen
      ? createPortal(
          <div className="lg:hidden" role="presentation">
            <button
              type="button"
              className="fixed inset-0 z-[200] bg-black/75 touch-manipulation"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            />
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              className="fixed left-0 right-0 top-16 z-[201] mobile-menu-panel max-h-[min(70dvh,480px)] overflow-y-auto overscroll-contain"
            >
              <div className="container-app py-3 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleMobileNav(link.id)}
                    className={`flex w-full items-center min-h-[52px] px-4 rounded-xl text-base font-medium transition-colors touch-manipulation text-left ${
                      active === link.id
                        ? 'text-herb-400 bg-herb-500/10'
                        : 'text-gray-300 active:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="btn-primary w-full gap-2 mt-3 py-3.5 touch-manipulation"
                >
                  <MessageCircle size={20} aria-hidden />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          scrolled || mobileOpen ? 'mobile-top-nav-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="container-app">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
            <a
              href={sectionHref('home', pathname)}
              onClick={(e) => handleDesktopNav(e, 'home')}
              className="flex items-center gap-2.5 group min-h-[44px] rounded-xl px-1 -ml-1 touch-manipulation"
              aria-label={`${settings.site_name} — Home`}
            >
              <span className="text-2xl" aria-hidden>
                🌿
              </span>
              <span className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:text-herb-400 transition-colors">
                {settings.site_name}
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={sectionHref(link.id, pathname)}
                  onClick={(e) => handleDesktopNav(e, link.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] inline-flex items-center touch-manipulation ${
                    active === link.id ? 'text-herb-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={active === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {active === link.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-herb-500" />
                  )}
                </a>
              ))}
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2 px-5 py-2.5 text-sm ml-2 touch-manipulation"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
              >
                <MessageCircle size={18} aria-hidden />
                Chat Now
              </motion.a>
            </div>

            <button
              type="button"
              className="lg:hidden btn-ghost p-2.5 touch-manipulation"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {mobileMenuPortal}
    </header>
  );
}
