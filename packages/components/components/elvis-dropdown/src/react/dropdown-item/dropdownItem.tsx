import { Icon } from '@elvia/elvis-icon/react';
import { isSsr, useBreakpoint, useConnectedOverlay } from '@elvia/elvis-toolbox';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing, updatePreferredPosition } = useConnectedOverlay(buttonRef, popoverRef, {
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

  const isSelected = (): boolean => {
    const selectedValues = typeof currentVal === 'string' ? [currentVal] : currentVal ?? [];
    if (item.children) {
      return getSelectableChildren().every((child) => selectedValues.includes(child.value));
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
        setHoverTimeoutId(window.setTimeout(() => setIsShowing(true), 300));
      }
    }
  };

  const onItemClick = () => {
    if (isMulti && item.children) {
      onItemSelect(getSelectableChildren().map((child) => child.value));
    } else {
      onItemSelect([item.value]);
    }
  };

  const isPartiallyChecked = (): boolean => {
    if (isMulti && Array.isArray(currentVal) && item.children) {
      const flatChildren = flattenTree(item.children);
      const childIsInSelectedLIst = (child: DropdownItemOption): boolean => currentVal.includes(child.value);
      return flatChildren.some(childIsInSelectedLIst) && !flatChildren.every(childIsInSelectedLIst);
    }
    return false;
  };

  useEffect(() => {
    if (focusedValue === item.value) {
      if (pressedKey?.code === 'ArrowRight' && item.children && focusedLevel === overlayLevel) {
        onLevelFocusChange(overlayLevel + 1);
        setIsShowing(true);
      } else if (pressedKey?.code === 'ArrowLeft' && focusedLevel === overlayLevel && focusedLevel > 1) {
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
    updatePreferredPosition('top-inside', isGtMobile ? 'right' : 'left-inside');
  }, [isGtMobile]);

  return (
    <>
      <DropdownItemStyles
        ref={buttonRef}
        onClick={onItemClick}
        isCompact={isCompact}
        isActive={isSelected()}
        isFocused={focusedValue === item.value}
        isMulti={isMulti}
        disabled={item.isDisabled}
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
        <ItemValue text={item.label} />
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
              triggerAreaRef={buttonRef}
            />
          </IconContainer>
        )}
        {item.children && (
          <IconContainer>
            <Icon name="arrowRight" size={isCompact ? 'xs' : 'sm'} />
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
          onLevelFocusChange={(newLevel) => {
            if (newLevel === overlayLevel) {
              setIsShowing(false);
            }
            onLevelFocusChange(newLevel);
          }}
          onBackdropClick={onBackdropClick}
        />
      )}
    </>
  );
};
