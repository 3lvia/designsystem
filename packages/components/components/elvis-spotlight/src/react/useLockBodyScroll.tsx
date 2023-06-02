import { useEffect } from 'react';

// eslint-disable-next-line
export function useLockBodyScroll(removeLockBodyScroll: boolean) {
  useEffect(() => {
    const originalStyleOverflowBody = window.getComputedStyle(document.body).overflow;
    const originalStyleOverflowHtml = window.getComputedStyle(document.documentElement).overflow;
    if (!removeLockBodyScroll) {
      document.body.style.overflow = originalStyleOverflowBody;
      document.documentElement.style.overflow = originalStyleOverflowHtml;
      return;
    }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyleOverflowBody;
      document.documentElement.style.overflow = originalStyleOverflowHtml;
    };
  }, [removeLockBodyScroll]);
}
