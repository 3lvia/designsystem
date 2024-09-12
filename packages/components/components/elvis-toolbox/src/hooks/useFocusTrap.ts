import { RefObject } from 'react';

/**
 * A React hook that provides a function to trap focus within an element,
 * so that the user only can cycle between focusable elements within that container.
 *
 * The attribute `elvisFocusInitial` can be set on a focusable item in the
 * container, to define the initial focused element.
 *
 * @returns A function that traps the focus within the provided element, and a function that releases the focus trap.
 *
 */
export const useFocusTrap = (): {
  trapFocus: (focusTrapContainer: RefObject<HTMLElement>) => void;
  releaseFocusTrap: () => void;
} => {
  let firstItem: Element;
  let lastItem: Element;
  let mo: MutationObserver;

  const handleFirstItemTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey) {
      (lastItem as HTMLElement)?.focus();
      e.preventDefault();
    }
  };

  const handleLastItemTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      (firstItem as HTMLElement)?.focus();
      e.preventDefault();
    }
  };

  const trapFocus = (focusTrapContainer: RefObject<HTMLElement>, updateFocus = true) => {
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
      const forcedInitialFocus = focusableItems.find((item) => item.hasAttribute('elvisFocusInitial'));
      const focusedItem = forcedInitialFocus ?? firstItem;
      lastItem = focusableItems[focusableItems.length - 1];

      if (firstItem) {
        if (updateFocus) {
          (focusedItem as HTMLElement).focus();
        }
        firstItem.addEventListener('keydown', handleFirstItemTab);
      }
      if (lastItem) {
        lastItem.addEventListener('keydown', handleLastItemTab);
      }
    });

    mo = new MutationObserver(() => {
      releaseFocusTrap();
      trapFocus(focusTrapContainer, false);
    });

    if (focusTrapContainer.current) {
      mo.observe(focusTrapContainer.current, { childList: true, subtree: true });
    }
  };

  const releaseFocusTrap = () => {
    firstItem?.removeEventListener('keydown', handleFirstItemTab);
    lastItem?.removeEventListener('keydown', handleLastItemTab);
    mo?.disconnect();
  };

  return { trapFocus, releaseFocusTrap };
};
