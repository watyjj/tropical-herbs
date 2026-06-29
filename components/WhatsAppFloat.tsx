'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';

export default function WhatsAppFloat({ settings }: { settings: Settings }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      setTooltipVisible(true);
    }, 4000);
    const hideTimer = setTimeout(() => {
      setTooltipVisible(false);
      setTimeout(() => setShowTooltip(false), 400);
    }, 9000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [reduced]);

  return (
    <div
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 lg:bottom-6 z-50 flex items-center gap-3 lg:flex"
      aria-hidden={false}
    >
      <AnimatePresence>
        {showTooltip && !reduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 12 }}
            animate={tooltipVisible ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 12 }}
            exit={{ opacity: 0, scale: 0.9, x: 12 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:block relative bg-white text-gray-900 text-sm font-medium px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap"
            role="tooltip"
          >
            Need help? Chat with us!
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        href={getWhatsAppUrl(settings, DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden lg:flex relative items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-glow-whatsapp animate-pulse-glow min-h-[56px] min-w-[56px]"
        whileHover={reduced ? undefined : { scale: 1.08 }}
        whileTap={reduced ? undefined : { scale: 0.95 }}
      >
        <MessageCircle size={28} aria-hidden />
      </motion.a>
    </div>
  );
}
