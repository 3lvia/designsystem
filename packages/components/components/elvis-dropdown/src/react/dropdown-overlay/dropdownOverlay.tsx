import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { DropdownItem } from '../dropdown-item/dropdownItem';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItem as DropdownItemOption, DropdownValue } from '../elviaDropdown.types';
import { Backdrop, CursorCurve, DropdownPopup, ItemList, NoItemsMessage } from './dropdownOverlayStyles';
import { LoadMoreButton } from './loadMoreButton';
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
  inputIsMouse: boolean;
  isCompact: boolean;
  isMulti: boolean;
  onClose: () => void;
  noItemsText?: string;
  currentVal?: DropdownValue;
  onItemSelect: (value: string[]) => void;
  onLevelFocusChange: (newLevel: number) => void;
  onBackdropClick?: () => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
  selectAllOption?: string;
  hasLoadMoreItemsButton?: boolean;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
}

export const DropdownOverlay = React.forwardRef<HTMLDivElement, DropdownOverlayProps>(
  (
    {
      level,
      focusedLevel,
      filteredItems,
      allItems,
      inputIsMouse,
      isCompact,
      isMulti,
      onClose,
      noItemsText,
      currentVal,
      onItemSelect,
      pressedKey,
      onLevelFocusChange,
      onBackdropClick,
      selectAllOption,
      hasLoadMoreItemsButton,
      onLoadMoreItems,
      isLoadingMoreItems,
    },
    ref,
  ) => {
    const [focusedItem, setFocusedItem] = useState<DropdownItemOption>();
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
      const currentIndex = filteredItems.findIndex((item) => item.value === focusedItem?.value ?? '');
      if (['Space', 'Enter', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        if (focusedItem) {
          selectItem(focusedItem);
        }
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
      const focusOnSelectedValue = (): void => {
        if (focusedItem || !currentVal) {
          return;
        }

        if (isMulti) {
          setFocusedItem(filteredItems[0]);
        } else if (typeof currentVal === 'string') {
          const currentValInList = filteredItems.find((item) => item.value === currentVal);
          if (currentValInList) {
            setFocusedItem(currentValInList);
          }
        }
      };

      focusOnSelectedValue();
    }, [currentVal]);

    useEffect(() => {
      const scrollItemListToFocusedItem = (itemToFocus: DropdownItemOption) => {
        const buttonHeight = isCompact ? 40 : 48;
        const index = filteredItems.findIndex((item) => item.value === itemToFocus.value);
        listRef.current?.scrollTo({
          top: buttonHeight * index - listRef.current?.offsetHeight / 2,
        });
      };

      if (!inputIsMouse && focusedItem) {
        scrollItemListToFocusedItem(focusedItem);
      }
    }, [focusedItem]);

    useEffect(() => {
      const focusFirstItemIfInputIsKeyboard = () => {
        if (!inputIsMouse) {
          setFocusedItem(filteredItems[0]);
        }
      };
      focusFirstItemIfInputIsKeyboard();
    }, []);

    return createPortal(
      <>
        <Backdrop
          onClick={() => {
            setFadeOut(true);
            onBackdropClick && onBackdropClick();
          }}
          data-testid="backdrop"
        />
        <DropdownPopup
          ref={ref}
          data-testid="popover"
          fadeOut={fadeOut}
          onAnimationEnd={onAnimationEnd}
          onMouseLeave={() => setFocusedItem(undefined)}
          isCompact={isCompact}
        >
          <ItemList ref={listRef}>
            {!filteredItems?.length && <NoItemsMessage>{noItemsText}</NoItemsMessage>}
            {selectAllOption && level === 0 && (
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
                focusedValue={focusedItem?.value ?? ''}
                onFocus={(item) => {
                  if (item.value !== focusedItem?.value) {
                    setFocusedItem(item);
                  }
                }}
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
                onBackdropClick={() => {
                  setFadeOut(true);
                  onBackdropClick && onBackdropClick();
                }}
              />
            ))}
            {hasLoadMoreItemsButton && level === 0 && (
              <LoadMoreButton
                isLoadingMoreItems={isLoadingMoreItems}
                onLoadMoreItems={onLoadMoreItems}
                isCompact={isCompact}
              />
            )}
          </ItemList>
          {level !== 0 && <CursorCurve />}
        </DropdownPopup>
      </>,
      document.body,
    );
  },
);

DropdownOverlay.displayName = 'DropdownOverlayComponent';
