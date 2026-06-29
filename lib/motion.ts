'use client';

import { useReducedMotion } from 'framer-motion';

export function usePremiumMotion() {
  const reduced = useReducedMotion();
  return {
    reduced: Boolean(reduced),
    duration: reduced ? 0.01 : 0.5,
    spring: reduced ? { duration: 0.01 } : { type: 'spring' as const, stiffness: 260, damping: 24 },
    fadeUp: reduced
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y: 24 },
          visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
          }),
        },
  };
}
