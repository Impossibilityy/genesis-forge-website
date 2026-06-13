import type { ReactNode } from 'react';

interface TechFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * CAD-style inspection frame: corner brackets around content. Reinforces the
 * "technical precision" theme on featured objects and the transformation viewer.
 */
export function TechFrame({ children, className = '' }: TechFrameProps) {
  return (
    <div className={`gf-techframe ${className}`}>
      <span className="gf-techframe__corner gf-techframe__corner--tl" aria-hidden="true" />
      <span className="gf-techframe__corner gf-techframe__corner--tr" aria-hidden="true" />
      <span className="gf-techframe__corner gf-techframe__corner--bl" aria-hidden="true" />
      <span className="gf-techframe__corner gf-techframe__corner--br" aria-hidden="true" />
      {children}
    </div>
  );
}
