import { Icon } from '@elvia/elvis-icon/react';
import { isSsr, useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { KeyboardEvent, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { DropdownOverlay } from '../dropdown-overlay/dropdownOverlay';
import { DropdownItem as DropdownItemOption, DropdownValue } from '../elviaDropdown.types';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItemStyles, IconContainer, OpenOverlayButton } from './dropdownItemStyles';
import { Checkbox } from '../checkbox/checkbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import { statusToIconMap } from '../statusToIconMap';
import { flushSync } from 'react-dom';

interface DropdownItemProps {
  item: DropdownItemOption;
  parentItem?: DropdownItemOption;
  currentVal?: DropdownValue;
  isCompact?: boolean;
  isMulti: boolean;
  focusedItem?: DropdownItemOption;
  setFocusedItem: (item?: DropdownItemOption) => void;
  setHoveredItem: (item?: DropdownItemOption) => void;
  inputIsKeyboard: boolean;
  onItemSelect: (value: string[]) => void;
  onClick: (item: DropdownItemOption) => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
  listRef: RefObject<HTMLElement>;
  isGtMobile: boolean;
  children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  parentItem,
  currentVal,
  isCompact,
  isMulti,
  focusedItem,
  setFocusedItem,
  setHoveredItem,
  inputIsKeyboard: inputIsKeyboard,
  onItemSelect,
  onClick,
  pressedKey,
  listRef,
  isGtMobile,
  children,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(isGtMobile ? itemRef : listRef, popoverRef, {
    offset: 0,
    horizontalPosition: isGtMobile ? 'right' : 'center',
    verticalPosition: 'top-inside',
    alignWidths: isGtMobile ? false : true,
  });
  const [hoverTimeoutId, setHoverTimeoutId] = useState<number>();

  const selectableChildren = useMemo(() => {
    if (item.children) {
      return flattenTree(item.children).filter((child) => !child.isDisabled && !child.children);
    }
    return [];
  }, [item]);

  const currentValIncludesItem = (item: DropdownItemOption): boolean => {
    const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
    return selectedValues.includes(item.value);
  };

  const selfOrAllChildrenAreSelected = useMemo(() => {
    const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
    if (item.children) {
      return selectableChildren.every((child) => selectedValues.includes(child.value));
    } else {
      return currentValIncludesItem(item);
    }
  }, [item, currentVal]);

  const childIsSelected = useMemo(() => {
    return selectableChildren.some((child) => currentValIncludesItem(child));
  }, [selectableChildren]);

  const isPartiallyChecked = useMemo(() => {
    if (isMulti) {
      const children = selectableChildren;
      return children.some(currentValIncludesItem) && !children.every(currentValIncludesItem);
    }
    return false;
  }, [selectableChildren, isMulti]);

  const showChildList = (isShowing: boolean): void => {
    flushSync(() => setIsShowing(isShowing));
  };

  const onMouseOver = () => {
    if (!item.isDisabled && !inputIsKeyboard) {
      setFocusedItem(item);
      setHoveredItem(item);
    }
    if (item.children && isGtMobile) {
      if (isSsr()) {
        showChildList(true);
      } else {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(() => window.setTimeout(() => showChildList(true), 200));
      }
    }
  };

  const onItemClick = () => {
    if (isGtMobile || isMulti || !item.children) {
      onClick(item);
    } else {
      showChildList(true);
    }
  };

  useEffect(() => {
    if (focusedItem?.value === item.value) {
      if (pressedKey?.code === 'ArrowRight' && item.children) {
        setIsShowing(true);
      } else if (pressedKey?.code === 'ArrowLeft' && parentItem) {
        setFocusedItem(parentItem);
        setHoveredItem(parentItem);
      }
    }
  }, [pressedKey]);

  useEffect(() => {
    if (!isShowing && !hoverTimeoutId) {
      return;
    }
    const focusIsOnChild = (): boolean => {
      const children = flattenTree(item.children);
      return children.some((child) => child.value === focusedItem?.value);
    };

    if (focusedItem && focusedItem?.value !== item.value && !focusIsOnChild()) {
      if (isShowing && isGtMobile) {
        setIsShowing(false);
      }
      if (hoverTimeoutId && !isSsr()) {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(() => 0);
      }
    }
  }, [focusedItem]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutId && !isSsr()) {
        window.clearTimeout(hoverTimeoutId);
      }
    };
  }, []);

  return (
    <>
      <DropdownItemStyles
        ref={itemRef}
        isFocused={
          (focusedItem?.value === item.value && inputIsKeyboard) || isShowing || (childIsSelected && !isMulti)
        }
        isActive={selfOrAllChildrenAreSelected}
        isCompact={isCompact}
        isDisabled={item.isDisabled}
        isGtMobile={isGtMobile}
        isMulti={isMulti}
        onClick={() => onItemClick()}
        onMouseEnter={() => onMouseOver()}
        onMouseDown={(ev) => ev.preventDefault()}
        id={`ewc-dropdown-item-${item.value}`}
        aria-disabled={item.isDisabled}
        aria-haspopup={item.children ? 'listbox' : 'false'}
        aria-expanded={isShowing}
        aria-selected={selfOrAllChildrenAreSelected}
        data-testid="dropdown-item"
      >
        {isMulti && (
          <Checkbox
            isFocused={(focusedItem?.value === item.value && inputIsKeyboard) || isShowing}
            isIndeterminate={isPartiallyChecked}
            isChecked={selfOrAllChildrenAreSelected}
            isCompact={isCompact}
            isDisabled={item.isDisabled}
          />
        )}
        {children}
        {item.status && (
          <IconContainer>
            <Tooltip
              trigger={
                <Icon
                  name={statusToIconMap[item.status].name}
                  color={statusToIconMap[item.status].color}
                  size="xs"
                />
              }
              content={item.tooltip ?? ''}
              showDelay={100}
              position={'right'}
              isDisabled={!item.tooltip}
              triggerAreaRef={itemRef}
            />
          </IconContainer>
        )}
        {item.children && (
          <IconContainer>
            <OpenOverlayButton
              size={isCompact ? 'sm' : 'md'}
              disabled={isGtMobile || !isMulti ? true : false}
              onClick={(ev) => {
                ev.stopPropagation();
                showChildList(true);
              }}
            >
              <Icon name="arrowRight" size={isCompact ? 'xs' : 'sm'} />
            </OpenOverlayButton>
          </IconContainer>
        )}
      </DropdownItemStyles>
      {isShowing && (
        <DropdownOverlay
          ref={popoverRef}
          isGtMobile={isGtMobile}
          filteredItems={item.children ?? []}
          isCompact={!!isCompact}
          onClose={() => showChildList(false)}
          isMulti={isMulti}
          onItemSelect={(value) => onItemSelect(value)}
          currentVal={currentVal}
          pressedKey={pressedKey}
          inputIsKeyboard={inputIsKeyboard}
          focusedItem={focusedItem}
          setFocusedItem={setFocusedItem}
          setHoveredItem={setHoveredItem}
          parentItem={item}
        />
      )}
    </>
  );
};
