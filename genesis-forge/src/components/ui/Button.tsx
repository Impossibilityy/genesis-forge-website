import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { as?: 'button' };
type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Single button primitive used everywhere so interaction states stay consistent.
 * - primary: molten fill, dark label (high contrast on hot metal)
 * - secondary: precision-cyan outline
 * - ghost: quiet text action
 * Loading disables the control and announces busy state.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'lg', loading = false, iconLeft, iconRight, children, ...rest },
    ref
  ) {
    const className = ['gf-btn', `gf-btn--${variant}`, `gf-btn--${size}`].join(' ');

    const content = (
      <>
        {loading ? (
          <Loader2 className="gf-btn__spinner" size={18} aria-hidden="true" />
        ) : (
          iconLeft && (
            <span className="gf-btn__icon" aria-hidden="true">
              {iconLeft}
            </span>
          )
        )}
        <span className="gf-btn__label">{children}</span>
        {!loading && iconRight && (
          <span className="gf-btn__icon" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </>
    );

    if (rest.as === 'a') {
      const { as: _as, ...anchorRest } = rest as ButtonAsLink;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={className} {...anchorRest}>
          {content}
        </a>
      );
    }

    const { as: _as, disabled, ...buttonRest } = rest as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={className}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);
