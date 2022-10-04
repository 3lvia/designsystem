import { useFocusTrap } from '@elvia/elvis-toolbox';
import { RefObject, useState } from 'react';

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
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
      setTimeout(() => useFocusTrap(popoverRef));
    } else {
      setFadeOut(true);
      useFocusTrap(popoverRef, true);
      window?.removeEventListener('keydown', onKeydown);
      setTimeout(() => triggerRef.current?.focus());
    }
  };

  const onAnimationEnd = (): void => {
    if (fadeOut) {
      setUserMenuIsOpen(false);
    }
  };

  return { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut };
};
