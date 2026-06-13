import { motion } from 'framer-motion';
import { FileImage, PencilLine, PackageX, MessageCircleQuestion } from 'lucide-react';
import { fadeUp, reducedReveal, stagger, inView } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const inputs = [
  { icon: PencilLine, label: 'A sketch' },
  { icon: FileImage, label: 'A photo' },
  { icon: PackageX, label: 'A broken part' },
  { icon: MessageCircleQuestion, label: 'Just a description' },
];

export function Possibility() {
  const reduced = useReducedMotion();
  const item = reduced ? reducedReveal : fadeUp;

  return (
    <section className="gf-section gf-possibility" id="possibility" aria-labelledby="possibility-title">
      <div className="gf-container">
        <motion.div
          className="gf-possibility__inner"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <motion.h2 className="gf-possibility__title" id="possibility-title" variants={item}>
            You don&rsquo;t need a 3D model.
            <br />
            <span className="gf-text-secondary">You just need a starting point.</span>
          </motion.h2>

          <motion.p className="gf-possibility__body gf-measure" variants={item}>
            Most people who come to us can&rsquo;t open a CAD program, and that&rsquo;s completely
            fine. Whatever shape your idea is in right now is a shape we can work with. We&rsquo;ll
            ask a few questions, figure out what&rsquo;s possible, and take it from there.
          </motion.p>

          <motion.ul className="gf-possibility__inputs" variants={item} aria-label="What you can bring us">
            {inputs.map(({ icon: Icon, label }) => (
              <li key={label} className="gf-possibility__chip">
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
