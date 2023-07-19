import { useEffect, useRef, useState } from 'react';

export const useDynamicStepCount = (minWidth: number) => {
  const stepListElement = useRef<HTMLDivElement>(null);
  const [numberOfVisibleSteps, setNoOfVisibleSteps] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((resize) => {
      const visibleSteps = Math.ceil(resize[0].contentRect.width / minWidth);
      if (visibleSteps !== numberOfVisibleSteps) {
        // Cap at 5 steps
        setNoOfVisibleSteps(Math.min(visibleSteps, 5));
      }
    });

    if (stepListElement.current) {
      resizeObserver.observe(stepListElement.current);
    }

    return () => resizeObserver.disconnect();
  }, [stepListElement]);

  return { numberOfVisibleSteps, stepListElement };
};
