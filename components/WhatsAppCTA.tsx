'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, CONSULT_MESSAGE } from '@/lib/whatsapp';
import RevealOnScroll from './RevealOnScroll';

export default function WhatsAppCTA({ settings }: { settings: Settings }) {
  const url = getWhatsAppUrl(settings, CONSULT_MESSAGE);

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <RevealOnScroll>
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-herb-500 via-herb-400 to-herb-600 shadow-2xl shadow-herb-500/10">
            <div className="bg-[rgba(10,15,10,0.95)] rounded-3xl px-8 py-16 sm:px-16 text-center">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-whatsapp/20 mb-8"
              >
                <MessageCircle size={48} className="text-whatsapp" />
              </motion.div>

              <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Ready to Heal Naturally?</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Get a free consultation and personalized herbal recommendations. Message us on WhatsApp — we&apos;re here to
                guide your healing journey.
              </p>

              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-whatsapp hover:bg-[#20bd5a] text-white font-bold text-lg px-10 py-5 rounded-full animate-pulse-glow shadow-lg shadow-whatsapp/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={26} />
                Start WhatsApp Chat
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <p className="text-gray-600 text-sm mt-6 flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-herb-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-herb-500" />
                </span>
                Usually responds within minutes
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
