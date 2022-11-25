import { RefObject, useEffect } from 'react';

export const useRovingFocus = (listRef?: RefObject<HTMLElement>): void => {
  useEffect(() => {
    const list = listRef?.current;

    if (list) {
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

      const setNewFocusedIndex = (ev: KeyboardEvent): void => {
        if (ev.code === 'ArrowRight' || ev.code === 'ArrowDown') {
          ev.preventDefault();
          if (focusedIndex === tabbableItems.length - 1) {
            focusedIndex = 0;
          } else {
            ++focusedIndex;
          }
        } else if (ev.code === 'ArrowLeft' || ev.code === 'ArrowUp') {
          ev.preventDefault();
          if (focusedIndex === 0) {
            focusedIndex = tabbableItems.length - 1;
          } else {
            --focusedIndex;
          }
        }
      };

      const onKeyDown = (ev: KeyboardEvent): void => {
        tabbableItems.item(focusedIndex).tabIndex = -1;

        setNewFocusedIndex(ev);

        const item = tabbableItems.item(focusedIndex);
        item.focus();
        item.tabIndex = 0;
      };

      list.addEventListener('keydown', onKeyDown);
    }
  }, [listRef, listRef?.current]);
};
