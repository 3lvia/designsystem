import { useInputModeDetection } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { DropdownItem } from '../dropdown-item/dropdownItem';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItem as DropdownItemOption, DropdownValue } from '../elviaDropdown.types';
import { Backdrop, DropdownPopup, ItemList, NoItemsMessage } from './dropdownOverlayStyles';
import { SelectAllOption } from './selectAllOption';

interface DropdownOverlayProps {
  /**
   * Since all keyboard inputs comes from the input-element
   * all overlays receive the keyboard events from the input element.
   * In order to decide which overlay that should act from those inputs,
   * we assign each overlay a level and only act in the focused overlay level.
   */
  level: number;
  focusedLevel: number;
  filteredItems: DropdownItemOption[];
  allItems?: DropdownItemOption[];
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
  selectAllOption?: string;
}

export const DropdownOverlay = React.forwardRef<HTMLDivElement, DropdownOverlayProps>(
  (
    {
      level,
      focusedLevel,
      filteredItems,
      allItems,
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
      selectAllOption,
    },
    ref,
  ) => {
    const [focusedItem, setFocusedItem] = useState<DropdownItemOption>(filteredItems[0]);
    const { isMouse: inputIsMouse } = useInputModeDetection();
    const listRef = useRef<HTMLDivElement>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const onAnimationEnd = () => {
      if (fadeOut) {
        onClose();
      }
    };

    const selectItem = (item: DropdownItemOption): void => {
      if (!item.isDisabled) {
        if (item.children) {
          onItemSelect(item.children.map((child) => child.value));
        } else {
          onItemSelect([item.value]);
        }
      }

      if (!isMulti) {
        setFadeOut(true);
      }
    };

    const handlerOverlayKeyboardNavigation = (ev: KeyboardEvent<HTMLInputElement>): void => {
      const currentIndex = filteredItems.findIndex((item) => item.value === focusedItem.value);
      if (['Space', 'Enter', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        selectItem(focusedItem);
      } else if (ev.code === 'ArrowUp') {
        ev.preventDefault();
        const newIndex = currentIndex - 1 < 0 ? filteredItems.length - 1 : currentIndex - 1;
        setFocusedItem(filteredItems[newIndex]);
      } else if (ev.code === 'ArrowDown') {
        ev.preventDefault();
        const newIndex = currentIndex + 1 > filteredItems.length - 1 ? 0 : currentIndex + 1;
        setFocusedItem(filteredItems[newIndex]);
      }
    };

    const toggleAllSelection = (): void => {
      const allValues = flattenTree(filteredItems)
        .filter((item) => !item.isDisabled && !item.children)
        .map((item) => item.value);
      const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
      if (allValues.length === selectedValues.length) {
        onItemSelect(Array.from(allValues));
      } else {
        const unselectedValues = Array.from(allValues).filter((value) => {
          const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
          return !selectedValues.includes(value);
        });
        onItemSelect(unselectedValues);
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
        setFocusedItem(filteredItems[0]);
      } else if (typeof currentVal === 'string') {
        const currentValInList = filteredItems.find((item) => item.value === currentVal);
        currentValInList ? setFocusedItem(currentValInList) : setFocusedItem(filteredItems[0]);
      }
    }, [currentVal]);

    useEffect(() => {
      const scrollItemListToFocusedItem = () => {
        const buttonHeight = isCompact ? 40 : 48;
        const index = filteredItems.findIndex((item) => item.value === focusedItem.value);
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
            {!filteredItems?.length && <NoItemsMessage isCompact={isCompact}>{noItemsText}</NoItemsMessage>}
            {selectAllOption && level === 1 && (
              <SelectAllOption
                isCompact={isCompact}
                text={selectAllOption}
                items={allItems ?? []}
                selectedItems={currentVal}
                isFocused={true}
                onClick={toggleAllSelection}
              />
            )}
            {filteredItems.map((item) => (
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
