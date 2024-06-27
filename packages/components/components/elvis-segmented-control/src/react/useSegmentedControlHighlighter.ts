import { useEffect, useRef, useState } from 'react';

import { SegmentedControlProps } from './elviaSegmentedControl.types';

export const useSegmentedControlHighlighter = (
  selectedIndex: number,
  items: SegmentedControlProps['items'],
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedLeft, setSelectedLeft] = useState(0);
  const [selectedWidth, setSelectedWidth] = useState(0);

  useEffect(() => {
    const updateSelectedStates = () => {
      if (ref.current) {
        const selectedControl = ref.current.children[selectedIndex] as HTMLElement | undefined;
        if (!selectedControl) {
          return;
        }
        setSelectedLeft(selectedControl.offsetLeft);
        setSelectedWidth(selectedControl.offsetWidth);
      }
    };

    updateSelectedStates();
    window.addEventListener('resize', updateSelectedStates);
    return () => {
      window.removeEventListener('resize', updateSelectedStates);
    };
  }, [selectedIndex, items, ref.current]);

  return { selectedLeft, selectedWidth, ref };
};
