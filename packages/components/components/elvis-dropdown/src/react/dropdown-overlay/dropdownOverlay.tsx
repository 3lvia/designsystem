import { useBreakpoint } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { DropdownItem } from '../dropdown-item/dropdownItem';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItem as DropdownItemOption, DropdownValue } from '../elviaDropdown.types';
import { BackButton } from './backButton';
import {
  Backdrop,
  CursorCurve,
  DropdownPopup,
  DropdownPopupContainer,
  ItemList,
  NoItemsMessage,
} from './dropdownOverlayStyles';
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
  focusedItem?: DropdownItemOption;
  setFocusedItem: (item?: DropdownItemOption) => void;
}

const now = Date.now();

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
      focusedItem,
      setFocusedItem,
    },
    ref,
  ) => {
    const isGtMobile = useBreakpoint('gt-mobile');
    const listRef = useRef<HTMLDivElement>(null);
    const [fadeOut, setFadeOut] = useState(false);
    const selectAllItem: DropdownItemOption = {
      label: selectAllOption ?? '',
      value: `selectAll-${now}`,
      isDisabled: !selectAllOption,
    };
    const backItem: DropdownItemOption = {
      label: 'Tilbake',
      value: `back-${now}`,
      isDisabled: isGtMobile,
    };
    const loadMoreItem: DropdownItemOption = {
      label: 'Last inn flere',
      value: `loadMore-${now}`,
      isDisabled: !hasLoadMoreItemsButton,
    };

    const onAnimationEnd = () => {
      if (fadeOut) {
        onClose();
      }
    };

    const currentValIncludesItem = (item: DropdownItemOption): boolean => {
      const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
      return selectedValues.includes(item.value);
    };

    const getSelectableChildren = (items: DropdownItemOption[]): DropdownItemOption[] => {
      return flattenTree(items ?? []).filter((child) => !child.isDisabled && !child.children);
    };

    const selectItem = (item: DropdownItemOption) => {
      if (!item.isDisabled) {
        if (isMulti && item.children) {
          const children = getSelectableChildren(item.children);
          if (!children.every(currentValIncludesItem)) {
            onItemSelect(
              children.filter((item) => !currentValIncludesItem(item)).map((child) => child.value),
            );
          } else {
            onItemSelect(children.map((child) => child.value));
          }
        } else {
          onItemSelect([item.value]);
        }
      }

      if (!isMulti) {
        setFadeOut(true);
      }
    };

    const getFullTabList = (): DropdownItemOption[] => {
      const itemList = filteredItems.slice();
      if (!isGtMobile) {
        itemList.unshift(backItem);
      }
      if (selectAllOption) {
        itemList.unshift(selectAllItem);
      }
      if (hasLoadMoreItemsButton) {
        itemList.push(loadMoreItem);
      }
      return itemList;
    };

    const handleOverlayKeyboardNavigation = (ev: KeyboardEvent<HTMLInputElement>): void => {
      const currentIndex = getFullTabList().findIndex((item) => item.value === focusedItem?.value ?? '');
      if (['Space', 'Enter', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        if (focusedItem?.value === selectAllItem.value) {
          toggleAllSelection();
        } else if (focusedItem?.value === loadMoreItem.value) {
          onLoadMoreItems && onLoadMoreItems();
        } else if (focusedItem) {
          selectItem(focusedItem);
        }
      } else if (ev.code === 'ArrowUp') {
        ev.preventDefault();
        const newIndex = currentIndex - 1 < 0 ? getFullTabList().length - 1 : currentIndex - 1;
        setFocusedItem(getFullTabList()[newIndex]);
      } else if (ev.code === 'ArrowDown') {
        ev.preventDefault();
        const newIndex = currentIndex + 1 > getFullTabList().length - 1 ? 0 : currentIndex + 1;
        setFocusedItem(getFullTabList()[newIndex]);
      }
    };

    const toggleAllSelection = (): void => {
      const allValues = getSelectableChildren(filteredItems);
      const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
      if (allValues.length === selectedValues.length) {
        onItemSelect(allValues.map((item) => item.value));
      } else {
        const unselectedItems = allValues.filter((value) => !currentValIncludesItem(value));
        onItemSelect(unselectedItems.map((item) => item.value));
      }
    };

    useEffect(() => {
      if (pressedKey && focusedLevel === level) {
        handleOverlayKeyboardNavigation(pressedKey);
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
        const index = getFullTabList().findIndex((item) => item.value === itemToFocus.value);
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
        <DropdownPopupContainer ref={ref} data-testid="popover">
          {level !== 0 && <CursorCurve />}
          <DropdownPopup
            fadeOut={fadeOut}
            onAnimationEnd={onAnimationEnd}
            onMouseLeave={() => {
              setFocusedItem(undefined);
            }}
            isCompact={isCompact}
            isInvisible={!isGtMobile && focusedLevel > level}
          >
            <ItemList ref={listRef}>
              {!filteredItems?.length && <NoItemsMessage>{noItemsText}</NoItemsMessage>}
              {!isGtMobile && level !== 0 && (
                <BackButton
                  item={backItem}
                  onClick={() => setFadeOut(true)}
                  onHover={(item) => setFocusedItem(item)}
                  focusedValue={focusedItem?.value}
                  isCompact={isCompact}
                />
              )}
              {selectAllOption && level === 0 && (
                <SelectAllOption
                  focusedValue={focusedItem?.value}
                  isCompact={isCompact}
                  item={selectAllItem}
                  items={allItems ?? []}
                  selectedItems={currentVal}
                  onClick={toggleAllSelection}
                  onHover={(item) => setFocusedItem(item)}
                />
              )}
              {filteredItems.map((item) => (
                <DropdownItem
                  overlayLevel={level}
                  key={item.value}
                  item={item}
                  focusedItem={focusedItem}
                  setFocusedItem={setFocusedItem}
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
                  onClick={(item) => selectItem(item)}
                  focusedLevel={focusedLevel}
                  pressedKey={pressedKey}
                  onLevelFocusChange={onLevelFocusChange}
                  onBackdropClick={() => {
                    setFadeOut(true);
                    onBackdropClick && onBackdropClick();
                  }}
                  listRef={listRef}
                />
              ))}
              {hasLoadMoreItemsButton && level === 0 && (
                <LoadMoreButton
                  focusedValue={focusedItem?.value}
                  item={loadMoreItem}
                  isLoadingMoreItems={isLoadingMoreItems}
                  onLoadMoreItems={onLoadMoreItems}
                  isCompact={isCompact}
                  onHover={(item) => setFocusedItem(item)}
                />
              )}
            </ItemList>
          </DropdownPopup>
        </DropdownPopupContainer>
      </>,
      document.body,
    );
  },
);

DropdownOverlay.displayName = 'DropdownOverlayComponent';
