'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import { navigateToSection, sectionHref } from '@/lib/navigation';

const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'testimonials', label: 'Reviews', href: '#testimonials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar({ settings }: { settings: Settings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const reduced = useReducedMotion();

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

  // Scroll to hash when landing on homepage with #section (e.g. from /products page)
  useEffect(() => {
    if (pathname !== '/' || typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const timer = setTimeout(() => navigateToSection(hash, '/'), 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  const handleSectionNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (pathname === '/') {
        e.preventDefault();
        closeMobileMenu();
        // Close menu first, then scroll (body must not be overflow:hidden)
        requestAnimationFrame(() => {
          setTimeout(() => navigateToSection(id, '/'), 50);
        });
      } else {
        closeMobileMenu();
      }
    },
    [pathname, closeMobileMenu]
  );

  const waUrl = getWhatsAppUrl(settings, DEFAULT_MESSAGE);

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="container-app relative z-[62]">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
            <a
              href={sectionHref('home', pathname)}
              onClick={(e) => handleSectionNav(e, 'home')}
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
                  key={link.href}
                  href={sectionHref(link.id, pathname)}
                  onClick={(e) => handleSectionNav(e, link.id)}
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
              className="lg:hidden btn-ghost p-2.5 touch-manipulation relative z-[62]"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-black/70 lg:hidden touch-manipulation"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              />

              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-0 right-0 top-16 z-[61] lg:hidden glass-nav border-t border-white/[0.06] shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
              >
                <div className="container-app py-3 pb-6 space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={sectionHref(link.id, pathname)}
                      onClick={(e) => handleSectionNav(e, link.id)}
                      className={`flex items-center min-h-[52px] px-4 rounded-xl text-base font-medium transition-colors touch-manipulation cursor-pointer select-none active:bg-white/10 ${
                        active === link.id
                          ? 'text-herb-400 bg-herb-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                      aria-current={active === link.id ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
