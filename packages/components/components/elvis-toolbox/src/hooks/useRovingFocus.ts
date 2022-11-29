import { RefObject, useState, useEffect, useRef } from 'react';

/**
 * useRovingFocus is a custom hook that allows you to implement a roving focus.
 *
 * @internal
 * @since 8.0.0
 */
export const useRovingFocus = <T extends HTMLElement>(): RefObject<T> => {
  const ref = useRef<T>(null);
  const [focusableItems, setFocusableItems] = useState<HTMLElement[]>([]);
  const [focusedItem, setFocusedItem] = useState<HTMLElement>();
  const [focusedIndex, setFocusedIndex] = useState(0);

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

  const getNewIndex = (ev: KeyboardEvent, currentIndex: number): number => {
    switch (ev.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        ev.preventDefault();
        if (currentIndex === 0) {
          return focusableItems.length - 1;
        } else {
          return currentIndex - 1;
        }

      case 'ArrowDown':
      case 'ArrowRight':
        ev.preventDefault();
        if (currentIndex === focusableItems.length - 1) {
          return 0;
        } else {
          return currentIndex + 1;
        }

      case 'Home':
        ev.preventDefault();
        return 0;

      case 'End':
        ev.preventDefault();
        return focusableItems.length - 1;
    }

    return currentIndex;
  };

  // Restore focused item and focused index after the list has mutated
  const restoreTabPosition = (updatedItemList: HTMLElement[]): void => {
    const updatedIndex = focusedItem ? updatedItemList.indexOf(focusedItem) : -1;

    if (updatedIndex !== -1) {
      setFocusedIndex(updatedIndex);
    } else {
      if (focusedIndex !== -1) {
        const clampedIndex = Math.min(updatedItemList.length, focusedIndex);
        updatedItemList[clampedIndex]?.focus();
        setFocusedItem(updatedItemList[clampedIndex]);
        setFocusedIndex(clampedIndex);
      } else {
        setFocusedItem(updatedItemList[0]);
        setFocusedIndex(0);
      }
    }
  };

  const setTabIndexes = (): void => {
    const listClone = [...focusableItems];
    if (focusedItem) {
      listClone.forEach((item) => (item.tabIndex = item === focusedItem ? 0 : -1));
    } else {
      listClone.forEach((item, index) => (item.tabIndex = index === 0 ? 0 : -1));
      setFocusedItem(focusableItems.find((item) => item.tabIndex === 0));
    }
    console.log('setting');
    // setFocusableItems(listClone);
  };

  // Create list of focusable elements from container
  useEffect(() => {
    const container = ref.current;

    if (!container) {
      return;
    }

    const observer = new MutationObserver(() => {
      const focusableItems = getFocusableItems(container);
      setFocusableItems(focusableItems);
    });

    observer.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'style', 'class'],
    });

    return () => observer.disconnect();
  }, [ref.current]);

  useEffect(() => {
    if (focusedItem) {
      restoreTabPosition(focusableItems);
    }

    setTabIndexes();

    const handleKeyDown = (event: KeyboardEvent) => {
      const newIndex = getNewIndex(event, focusedIndex);

      setFocusableItems((list) => {
        const listClone = [...list];
        listClone[focusedIndex].tabIndex = -1;
        listClone[newIndex].tabIndex = 0;
        return listClone;
      });
      focusableItems[newIndex]?.focus();

      setFocusedItem(focusableItems[newIndex]);
      setFocusedIndex(newIndex);
    };

    const handleClick = (event: MouseEvent) => {
      const index = focusableItems.findIndex((item) => item === (event.target as HTMLElement));
      if (index !== -1) {
        setFocusedItem(focusableItems[index]);
        setFocusedIndex(index);
      }
    };

    ref.current?.addEventListener('keydown', handleKeyDown);
    ref.current?.addEventListener('click', handleClick);

    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);
      ref.current?.removeEventListener('click', handleClick);
    };
  }, [focusableItems]);

  return ref;
};
