import { isSsr, useConnectedOverlay, IconWrapper } from '@elvia/elvis-toolbox';
import React, { KeyboardEvent, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { DropdownOverlay } from '../dropdown-overlay/dropdownOverlay';
import {
  DropdownItem as DropdownItemOption,
  DropdownSize,
  DropdownValue,
  DropdownValueType,
} from '../elviaDropdown.types';
import { flattenTree, getDropdownItemId, getValueAsList } from '../dropdownListUtils';
import { DropdownItemStyles, IconContainer, OpenOverlayButton } from './dropdownItemStyles';
import { Checkbox } from '../checkbox/checkbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import { statusToIconMap } from '../statusToIconMap';
import { ThemeName, getThemeColor } from '@elvia/elvis-colors';
import arrowRight from '@elvia/elvis-assets-icons/dist/icons/arrowRight';

interface DropdownItemProps {
  item: DropdownItemOption;
  currentVal?: DropdownValue;
  size: DropdownSize;
  isMulti: boolean;
  focusedItem?: DropdownItemOption;
  setFocusedItem: (item?: DropdownItemOption) => void;
  setHoveredItem: (item?: DropdownItemOption) => void;
  inputIsKeyboard: boolean;
  onItemSelect: (value: DropdownValueType[]) => void;
  onClick: (item: DropdownItemOption) => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
  listRef: RefObject<HTMLElement>;
  isGtMobile: boolean;
  children: React.ReactNode;
  currentTheme: ThemeName;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  currentVal,
  size,
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
  currentTheme,
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
    const selectedValues = getValueAsList(currentVal);
    return selectedValues.includes(item.value);
  };

  const selfOrAllChildrenAreSelected = useMemo(() => {
    const selectedValues = getValueAsList(currentVal);
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
  }, [selectableChildren, isMulti, currentVal]);

  const showChildList = (isShowing: boolean): void => {
    setIsShowing(isShowing);
  };

  const onMouseOver = () => {
    if (!item.isDisabled && !inputIsKeyboard) {
      setFocusedItem(item);
      setHoveredItem(item);
    }
    if (item.children && isGtMobile && !item.isDisabled) {
      if (isSsr()) {
        showChildList(true);
      } else {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(() => window.setTimeout(() => showChildList(true), 200));
      }
    }
  };

  const onItemClick = () => {
    if (!item.isDisabled) {
      if (isGtMobile || isMulti || !item.children) {
        onClick(item);
      } else {
        showChildList(true);
      }
    }
  };

  useEffect(() => {
    if (focusedItem?.value === item.value) {
      if (
        (pressedKey?.code === 'ArrowRight' || pressedKey?.code === 'Enter') &&
        item.children &&
        !item.isDisabled
      ) {
        setIsShowing(true);
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
        size={size}
        isDisabled={item.isDisabled}
        isGtMobile={isGtMobile}
        isMulti={isMulti}
        onClick={() => onItemClick()}
        onMouseEnter={() => onMouseOver()}
        onMouseDown={(ev) => ev.preventDefault()}
        id={getDropdownItemId(item.value)}
        aria-disabled={item.isDisabled}
        aria-haspopup={item.children ? 'listbox' : 'false'}
        aria-expanded={isShowing}
        aria-selected={selfOrAllChildrenAreSelected}
        aria-label={`
        ${item.label}
        ${item.children ? ', undermeny' : ''} 
        ${item.tooltip ? ', Merknad: ' + item.tooltip : ''}`}
        data-testid="dropdown-item"
      >
        {isMulti && (
          <Checkbox
            isFocused={(focusedItem?.value === item.value && inputIsKeyboard) || isShowing}
            isIndeterminate={isPartiallyChecked}
            isChecked={selfOrAllChildrenAreSelected}
            size={size}
            isDisabled={item.isDisabled}
            currentTheme={currentTheme}
          />
        )}
        {children}
        {item.status && (
          <IconContainer>
            <Tooltip
              trigger={
                <IconWrapper
                  icon={statusToIconMap[item.status].icon}
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
              size={size === 'small' ? 'sm' : 'md'}
              disabled={isGtMobile || !isMulti ? true : false}
              onClick={(ev) => {
                ev.stopPropagation();
                showChildList(true);
              }}
            >
              <IconWrapper
                icon={arrowRight}
                size={size === 'small' ? 'xs' : 'sm'}
                color={item.isDisabled ? getThemeColor('text-disabled-1') : ''}
              />
            </OpenOverlayButton>
          </IconContainer>
        )}
      </DropdownItemStyles>
      {isShowing && (
        <DropdownOverlay
          ref={popoverRef}
          isGtMobile={isGtMobile}
          filteredItems={item.children ?? []}
          size={size}
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
          currentTheme={currentTheme}
        />
      )}
    </>
  );
};
