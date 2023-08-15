import { RefObject } from 'react';

export const useFocusTrap = (): {
  trapFocus: (focusTrapContainer: RefObject<HTMLElement>) => void;
  releaseFocusTrap: () => void;
} => {
  let firstItem: Element;
  let lastItem: Element;

  const handleFirstItemTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey) {
      if (lastItem) {
        (lastItem as HTMLElement).focus();
      }
      e.preventDefault();
    }
  };

  const handleLastItemTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      if (firstItem) {
        (firstItem as HTMLElement).focus();
      }
      e.preventDefault();
    }
  };

  const trapFocus = (focusTrapContainer: RefObject<HTMLElement>) => {
    setTimeout(() => {
      if (!focusTrapContainer.current) {
        return;
      }
      const focusableItems = Array.from(
        focusTrapContainer.current.querySelectorAll(
          'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => {
        return (
          !element.hasAttribute('disabled') &&
          element.getAttribute('aria-hidden') !== 'true' &&
          parseInt(element.getAttribute('tabindex') ?? '0') >= 0
        );
      });

      firstItem = focusableItems[0];
      lastItem = focusableItems[focusableItems.length - 1];

      if (firstItem) {
        (firstItem as HTMLElement).focus();
        firstItem.addEventListener('keydown', handleFirstItemTab);
      }
      if (lastItem) {
        lastItem.addEventListener('keydown', handleLastItemTab);
      }
    });
  };

  const releaseFocusTrap = () => {
    if (firstItem) {
      firstItem.removeEventListener('keydown', handleFirstItemTab);
    }
    if (lastItem) {
      lastItem.removeEventListener('keydown', handleLastItemTab);
    }
  };

  return { trapFocus, releaseFocusTrap };
};
