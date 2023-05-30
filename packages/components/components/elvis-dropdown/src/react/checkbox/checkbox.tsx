import React from 'react';
import { IndeterminateLine, StyledCheckbox } from './checkboxStyles';
import { ThemeName } from '@elvia/elvis-colors';
import { FormFieldSizes } from '@elvia/elvis-toolbox';

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  size?: FormFieldSizes;
  isFocused?: boolean;
  currentTheme: ThemeName;
}

export interface IndeterminateLineProps {
  size?: FormFieldSizes;
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
