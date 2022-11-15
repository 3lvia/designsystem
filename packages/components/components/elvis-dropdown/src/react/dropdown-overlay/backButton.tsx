import { Icon } from '@elvia/elvis-icon/react';
import { IconButton } from '@elvia/elvis-toolbox';
import React, { MouseEvent, useState } from 'react';
import { DropdownItem } from '../elviaDropdown.types';
import { BackButtonStyles } from './dropdownOverlayStyles';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: string;
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
  const [isHovered, setIsHovered] = useState(false);
  const preventInputElementBlur = (ev: MouseEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  return (
    <BackButtonStyles
      onClick={() => onClick()}
      onMouseEnter={() => {
        onHover(item);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={preventInputElementBlur}
      isFocused={(inputIsKeyboard && focusedValue === item.value) || isHovered}
      isCompact={isCompact}
    >
      <IconButton size={isCompact ? 'sm' : 'md'} disabled isActive={isHovered}>
        <Icon size={isCompact ? 'xs' : 'sm'} name="arrowLeft" />
      </IconButton>
      {item.label}
    </BackButtonStyles>
  );
};
