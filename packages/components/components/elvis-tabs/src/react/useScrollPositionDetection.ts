import { RefObject, useEffect, useRef, useState } from 'react';
import { ScrollPosition } from './elvia-tabs.types';

export const useScrollPositionDetection = (ref: RefObject<HTMLElement>): ScrollPosition => {
  const [position, setPosition] = useState<ScrollPosition>('no-scroll');
  const positionRef = useRef<ScrollPosition>(position);

  /**
   * We need this hacky solution with a useRef since addEventListener
   * is unable to read changes to position since it captures a snapshot
   * of the variable when the event listener starts.
   */
  const updatePosition = (pos: ScrollPosition): void => {
    setPosition(pos);
    positionRef.current = pos;
  };

  const setInitialScrollPosition = () => {
    const hasScroll = (ref.current?.clientWidth || 0) < (ref.current?.scrollWidth || 0);
    updatePosition(hasScroll ? 'left' : 'no-scroll');
  };

  useEffect(() => {
    setInitialScrollPosition();

    const onScroll = () => {
      if (!ref.current) {
        return;
      }

      const hasScroll = ref.current.clientWidth < ref.current.scrollWidth;
      const scrollLeft = ref.current.scrollLeft;
      const scrollRight = ref.current.scrollWidth - (ref.current.clientWidth + scrollLeft);

      if (!hasScroll) {
        updatePosition('no-scroll');
      } else if (scrollLeft <= 10) {
        updatePosition('left');
      } else if (scrollRight <= 10) {
        updatePosition('right');
      } else if (scrollLeft > 10 && scrollRight > 10) {
        updatePosition('center');
      }
    };

    const observer = new ResizeObserver(onScroll);

    if (ref.current) {
      ref.current.addEventListener('scroll', onScroll);
      observer.observe(ref.current);
    }

    return () => {
      ref.current?.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return position;
};
