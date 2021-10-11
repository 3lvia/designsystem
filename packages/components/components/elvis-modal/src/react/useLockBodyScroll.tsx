import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLockBodyScroll(isShowing: boolean) {
  useEffect(() => {
    if (!isShowing) {
      return;
    }
    const originalStyleOverflow = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';
    // document.body.style.position = 'fixed';

    // add listener to disable scroll
    // window.addEventListener('scroll', noScroll(window.scrollY));

    // window.scrollTo(0, 1000);
    return () => {
      document.body.style.overflow = originalStyleOverflow;
      // document.body.style.position = 'unset';
      // window.removeEventListener('scroll', noScroll(window.scrollY));
    };
  }, [isShowing]);
}

// function noScroll(posY: number) {
//   console.log(posY);
//   window.scrollTo(posY, 0);
// }

// Remove listener to re-enable scroll
// window.removeEventListener('scroll', noScroll);
