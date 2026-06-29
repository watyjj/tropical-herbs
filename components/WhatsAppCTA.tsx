'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, CONSULT_MESSAGE } from '@/lib/whatsapp';
import RevealOnScroll from './RevealOnScroll';

export default function WhatsAppCTA({ settings }: { settings: Settings }) {
  const url = getWhatsAppUrl(settings, CONSULT_MESSAGE);
  const reduced = useReducedMotion();

  return (
    <section className="section-padding relative" aria-labelledby="cta-heading">
      <div className="container-app max-w-4xl">
        <RevealOnScroll>
          <div className="relative rounded-3xl p-px bg-gradient-to-br from-herb-500 via-herb-400 to-herb-600 shadow-glow">
            <div className="bg-background/95 backdrop-blur-sm rounded-3xl px-6 py-12 sm:px-12 sm:py-16 text-center">
              <motion.div
                animate={reduced ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-whatsapp/15 mb-6 sm:mb-8"
                aria-hidden
              >
                <MessageCircle size={40} className="text-whatsapp sm:w-12 sm:h-12" />
              </motion.div>

              <h2 id="cta-heading" className="heading-section mb-3 sm:mb-4">
                Ready to Heal Naturally?
              </h2>
              <p className="text-body mb-6 sm:mb-8 max-w-xl mx-auto">
                Get a free consultation and personalized herbal recommendations. Message us on WhatsApp — we&apos;re here to
                guide your healing journey.
              </p>

              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-3 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg animate-pulse-glow w-full sm:w-auto"
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
              >
                <MessageCircle size={24} aria-hidden />
                Start WhatsApp Chat
                <ArrowRight size={20} aria-hidden />
              </motion.a>

              <p className="text-gray-600 text-xs sm:text-sm mt-5 sm:mt-6 flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2" aria-hidden>
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
