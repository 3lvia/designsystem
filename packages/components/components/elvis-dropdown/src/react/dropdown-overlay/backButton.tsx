import { IconButton, IconWrapper } from '@elvia/elvis-toolbox';
import React, { MouseEvent } from 'react';
import { getDropdownItemId } from '../dropdownListUtils';
import { DropdownItem, DropdownValueType } from '../elviaDropdown.types';
import { BackButtonStyles } from './dropdownOverlayStyles';
import arrowLeft from '@elvia/elvis-assets-icons/dist/icons/arrowLeft';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: DropdownValueType;
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
      id={getDropdownItemId(item.value)}
      onClick={() => onClick()}
      onMouseEnter={() => onHover(item)}
      onMouseDown={preventInputElementBlur}
      isFocused={inputIsKeyboard && focusedValue === item.value}
      isCompact={isCompact}
    >
      <IconButton size={isCompact ? 'sm' : 'md'} disabled>
        <IconWrapper icon={arrowLeft} size={isCompact ? 'xs' : 'sm'} />
      </IconButton>
      {item.label}
    </BackButtonStyles>
  );
};
