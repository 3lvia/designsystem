import { useRef } from 'react';

export const usePauseableTimer = (
  callback: () => void,
  delay: number,
): { pauseTimer: () => void; resumeTimer: () => void; startTimer: () => void; clearTimer: () => void } => {
  const timerId = useRef(0);
  const startTime = useRef(0);
  const remaining = useRef(delay);

  const pauseTimer = () => {
    clearTimeout(timerId.current);
    timerId.current = 0;
    remaining.current -= Date.now() - startTime.current;
  };

  const resumeTimer = () => {
    if (timerId.current) {
      return;
    }

    startTime.current = Date.now();
    timerId.current = window.setTimeout(callback, remaining.current);
  };

  const startTimer = () => {
    remaining.current = delay;
    resumeTimer();
  };

  const clearTimer = () => {
    clearTimeout(timerId.current);
  };

  return { pauseTimer, resumeTimer, startTimer, clearTimer };
};
