'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import RevealOnScroll from './RevealOnScroll';
import SectionHeader from './ui/SectionHeader';

export default function Contact({ settings }: { settings: Settings }) {
  const reduced = useReducedMotion();

  const cards = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat instantly',
      href: getWhatsAppUrl(settings, DEFAULT_MESSAGE),
      gradient: 'from-whatsapp/20 to-green-600/10',
      iconColor: '#25D366',
      borderHover: 'hover:border-whatsapp/40',
      external: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: settings.phone_display,
      href: `tel:${settings.phone_display.replace(/\s/g, '')}`,
      gradient: 'from-herb-500/20 to-emerald-600/10',
      iconColor: '#22c55e',
      borderHover: 'hover:border-herb-500/40',
      external: false,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: settings.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(settings.location)}`,
      gradient: 'from-blue-500/20 to-cyan-600/10',
      iconColor: '#3b82f6',
      borderHover: 'hover:border-blue-500/40',
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-padding relative" aria-labelledby="contact-heading">
      <div className="container-app">
        <RevealOnScroll>
          <SectionHeader
            headingId="contact-heading"
            label="Contact"
            title="Get in Touch"
            description="Reach out anytime — we're always happy to help with your healing journey."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, i) => (
            <RevealOnScroll key={card.label} delay={i}>
              <motion.a
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                className={`group block card-surface-interactive p-6 sm:p-8 text-center min-h-[160px] ${card.borderHover}`}
                whileHover={reduced ? undefined : { y: -4 }}
                whileTap={reduced ? undefined : { scale: 0.99 }}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.gradient} mb-4 sm:mb-5 group-hover:scale-105 transition-transform`}
                  aria-hidden
                >
                  <card.icon size={28} style={{ color: card.iconColor }} />
                </div>
                <div className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">{card.label}</div>
                <div className="text-white font-semibold text-base sm:text-lg">{card.value}</div>
              </motion.a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
