import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLockBodyScroll(isShowing: boolean) {
  useEffect(() => {
    if (!isShowing) {
      return;
    }
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isShowing]);
}
