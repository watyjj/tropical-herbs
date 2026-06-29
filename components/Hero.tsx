'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowRight, ArrowDown } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, ORDER_MESSAGE } from '@/lib/whatsapp';

export default function Hero({ settings }: { settings: Settings }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, reduced ? 0 : -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '20%']);

  const orderUrl = getWhatsAppUrl(settings, ORDER_MESSAGE);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden>
        {settings.hero_image_url && (
          <Image
            src={settings.hero_image_url}
            alt=""
            fill
            className="object-cover opacity-15"
            priority
            unoptimized
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0 leaf-pattern"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.14) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(21,128,61,0.08) 0%, transparent 50%), #0a0f0a',
          }}
        />
      </motion.div>

      {!reduced && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          <svg className="w-[min(600px,90vw)] h-[min(600px,90vw)] opacity-[0.04] animate-spin-slow" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#4ade80" strokeWidth="0.3" strokeDasharray="2 6" />
          </svg>
        </div>
      )}

      <motion.div
        style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : y }}
        className="relative z-10 container-app text-center pt-20 sm:pt-24 pb-28 sm:pb-32"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-herb-950/80 border border-herb-800/30 rounded-full px-3.5 sm:px-4 py-2 mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-herb-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-herb-500" />
          </span>
          <span className="text-herb-300 text-xs sm:text-sm font-medium">{settings.hero_badge}</span>
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-display-xl mb-5 sm:mb-6"
        >
          <span className="text-white">{settings.hero_title_line1}</span>
          <br />
          <span className="text-gradient">{settings.hero_title_line2}</span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="text-body max-w-2xl mx-auto mb-8 sm:mb-10 text-gray-400"
        >
          {settings.hero_subtitle}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-md sm:max-w-none mx-auto"
        >
          <motion.a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base animate-pulse-glow w-full sm:w-auto"
            whileHover={reduced ? undefined : { scale: 1.02 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            <MessageCircle size={20} aria-hidden />
            Order via WhatsApp
            <ArrowRight size={18} className="hidden sm:inline group-hover:translate-x-0.5 transition-transform" aria-hidden />
          </motion.a>
          <motion.a
            href="#products"
            className="btn-secondary gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
            whileHover={reduced ? undefined : { scale: 1.02 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            View Products
            <ArrowDown size={18} aria-hidden />
          </motion.a>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="grid grid-cols-3 gap-3 sm:gap-8 max-w-sm sm:max-w-lg mx-auto"
          role="list"
          aria-label="Site statistics"
        >
          {[
            { value: settings.stat_products, label: 'Herbal Products' },
            { value: settings.stat_clients, label: 'Happy Clients' },
            { value: settings.stat_years, label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center" role="listitem">
              <div className="text-xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-gray-500 text-[10px] sm:text-sm mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {!reduced && (
        <motion.div
          className="absolute bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <span className="text-gray-600 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-600/80 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-0.5 h-1.5 bg-herb-500 rounded-full"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
