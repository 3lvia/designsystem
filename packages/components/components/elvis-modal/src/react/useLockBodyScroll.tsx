import { useRef } from 'react';

export function useLockBodyScroll() {
  const previousBodyWidth = useRef('');
  const previousBodyPosition = useRef('');
  const previousBodyTop = useRef(0);
  const previousBodyLeft = useRef(0);

  const lockBodyScroll = () => {
    const top = window.scrollY;
    const left = window.scrollX;

    previousBodyPosition.current = document.body.style.position;
    document.body.style.position = 'fixed';

    previousBodyWidth.current = document.body.style.width;
    document.body.style.width = '100%';

    previousBodyTop.current = top;
    document.body.style.top = `-${top}px`;

    previousBodyLeft.current = left;
    document.body.style.left = `-${left}px`;
  };

  const releaseBodyScroll = () => {
    document.body.style.position = previousBodyPosition.current;
    document.body.style.width = previousBodyWidth.current;
    window.scroll({
      top: previousBodyTop.current,
      left: previousBodyLeft.current,
      behavior: 'instant',
    });
  };

  return { lockBodyScroll, releaseBodyScroll };
}
