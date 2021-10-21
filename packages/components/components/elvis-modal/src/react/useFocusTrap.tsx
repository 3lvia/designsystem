import { RefObject } from 'react';

export const useFocusTrap = (
  focusTrapContainer: RefObject<HTMLElement>,
  removeEventListener?: boolean,
): void => {
  if (!focusTrapContainer.current) {
    return;
  }
  const focusableItems = focusTrapContainer.current.querySelectorAll(
    'a[href], button, textarea, input[type="text"],' + 'input[type="radio"], input[type="checkbox"], select',
  );
  const firstItem = focusableItems.item(0);
  const lastItem = focusableItems.item(focusableItems.length - 1);

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
  if (firstItem) {
    (firstItem as HTMLElement).focus();
    firstItem.addEventListener('keydown', handleFirstItemTab);
  }
  if (lastItem) {
    lastItem.addEventListener('keydown', handleLastItemTab);
  }

  if (removeEventListener) {
    if (firstItem) {
      firstItem.removeEventListener('keydown', handleFirstItemTab);
    }
    if (lastItem) {
      lastItem.removeEventListener('keydown', handleLastItemTab);
    }
  }
};
