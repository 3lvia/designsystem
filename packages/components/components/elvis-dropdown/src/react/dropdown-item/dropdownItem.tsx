import { Icon } from '@elvia/elvis-icon/react';
import { useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { MouseEvent, useRef } from 'react';
import { DropdownOverlay } from '../dropdown-overlay/dropdownOverlay';
import { DropdownItem as DropdownItemOptions, DropdownValue } from '../elviaDropdown.types';
import { Checkbox, DropdownItemStyles, IconContainer } from './dropdownItemStyles';

interface DropdownItemProps {
  item: DropdownItemOptions;
  currentVal?: string;
  isCompact: boolean;
  isMulti: boolean;
  focusedValue: string;
  inputIsMouse: boolean;
  onItemSelect: (value: string) => void;
  setFocusedValue: (value: string) => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  currentVal,
  isCompact,
  isMulti,
  focusedValue,
  inputIsMouse,
  onItemSelect,
  setFocusedValue,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(buttonRef, popoverRef, {
    offset: 0,
    horizontalPosition: 'right',
    verticalPosition: 'top-inside',
    alignWidths: true,
  });

  const isSelected = (currentVal: DropdownValue | null): boolean => {
    if (Array.isArray(currentVal)) {
      return currentVal.includes(item.value);
    }

    return currentVal === item.value;
  };

  // This prevents the input to be blurred while in search mode
  const onMouseDown = (ev: MouseEvent<HTMLButtonElement>): void => {
    ev.preventDefault();
  };

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
        disabled={item.isDisabled}
        onMouseEnter={() => !item.isDisabled && inputIsMouse && setFocusedValue(item.value)}
        onMouseDown={onMouseDown}
      >
        {isMulti && <Checkbox />}
        {item.label}
        {item.children && (
          <IconContainer
            onClick={(ev) => {
              ev.stopPropagation();
              setIsShowing(!isShowing);
            }}
          >
            <Icon name="arrowRight" size={isCompact ? 'xs' : 'sm'} />
          </IconContainer>
        )}
      </DropdownItemStyles>
      {isShowing && (
        <DropdownOverlay
          ref={popoverRef}
          items={item.children ?? []}
          isCompact={isCompact}
          onClose={() => setIsShowing(false)}
          isMulti={isMulti}
          onItemSelect={onItemSelect}
          currentVal={currentVal}
        />
      )}
    </>
  );
};
