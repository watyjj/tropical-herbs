'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
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
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-padding relative" aria-labelledby="about-heading">
      <div className="container-app">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <RevealOnScroll>
            <div className="relative">
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden card-surface"
              >
                {settings.about_image_url ? (
                  <Image
                    src={settings.about_image_url}
                    alt="Traditional healer preparing herbal remedies"
                    width={600}
                    height={700}
                    className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover"
                    unoptimized
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    className="w-full h-[280px] sm:h-[400px] lg:h-[500px] bg-herb-950/50 flex items-center justify-center text-6xl sm:text-8xl"
                    role="img"
                    aria-label="Herbal healing"
                  >
                    🌿
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" aria-hidden />
              </motion.div>

              <motion.div
                animate={reduced ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 right-2 sm:-bottom-6 sm:right-6 card-surface px-5 py-3 sm:px-6 sm:py-4 shadow-xl backdrop-blur-md"
              >
                <div className="text-2xl sm:text-3xl font-black text-gradient">{settings.stat_years}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Years Healing Experience</div>
              </motion.div>
            </div>
          </RevealOnScroll>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.p variants={fadeInUp} className="label-section">
              About the Healer
            </motion.p>
            <motion.h2
              id="about-heading"
              variants={fadeInUp}
              custom={1}
              className="heading-section mt-2 sm:mt-3 mb-4 sm:mb-6"
            >
              {settings.about_title}
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-body mb-4">
              {settings.about_paragraph1}
            </motion.p>
            <motion.p variants={fadeInUp} custom={3} className="text-body mb-6 sm:mb-8">
              {settings.about_paragraph2}
            </motion.p>

            <motion.div variants={fadeInUp} custom={4} className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-herb-700/30 transition-colors min-h-[72px]"
                >
                  <badge.icon size={24} className="text-herb-400 shrink-0" aria-hidden />
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
              className="btn-primary gap-2 px-6 py-3.5 text-sm sm:text-base"
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              <MessageCircle size={20} aria-hidden />
              Consult with Me
              <ArrowRight size={18} aria-hidden />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
