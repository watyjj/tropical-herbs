'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ArrowRight, ArrowDown } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, ORDER_MESSAGE } from '@/lib/whatsapp';

export default function Hero({ settings }: { settings: Settings }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const orderUrl = getWhatsAppUrl(settings, ORDER_MESSAGE);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {settings.hero_image_url && (
          <Image
            src={settings.hero_image_url}
            alt="Tropical herbs background"
            fill
            className="object-cover opacity-20"
            priority
            unoptimized
          />
        )}
        <div
          className="absolute inset-0 leaf-pattern"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(21,128,61,0.08) 0%, transparent 50%), #0a0f0a',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-[600px] h-[600px] opacity-[0.04] animate-spin-slow" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#4ade80" strokeWidth="0.3" strokeDasharray="2 6" />
        </svg>
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-herb-950/80 border border-herb-800/30 rounded-full px-4 py-2 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-herb-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-herb-500" />
          </span>
          <span className="text-herb-300 text-sm font-medium">{settings.hero_badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-white">{settings.hero_title_line1}</span>
          <br />
          <span className="text-gradient">{settings.hero_title_line2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {settings.hero_subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-whatsapp hover:bg-[#20bd5a] text-white font-bold px-8 py-4 rounded-full text-base animate-pulse-glow shadow-lg shadow-whatsapp/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={22} />
            Order via WhatsApp
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#products"
            className="group inline-flex items-center gap-2 border border-white/20 hover:border-herb-500/50 text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white/5 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View Products
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {[
            { value: settings.stat_products, label: 'Herbal Products' },
            { value: settings.stat_clients, label: 'Happy Clients' },
            { value: settings.stat_years, label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-gray-600 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-herb-500 rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
