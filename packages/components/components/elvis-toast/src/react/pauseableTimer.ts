import { useRef } from 'react';

export const usePauseableTimer = (
  callback: () => void,
  delay: number,
): { pause: () => void; resume: () => void; start: () => void; clear: () => void } => {
  const timerId = useRef(0);
  const startTime = useRef(0);
  const remaining = useRef(delay);

  const pause = () => {
    clearTimeout(timerId.current);
    timerId.current = 0;
    remaining.current -= Date.now() - startTime.current;
  };

  const resume = () => {
    if (timerId.current) {
      return;
    }

    startTime.current = Date.now();
    timerId.current = window.setTimeout(callback, remaining.current);
  };

  const start = () => {
    remaining.current = delay;
    resume();
  };

  const clear = () => {
    clearTimeout(timerId.current);
  };

  return { pause, resume, start, clear };
};
