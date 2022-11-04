import { Icon } from '@elvia/elvis-icon/react';
import { isSsr, useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { DropdownOverlay } from '../dropdown-overlay/dropdownOverlay';
import { DropdownItem as DropdownItemOptions, DropdownValue } from '../elviaDropdown.types';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItemStyles, IconContainer } from './dropdownItemStyles';
import { Checkbox } from '../checkbox/checkbox';

interface DropdownItemProps {
  overlayLevel: number;
  item: DropdownItemOptions;
  currentVal?: DropdownValue;
  isCompact?: boolean;
  isMulti: boolean;
  focusedValue: string;
  inputIsMouse: boolean;
  onItemSelect: (value: string[]) => void;
  onFocus: (item: DropdownItemOptions) => void;
  onLevelFocusChange: (newLevel: number) => void;
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
  pressedKey,
  focusedLevel,
}) => {
  const [listIsHovered, setListIsHovered] = useState(false);
  const [isPartiallyChecked, setIsPartiallyChecked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(buttonRef, popoverRef, {
    offset: 0,
    horizontalPosition: 'right',
    verticalPosition: 'top-inside',
    alignWidths: true,
  });
  const [hoverTimeoutId, setHoverTimeoutId] = useState(0);

  const isSelected = (): boolean => {
    const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
    if (item.children) {
      return item.children.every((child) => selectedValues.includes(child.value));
    } else {
      return selectedValues.includes(item.value);
    }
  };

  // This prevents the input to be blurred while in search mode
  const onMouseDown = (ev: MouseEvent<HTMLButtonElement>): void => {
    ev.preventDefault();
  };

  const onMouseOver = () => {
    if (!item.isDisabled && inputIsMouse) {
      onFocus(item);
    }
    if (item.children) {
      if (isSsr()) {
        setIsShowing(true);
      } else {
        window.clearTimeout(hoverTimeoutId);
        setHoverTimeoutId(window.setTimeout(() => setIsShowing(true), 400));
      }
    }
  };

  const onMouseLeave = () => {
    if (item.children) {
      if (!isSsr()) {
        window.clearTimeout(hoverTimeoutId);
      }
      setIsShowing(false);
    }
  };

  const onItemClick = () => {
    if (item.children) {
      onItemSelect(item.children.map((child) => child.value));
    } else {
      onItemSelect([item.value]);
    }
  };

  useEffect(() => {
    if (isMulti && Array.isArray(currentVal) && item.children) {
      const flatChildren = flattenTree(item.children);
      const childIsInSelectedLIst = (child: DropdownItemOptions): boolean => currentVal.includes(child.value);
      setIsPartiallyChecked(
        flatChildren.some(childIsInSelectedLIst) && !flatChildren.every(childIsInSelectedLIst),
      );
    }
  }, [currentVal]);

  useEffect(() => {
    if (focusedValue === item.value) {
      if (pressedKey?.code === 'ArrowRight' && item.children && focusedLevel === overlayLevel) {
        onLevelFocusChange(overlayLevel + 1);
        setIsShowing(true);
      } else if (pressedKey?.code === 'ArrowLeft' && focusedLevel === overlayLevel && focusedLevel > 1) {
        onLevelFocusChange(overlayLevel - 1);
        setIsShowing(false);
      }
    }
  }, [pressedKey]);

  return (
    <>
      <DropdownItemStyles
        ref={buttonRef}
        onClick={onItemClick}
        isCompact={isCompact}
        isActive={isSelected()}
        isFocused={focusedValue === item.value}
        isMulti={isMulti}
        hasSubItems={!!item.children}
        disabled={item.isDisabled}
        onMouseOver={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        onMouseDown={onMouseDown}
      >
        {isMulti && (
          <Checkbox
            isFocused={focusedValue === item.value}
            isIndeterminate={isPartiallyChecked}
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
        {item.label}
        {item.children && (
          <IconContainer>
            <Icon name="arrowRight" size={isCompact ? 'xs' : 'sm'} />
          </IconContainer>
        )}
      </DropdownItemStyles>
      {(isShowing || listIsHovered) && (
        <DropdownOverlay
          level={overlayLevel + 1}
          onMouseEnter={() => setListIsHovered(true)}
          onMouseLeave={() => setListIsHovered(false)}
          ref={popoverRef}
          items={item.children ?? []}
          isCompact={!!isCompact}
          onClose={() => setIsShowing(false)}
          isMulti={isMulti}
          onItemSelect={(value) => onItemSelect(value)}
          currentVal={currentVal}
          pressedKey={pressedKey}
          focusedLevel={focusedLevel}
          onLevelFocusChange={(newLevel) => {
            if (newLevel === overlayLevel) {
              setIsShowing(false);
            }
            onLevelFocusChange(newLevel);
          }}
        />
      )}
    </>
  );
};
