import { Icon } from '@elvia/elvis-icon/react';
import { isSsr, useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { DropdownOverlay } from '../dropdown-overlay/dropdownOverlay';
import { DropdownItem as DropdownItemOptions, DropdownValue } from '../elviaDropdown.types';
import { getFlattenedItemList } from '../flattenDropdownItems';
import { Checkbox, DropdownItemStyles, IconContainer } from './dropdownItemStyles';

interface DropdownItemProps {
  item: DropdownItemOptions;
  currentVal?: DropdownValue;
  isCompact: boolean;
  isMulti: boolean;
  focusedValue: string;
  inputIsMouse: boolean;
  onItemSelect: (value: string) => void;
  onFocus: (item: DropdownItemOptions) => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  currentVal,
  isCompact,
  isMulti,
  focusedValue,
  inputIsMouse,
  onItemSelect,
  onFocus,
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

  const isSelected = (currentVal: DropdownValue): boolean => {
    if (Array.isArray(currentVal)) {
      return currentVal.includes(item.value);
    }

    return currentVal === item.value;
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

  useEffect(() => {
    if (isMulti && Array.isArray(currentVal) && item.children) {
      const flatChildren = getFlattenedItemList(item.children);
      setIsPartiallyChecked(flatChildren.some((child) => currentVal.includes(child.value)));
    }
  }, [currentVal]);

  return (
    <>
      <DropdownItemStyles
        ref={buttonRef}
        onClick={() => onItemSelect(item.value)}
        isCompact={isCompact}
        isActive={isSelected(currentVal)}
        isFocused={focusedValue === item.value}
        isMulti={isMulti}
        hasSubItems={!!item.children}
        isPartiallyChecked={isPartiallyChecked}
        disabled={item.isDisabled}
        onMouseOver={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        onMouseDown={onMouseDown}
      >
        {isMulti && <Checkbox />}
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
          onMouseEnter={() => setListIsHovered(true)}
          onMouseLeave={() => setListIsHovered(false)}
          ref={popoverRef}
          items={item.children ?? []}
          isCompact={isCompact}
          onClose={() => setIsShowing(false)}
          isMulti={isMulti}
          onItemSelect={(value) => onItemSelect(value)}
          currentVal={currentVal}
        />
      )}
    </>
  );
};
