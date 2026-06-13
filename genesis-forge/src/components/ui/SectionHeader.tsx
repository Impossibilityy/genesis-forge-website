import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, reducedReveal, stagger, inView } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'start' | 'center';
  id?: string;
}

/** Shared section header so eyebrow/title/lead rhythm is identical everywhere. */
export function SectionHeader({ eyebrow, title, lead, align = 'start', id }: SectionHeaderProps) {
  const reduced = useReducedMotion();
  const item = reduced ? reducedReveal : fadeUp;

  return (
    <motion.header
      className={`gf-section-header gf-section-header--${align}`}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      <motion.p className="gf-eyebrow" variants={item}>
        {eyebrow}
      </motion.p>
      <motion.h2 className="gf-section-header__title" variants={item} id={id}>
        {title}
      </motion.h2>
      {lead && (
        <motion.p className="gf-section-header__lead gf-measure gf-text-secondary" variants={item}>
          {lead}
        </motion.p>
      )}
    </motion.header>
  );
}
