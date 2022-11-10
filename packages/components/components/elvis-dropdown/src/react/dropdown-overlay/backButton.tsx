import { Icon } from '@elvia/elvis-icon/react';
import React, { MouseEvent } from 'react';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';
import { DropdownItem } from '../elviaDropdown.types';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: string;
  isCompact?: boolean;
  onClick: () => void;
  onHover: (item: DropdownItem) => void;
}

export const BackButton: React.FC<SelectAllOptionProps> = ({
  item,
  focusedValue,
  isCompact,
  onClick,
  onHover,
}) => {
  const preventInputElementBlur = (ev: MouseEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  return (
    <DropdownItemStyles
      onClick={() => onClick()}
      onMouseEnter={() => onHover(item)}
      onMouseDown={preventInputElementBlur}
      isFocused={focusedValue === item.value}
      isCompact={isCompact}
    >
      <Icon size={isCompact ? 'md' : 'sm'} name="arrowLeft" />
      {item.label}
    </DropdownItemStyles>
  );
};
