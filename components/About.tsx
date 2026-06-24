'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Leaf, FlaskConical, HandHeart, Truck } from 'lucide-react';
import type { Settings } from '@/lib/types';
import { getWhatsAppUrl, CONSULT_MESSAGE } from '@/lib/whatsapp';
import RevealOnScroll, { fadeInUp, staggerContainer } from './RevealOnScroll';

const trustBadges = [
  { icon: Leaf, label: '100% Natural', desc: 'Pure ingredients' },
  { icon: FlaskConical, label: 'Lab Tested', desc: 'Quality assured' },
  { icon: HandHeart, label: 'Hand Prepared', desc: 'With care & tradition' },
  { icon: Truck, label: 'Nationwide Delivery', desc: 'Across South Africa' },
];

export default function About({ settings }: { settings: Settings }) {
  const consultUrl = getWhatsAppUrl(settings, CONSULT_MESSAGE);

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealOnScroll>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-3xl overflow-hidden"
              >
                {settings.about_image_url ? (
                  <Image
                    src={settings.about_image_url}
                    alt="Traditional healer preparing herbal remedies"
                    width={600}
                    height={700}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-[400px] lg:h-[500px] bg-herb-950/50 flex items-center justify-center text-8xl">🌿</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-transparent" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-4 sm:right-6 bg-[rgba(15,25,15,0.9)] backdrop-blur-md border border-herb-700/30 rounded-2xl px-6 py-4 shadow-xl"
              >
                <div className="text-3xl font-black text-gradient">{settings.stat_years}</div>
                <div className="text-gray-400 text-sm">Years Healing Experience</div>
              </motion.div>
            </div>
          </RevealOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.span variants={fadeInUp} className="text-herb-500 text-sm font-bold uppercase tracking-widest">
              About the Healer
            </motion.span>
            <motion.h2 variants={fadeInUp} custom={1} className="text-white text-3xl sm:text-4xl font-bold mt-3 mb-6 tracking-tight">
              {settings.about_title}
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-gray-400 leading-relaxed mb-4">
              {settings.about_paragraph1}
            </motion.p>
            <motion.p variants={fadeInUp} custom={3} className="text-gray-400 leading-relaxed mb-8">
              {settings.about_paragraph2}
            </motion.p>

            <motion.div variants={fadeInUp} custom={4} className="grid grid-cols-2 gap-4 mb-8">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-herb-700/30 transition-colors"
                >
                  <badge.icon size={28} className="text-herb-400" />
                  <div>
                    <div className="text-white text-sm font-semibold">{badge.label}</div>
                    <div className="text-gray-500 text-xs">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeInUp}
              custom={5}
              href={consultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-herb-600 hover:bg-herb-500 text-white font-semibold px-6 py-3.5 rounded-full transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={20} />
              Consult with Me
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
