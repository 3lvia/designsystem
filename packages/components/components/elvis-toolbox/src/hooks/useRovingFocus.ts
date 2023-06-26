import { RefObject, useEffect, useRef } from 'react';

interface Options<T extends HTMLElement> {
  dir: 'vertical' | 'horizontal' | 'both';
  elementRef?: RefObject<T>;
  // What attributes to observe when recreating the list of observable elements.
  observableAttributes?: string[];
  onKeyDown?: (focusedElement: HTMLElement, index: number) => void;
}

/**
 * A custom hook that allows you to implement roving focus in lists.
 *
 * * @param options An optional object for configuring the behavior of the roving focus.
 *
 * @example
 * export const Component: FC<Props> = () => {
 *   const listRef = useRovingFocus<HTMLDivElement>({ dir: 'horizontal' });
 *   ...
 * }
 *
 * @since 7.1.0
 */
export const useRovingFocus = <T extends HTMLElement>(
  options?: Partial<Options<T>>,
): { ref: RefObject<T> } => {
  const defaultRef = useRef<T>(null);
  const ref = options?.elementRef ?? defaultRef;

  const opts: Options<T> = {
    dir: 'both',
    observableAttributes: ['aria-hidden', 'style', 'class'],
    ...options,
  };

  const focusedItem = useRef<HTMLElement>();
  const focusedIndex = useRef(0);
  const removeEventListeners = useRef<() => void>();
  const focusIsOnChild = useRef(false);

  const getFocusableItems = (container: T | null): HTMLElement[] => {
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

  const getItemIndex = (list: HTMLElement[], item?: HTMLElement | null): number => {
    return list.findIndex((listItem) => {
      if (!item) {
        return false;
      }
      return (
        listItem.isEqualNode(item) || (listItem.textContent && listItem.textContent === item.textContent)
      );
    });
  };

  // Restore focused item and focused index after the list has mutated
  const restoreTabPosition = (itemList: HTMLElement[]): void => {
    let updatedIndex = getItemIndex(itemList, focusedItem.current);

    if (updatedIndex === -1) {
      if (focusedIndex.current !== -1) {
        updatedIndex = Math.min(itemList.length - 1, focusedIndex.current);
      } else {
        updatedIndex = 0;
      }
    }

    focusedIndex.current = updatedIndex;
    focusedItem.current = itemList[updatedIndex];

    if (focusIsOnChild.current) {
      focusedItem.current.focus();
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

    const startRovingFocus = (): void => {
      removeEventListeners.current?.();
      const items = getFocusableItems(container);

      if (focusedItem.current) {
        restoreTabPosition(items);
      }
      setTabIndexes(items);

      removeEventListeners.current = initializeKeydownHandler(container, items);
    };

    const observer = new MutationObserver(startRovingFocus);
    observer.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: opts.observableAttributes,
    });

    startRovingFocus();

    return () => observer.disconnect();
  }, [ref.current]);

  const initializeKeydownHandler = (container: T, items: HTMLElement[]): (() => void) => {
    const setFocusedItem = (newIndex: number): void => {
      if (newIndex !== -1 && newIndex !== focusedIndex.current) {
        console.log('B');
        items[focusedIndex.current].tabIndex = -1;
        items[newIndex].tabIndex = 0;
        items[newIndex]?.focus();

        focusedItem.current = items[newIndex];
        focusedIndex.current = newIndex;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const previousIndex = focusedIndex.current;
      const newIndex = getNewIndex(event, items.length, focusedIndex.current);
      setFocusedItem(newIndex);

      if (focusedItem.current && previousIndex !== newIndex) {
        opts.onKeyDown?.(focusedItem.current, focusedIndex.current);
      }
    };

    const handleClick = (event: MouseEvent) => {
      console.log('items: ', items, 'target: ', event.target);
      const index = items.findIndex((item) => item === (event.target as HTMLElement));
      console.log('Index after click', index);
      setFocusedItem(index);
    };

    const handleFocus = (ev: FocusEvent) => {
      focusIsOnChild.current = getItemIndex(items, ev.target as HTMLElement) !== -1;
    };

    document.addEventListener('focus', handleFocus, true);
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('focus', handleFocus, true);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('click', handleClick);
    };
  };

  return { ref };
};
