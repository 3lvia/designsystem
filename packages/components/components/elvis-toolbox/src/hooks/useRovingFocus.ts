import { RefObject, useState, useEffect } from 'react';

/**
 * useRovingFocus is a custom hook that allows you to implement a roving focus.
 *
 * @param elementRef
 * @internal
 * @since 8.0.0
 */
export const useRovingFocus = (rovingFocusContainer: RefObject<HTMLElement>): void => {
  const [focusableItems, setFocusableItems] = useState<Array<HTMLElement> | null>(null);
  const [currentItem, setCurrentItem] = useState<HTMLElement | null | undefined>(null);

  //get all initial focusable items. rerun if rovingFocusContainer updates
  const getFocusableItems = (rovingFocusContainer: RefObject<HTMLElement>) => {
    if (!rovingFocusContainer.current) {
      return;
    }

    const focusableItemsArray = Array.from(
      rovingFocusContainer.current.querySelectorAll(
        'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"]',
      ),
    ).filter((element) => {
      return !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true';
    }) as HTMLElement[];

    focusableItemsArray.forEach((item, index) => {
      if (currentItem && focusableItemsArray.includes(currentItem)) {
        if (item === currentItem) {
          item.tabIndex = 0;
          item.focus();
        } else {
          item.tabIndex = -1;
        }
      } else {
        if (index === 0) {
          item.tabIndex = 0;
          item.focus();
        } else {
          item.tabIndex = -1;
        }
      }
    });

    console.log(focusableItemsArray);
    return focusableItemsArray;
  };

  const updateRoveFocusArray = (elementToFocus: HTMLElement) => {
    if (focusableItems) {
      const newFocusableItems = [...focusableItems];

      newFocusableItems.forEach((item) => (item.tabIndex = item === elementToFocus ? 0 : -1));

      const newCurrentItem = newFocusableItems.find((item) => item.tabIndex === 0);

      if (newFocusableItems && newCurrentItem) {
        setCurrentItem(newCurrentItem);
        setFocusableItems(newFocusableItems);
        newCurrentItem.focus();
      }
    }
  };

  useEffect(() => {
    console.log('currentItem', currentItem);
  }, [currentItem]);

  //Generate the focusable items array -> put it in state
  useEffect(() => {
    if (!rovingFocusContainer) {
      return;
    }

    const focusableItemsArray = getFocusableItems(rovingFocusContainer);

    if (focusableItemsArray) {
      setCurrentItem(focusableItemsArray.find((item) => item.tabIndex === 0));
      setFocusableItems(focusableItemsArray);
    }
  }, [rovingFocusContainer, rovingFocusContainer.current]);

  //Generate Event Listeners and clean up
  useEffect(() => {
    if (!rovingFocusContainer || !rovingFocusContainer.current) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.target) {
        return;
      }

      if (focusableItems && currentItem) {
        const index = focusableItems.indexOf(currentItem);

        switch (event.key) {
          case 'ArrowLeft':
            //if first item, go to last item
            if (currentItem === focusableItems[0]) {
              updateRoveFocusArray(focusableItems[focusableItems.length - 1]);
            } else {
              updateRoveFocusArray(focusableItems[index - 1]);
            }

            event.preventDefault();
            break;

          case 'ArrowRight':
            //if first last, go to first item
            if (currentItem === focusableItems[focusableItems.length - 1]) {
              updateRoveFocusArray(focusableItems[0]);
            } else {
              updateRoveFocusArray(focusableItems[index + 1]);
            }
            event.preventDefault();
            break;

          case 'Home':
            console.log('home key');
            updateRoveFocusArray(focusableItems[0]);
            event.preventDefault();
            break;

          case 'End':
            console.log('End key');
            updateRoveFocusArray(focusableItems[focusableItems.length - 1]);
            event.preventDefault();
            break;

          default:
            break;
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (focusableItems && focusableItems.includes(event.target as HTMLElement)) {
        updateRoveFocusArray(event.target as HTMLElement);
      }
    };

    rovingFocusContainer.current.addEventListener('keydown', handleKeyDown);
    rovingFocusContainer.current.addEventListener('click', handleClick);

    return () => {
      rovingFocusContainer.current?.removeEventListener('keydown', handleKeyDown);
      rovingFocusContainer.current?.removeEventListener('click', handleClick);
    };
  });

  //watch the DOM for any changes to the focusable items (for example if a butten gets hidden og shown)
  useEffect(() => {
    if (!rovingFocusContainer.current) {
      return;
    }

    const elementToObserve = rovingFocusContainer.current;

    //callback
    const observer = new MutationObserver(() => {
      console.info('running observer');
      const focusableItemsArray = getFocusableItems(rovingFocusContainer);

      if (focusableItemsArray) {
        setCurrentItem(focusableItemsArray.find((item) => item.tabIndex === 0));
        setFocusableItems(focusableItemsArray);
      }
    });

    observer.observe(elementToObserve, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'style', 'class'],
    });

    return () => observer.disconnect();
  }, [rovingFocusContainer.current]);
};
