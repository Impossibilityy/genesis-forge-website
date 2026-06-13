import { ArrowUpRight, Mail, Instagram, Github } from 'lucide-react';
import { navItems, ctaItem } from '@/data/navigation';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="gf-footer">
      <div className="gf-container gf-footer__inner">
        <div className="gf-footer__lead">
          <a href="#top" className="gf-footer__brand" aria-label="Genesis Forge — home">
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
              <path d="M9 22 L16 9 L23 22" stroke="var(--color-primary)" strokeWidth="2.1" strokeLinecap="round" fill="none" />
              <g stroke="var(--color-secondary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
                <path d="M11 22 H21" /><path d="M12.5 19 H19.5" /><path d="M14 16 H18" />
              </g>
            </svg>
            <span>Genesis<span className="gf-hot"> Forge</span></span>
          </a>
          <p className="gf-footer__tagline gf-text-secondary">
            Custom 3D printing and creative fabrication. Bring a rough idea &mdash; leave with a real
            object.
          </p>
          <a href={ctaItem.href} className="gf-footer__cta">
            {ctaItem.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <nav className="gf-footer__col" aria-label="Footer">
          <h2 className="gf-footer__heading">Explore</h2>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="gf-footer__link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="gf-footer__col">
          <h2 className="gf-footer__heading">Contact</h2>
          <ul>
            <li>
              {/* PLACEHOLDER: replace with the real Genesis Forge email */}
              <a href="mailto:hello@genesisforge.example" className="gf-footer__link gf-footer__contact">
                <Mail size={15} aria-hidden="true" />
                hello@genesisforge.example
              </a>
            </li>
            <li className="gf-footer__meta">Serving makers &amp; small businesses, online &amp; local.</li>
          </ul>
          <div className="gf-footer__social">
            {/* PLACEHOLDER: replace hrefs with real profiles, or remove */}
            <a href="#" className="gf-footer__social-link" aria-label="Genesis Forge on Instagram">
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a href="#" className="gf-footer__social-link" aria-label="Genesis Forge on GitHub">
              <Github size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="gf-container gf-footer__base">
        <p className="gf-footer__meta">&copy; {year} Genesis Forge. All rights reserved.</p>
        <div className="gf-footer__legal">
          {/* PLACEHOLDER: link to real policies when available */}
          <a href="#" className="gf-footer__meta gf-footer__legal-link">Privacy</a>
          <a href="#" className="gf-footer__meta gf-footer__legal-link">Terms</a>
        </div>
      </div>
    </footer>
  );
}
