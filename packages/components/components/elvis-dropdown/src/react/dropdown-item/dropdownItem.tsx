import { Icon } from '@elvia/elvis-icon/react';
import { IconButton, isSsr, useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { KeyboardEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import { DropdownOverlay } from '../dropdown-overlay/dropdownOverlay';
import { DropdownItem as DropdownItemOption, DropdownValue } from '../elviaDropdown.types';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItemStyles, IconContainer } from './dropdownItemStyles';
import { Checkbox } from '../checkbox/checkbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import { statusToIconMap } from '../statusToIconMap';
import { ItemValue } from './itemValue';

interface DropdownItemProps {
  item: DropdownItemOption;
  parentItem?: DropdownItemOption;
  currentVal?: DropdownValue;
  isCompact?: boolean;
  isMulti: boolean;
  focusedItem?: DropdownItemOption;
  setFocusedItem: (item?: DropdownItemOption) => void;
  inputIsMouse: boolean;
  onItemSelect: (value: string[]) => void;
  onClick: (item: DropdownItemOption) => void;
  onBackdropClick: () => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
  listRef: RefObject<HTMLElement>;
  isGtMobile: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  parentItem,
  currentVal,
  isCompact,
  isMulti,
  focusedItem,
  setFocusedItem,
  inputIsMouse,
  onItemSelect,
  onClick,
  onBackdropClick,
  pressedKey,
  listRef,
  isGtMobile,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(isGtMobile ? itemRef : listRef, popoverRef, {
    offset: 0,
    horizontalPosition: isGtMobile ? 'right' : 'center',
    verticalPosition: 'top-inside',
    alignWidths: true,
  });
  const [hoverTimeoutId, setHoverTimeoutId] = useState<number>();

  const getSelectableChildren = (): DropdownItemOption[] => {
    if (item.children) {
      return flattenTree(item.children).filter((child) => !child.isDisabled && !child.children);
    }
    return [];
  };

  const currentValIncludesItem = (item: DropdownItemOption): boolean => {
    const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
    return selectedValues.includes(item.value);
  };

  const isSelected = (): boolean => {
    const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
    if (item.children) {
      return getSelectableChildren().every((child) => selectedValues.includes(child.value));
    } else {
      return currentValIncludesItem(item);
    }
  };

  const preventInputElementBlur = (ev: MouseEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  const onMouseOver = () => {
    if (!isGtMobile) {
      return;
    }

    if (!item.isDisabled && inputIsMouse) {
      setFocusedItem(item);
    }
    if (item.children) {
      if (isSsr()) {
        setIsShowing(true);
      } else {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(window.setTimeout(() => setIsShowing(true), 200));
      }
    }
  };

  const isPartiallyChecked = (): boolean => {
    if (isMulti) {
      const children = getSelectableChildren();
      return children.some(currentValIncludesItem) && !children.every(currentValIncludesItem);
    }
    return false;
  };

  const focusIsOnChild = (): boolean => {
    const children = flattenTree(item.children);
    return children.some((child) => child.value === focusedItem?.value);
  };

  useEffect(() => {
    if (focusedItem?.value === item.value) {
      if (pressedKey?.code === 'ArrowRight' && item.children) {
        setIsShowing(true);
      } else if (pressedKey?.code === 'ArrowLeft' && parentItem) {
        setFocusedItem(parentItem);
      }
    }
  }, [pressedKey]);

  useEffect(() => {
    if (focusedItem && focusedItem?.value !== item.value && !focusIsOnChild()) {
      if (isShowing) {
        setIsShowing(false);
      } else if (hoverTimeoutId && !isSsr()) {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(undefined);
      }
    }
  }, [focusedItem]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutId && !isSsr()) {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(undefined);
      }
    };
  }, []);

  return (
    <>
      <DropdownItemStyles
        ref={itemRef}
        isActive={isSelected()}
        isCompact={isCompact}
        isDisabled={item.isDisabled}
        isFocused={(focusedItem?.value === item.value && !inputIsMouse) || isShowing}
        isMulti={isMulti}
        onClick={() => onClick(item)}
        onMouseEnter={() => onMouseOver()}
        onMouseDown={preventInputElementBlur}
        id={`elvia-dropdown-item-${item.value}`}
        aria-disabled={item.isDisabled}
        aria-haspopup={item.children ? 'listbox' : 'false'}
        aria-expanded={isShowing}
      >
        {isMulti && (
          <Checkbox
            isFocused={(focusedItem?.value === item.value && !inputIsMouse) || isShowing}
            isIndeterminate={isPartiallyChecked()}
            isChecked={isSelected()}
            isCompact={isCompact}
            isDisabled={item.isDisabled}
          />
        )}
        {item.icon && (
          <Icon
            name={item.icon}
            color={item.isDisabled ? 'disabled' : 'elvia-off'}
            size={isCompact ? 'xs' : 'sm'}
          />
        )}
        <ItemValue item={item} />
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
            <IconButton
              size={isCompact ? 'sm' : 'md'}
              disabled={isGtMobile}
              onClick={(ev) => {
                ev.stopPropagation();
                setFocusedItem(item);
                setIsShowing(true);
              }}
            >
              <Icon name="arrowRight" size={isCompact ? 'xs' : 'sm'} />
            </IconButton>
          </IconContainer>
        )}
      </DropdownItemStyles>
      {isShowing && (
        <DropdownOverlay
          ref={popoverRef}
          isGtMobile={isGtMobile}
          filteredItems={item.children ?? []}
          isCompact={!!isCompact}
          onClose={() => setIsShowing(false)}
          isMulti={isMulti}
          onItemSelect={(value) => onItemSelect(value)}
          currentVal={currentVal}
          pressedKey={pressedKey}
          inputIsMouse={inputIsMouse}
          onBackdropClick={onBackdropClick}
          focusedItem={focusedItem}
          setFocusedItem={setFocusedItem}
          parentItem={item}
        />
      )}
    </>
  );
};
