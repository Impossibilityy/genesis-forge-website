import { useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/motion';

/* -----------------------------------------------------------------------------
   Geometry — a solid-of-revolution vessel described as a stack of elliptical
   "print layers". This literally visualises the brand idea: layers assembling
   into a finished object.
----------------------------------------------------------------------------- */
const VIEW_W = 360;
const CENTER_X = 180;
const Y_BOTTOM = 398;
const Y_TOP = 84;
const HEIGHT = Y_BOTTOM - Y_TOP;
const MAX_R = 118;
const SQUASH = 0.22; // ellipse vertical/horizontal ratio (perspective)
const LAYER_COUNT = 27;

// Vessel profile: radius as a fraction of MAX_R along the height (0 = base).
const PROFILE: Array<[number, number]> = [
  [0.0, 0.5],
  [0.12, 0.8],
  [0.3, 1.0],
  [0.5, 0.86],
  [0.68, 0.5],
  [0.82, 0.46],
  [0.94, 0.64],
  [1.0, 0.68],
];

function smoothstep(a: number, b: number, t: number): number {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

function radiusAt(t: number): number {
  for (let i = 0; i < PROFILE.length - 1; i++) {
    const [t0, r0] = PROFILE[i];
    const [t1, r1] = PROFILE[i + 1];
    if (t <= t1) {
      const k = smoothstep(t0, t1, t);
      return (r0 + (r1 - r0) * k) * MAX_R;
    }
  }
  return PROFILE[PROFILE.length - 1][1] * MAX_R;
}

interface Layer {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  hot: boolean; // top layers catch the molten rim light
}

export function ForgeObject() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const layers = useMemo<Layer[]>(() => {
    const out: Layer[] = [];
    for (let i = 0; i < LAYER_COUNT; i++) {
      const t = i / (LAYER_COUNT - 1);
      const rx = radiusAt(t);
      out.push({
        cx: CENTER_X,
        cy: Y_BOTTOM - t * HEIGHT,
        rx,
        ry: Math.max(3, rx * SQUASH),
        hot: t > 0.88,
      });
    }
    return out; // index 0 = bottom (rendered first => staggers bottom -> top)
  }, []);

  // Wireframe silhouette contours (left + right edges) for the blueprint phase.
  const { leftPath, rightPath } = useMemo(() => {
    const steps = 48;
    let left = '';
    let right = '';
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const r = radiusAt(t);
      const y = Y_BOTTOM - t * HEIGHT;
      left += `${i === 0 ? 'M' : 'L'}${(CENTER_X - r).toFixed(1)} ${y.toFixed(1)} `;
      right += `${i === 0 ? 'M' : 'L'}${(CENTER_X + r).toFixed(1)} ${y.toFixed(1)} `;
    }
    return { leftPath: left, rightPath: right };
  }, []);

  // A few guide rings drawn during the blueprint phase.
  const guideRings = useMemo(() => [0.05, 0.3, 0.55, 0.78, 0.98].map((t) => {
    const r = radiusAt(t);
    return { cx: CENTER_X, cy: Y_BOTTOM - t * HEIGHT, rx: r, ry: Math.max(3, r * SQUASH) };
  }), []);

  /* ----- Pointer tilt (skipped for reduced motion / touch) ----------------- */
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 120, damping: 18 });
  const springY = useSpring(ry, { stiffness: 120, damping: 18 });
  const annParallax = useTransform(springY, [-7, 7], [8, -8]);

  const coarsePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const tiltEnabled = !reduced && !coarsePointer;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!tiltEnabled || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14); // rotateY
    rx.set(-py * 10); // rotateX
  }
  function handlePointerLeave() {
    rx.set(0);
    ry.set(0);
  }

  const wireTransition = reduced
    ? { duration: 0 }
    : {
        pathLength: { duration: 0.9, ease: ease.out },
        opacity: { delay: 1.05, duration: 0.5, ease: ease.out },
      };

  return (
    <div
      className="gf-forge"
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="img"
      aria-label="An abstract 3D-printed vessel assembling layer by layer from a blueprint wireframe into a finished, solid object."
    >
      <motion.div
        className="gf-forge__stage"
        style={
          tiltEnabled
            ? { rotateX: springX, rotateY: springY, transformPerspective: 900 }
            : undefined
        }
      >
        {/* Ambient base glow under the object */}
        <div className="gf-forge__platform" aria-hidden="true" />

        <motion.svg
          viewBox={`0 0 ${VIEW_W} 460`}
          className="gf-forge__svg"
          aria-hidden="true"
          animate={
            reduced
              ? undefined
              : { y: [0, -6, 0] }
          }
          transition={
            reduced
              ? undefined
              : { duration: 7, ease: 'easeInOut', repeat: Infinity }
          }
        >
          <defs>
            <linearGradient id="gf-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2b2f3d" />
              <stop offset="45%" stopColor="#1c2029" />
              <stop offset="100%" stopColor="#0e1016" />
            </linearGradient>
            <radialGradient id="gf-keylight" cx="34%" cy="22%" r="72%">
              <stop offset="0%" stopColor="rgba(255,178,62,0.55)" />
              <stop offset="40%" stopColor="rgba(255,107,44,0.12)" />
              <stop offset="100%" stopColor="rgba(255,107,44,0)" />
            </radialGradient>
            <linearGradient id="gf-heat" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,178,62,0)" />
              <stop offset="45%" stopColor="rgba(255,178,62,0.0)" />
              <stop offset="50%" stopColor="rgba(255,222,150,0.85)" />
              <stop offset="55%" stopColor="rgba(255,178,62,0)" />
              <stop offset="100%" stopColor="rgba(255,178,62,0)" />
            </linearGradient>

            {/* Silhouette clip = union of all layer ellipses */}
            <clipPath id="gf-silhouette">
              {layers.map((l, i) => (
                <ellipse key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} />
              ))}
            </clipPath>
          </defs>

          {/* ---- Blueprint wireframe (draws first, then fades back) ---- */}
          <g stroke="var(--color-secondary)" fill="none" strokeWidth="1.1">
            <motion.path
              d={leftPath}
              initial={{ pathLength: 0, opacity: 0.9 }}
              animate={{ pathLength: 1, opacity: reduced ? 0.16 : 0.16 }}
              transition={wireTransition}
            />
            <motion.path
              d={rightPath}
              initial={{ pathLength: 0, opacity: 0.9 }}
              animate={{ pathLength: 1, opacity: 0.16 }}
              transition={wireTransition}
            />
            {guideRings.map((g, i) => (
              <motion.ellipse
                key={i}
                cx={g.cx}
                cy={g.cy}
                rx={g.rx}
                ry={g.ry}
                initial={{ pathLength: 0, opacity: 0.7 }}
                animate={{ pathLength: 1, opacity: 0.12 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        pathLength: { duration: 0.8, ease: ease.out, delay: i * 0.05 },
                        opacity: { delay: 1.05, duration: 0.5 },
                      }
                }
              />
            ))}
          </g>

          {/* ---- Solid layers assemble bottom -> top ---- */}
          <motion.g
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: reduced
                  ? { staggerChildren: 0 }
                  : { staggerChildren: 0.045, delayChildren: 0.7 },
              },
            }}
          >
            {layers.map((l, i) => (
              <motion.g
                key={i}
                variants={{
                  hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.32, ease: ease.out }}
              >
                <ellipse cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} fill="url(#gf-body)" />
                {/* Seam line — the visible lower arc reads as a print layer */}
                <ellipse
                  cx={l.cx}
                  cy={l.cy}
                  rx={l.rx}
                  ry={l.ry}
                  fill="none"
                  stroke="rgba(0,0,0,0.45)"
                  strokeWidth="0.8"
                />
                {l.hot && (
                  <ellipse
                    cx={l.cx}
                    cy={l.cy}
                    rx={l.rx}
                    ry={l.ry}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                    opacity="0.55"
                  />
                )}
              </motion.g>
            ))}
          </motion.g>

          {/* Molten key light wash over the solid */}
          <rect
            x="40"
            y="60"
            width="280"
            height="360"
            fill="url(#gf-keylight)"
            clipPath="url(#gf-silhouette)"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* ---- One-time heat sweep ---- */}
          {!reduced && (
            <g clipPath="url(#gf-silhouette)" style={{ mixBlendMode: 'screen' }}>
              <motion.rect
                x="0"
                y="60"
                width="160"
                height="360"
                fill="url(#gf-heat)"
                initial={{ x: -180 }}
                animate={{ x: 380 }}
                transition={{ delay: 2.3, duration: 1.2, ease: ease.inOut }}
              />
            </g>
          )}
        </motion.svg>

        {/* ---- Technical annotations (parallax with tilt) ---- */}
        <motion.div
          className="gf-forge__annotations"
          style={tiltEnabled ? { x: annParallax } : undefined}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: 1.9, duration: 0.5 }}
          aria-hidden="true"
        >
          <span className="gf-forge__ann gf-forge__ann--layer">
            <span className="gf-forge__ann-dot" />
            LAYER 0.20mm
          </span>
          <span className="gf-forge__ann gf-forge__ann--mat">
            <span className="gf-forge__ann-dot gf-forge__ann-dot--cool" />
            PLA · MATTE
          </span>
          <span className="gf-forge__ann gf-forge__ann--dim">Ø 240 mm</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
