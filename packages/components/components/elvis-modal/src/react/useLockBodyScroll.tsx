import { useRef } from 'react';

export function useLockBodyScroll() {
  const previousBodyPosition = useRef('');
  const previousBodyTop = useRef(0);
  const previousBodyLeft = useRef(0);

  const lockBodyScroll = () => {
    const top = window.scrollY;
    const left = window.scrollX;

    previousBodyTop.current = top;
    document.body.style.top = `-${top}px`;

    previousBodyLeft.current = left;
    document.body.style.left = `-${left}px`;

    previousBodyPosition.current = document.body.style.position;
    document.body.style.position = 'fixed';
  };

  const releaseBodyScroll = () => {
    document.body.style.position = previousBodyPosition.current;
    window.scroll({
      top: previousBodyTop.current,
      left: previousBodyLeft.current,
      behavior: 'instant',
    });
  };

  return { lockBodyScroll, releaseBodyScroll };
}
