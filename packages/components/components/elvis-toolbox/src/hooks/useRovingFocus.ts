import { RefObject, useEffect, useRef } from 'react';

/**
 * useRovingFocus is a custom hook that allows you to implement a roving focus.
 *
 * @internal
 * @since 8.0.0
 */
export const useRovingFocus = <T extends HTMLElement>(): RefObject<T> => {
  const ref = useRef<T>(null);

  const focusedItem = useRef<HTMLElement>();
  const focusedIndex = useRef(0);
  const unsubscriber = useRef<() => void>();

  const getFocusableItems = (container: T): HTMLElement[] => {
    if (!container) {
      return [];
    }

    return Array.from(
      container.querySelectorAll(
        'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex=“-1”]',
      ),
    ).filter((element) => {
      return !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true';
    }) as HTMLElement[];
  };

  const getNewIndex = (ev: KeyboardEvent, listLength: number, currentIndex: number): number => {
    switch (ev.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        ev.preventDefault();
        if (currentIndex === 0) {
          return listLength - 1;
        } else {
          return currentIndex - 1;
        }

      case 'ArrowDown':
      case 'ArrowRight':
        ev.preventDefault();
        if (currentIndex === listLength - 1) {
          return 0;
        } else {
          return currentIndex + 1;
        }

      case 'Home':
        ev.preventDefault();
        return 0;

      case 'End':
        ev.preventDefault();
        return listLength - 1;
    }

    return currentIndex;
  };

  // Restore focused item and focused index after the list has mutated
  const restoreTabPosition = (updatedItemList: HTMLElement[]): void => {
    const updatedIndex = focusedItem.current ? updatedItemList.indexOf(focusedItem.current) : -1;

    if (updatedIndex !== -1) {
      focusedIndex.current = updatedIndex;
    } else if (focusedIndex.current !== -1) {
      const clampedIndex = Math.min(updatedItemList.length, focusedIndex.current);
      updatedItemList[clampedIndex]?.focus();
      focusedItem.current = updatedItemList[clampedIndex];
      focusedIndex.current = clampedIndex;
    } else {
      focusedItem.current = updatedItemList[0];
      focusedIndex.current = 0;
    }
  };

  const setTabIndexes = (list: HTMLElement[]): void => {
    if (focusedItem.current) {
      list.forEach((item) => (item.tabIndex = item === focusedItem.current ? 0 : -1));
    } else {
      list.forEach((item, index) => (item.tabIndex = index === 0 ? 0 : -1));
      focusedItem.current = list.find((item) => item.tabIndex === 0);
    }
  };

  useEffect(() => {
    const container = ref.current;

    if (!container) {
      return;
    }

    const observer = new MutationObserver(() => {
      unsubscriber.current?.();
      const items = getFocusableItems(container);
      unsubscriber.current = initializeKeydownHandler(container, items);
    });

    observer.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'style', 'class'],
    });

    return () => observer.disconnect();
  }, [ref.current]);

  const initializeKeydownHandler = (container: T, items: HTMLElement[]): (() => void) => {
    if (focusedItem.current) {
      restoreTabPosition(items);
    }

    setTabIndexes(items);

    const handleKeyDown = (event: KeyboardEvent) => {
      const newIndex = getNewIndex(event, items.length, focusedIndex.current);

      items[focusedIndex.current].tabIndex = -1;
      items[newIndex].tabIndex = 0;
      items[newIndex]?.focus();

      focusedItem.current = items[newIndex];
      focusedIndex.current = newIndex;
    };

    const handleClick = (event: MouseEvent) => {
      const index = items.findIndex((item) => item === (event.target as HTMLElement));
      if (index !== -1) {
        focusedItem.current = items[index];
        focusedIndex.current = index;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('click', handleClick);
    };
  };

  return ref;
};
