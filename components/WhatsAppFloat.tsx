'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';

export default function WhatsAppFloat({ settings }: { settings: Settings }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      setTooltipVisible(true);
    }, 3000);
    const hideTimer = setTimeout(() => {
      setTooltipVisible(false);
      setTimeout(() => setShowTooltip(false), 400);
    }, 7000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={tooltipVisible ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 20 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white text-gray-900 text-sm font-medium px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap"
          >
            Need help? Chat with us! 💬
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        href={getWhatsAppUrl(settings, DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg animate-pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}
