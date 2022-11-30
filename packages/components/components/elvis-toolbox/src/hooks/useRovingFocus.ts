import { RefObject, useEffect, useRef } from 'react';

interface Options<T extends HTMLElement> {
  dir: 'vertical' | 'horizontal' | 'both';
  elementRef?: RefObject<T>;
}

/**
 * useRovingFocus is a custom hook that allows you to implement a roving focus.
 *
 * @internal
 * @since 8.0.0
 */
export const useRovingFocus = <T extends HTMLElement>(options?: Partial<Options<T>>): RefObject<T> => {
  const defaultRef = useRef<T>(null);
  const ref = options?.elementRef ?? defaultRef;

  const opts: Options<T> = {
    dir: 'both',
    ...options,
  };

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

  const getPrevItemKeys = (): string[] => {
    if (opts.dir === 'both') {
      return ['ArrowUp', 'ArrowLeft'];
    } else if (opts.dir === 'horizontal') {
      return ['ArrowLeft'];
    }
    return ['ArrowUp'];
  };

  const getNextItemKeys = (): string[] => {
    if (opts.dir === 'both') {
      return ['ArrowDown', 'ArrowRight'];
    } else if (opts.dir === 'horizontal') {
      return ['ArrowRight'];
    }
    return ['ArrowDown'];
  };

  const getNewIndex = (ev: KeyboardEvent, listLength: number, currentIndex: number): number => {
    if (getPrevItemKeys().includes(ev.code)) {
      ev.preventDefault();
      if (currentIndex === 0) {
        return listLength - 1;
      } else {
        return currentIndex - 1;
      }
    } else if (getNextItemKeys().includes(ev.code)) {
      ev.preventDefault();
      if (currentIndex === listLength - 1) {
        return 0;
      } else {
        return currentIndex + 1;
      }
    } else if (ev.code === 'Home') {
      ev.preventDefault();
      return 0;
    } else if (ev.code === 'End') {
      ev.preventDefault();
      return listLength - 1;
    }

    return currentIndex;
  };

  // Restore focused item and focused index after the list has mutated
  const restoreTabPosition = (updatedItemList: HTMLElement[]): void => {
    const updatedIndex = focusedItem.current
      ? updatedItemList.map((item) => item.innerHTML).indexOf(focusedItem.current.innerHTML)
      : -1;

    // TODO: This is duplicated thrice
    if (updatedIndex !== -1) {
      focusedIndex.current = updatedIndex;
      focusedItem.current = updatedItemList[updatedIndex];
      updatedItemList[updatedIndex]?.focus();
    } else if (focusedIndex.current !== -1) {
      const clampedIndex = Math.min(updatedItemList.length - 1, focusedIndex.current);
      focusedItem.current = updatedItemList[clampedIndex];
      focusedIndex.current = clampedIndex;
      updatedItemList[clampedIndex]?.focus();
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

      if (focusedItem.current) {
        restoreTabPosition(items);
      }

      setTabIndexes(items);

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
