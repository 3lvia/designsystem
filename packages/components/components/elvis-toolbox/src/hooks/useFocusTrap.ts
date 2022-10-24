import { RefObject } from 'react';

export const useFocusTrap = (): {
  trapFocus: (focusTrapContainer: RefObject<HTMLElement>) => void;
  releaseFocusTrap: () => void;
} => {
  let firstItem: Element;
  let lastItem: Element;

  /**
   * If the user presses the Tab key while holding down the Shift key, and the focus is on the first
   * item, then focus on the last item.
   */
  const handleFirstItemTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey) {
      if (lastItem) {
        (lastItem as HTMLElement).focus();
      }
      e.preventDefault();
    }
  };

  /**
   * If the user presses the Tab key and the Shift key is not pressed, then focus the first item
   */
  const handleLastItemTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      if (firstItem) {
        (firstItem as HTMLElement).focus();
      }
      e.preventDefault();
    }
  };

  /**
   * Use `.querySelectorAll` to find all the focusable elements in the focus trap
   * container.
   *
   * Use `.filter` to filter out any elements that are disabled, hidden, or have a
   * negative tab index.
   *
   * Use `.addEventListener` to listen for the `keydown` event on the first and
   * last focusable elements.
   *
   * Use `.focus` to focus on the first focusable element.
   */
  const trapFocus = (focusTrapContainer: RefObject<HTMLElement>) => {
    setTimeout(() => {
      if (!focusTrapContainer.current) {
        return;
      }
      const focusableItems = Array.from(
        focusTrapContainer.current.querySelectorAll(
          'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"]',
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
