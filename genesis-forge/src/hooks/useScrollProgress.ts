import { useEffect, useState } from 'react';

/**
 * Returns true once the window has scrolled past `threshold` px.
 * Used to transition the navbar from transparent (over hero) to a solid surface.
 * Throttled with requestAnimationFrame to keep scroll work light.
 */
export function useScrolledPast(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}
