import { useEffect } from 'react';

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
