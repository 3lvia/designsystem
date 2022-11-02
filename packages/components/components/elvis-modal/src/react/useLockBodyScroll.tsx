import { useEffect } from 'react';

export function useLockBodyScroll(shouldDisableBodyScroll: boolean): void {
  useEffect(() => {
    if (!shouldDisableBodyScroll) {
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
  }, [shouldDisableBodyScroll]);
}
