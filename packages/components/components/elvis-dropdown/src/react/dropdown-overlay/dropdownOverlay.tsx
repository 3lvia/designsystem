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
  isRootOverlay?: boolean;
  isGtMobile: boolean;
  filteredItems: DropdownItemOption[];
  allItems?: DropdownItemOption[];
  inputIsMouse: boolean;
  isCompact: boolean;
  isMulti: boolean;
  onClose: () => void;
  noItemsText?: string;
  currentVal?: DropdownValue;
  onItemSelect: (value: string[]) => void;
  onBackdropClick?: () => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
  selectAllOption?: string;
  hasLoadMoreItemsButton?: boolean;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  focusedItem?: DropdownItemOption;
  setFocusedItem: (item?: DropdownItemOption) => void;
  parentItem?: DropdownItemOption;
  isSearchMode?: boolean;
}

const uniqueId = Date.now();

export const DropdownOverlay = React.forwardRef<HTMLDivElement, DropdownOverlayProps>(
  (
    {
      isRootOverlay,
      isGtMobile,
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
      onBackdropClick,
      selectAllOption,
      hasLoadMoreItemsButton,
      onLoadMoreItems,
      isLoadingMoreItems,
      focusedItem,
      setFocusedItem,
      parentItem,
      isSearchMode,
    },
    ref,
  ) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [fadeOut, setFadeOut] = useState(false);
    const selectAllItem: DropdownItemOption = {
      label: selectAllOption ?? '',
      value: `selectAll-${uniqueId}`,
    };
    const backItem: DropdownItemOption = {
      label: 'Tilbake',
      value: `back-${uniqueId}`,
    };
    const loadMoreItem: DropdownItemOption = {
      label: 'Last inn flere',
      value: `loadMore-${uniqueId}`,
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
        } else if (!item.children) {
          onItemSelect([item.value]);

          if (!isMulti) {
            setFadeOut(true);
          }
        }

        // Focus on first item after selecting item in multi select while search is active
        // This moves keyboard focus to a focusable item.
        if (isMulti && isSearchMode && isRootOverlay) {
          setFocusedItem(allItems?.[0]);
        }
      }
    };

    const getFullTabList = (): DropdownItemOption[] => {
      const itemList = filteredItems.slice();
      if (!isGtMobile && !isRootOverlay) {
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
      const tabList = getFullTabList();
      const currentIndex = tabList.findIndex((item) => item.value === focusedItem?.value);
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
        const newIndex = currentIndex - 1 < 0 ? tabList.length - 1 : currentIndex - 1;
        setFocusedItem(tabList[newIndex]);
      } else if (ev.code === 'ArrowDown') {
        ev.preventDefault();
        const newIndex = currentIndex + 1 > tabList.length - 1 ? 0 : currentIndex + 1;
        setFocusedItem(tabList[newIndex]);
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

    const focusIsOnDirectDescendant = (): boolean => {
      return getFullTabList().some((item) => focusedItem?.value === item.value);
    };

    useEffect(() => {
      if (pressedKey && (focusIsOnDirectDescendant() || (isRootOverlay && isSearchMode))) {
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
        if (index !== -1) {
          listRef.current?.scrollTo({
            top: buttonHeight * index - listRef.current?.offsetHeight / 2,
          });
        }
      };

      if (!inputIsMouse && focusedItem) {
        scrollItemListToFocusedItem(focusedItem);
      }
    }, [focusedItem]);

    useEffect(() => {
      const focusFirstItemOnInit = () => {
        if (!inputIsMouse || (!focusedItem && isRootOverlay) || !isGtMobile) {
          setFocusedItem(getFullTabList()[0]);
        }
      };
      focusFirstItemOnInit();
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
          {!isRootOverlay && isGtMobile && <CursorCurve />}
          <DropdownPopup
            fadeOut={fadeOut}
            onAnimationEnd={onAnimationEnd}
            isCompact={isCompact}
            isInvisible={!isGtMobile && !focusIsOnDirectDescendant()}
          >
            <ItemList ref={listRef}>
              {!filteredItems?.length && <NoItemsMessage>{noItemsText}</NoItemsMessage>}
              {!isGtMobile && !isRootOverlay && (
                <BackButton
                  item={backItem}
                  onClick={() => {
                    setFadeOut(true);
                    setFocusedItem(parentItem);
                  }}
                  onHover={(item) => setFocusedItem(item)}
                  focusedValue={focusedItem?.value}
                  isCompact={isCompact}
                />
              )}
              {selectAllOption && isRootOverlay && (
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
                  key={item.value}
                  item={item}
                  focusedItem={focusedItem}
                  setFocusedItem={(item) => {
                    setFocusedItem(item);

                    if (item?.value === parentItem?.value) {
                      setFadeOut(true);
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
                  onClick={(item) => selectItem(item)}
                  pressedKey={pressedKey}
                  onBackdropClick={() => {
                    setFadeOut(true);
                    onBackdropClick && onBackdropClick();
                  }}
                  listRef={listRef}
                  parentItem={parentItem}
                  isGtMobile={isGtMobile}
                />
              ))}
              {hasLoadMoreItemsButton && isRootOverlay && (
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
