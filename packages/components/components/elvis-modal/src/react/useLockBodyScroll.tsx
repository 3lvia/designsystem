import { useRef } from 'react';

export function useLockBodyScroll() {
  const previousOverflow = useRef('');
  const root = document.documentElement ?? document.body;

  const lockBodyScroll = () => {
    previousOverflow.current = root.style.overflow;
    root.style.overflow = 'hidden';
  };

  const releaseBodyScroll = () => {
    root.style.overflow = previousOverflow.current;
  };

  return { lockBodyScroll, releaseBodyScroll };
}
