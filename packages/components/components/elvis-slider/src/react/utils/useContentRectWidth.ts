import { useEffect, useRef, useState } from 'react';

export function useContentRectWidth<T extends HTMLElement>(): [number, React.RefObject<T>] {
  const [width, setWidth] = useState<number>(0);

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }
    const resizeObserver = new ResizeObserver((entry) => {
      setWidth(Math.round(entry[0].contentRect.width));
    });

    resizeObserver.observe(current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return [width, ref];
}
