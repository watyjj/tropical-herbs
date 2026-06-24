'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp';
import RevealOnScroll from './RevealOnScroll';

export default function Contact({ settings }: { settings: Settings }) {
  const cards = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat instantly',
      href: getWhatsAppUrl(settings, DEFAULT_MESSAGE),
      gradient: 'from-whatsapp/20 to-green-600/10',
      iconColor: '#25D366',
      borderHover: 'hover:border-whatsapp/40',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: settings.phone_display,
      href: `tel:${settings.phone_display.replace(/\s/g, '')}`,
      gradient: 'from-herb-500/20 to-emerald-600/10',
      iconColor: '#22c55e',
      borderHover: 'hover:border-herb-500/40',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: settings.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(settings.location)}`,
      gradient: 'from-blue-500/20 to-cyan-600/10',
      iconColor: '#3b82f6',
      borderHover: 'hover:border-blue-500/40',
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-herb-500 text-sm font-bold uppercase tracking-widest">Contact</span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mt-3 tracking-tight">Get in Touch</h2>
            <p className="text-gray-500 mt-4">Reach out anytime — we&apos;re always happy to help with your healing journey.</p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <RevealOnScroll key={card.label} delay={i}>
              <motion.a
                href={card.href}
                target={card.label === 'Location' ? '_blank' : undefined}
                rel={card.label === 'Location' ? 'noopener noreferrer' : undefined}
                className={`group block rounded-2xl border border-white/5 bg-[rgba(15,25,15,0.6)] p-8 text-center transition-all duration-300 ${card.borderHover} hover:shadow-lg`}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} mb-5 group-hover:scale-110 transition-transform`}
                >
                  <card.icon size={32} style={{ color: card.iconColor }} />
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-wider mb-1">{card.label}</div>
                <div className="text-white font-semibold text-lg">{card.value}</div>
              </motion.a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
