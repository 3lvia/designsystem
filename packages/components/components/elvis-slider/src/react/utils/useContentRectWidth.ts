import { useEffect, useRef, useState } from 'react';

export function useContentRectWidth<T extends HTMLElement>() {
  const [width, setWidth] = useState<number>(0);

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }
    const resizeObserver = new ResizeObserver((entry) => {
      setWidth(entry[0].contentRect.width);
    });

    resizeObserver.observe(current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return [width, ref] as const;
}
