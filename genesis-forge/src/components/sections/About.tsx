import { motion } from 'framer-motion';
import { fadeUp, reducedReveal, stagger, inView } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function About() {
  const reduced = useReducedMotion();
  const item = reduced ? reducedReveal : fadeUp;

  return (
    <section className="gf-section gf-about" id="about" aria-labelledby="about-title">
      <div className="gf-container gf-about__grid">
        <motion.div
          className="gf-about__intro"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <motion.p className="gf-eyebrow" variants={item}>
            About Genesis Forge
          </motion.p>
          <motion.h2 className="gf-about__title" id="about-title" variants={item}>
            A small workshop for ideas that don&rsquo;t fit on a shelf
          </motion.h2>
        </motion.div>

        <motion.div
          className="gf-about__body"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <motion.p variants={item} className="gf-about__lead">
            Genesis Forge started from a simple frustration: the thing someone needed didn&rsquo;t
            exist, and nobody sold it. So we made it. Then we made the next one, and the one after
            that.
          </motion.p>
          <motion.p variants={item} className="gf-text-secondary">
            We&rsquo;re a hands-on fabrication shop built around curiosity and stubborn
            problem-solving. We like the part of a project where it&rsquo;s still messy &mdash; a
            rough sketch, a broken part, a &ldquo;could you maybe make&hellip;&rdquo;. That&rsquo;s
            where the interesting work is. From there it&rsquo;s digital design, test prints,
            adjustments, and refinement until the object in your hand matches the one in your head.
          </motion.p>
          <motion.p variants={item} className="gf-text-secondary">
            Nothing about the process is precious. We&rsquo;d rather print a quick version, hold it,
            and find out what&rsquo;s wrong than guess on a screen. Bring us something half-formed
            &mdash; that&rsquo;s exactly what we&rsquo;re here for.
          </motion.p>

          <motion.ul className="gf-about__principles" variants={item}>
            <li><span className="gf-cool">Curiosity</span> over assumption</li>
            <li><span className="gf-hot">Iteration</span> over guesswork</li>
            <li><span className="gf-cool">Physical</span> over theoretical</li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
