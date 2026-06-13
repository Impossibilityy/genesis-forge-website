import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navItems, ctaItem } from '@/data/navigation';
import { useScrolledPast } from '@/hooks/useScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/motion';

const sectionIds = navItems.map((n) => n.id);

export function Navbar() {
  const scrolled = useScrolledPast(40);
  const active = useActiveSection([...sectionIds, ctaItem.id]);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Escape to close + focus trap within the open mobile panel.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        toggleRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <header className={`gf-nav ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="gf-nav__inner gf-container">
        <a href="#top" className="gf-nav__brand" aria-label="Genesis Forge — home">
          <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
            <path
              d="M9 22 L16 9 L23 22"
              stroke="var(--color-primary)"
              strokeWidth="2.1"
              strokeLinecap="round"
              fill="none"
            />
            <g stroke="var(--color-secondary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
              <path d="M11 22 H21" />
              <path d="M12.5 19 H19.5" />
              <path d="M14 16 H18" />
            </g>
          </svg>
          <span className="gf-nav__brand-name">
            Genesis<span className="gf-hot"> Forge</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="gf-nav__links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`gf-nav__link ${active === item.id ? 'is-active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="gf-nav__actions">
          <a href={ctaItem.href} className="gf-nav__cta">
            {ctaItem.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="gf-nav__burger"
            aria-expanded={open}
            aria-controls="gf-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="gf-nav__scrim"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
              aria-hidden="true"
            />
            <motion.div
              id="gf-mobile-menu"
              ref={panelRef}
              className="gf-nav__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduced ? 0 : 0.26, ease: ease.out }}
            >
              <nav className="gf-nav__panel-links" aria-label="Primary mobile">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`gf-nav__panel-link ${active === item.id ? 'is-active' : ''}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    onClick={close}
                  >
                    <span className="gf-nav__panel-index" aria-hidden="true">
                      {String(navItems.indexOf(item) + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>
              <a href={ctaItem.href} className="gf-btn gf-btn--primary gf-btn--lg gf-nav__panel-cta" onClick={close}>
                <span className="gf-btn__label">{ctaItem.label}</span>
                <span className="gf-btn__icon" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
