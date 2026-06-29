'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import RevealOnScroll from './RevealOnScroll';
import SectionHeader from './ui/SectionHeader';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[current];
  const goPrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section id="testimonials" className="section-padding relative" aria-labelledby="testimonials-heading">
      <div className="container-app max-w-4xl">
        <RevealOnScroll>
          <SectionHeader headingId="testimonials-heading" label="Testimonials" title="What Our Clients Say" />
        </RevealOnScroll>

        <div className="relative min-h-[260px] sm:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={testimonial.id}
              initial={reduced ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="card-surface-interactive p-6 sm:p-10 text-center"
            >
              <div className="flex justify-center gap-1 mb-5 sm:mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400 text-amber-400" aria-hidden />
                ))}
              </div>
              <p className="text-gray-300 text-base sm:text-xl italic leading-relaxed mb-6 sm:mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <footer className="flex items-center justify-center gap-4">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-herb-500 to-herb-700 flex items-center justify-center text-white font-bold text-lg"
                  aria-hidden
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div className="text-left">
                  <cite className="text-white font-semibold not-italic">{testimonial.name}</cite>
                  <div className="text-gray-500 text-sm">{testimonial.location}, South Africa</div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 btn-ghost p-2.5 bg-surface/80 backdrop-blur-sm border border-white/[0.06] hidden sm:flex"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 btn-ghost p-2.5 bg-surface/80 backdrop-blur-sm border border-white/[0.06] hidden sm:flex"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 sm:mt-8" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`View testimonial from ${t.name}`}
                onClick={() => setCurrent(i)}
                className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-all duration-300 ${
                  i === current ? '' : ''
                }`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2 bg-herb-500' : 'w-2 h-2 bg-gray-700 hover:bg-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
