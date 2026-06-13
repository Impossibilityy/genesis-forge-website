import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  tone?: 'neutral' | 'hot' | 'cool' | 'violet';
}

/** Small mono spec tag — used for material / type metadata on creations. */
export function Tag({ children, tone = 'neutral' }: TagProps) {
  return <span className={`gf-tag gf-tag--${tone}`}>{children}</span>;
}
