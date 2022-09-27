import { useEffect, useState } from 'react';

type BreakPoint = 'gt-mobile' | 'gt-tablet';

export const useBreakpoint = (deviceType: BreakPoint): boolean => {
  const [matches, setMatches] = useState(false);
  let mediaQueryList: MediaQueryList | undefined;

  useEffect(() => {
    const onScreenChange = (ev: MediaQueryListEvent): void => {
      setMatches(ev.matches);
    };

    const query = deviceType === 'gt-mobile' ? '(min-width: 768px)' : '(min-width: 1024px)';
    mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', onScreenChange);

    return () => {
      mediaQueryList?.removeEventListener('change', onScreenChange);
    };
  }, []);

  return matches;
};
