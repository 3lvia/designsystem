import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { DropdownContext } from '../elvia-dropdown';
import { DropdownValue } from '../elviaDropdown.types';
import { Checkbox, DropdownItemStyles } from './dropdownItemStyles';

interface DropdownItemProps {
  isDisabled?: boolean;
  value: string;
  content?: string | JSX.Element;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  isDisabled: optionIsDisabled,
  value,
  content,
}) => {
  const { registerListItem, items, focusedIndex, setFocusedIndex } = React.useContext(DropdownContext);
  const [itemIndex, setItemIndex] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isSelected = (currentVal: DropdownValue): boolean => {
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
    <DropdownContext.Consumer>
      {({ onItemSelect, isCompact, isDisabled, isMulti, currentVal, filter }) => (
        <DropdownItemStyles
          ref={buttonRef}
          onClick={() => onItemSelect(value)}
          isCompact={isCompact}
          isActive={isSelected(currentVal)}
          isFocused={focusedIndex === itemIndex}
          isMulti={isMulti}
          disabled={isDisabled || optionIsDisabled}
          onMouseEnter={() => (!isDisabled || optionIsDisabled) && setFocusedIndex(itemIndex)}
          isHidden={!isVisible(filter)}
          onMouseDown={onMouseDown}
        >
          {isMulti && <Checkbox />}
          {content}
        </DropdownItemStyles>
      )}
    </DropdownContext.Consumer>
  );
};
