import { useEffect, useState } from 'react';

export const useDelayedFlag = (delay: number): boolean => {
  const [hasAnimation, setHasAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasAnimation(true);
    }, delay);
  }, []);
  return hasAnimation;
};
