import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { ForgeObject } from '@/components/forge/ForgeObject';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/motion';

export function Hero() {
  const reduced = useReducedMotion();

  // Short stagger between headline, copy and CTAs (content is never blocked).
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
  };

  return (
    <section className="gf-hero" id="top">
      <div className="gf-container gf-hero__grid">
        <motion.div
          className="gf-hero__copy"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="gf-eyebrow" variants={item}>
            Custom 3D printing · Prototyping · Fabrication
          </motion.p>

          <motion.h1 className="gf-hero__title" variants={item}>
            Start with an idea.
            <br />
            <span className="gf-hero__title-accent">End with the real thing.</span>
          </motion.h1>

          <motion.p className="gf-hero__lead gf-text-secondary" variants={item}>
            Genesis Forge turns sketches, photos, broken parts, and half-formed concepts into custom
            3D-printed objects &mdash; even if you don&rsquo;t have a model or know where to begin.
          </motion.p>

          <motion.div className="gf-hero__actions" variants={item}>
            <Button as="a" href="#start" variant="primary" size="lg" iconRight={<ArrowUpRight size={18} />}>
              Start a project
            </Button>
            <Button as="a" href="#work" variant="secondary" size="lg">
              See what we&rsquo;ve made
            </Button>
          </motion.div>

          <motion.ul className="gf-hero__trust" variants={item} aria-label="How we work">
            <li>No model required</li>
            <li>Small runs welcome</li>
            <li>You&rsquo;re part of the process</li>
          </motion.ul>
        </motion.div>

        <div className="gf-hero__visual">
          <ForgeObject />
        </div>
      </div>

      <a className="gf-hero__scroll" href="#possibility" aria-label="Scroll to learn more">
        <span className="gf-hero__scroll-label">What&rsquo;s possible</span>
        <motion.span
          className="gf-hero__scroll-icon"
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </a>
    </section>
  );
}
