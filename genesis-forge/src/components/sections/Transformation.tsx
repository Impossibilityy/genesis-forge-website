import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { transformStages } from '@/data/transformation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/motion';

/* Three representations of the same vessel, crossfaded by the active stage. */
function StageArt({ active }: { active: number }) {
  const reduced = useReducedMotion();
  const fade = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transition: { duration: reduced ? 0 : 0.4, ease: ease.out },
  });

  return (
    <div className="gf-xform__art" aria-hidden="true">
      <svg viewBox="0 0 240 260" className="gf-xform__svg">
        {/* Stage 0 — rough sketch */}
        <motion.g
          animate={fade(active === 0)}
          stroke="var(--color-secondary)"
          fill="none"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M84 60 q-10 60 6 130 q30 18 60 0 q16 -70 6 -130" opacity="0.9" />
          <path d="M82 62 q40 -16 76 0" />
          <path d="M88 196 q32 12 64 0" opacity="0.7" />
          <path d="M96 110 q24 -8 48 2" opacity="0.5" />
          <path d="M78 58 l-14 -12 M162 58 l14 -12" opacity="0.5" />
        </motion.g>

        {/* Stage 1 — clean wireframe */}
        <motion.g animate={fade(active === 1)} stroke="var(--color-secondary)" fill="none" strokeWidth="1.1">
          <path d="M86 58 C72 120 78 180 92 198 L148 198 C162 180 168 120 154 58 Z" opacity="0.85" />
          {[58, 92, 130, 168, 198].map((y, i) => (
            <ellipse key={i} cx="120" cy={y} rx={i === 0 || i === 4 ? 34 : 40 - Math.abs(2 - i) * 6} ry="6" opacity="0.6" />
          ))}
          <line x1="120" y1="52" x2="120" y2="204" opacity="0.3" strokeDasharray="3 4" />
        </motion.g>

        {/* Stage 2 — solid layered object */}
        <motion.g animate={fade(active === 2)}>
          <defs>
            <linearGradient id="gf-xform-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2b2f3d" />
              <stop offset="100%" stopColor="#0e1016" />
            </linearGradient>
          </defs>
          {Array.from({ length: 14 }, (_, i) => {
            const t = i / 13;
            const y = 198 - t * 140;
            const rx = (34 + Math.sin(t * Math.PI) * 14) * (1 - t * 0.08);
            return (
              <g key={i}>
                <ellipse cx="120" cy={y} rx={rx} ry={rx * 0.22} fill="url(#gf-xform-body)" />
                <ellipse cx="120" cy={y} rx={rx} ry={rx * 0.22} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="0.7" />
              </g>
            );
          })}
          <ellipse cx="120" cy="58" rx="31" ry="7" fill="none" stroke="var(--color-primary)" strokeWidth="1.1" opacity="0.6" />
        </motion.g>
      </svg>
    </div>
  );
}

export function Transformation() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (active + dir + transformStages.length) % transformStages.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="gf-section gf-xform" id="transformation" aria-labelledby="xform-title">
      <div className="gf-container">
        <SectionHeader
          id="xform-title"
          eyebrow="Idea → object"
          title={<>Watch a rough start become a real thing</>}
          lead="The same object at three moments. Step through it — or read all three; both work."
        />

        <div className="gf-xform__viewer">
          <div className="gf-xform__stage-art">
            <StageArt active={active} />
            <div className="gf-xform__progress" aria-hidden="true">
              {transformStages.map((s, i) => (
                <span key={s.key} className={`gf-xform__dot ${i === active ? 'is-active' : ''}`} />
              ))}
            </div>
          </div>

          <div className="gf-xform__controls">
            <div
              role="tablist"
              aria-label="Transformation stages"
              className="gf-xform__tabs"
              onKeyDown={onKeyDown}
            >
              {transformStages.map((s, i) => (
                <button
                  key={s.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`xform-tab-${s.key}`}
                  aria-selected={i === active}
                  aria-controls={`xform-panel-${s.key}`}
                  tabIndex={i === active ? 0 : -1}
                  className={`gf-xform__tab ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="gf-xform__tab-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="gf-xform__tab-kicker">{s.kicker}</span>
                </button>
              ))}
            </div>

            {transformStages.map((s, i) => (
              <div
                key={s.key}
                role="tabpanel"
                id={`xform-panel-${s.key}`}
                aria-labelledby={`xform-tab-${s.key}`}
                hidden={i !== active}
                className="gf-xform__panel"
              >
                <h3 className="gf-xform__panel-title">{s.title}</h3>
                <p className="gf-text-secondary">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
