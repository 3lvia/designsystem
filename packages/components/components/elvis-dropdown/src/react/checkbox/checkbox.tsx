import React from 'react';
import { IndeterminateLine, StyledCheckbox } from './checkboxStyles';
import { ThemeName } from '@elvia/elvis-colors';
import { DropdownSize } from '../elviaDropdown.types';

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  size?: DropdownSize;
  isFocused?: boolean;
  currentTheme: ThemeName;
}

export interface IndeterminateLineProps {
  size?: DropdownSize;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isIndeterminate,
  isChecked,
  isDisabled,
  size,
  isFocused,
  currentTheme,
}) => {
  return (
    <StyledCheckbox
      isIndeterminate={isIndeterminate && !isChecked}
      isChecked={isChecked}
      isDisabled={isDisabled}
      size={size}
      isFocused={isFocused}
      currentTheme={currentTheme}
    >
      <IndeterminateLine size={size} />
    </StyledCheckbox>
  );
};
