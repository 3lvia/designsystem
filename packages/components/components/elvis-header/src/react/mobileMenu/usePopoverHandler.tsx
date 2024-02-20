import { RefObject, useState } from 'react';
import { flushSync } from 'react-dom';

import { useFocusTrap } from '@elvia/elvis-toolbox';

interface ReturnType {
  userMenuIsOpen: boolean;
  setIsShowing: (isShowing: boolean) => void;
  onAnimationEnd: () => void;
  fadeOut: boolean;
}

export const usePopoverHandler = (
  triggerRef: RefObject<HTMLElement>,
  popoverRef: RefObject<HTMLElement>,
): ReturnType => {
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(true);

  const onKeydown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Escape') {
      setIsShowing(false);
    }
  };

  const setIsShowing = (isShowing: boolean): void => {
    if (isShowing) {
      setUserMenuIsOpen(isShowing);
      setFadeOut(false);
      window?.addEventListener('keydown', onKeydown);
      setTimeout(() => trapFocus(popoverRef));
    } else {
      setFadeOut(true);
      releaseFocusTrap();
      window?.removeEventListener('keydown', onKeydown);
      setTimeout(() => triggerRef.current?.focus());
    }
  };

  const onAnimationEnd = (): void => {
    if (fadeOut) {
      flushSync(() => setUserMenuIsOpen(false));
    }
  };

  return { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut };
};
