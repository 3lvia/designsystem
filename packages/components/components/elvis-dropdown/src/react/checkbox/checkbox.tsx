import React from 'react';
import { IndeterminateLine, StyledCheckbox } from './checkboxStyles';
import { ThemeName } from '@elvia/elvis-colors';

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isCompact?: boolean;
  isFocused?: boolean;
  currentTheme: ThemeName;
}

export interface IndeterminateLineProps {
  isCompact?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isIndeterminate,
  isChecked,
  isDisabled,
  isCompact,
  isFocused,
  currentTheme,
}) => {
  return (
    <StyledCheckbox
      isIndeterminate={isIndeterminate && !isChecked}
      isChecked={isChecked}
      isDisabled={isDisabled}
      isCompact={isCompact}
      isFocused={isFocused}
      currentTheme={currentTheme}
    >
      <IndeterminateLine isCompact={isCompact} />
    </StyledCheckbox>
  );
};
