import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLockBodyScroll(isShowing: boolean) {
  useEffect(() => {
    if (!isShowing) {
      return;
    }
    const originalStyleOverflow = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    return () => {
      document.body.style.overflow = originalStyleOverflow;
      document.body.style.height = 'unset';
    };
  }, [isShowing]);
}
