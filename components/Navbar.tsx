'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';

const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'testimonials', label: 'Reviews', href: '#testimonials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar({ settings }: { settings: Settings }) {
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
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const waUrl = getWhatsAppUrl(settings, DEFAULT_MESSAGE);

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="container-app">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
            <a
              href="#home"
              className="flex items-center gap-2.5 group min-h-[44px] rounded-xl px-1 -ml-1"
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
                  href={link.href}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] inline-flex items-center ${
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
                className="btn-primary gap-2 px-5 py-2.5 text-sm ml-2"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
              >
                <MessageCircle size={18} aria-hidden />
                Chat Now
              </motion.a>
            </div>

            <button
              type="button"
              className="lg:hidden btn-ghost p-2.5"
              onClick={() => setMobileOpen(!mobileOpen)}
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
            <motion.div
              id="mobile-menu"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden glass-nav border-t border-white/[0.06]"
            >
              <div className="container-app py-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center min-h-[48px] px-4 rounded-xl text-base font-medium transition-colors ${
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
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full gap-2 mt-2 py-3.5"
                >
                  <MessageCircle size={20} aria-hidden />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
