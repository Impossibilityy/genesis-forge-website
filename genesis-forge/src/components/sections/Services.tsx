import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { serviceCategories } from '@/data/services';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, reducedReveal, stagger, inView } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Services() {
  const reduced = useReducedMotion();
  const item = reduced ? reducedReveal : fadeUp;

  return (
    <section className="gf-section gf-services" id="services" aria-labelledby="services-title">
      <div className="gf-container">
        <SectionHeader
          id="services-title"
          eyebrow="What we make"
          title={<>Four ways to start</>}
          lead="Most projects begin as one of these. Pick the one that sounds like you — the work itself is always custom."
        />

        <motion.ul
          className="gf-services__list"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.li key={cat.id} variants={item}>
                <a
                  href="#start"
                  className={`gf-service gf-service--${cat.temperature}`}
                  aria-label={`${cat.title} — start a project`}
                >
                  <div className="gf-service__rail" aria-hidden="true">
                    <span className="gf-service__stage">{cat.stage}</span>
                    <span className="gf-service__rail-line" />
                  </div>

                  <div className="gf-service__head">
                    <span className="gf-service__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <h3 className="gf-service__title">{cat.title}</h3>
                  </div>

                  <p className="gf-service__summary gf-text-secondary">{cat.summary}</p>

                  <ul className="gf-service__items">
                    {cat.items.map((it) => (
                      <li key={it.label} className="gf-service__item">
                        {it.label}
                      </li>
                    ))}
                  </ul>

                  <span className="gf-service__action">
                    Start this <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
