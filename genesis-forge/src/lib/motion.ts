import type { Variants, Transition } from 'framer-motion';

/* =============================================================================
   MOTION TOKENS
   Mirrors the CSS motion tokens so JS + CSS animation share one rhythm.
   Durations in seconds (Framer Motion convention).
   ============================================================================= */

export const duration = {
  micro: 0.18,
  base: 0.28,
  large: 0.38,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

/* Standard entrance: fade + small rise. Exit is faster (≈65% of enter). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.large, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
};

/* Container that staggers its children on reveal (40ms cadence). */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* Shared viewport config for scroll-reveals — fires once, slightly early. */
export const inView = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' } as const;

/* Reduced-motion variants: present immediately, no transform. */
export const reducedReveal: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};
