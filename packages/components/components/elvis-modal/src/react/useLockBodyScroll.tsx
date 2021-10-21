import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLockBodyScroll(isShowing: boolean) {
  useEffect(() => {
    if (!isShowing) {
      return;
    }
    const originalStyleOverflowBody = window.getComputedStyle(document.body).overflow;
    const originalStyleOverflowHtml = window.getComputedStyle(document.documentElement).overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyleOverflowBody;
      document.documentElement.style.overflow = originalStyleOverflowHtml;
    };
  }, [isShowing]);
}
