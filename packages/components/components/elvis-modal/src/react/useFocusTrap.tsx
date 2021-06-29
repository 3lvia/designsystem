import { RefObject, useEffect } from 'react';

export const useFocusTrap = (focusTrapContainer: RefObject<HTMLElement>): void => {
  let focusableItems: NodeListOf<HTMLElement>;

  useEffect(() => {
    if (!focusTrapContainer.current) {
      return;
    }
    focusableItems = focusTrapContainer.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video',
    );
    const firstItem = focusableItems.item(0);
    const lastItem = focusableItems.item(focusableItems.length - 1);

    const handleFirstItemTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && e.shiftKey) {
        lastItem.focus();
        e.preventDefault();
      }
    };
    const handleLastItemTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        firstItem.focus();
        e.preventDefault();
      }
    };

    firstItem?.focus();
    firstItem?.addEventListener('keydown', handleFirstItemTab);
    lastItem?.addEventListener('keydown', handleLastItemTab);

    return () => {
      firstItem?.removeEventListener('keydown', handleFirstItemTab);
      lastItem?.removeEventListener('keydown', handleLastItemTab);
    };
  }, []);
};
