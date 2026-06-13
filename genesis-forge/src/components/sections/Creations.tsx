import { motion } from 'framer-motion';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import { creations } from '@/data/creations';
import type { Creation } from '@/data/creations';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechFrame } from '@/components/ui/TechFrame';
import { Tag } from '@/components/ui/Tag';
import { fadeUp, reducedReveal, inView } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Tasteful labelled placeholder shown until a real photo/render is supplied. */
function MediaPlaceholder({ creation }: { creation: Creation }) {
  const toneVar =
    creation.accent === 'cool'
      ? 'var(--color-secondary)'
      : creation.accent === 'violet'
        ? 'var(--color-accent)'
        : 'var(--color-primary)';

  // Generative layered silhouette so the placeholder still reads as a printed object.
  const bars = Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    const w = 28 + Math.sin(t * Math.PI) * 52 + (1 - t) * 14;
    return { y: 18 + i * 13, w };
  });

  return (
    <div className="gf-creation__placeholder" role="img" aria-label={`${creation.alt} (photo pending)`}>
      <svg viewBox="0 0 200 200" aria-hidden="true" className="gf-creation__placeholder-art">
        <g transform="translate(100 8)">
          {bars.map((b, i) => (
            <rect
              key={i}
              x={-b.w / 2}
              y={b.y}
              width={b.w}
              height={9}
              rx={2}
              fill={toneVar}
              opacity={0.14 + (i / bars.length) * 0.34}
            />
          ))}
        </g>
      </svg>
      <span className="gf-creation__placeholder-tag">
        <ImageOff size={13} aria-hidden="true" /> Photo pending
      </span>
    </div>
  );
}

export function Creations() {
  const reduced = useReducedMotion();
  const item = reduced ? reducedReveal : fadeUp;

  return (
    <section className="gf-section gf-creations" id="work" aria-labelledby="work-title">
      <div className="gf-container">
        <SectionHeader
          id="work-title"
          eyebrow="Featured creations"
          title={<>Things we&rsquo;ve forged</>}
          lead="A few examples of what custom work looks like — from one-off keepsakes to functional parts and business pieces."
        />
      </div>

      <div className="gf-container gf-creations__list">
        {creations.map((creation, idx) => (
          <motion.article
            key={creation.id}
            className={`gf-creation ${idx % 2 === 1 ? 'gf-creation--flip' : ''}`}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            <div className="gf-creation__media">
              <TechFrame className={`gf-creation__frame gf-creation__frame--${creation.accent}`}>
                {creation.image ? (
                  <img
                    src={creation.image}
                    alt={creation.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={800}
                    className="gf-creation__img"
                  />
                ) : (
                  <MediaPlaceholder creation={creation} />
                )}
              </TechFrame>
            </div>

            <div className="gf-creation__dossier">
              <span className={`gf-creation__type gf-creation__type--${creation.accent}`}>
                {creation.type}
              </span>
              <h3 className="gf-creation__name">{creation.name}</h3>
              <p className="gf-creation__story gf-text-secondary">{creation.story}</p>

              <dl className="gf-creation__specs">
                <div>
                  <dt>Purpose</dt>
                  <dd>{creation.purpose}</dd>
                </div>
                <div>
                  <dt>Material</dt>
                  <dd>{creation.material}</dd>
                </div>
                <div>
                  <dt>Customization</dt>
                  <dd>{creation.customization}</dd>
                </div>
              </dl>

              <div className="gf-creation__tags" aria-hidden="true">
                <Tag tone={creation.accent}>{creation.type}</Tag>
                <Tag>{creation.material}</Tag>
              </div>

              <a href="#start" className="gf-creation__cta">
                Request something similar
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
