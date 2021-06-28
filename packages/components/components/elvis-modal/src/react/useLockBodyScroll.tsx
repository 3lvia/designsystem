import { useLayoutEffect } from 'react';

export function useLockBodyScroll(isShowing: boolean) {
  useLayoutEffect(() => {
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
