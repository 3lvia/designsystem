import { Icon } from '@elvia/elvis-icon/react';
import { IconButton, isSsr, useConnectedOverlay, useBreakpoint } from '@elvia/elvis-toolbox';
import React, { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { DropdownOverlay } from '../dropdown-overlay/dropdownOverlay';
import { DropdownItem as DropdownItemOption, DropdownValue } from '../elviaDropdown.types';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItemStyles, IconContainer } from './dropdownItemStyles';
import { Checkbox } from '../checkbox/checkbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import { statusToIconMap } from '../statusToIconMap';
import { ItemValue } from './ItemValue';

interface DropdownItemProps {
  overlayLevel: number;
  item: DropdownItemOption;
  currentVal?: DropdownValue;
  isCompact?: boolean;
  isMulti: boolean;
  focusedValue: string;
  inputIsMouse: boolean;
  onItemSelect: (value: string[]) => void;
  onFocus: (item: DropdownItemOption) => void;
  onLevelFocusChange: (newLevel: number) => void;
  onBackdropClick: () => void;
  pressedKey?: KeyboardEvent<HTMLInputElement>;
  focusedLevel: number;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  overlayLevel,
  item,
  currentVal,
  isCompact,
  isMulti,
  focusedValue,
  inputIsMouse,
  onItemSelect,
  onFocus,
  onLevelFocusChange,
  onBackdropClick,
  pressedKey,
  focusedLevel,
}) => {
  const isGtMobile = useBreakpoint('gt-mobile');
  const itemRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(itemRef, popoverRef, {
    offset: 0,
    horizontalPosition: 'right',
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

  // This prevents the input to be blurred while in search mode
  const onMouseDown = (ev: MouseEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  const onMouseOver = () => {
    if (!isGtMobile) {
      return;
    }

    if (!item.isDisabled && inputIsMouse) {
      onFocus(item);
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

  const onItemClick = () => {
    if (isMulti && item.children) {
      const children = getSelectableChildren();
      if (!children.every(currentValIncludesItem)) {
        onItemSelect(children.filter((item) => !currentValIncludesItem(item)).map((child) => child.value));
      } else {
        onItemSelect(children.map((child) => child.value));
      }
    } else {
      onItemSelect([item.value]);
    }
  };

  const isPartiallyChecked = (): boolean => {
    if (isMulti) {
      const children = getSelectableChildren();
      return children.some(currentValIncludesItem) && !children.every(currentValIncludesItem);
    }
    return false;
  };

  useEffect(() => {
    if (focusedValue === item.value && focusedLevel === overlayLevel) {
      if (pressedKey?.code === 'ArrowRight' && item.children) {
        onLevelFocusChange(overlayLevel + 1);
        setIsShowing(true);
      } else if (pressedKey?.code === 'ArrowLeft' && focusedLevel > 0) {
        onLevelFocusChange(overlayLevel - 1);
      }
    }
  }, [pressedKey]);

  useEffect(() => {
    if (focusedValue !== item.value) {
      if (isShowing) {
        setIsShowing(false);
      } else if (hoverTimeoutId && !isSsr()) {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(undefined);
      }
    }
  }, [focusedValue]);

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
        isFocused={focusedValue === item.value}
        isMulti={isMulti}
        onClick={onItemClick}
        onMouseEnter={() => onMouseOver()}
        onMouseDown={onMouseDown}
      >
        {isMulti && (
          <Checkbox
            isFocused={focusedValue === item.value}
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
                onFocus(item);
                setIsShowing(!isShowing);
              }}
            >
              <Icon name="arrowRight" size={isCompact ? 'xs' : 'sm'} />
            </IconButton>
          </IconContainer>
        )}
      </DropdownItemStyles>
      {isShowing && (
        <DropdownOverlay
          level={overlayLevel + 1}
          ref={popoverRef}
          filteredItems={item.children ?? []}
          isCompact={!!isCompact}
          onClose={() => setIsShowing(false)}
          isMulti={isMulti}
          onItemSelect={(value) => onItemSelect(value)}
          currentVal={currentVal}
          pressedKey={pressedKey}
          focusedLevel={focusedLevel}
          inputIsMouse={inputIsMouse}
          onLevelFocusChange={onLevelFocusChange}
          onBackdropClick={onBackdropClick}
        />
      )}
    </>
  );
};
