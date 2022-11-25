import { RefObject, useEffect } from 'react';

export const useRovingFocus = (listRef?: RefObject<HTMLElement>): void => {
  const getNewFocusedIndex = (
    ev: KeyboardEvent,
    items: NodeListOf<HTMLElement>,
    currentIndex: number,
  ): number => {
    if (ev.code === 'ArrowRight' || ev.code === 'ArrowDown') {
      ev.preventDefault();
      if (currentIndex === items.length - 1) {
        return 0;
      } else {
        return ++currentIndex;
      }
    } else if (ev.code === 'ArrowLeft' || ev.code === 'ArrowUp') {
      ev.preventDefault();
      if (currentIndex === 0) {
        return items.length - 1;
      } else {
        return --currentIndex;
      }
    }

    return currentIndex;
  };

  useEffect(() => {
    const list = listRef?.current;

    if (!list) {
      return;
    }

    let focusedIndex = 0;
    const tabbableItems: NodeListOf<HTMLButtonElement | HTMLAnchorElement> =
      list.querySelectorAll('button, a');

    tabbableItems.forEach((item, index) => {
      if (index === 0) {
        item.tabIndex = 0;
      } else {
        item.tabIndex = -1;
      }
    });

    const onKeyDown = (ev: KeyboardEvent): void => {
      tabbableItems.item(focusedIndex).tabIndex = -1;

      focusedIndex = getNewFocusedIndex(ev, tabbableItems, focusedIndex);

      const item = tabbableItems.item(focusedIndex);
      item.focus();
      item.tabIndex = 0;
    };

    list.addEventListener('keydown', onKeyDown);

    return () => list.removeEventListener('keydown', onKeyDown);
  }, [listRef, listRef?.current]);
};
