'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waUrl = getWhatsAppUrl(settings, DEFAULT_MESSAGE);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-2xl">🌿</span>
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-herb-400 transition-colors">
              {settings.site_name}
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-400 hover:text-herb-400 text-sm font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-[#20bd5a] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              Chat Now
            </motion.a>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden glass-nav border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-herb-400 hover:bg-white/5 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-whatsapp text-white font-semibold px-4 py-3 rounded-full mt-2"
              >
                <MessageCircle size={20} />
                Chat Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
