import { useEffect, useRef, useState } from 'react';

import { SegmentedControlProps } from './elviaSegmentedControl.types';

export const useSegmentedControlHighlighter = (
  selectedIndex: number,
  items: SegmentedControlProps['items'],
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedLeft, setSelectedLeft] = useState(`${selectedIndex * 100}%`);
  const [selectedWidth, setSelectedWidth] = useState(`${100 / (items?.length ?? 3)}%`);

  useEffect(() => {
    const updateSelectedStates = () => {
      if (ref.current) {
        const selectedControl = ref.current.children[selectedIndex] as HTMLElement | undefined;
        if (!selectedControl) {
          return;
        }
        setSelectedLeft(`${selectedControl.offsetLeft}px`);
        setSelectedWidth(`${selectedControl.offsetWidth}px`);
      }
    };

    updateSelectedStates();
    const ro = new ResizeObserver(updateSelectedStates);
    if (ref.current) {
      ro.observe(ref.current);
    }
    return () => {
      ro.disconnect();
    };
  }, [selectedIndex, items, ref.current]);

  return { selectedLeft, selectedWidth, ref };
};
