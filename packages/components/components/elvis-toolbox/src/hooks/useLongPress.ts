import { RefObject, useEffect, useState } from 'react';

export const useLongPress = (ref: RefObject<HTMLElement>): { isLongPressed: boolean } => {
  let timeoutId = 0;
  const [isLongPressed, setIsLongPressed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const onMouseDown = (): void => {
      timeoutId = window.setTimeout(() => {
        setIsLongPressed(true);
      }, 400);
    };

    const onMouseUp = (): void => {
      window.clearTimeout(timeoutId);
      setIsLongPressed(false);
    };

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onMouseDown);
    element.addEventListener('mouseup', onMouseUp);
    element.addEventListener('touchend', onMouseUp);

    return () => {
      element.removeEventListener('mousedown', onMouseDown);
      element.removeEventListener('touchstart', onMouseDown);
      element.removeEventListener('mouseup', onMouseUp);
      element.removeEventListener('touchend', onMouseUp);
    };
  }, [ref]);

  return { isLongPressed };
};
