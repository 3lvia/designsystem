import arrowLeft from '@elvia/elvis-assets-icons/dist/icons/arrowLeft';
import { FormFieldSizes, IconButton, IconWrapper } from '@elvia/elvis-toolbox';
import React, { MouseEvent } from 'react';

import { getDropdownItemId } from '../dropdownListUtils';
import { DropdownItem, DropdownValueType } from '../publicApi.public';
import { BackButtonStyles } from './dropdownOverlayStyles';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: DropdownValueType;
  size?: FormFieldSizes;
  inputIsKeyboard: boolean;
  onClick: () => void;
  onHover: (item: DropdownItem) => void;
}

export const BackButton: React.FC<SelectAllOptionProps> = ({
  item,
  focusedValue,
  size,
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
      size={size}
    >
      <IconButton size={size === 'small' ? 'sm' : 'md'} disabled>
        <IconWrapper icon={arrowLeft} size={size === 'small' ? 'xs' : 'sm'} />
      </IconButton>
      {item.label}
    </BackButtonStyles>
  );
};
