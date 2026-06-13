import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { processSteps } from '@/data/process';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, reducedReveal, inView } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Process() {
  const reduced = useReducedMotion();
  const item = reduced ? reducedReveal : fadeUp;
  const trackRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 55%'],
  });
  const rawScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const progressScale = useTransform(rawScale, (v) => (reduced ? 1 : v));

  return (
    <section className="gf-section gf-process" id="process" aria-labelledby="process-title">
      <div className="gf-container">
        <SectionHeader
          id="process-title"
          eyebrow="How custom projects work"
          title={<>From idea to object, step by step</>}
          lead="Six stages. You stay involved at every one — and nothing is final until it's right."
        />

        <ol className="gf-process__track" ref={trackRef}>
          {/* Connecting energy line (decorative; fills with scroll) */}
          <div className="gf-process__line" aria-hidden="true">
            <motion.div
              className="gf-process__line-fill"
              style={{ scaleY: progressScale }}
            />
          </div>

          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.number}
                className="gf-process__step"
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
              >
                <div className="gf-process__marker" aria-hidden="true">
                  <span className="gf-process__num">{step.number}</span>
                  <span className="gf-process__marker-icon">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                </div>

                <div className="gf-process__body">
                  <h3 className="gf-process__step-title">{step.title}</h3>
                  <div className="gf-process__split">
                    <p className="gf-process__you">
                      <span className="gf-process__role gf-cool">You bring</span>
                      {step.youBring}
                    </p>
                    <p className="gf-process__we">
                      <span className="gf-process__role gf-hot">We handle</span>
                      {step.weHandle}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
