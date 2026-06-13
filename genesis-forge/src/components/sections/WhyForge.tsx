import { motion } from 'framer-motion';
import { strengths } from '@/data/strengths';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, reducedReveal, stagger, inView } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function WhyForge() {
  const reduced = useReducedMotion();
  const item = reduced ? reducedReveal : fadeUp;

  return (
    <section className="gf-section gf-why" id="why" aria-labelledby="why-title">
      <div className="gf-container">
        <SectionHeader
          id="why-title"
          eyebrow="Why Genesis Forge"
          title={<>How we&rsquo;d rather work</>}
          lead="No award counts, no client logos, no inflated numbers — just the things we actually believe about making custom work."
        />

        <motion.ul
          className="gf-why__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {strengths.map((s, i) => {
            const Icon = s.icon;
            const hot = i % 2 === 0;
            return (
              <motion.li
                key={s.title}
                className={`gf-why__card ${hot ? 'gf-why__card--hot' : 'gf-why__card--cool'}`}
                variants={item}
              >
                <span className="gf-why__edge" aria-hidden="true" />
                <span className="gf-why__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <h3 className="gf-why__card-title">{s.title}</h3>
                <p className="gf-why__card-body gf-text-secondary">{s.body}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
