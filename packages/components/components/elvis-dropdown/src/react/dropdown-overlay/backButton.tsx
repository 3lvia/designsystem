import { Icon } from '@elvia/elvis-icon/react';
import { IconButton } from '@elvia/elvis-toolbox';
import React, { MouseEvent } from 'react';
import { DropdownItem, ValueType } from '../elviaDropdown.types';
import { BackButtonStyles } from './dropdownOverlayStyles';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: ValueType;
  isCompact?: boolean;
  inputIsKeyboard: boolean;
  onClick: () => void;
  onHover: (item: DropdownItem) => void;
}

export const BackButton: React.FC<SelectAllOptionProps> = ({
  item,
  focusedValue,
  isCompact,
  inputIsKeyboard,
  onClick,
  onHover,
}) => {
  const preventInputElementBlur = (ev: MouseEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  return (
    <BackButtonStyles
      onClick={() => onClick()}
      onMouseEnter={() => onHover(item)}
      onMouseDown={preventInputElementBlur}
      isFocused={inputIsKeyboard && focusedValue === item.value}
      isCompact={isCompact}
    >
      <IconButton size={isCompact ? 'sm' : 'md'} disabled>
        <Icon size={isCompact ? 'xs' : 'sm'} name="arrowLeft" />
      </IconButton>
      {item.label}
    </BackButtonStyles>
  );
};
