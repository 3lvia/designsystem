import React, { useRef } from 'react';
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isSelected = (currentVal: DropdownValue): boolean => {
    if (Array.isArray(currentVal)) {
      return currentVal.includes(value);
    }

    return currentVal === value;
  };

  return (
    <DropdownContext.Consumer>
      {({ onItemSelect, isCompact, isDisabled, isMulti, currentVal }) => (
        <DropdownItemStyles
          ref={buttonRef}
          onClick={() => onItemSelect(value)}
          isCompact={isCompact}
          isActive={isSelected(currentVal)}
          isMulti={isMulti}
          disabled={isDisabled || optionIsDisabled}
        >
          {isMulti && <Checkbox />}
          {content}
        </DropdownItemStyles>
      )}
    </DropdownContext.Consumer>
  );
};
