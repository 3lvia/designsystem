import { useEffect } from 'react';

export const useReturnFocus = (isOpen: boolean) => {
  /* Saving the original focused element before the popover is opened, and then returning focus to that
  element when the popover is closed. */
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const originalFocusedElement = document.activeElement as HTMLElement | null;
    return () => {
      originalFocusedElement?.focus();
    };
  }, [isOpen]);
};
