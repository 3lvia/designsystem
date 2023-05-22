import React, { useEffect, useState, KeyboardEvent, useRef, useMemo } from 'react';
import { DropdownItem } from '../dropdown-item/dropdownItem';
import { flattenTree, getValueAsList } from '../dropdownListUtils';
import {
  DropdownItem as DropdownItemOption,
  DropdownSize,
  DropdownValue,
  DropdownValueType,
} from '../elviaDropdown.types';
import { BackButton } from './backButton';
import {
  CursorCurve,
  DropdownPopup,
  DropdownPopupContainer,
  ItemList,
  NoItemsMessage,
} from './dropdownOverlayStyles';
import { LoadMoreButton } from './loadMoreButton';
import { SelectAllOption } from './selectAllOption';
import { ItemValue } from '../dropdown-item/itemValue';
import { Icon } from '@elvia/elvis-icon/react';
import { Overlay } from '@elvia/elvis-toolbox';
import { ThemeName } from '@elvia/elvis-colors';

interface DropdownOverlayProps {
  isRootOverlay?: boolean;
  isGtMobile: boolean;
  filteredItems: DropdownItemOption[];
  allItems?: DropdownItemOption[];
  inputIsKeyboard: boolean;
  size: DropdownSize;
  isMulti: boolean;
  onClose: () => void;
  noItemsText?: string;
  currentVal?: DropdownValue;
  onItemSelect: (value: DropdownValueType[]) => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
  selectAllOption?: string;
  hasLoadMoreItemsButton?: boolean;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  focusedItem?: DropdownItemOption;
  setFocusedItem: (item?: DropdownItemOption) => void;
  setHoveredItem?: (item?: DropdownItemOption) => void;
  parentItem?: DropdownItemOption;
  isSearchMode?: boolean;
  id?: string;
  currentTheme: ThemeName;
}

let uniqueId = 0;

export const DropdownOverlay = React.forwardRef<HTMLDivElement, DropdownOverlayProps>(
  (
    {
      isRootOverlay,
      isGtMobile,
      filteredItems,
      allItems,
      inputIsKeyboard,
      size,
      isMulti,
      onClose,
      noItemsText,
      currentVal,
      onItemSelect,
      pressedKey,
      selectAllOption,
      hasLoadMoreItemsButton,
      onLoadMoreItems,
      isLoadingMoreItems,
      focusedItem,
      setFocusedItem,
      setHoveredItem,
      parentItem,
      isSearchMode,
      id,
      currentTheme,
    },
    ref,
  ) => {
    const [initialScreenSize] = useState(isGtMobile);
    const listRef = useRef<HTMLDivElement>(null);
    const [fadeOut, setFadeOut] = useState(false);
    const [selectAllItem] = useState<DropdownItemOption>({
      label: selectAllOption ?? '',
      value: `selectAll-${uniqueId++}`,
    });
    const [backItem] = useState<DropdownItemOption>({
      label: 'Tilbake',
      value: `back-${uniqueId++}`,
    });
    const [loadMoreItem] = useState<DropdownItemOption>({
      label: 'Last inn flere',
      value: `loadMore-${uniqueId++}`,
    });

    const fullTabList = useMemo<DropdownItemOption[]>(() => {
      const itemList = filteredItems.slice();
      if (!isGtMobile && !isRootOverlay) {
        itemList.unshift(backItem);
      }
      if (selectAllOption && itemList.length) {
        itemList.unshift(selectAllItem);
      }
      if (hasLoadMoreItemsButton) {
        itemList.push(loadMoreItem);
      }
      return itemList;
    }, [filteredItems, isGtMobile, selectAllOption, hasLoadMoreItemsButton]);

    const allItemsHaveIcons = useMemo(() => {
      return filteredItems.every((item) => item.icon);
    }, [filteredItems]);

    const focusIsOnDirectDescendant = useMemo(() => {
      return fullTabList.some((item) => focusedItem?.value === item.value);
    }, [fullTabList, focusedItem]);

    const currentValIncludesItem = (item: DropdownItemOption): boolean => {
      const selectedValues = getValueAsList(currentVal);
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

    const closeOpenOverlay = (): void => {
      if (parentItem) {
        setFadeOut(true);
        setFocusedItem(parentItem);
      }
    };

    const handleOverlayKeyboardNavigation = (ev: KeyboardEvent<HTMLInputElement>): void => {
      const currentIndex = fullTabList.findIndex((item) => item.value === focusedItem?.value);
      if (['Enter', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        if (focusedItem?.value === selectAllItem.value) {
          toggleAllSelection();
        } else if (focusedItem?.value === loadMoreItem.value) {
          onLoadMoreItems && onLoadMoreItems();
        } else if (focusedItem?.value === backItem.value) {
          closeOpenOverlay();
        } else if (focusedItem && !focusedItem.children) {
          selectItem(focusedItem);
        }
      } else if (ev.code === 'ArrowUp') {
        ev.preventDefault();
        const newIndex = currentIndex - 1 < 0 ? fullTabList.length - 1 : currentIndex - 1;
        setFocusedItem(fullTabList[newIndex]);
      } else if (ev.code === 'ArrowDown') {
        ev.preventDefault();
        const newIndex = currentIndex + 1 > fullTabList.length - 1 ? 0 : currentIndex + 1;
        setFocusedItem(fullTabList[newIndex]);
      } else if (ev.code === 'ArrowLeft') {
        ev.preventDefault();
        closeOpenOverlay();
      }
    };

    const toggleAllSelection = (): void => {
      const allValues = getSelectableChildren(filteredItems);
      const selectedValues = getValueAsList(currentVal);
      if (allValues.length === selectedValues.length) {
        onItemSelect(allValues.map((item) => item.value));
      } else {
        const unselectedItems = allValues.filter((value) => !currentValIncludesItem(value));
        onItemSelect(unselectedItems.map((item) => item.value));
      }
    };

    useEffect(() => {
      if (pressedKey && (focusIsOnDirectDescendant || (isRootOverlay && isSearchMode))) {
        handleOverlayKeyboardNavigation(pressedKey);
      }
    }, [pressedKey]);

    useEffect(() => {
      const scrollItemListToFocusedItem = (itemToFocus: DropdownItemOption) => {
        const buttonHeight = size === 'small' ? 40 : 48;
        const index = fullTabList.findIndex((item) => item.value === itemToFocus.value);
        if (index !== -1) {
          listRef.current?.scrollTo({
            top: buttonHeight * index - listRef.current?.offsetHeight / 2,
          });
        }
      };

      if (inputIsKeyboard && focusedItem) {
        scrollItemListToFocusedItem(focusedItem);
      }
    }, [focusedItem]);

    useEffect(() => {
      initialScreenSize !== isGtMobile && onClose();
    }, [isGtMobile]);

    useEffect(() => {
      const focusFirstItemOnInit = () => {
        if (inputIsKeyboard || (isRootOverlay && !focusIsOnDirectDescendant) || !isGtMobile) {
          setFocusedItem(fullTabList[0]);
        }
      };
      focusFirstItemOnInit();
    }, []);

    return (
      <Overlay
        ref={ref}
        hasBackdrop={!!isRootOverlay}
        onClose={onClose}
        startFade={fadeOut}
        hasAnimation={!!isRootOverlay || isGtMobile}
      >
        <DropdownPopupContainer
          data-testid="popover"
          id={id}
          onMouseLeave={() => setHoveredItem && setHoveredItem(undefined)}
          size={size}
        >
          {!isRootOverlay && isGtMobile && <CursorCurve />}
          <DropdownPopup isInvisible={!isGtMobile && !focusIsOnDirectDescendant}>
            <ItemList ref={listRef}>
              {!filteredItems?.length && <NoItemsMessage>{noItemsText}</NoItemsMessage>}
              {!isGtMobile && !isRootOverlay && (
                <BackButton
                  item={backItem}
                  onClick={() => closeOpenOverlay()}
                  onHover={(item) => setFocusedItem(item)}
                  focusedValue={focusedItem?.value}
                  size={size}
                  inputIsKeyboard={inputIsKeyboard}
                />
              )}
              {selectAllOption && isRootOverlay && !!filteredItems.length && (
                <SelectAllOption
                  focusedValue={focusedItem?.value}
                  size={size}
                  item={selectAllItem}
                  items={allItems ?? []}
                  selectedItems={currentVal}
                  onClick={toggleAllSelection}
                  onHover={(item) => setFocusedItem(item)}
                  currentTheme={currentTheme}
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
                  setHoveredItem={(item) => {
                    setHoveredItem && setHoveredItem(item);
                  }}
                  size={size}
                  isMulti={isMulti}
                  inputIsKeyboard={inputIsKeyboard}
                  currentVal={currentVal}
                  onItemSelect={(item) => {
                    onItemSelect(item);
                    if (!isMulti) {
                      setFadeOut(true);
                    }
                  }}
                  onClick={(item) => selectItem(item)}
                  pressedKey={pressedKey}
                  listRef={listRef}
                  isGtMobile={isGtMobile}
                  currentTheme={currentTheme}
                >
                  {item.icon && !isMulti && allItemsHaveIcons && (
                    <Icon
                      name={item.icon}
                      color={item.isDisabled ? 'disabled' : 'elvia-off'}
                      size={size === 'small' ? 'xs' : 'sm'}
                    />
                  )}
                  <ItemValue item={item} focusedValue={focusedItem} isRootOverlay={isRootOverlay} />
                </DropdownItem>
              ))}
              {hasLoadMoreItemsButton && isRootOverlay && (
                <LoadMoreButton
                  focusedValue={focusedItem?.value}
                  item={loadMoreItem}
                  isLoadingMoreItems={isLoadingMoreItems}
                  onLoadMoreItems={onLoadMoreItems}
                  size={size}
                  onHover={(item) => setFocusedItem(item)}
                />
              )}
            </ItemList>
          </DropdownPopup>
        </DropdownPopupContainer>
      </Overlay>
    );
  },
);

DropdownOverlay.displayName = 'DropdownOverlayComponent';
