import { useCallback, useEffect, useState, type RefObject } from 'react';

export function useAnchorRect(
  ref: RefObject<HTMLElement>,
  enabled: boolean,
): DOMRect | null {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const update = useCallback(() => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, [ref]);

  useEffect(() => {
    if (!enabled) return;
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [enabled, update]);

  return rect;
}
