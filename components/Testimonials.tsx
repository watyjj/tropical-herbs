'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import RevealOnScroll from './RevealOnScroll';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-herb-500 text-sm font-bold uppercase tracking-widest">Testimonials</span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mt-3 tracking-tight">What Our Clients Say</h2>
          </div>
        </RevealOnScroll>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[rgba(15,25,15,0.6)] border border-white/5 rounded-2xl p-8 sm:p-10 text-center hover:border-herb-700/30 transition-colors"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={22} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 text-lg sm:text-xl italic leading-relaxed mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-herb-500 to-herb-700 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.location}, South Africa</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrent(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-herb-500' : 'w-2 bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
