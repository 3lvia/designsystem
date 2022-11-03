import { useInputModeDetection } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { DropdownItem } from '../dropdown-item/dropdownItem';
import { DropdownItem as DropdownItemOption, DropdownValue } from '../elviaDropdown.types';
import { Backdrop, DropdownPopup, ItemList, NoItemsMessage } from './dropdownOverlayStyles';

interface DropdownOverlayProps {
  /**
   * Since all keyboard inputs comes from the input-element
   * all overlays receive the pressed keys in the input element
   * In order to decide which overlay that should be "in focus",
   * we assign each overlay a level.
   */
  level: number;
  focusedLevel: number;
  items: DropdownItemOption[];
  isCompact: boolean;
  isMulti: boolean;
  onClose: () => void;
  noItemsText?: string;
  currentVal?: DropdownValue;
  onItemSelect: (value: string[]) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLevelFocusChange: (newLevel: number) => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
}

export const DropdownOverlay = React.forwardRef<HTMLDivElement, DropdownOverlayProps>(
  (
    {
      level,
      focusedLevel,
      items,
      isCompact,
      isMulti,
      onClose,
      noItemsText,
      currentVal,
      onItemSelect,
      pressedKey,
      onMouseEnter,
      onMouseLeave,
      onLevelFocusChange,
    },
    ref,
  ) => {
    const [focusedItem, setFocusedItem] = useState<DropdownItemOption>(items[0]);
    const { isMouse: inputIsMouse } = useInputModeDetection();
    const listRef = useRef<HTMLDivElement>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const onAnimationEnd = () => {
      if (fadeOut) {
        onClose();
      }
    };

    const handlerOverlayKeyboardNavigation = (ev: KeyboardEvent<HTMLInputElement>): void => {
      if (['Space', 'Enter', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        if (!focusedItem.isDisabled) {
          if (focusedItem.children) {
            onItemSelect(focusedItem.children.map((child) => child.value));
          } else {
            onItemSelect([focusedItem.value]);
          }
        }

        if (!isMulti) {
          setFadeOut(true);
        }
      } else if (ev.code === 'ArrowUp') {
        const currentIndex = items.findIndex((item) => item.value === focusedItem.value);
        if (currentIndex - 1 < 0) {
          setFocusedItem(items[items.length - 1]);
        } else {
          setFocusedItem(items[currentIndex - 1]);
        }
        ev.preventDefault();
      } else if (ev.code === 'ArrowDown') {
        const currentIndex = items.findIndex((item) => item.value === focusedItem.value);
        if (currentIndex + 1 > items.length - 1) {
          setFocusedItem(items[0]);
        } else {
          setFocusedItem(items[currentIndex + 1]);
        }
        ev.preventDefault();
      }
    };

    useEffect(() => {
      if (pressedKey && focusedLevel === level) {
        handlerOverlayKeyboardNavigation(pressedKey);
      }
    }, [pressedKey]);

    useEffect(() => {
      if (focusedItem) {
        return;
      }

      if (isMulti) {
        setFocusedItem(items[0]);
      } else if (typeof currentVal === 'string') {
        const currentValInList = items.find((item) => item.value === currentVal);
        currentValInList ? setFocusedItem(currentValInList) : setFocusedItem(items[0]);
      }
    }, [currentVal]);

    useEffect(() => {
      const scrollItemListToFocusedItem = () => {
        const buttonHeight = isCompact ? 40 : 48;
        const index = items.findIndex((item) => item.value === focusedItem.value);
        listRef.current?.scrollTo({
          top: buttonHeight * index - listRef.current?.offsetHeight / 2,
        });
      };

      if (!inputIsMouse) {
        scrollItemListToFocusedItem();
      }
    }, [focusedItem]);

    return createPortal(
      <>
        <Backdrop onClick={() => setFadeOut(true)} data-testid="backdrop" />
        <DropdownPopup
          ref={ref}
          data-testid="popover"
          fadeOut={fadeOut}
          onAnimationEnd={onAnimationEnd}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ItemList ref={listRef} isCompact={isCompact}>
            {!items?.length && <NoItemsMessage isCompact={isCompact}>{noItemsText}</NoItemsMessage>}
            {items.map((item) => (
              <DropdownItem
                overlayLevel={level}
                key={item.value}
                item={item}
                focusedValue={focusedItem.value}
                onFocus={setFocusedItem}
                isCompact={isCompact}
                isMulti={isMulti}
                inputIsMouse={inputIsMouse}
                currentVal={currentVal}
                onItemSelect={(item) => {
                  onItemSelect(item);
                  if (!isMulti) {
                    setFadeOut(true);
                  }
                }}
                focusedLevel={focusedLevel}
                pressedKey={pressedKey}
                onLevelFocusChange={onLevelFocusChange}
              />
            ))}
          </ItemList>
        </DropdownPopup>
      </>,
      document.body,
    );
  },
);

DropdownOverlay.displayName = 'DropdownOverlayComponent';
