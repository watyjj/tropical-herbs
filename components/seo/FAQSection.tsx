'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our natural herbs and ordering process.',
}: {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="section-padding relative" aria-labelledby="faq-heading">
      <div className="container-app max-w-3xl">
        <header className="text-center mb-10 sm:mb-12">
          <p className="label-section">FAQ</p>
          <h2 id="faq-heading" className="heading-section mt-2 sm:mt-3">
            {title}
          </h2>
          {subtitle ? <p className="text-body mt-3">{subtitle}</p> : null}
        </header>

        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question} className="card-surface overflow-hidden" role="listitem">
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left min-h-[56px] hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-white font-semibold text-sm sm:text-base pr-2">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-herb-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-body text-sm">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
