import { Icon } from '@elvia/elvis-icon/react';
import { useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DropdownContext } from '../elvia-dropdown';
import { DropdownValue } from '../elviaDropdown.types';
import { Overlay, Backdrop, OverlayPositioner } from '../styledComponents';
import { Checkbox, DropdownItemStyles, IconContainer } from './dropdownItemStyles';

interface DropdownItemProps {
  isDisabled?: boolean;
  value: string;
  content?: string | JSX.Element;
  subOptions?: JSX.Element;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  isDisabled: optionIsDisabled,
  value,
  content,
  subOptions,
}) => {
  const {
    registerListItem,
    items,
    focusedIndex,
    setFocusedIndex,
    inputIsMouse,
    onItemSelect,
    isCompact,
    isDisabled,
    isMulti,
    currentVal,
    filter,
  } = React.useContext(DropdownContext);
  const [itemIndex, setItemIndex] = useState(0);
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
      return currentVal.includes(value);
    }

    return currentVal === value;
  };

  const isVisible = (filterValue: string): boolean => {
    if (!filterValue) {
      return true;
    }

    return value.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
  };

  // This prevents the input to be blurred while in search mode
  const onMouseDown = (ev: MouseEvent<HTMLButtonElement>): void => {
    ev.preventDefault();
  };

  useEffect(() => {
    registerListItem({ value: value, label: buttonRef.current?.textContent ?? '' });
  }, []);

  useEffect(() => {
    setItemIndex(items.findIndex((item) => item.value === value));
  }, [items]);

  return (
    <>
      <DropdownItemStyles
        ref={buttonRef}
        onClick={() => onItemSelect(value)}
        isCompact={isCompact}
        isActive={isSelected(currentVal)}
        isFocused={focusedIndex === itemIndex}
        isMulti={isMulti}
        hasSubItems={!!subOptions}
        disabled={isDisabled || optionIsDisabled}
        onMouseEnter={() => (!isDisabled || optionIsDisabled) && inputIsMouse && setFocusedIndex(itemIndex)}
        isHidden={!isVisible(filter)}
        onMouseDown={onMouseDown}
      >
        {isMulti && <Checkbox />}
        {content}
        {subOptions && (
          <IconContainer
            onClick={(ev) => {
              ev.stopPropagation();
              setIsShowing(true);
            }}
          >
            <Icon name="arrowRight" size={isCompact ? 'xs' : 'sm'} />
          </IconContainer>
        )}
      </DropdownItemStyles>
      {subOptions &&
        createPortal(
          <Overlay isShowing={isShowing}>
            <Backdrop onClick={() => setIsShowing(false)} />
            <OverlayPositioner ref={popoverRef}>{subOptions}</OverlayPositioner>
          </Overlay>,
          document.body,
        )}
    </>
  );
};
